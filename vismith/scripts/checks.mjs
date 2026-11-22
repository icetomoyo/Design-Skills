// Vismith - deterministic UI checks (M4, HLD 3.4). Lexical/regex level only.
// Usage: node scripts/checks.mjs <paths...> [--contract F] [--json] [--rules a,b] [--config F] [--strict]
import path from 'node:path';
import fs from 'node:fs/promises';
import { walkFiles, readText, isUiSource, lineOfIndex } from './lib/fsutil.mjs';
import { parseColor, contrastRatio, fmtRatio } from './lib/colors.mjs';
import { SKILL_ROOT, runMain } from './lib/cli.mjs';
import { flattenColorShades } from './lib/twtheme.mjs';

function parseArgs(argv) {
  const opts = { paths: [], rules: null, json: false, strict: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--strict') opts.strict = true;
    else if (a === '--contract') opts.contract = argv[++i];
    else if (a === '--config') opts.config = argv[++i];
    else if (a === '--rules') opts.rules = argv[++i].split(',').map((s) => s.trim().toUpperCase());
    else if (!a.startsWith('--')) opts.paths.push(a);
  }
  return opts;
}

function wildcardToRe(pat) {
  let out = '';
  for (let i = 0; i < pat.length; i++) {
    const c = pat[i];
    if (c === '*' && pat[i + 1] === '*') { out += '[\\s\\S]*'; i++; }
    else if (c === '*') out += '[^/\\\\]*';
    else out += c.replace(/[.+?^${}()|[\]\\]/g, '\\' + c);
  }
  return new RegExp('^' + out + '$');
}

function isTokenDefFile(rel) {
  return /tailwind\.config|(^|\/)theme\.|(^|\/)tokens\.|(^|\/)vars\.|\.variables\./i.test(rel.replace(/\\/g, '/'));
}

async function loadIgnores(cfgPath) {
  if (!cfgPath) return {};
  try { return JSON.parse(await fs.readFile(cfgPath, 'utf8')); } catch (e) { return {}; }
}

function ignored(ruleId, rel, ignores) {
  const rule = ignores[ruleId];
  if (!rule || !Array.isArray(rule.files)) return null;
  const norm = rel.replace(/\\/g, '/');
  for (const pat0 of rule.files) {
    const pat = String(pat0).replace(/\\/g, '/'); // 两侧统一正斜杠，兼容 Windows 绝对路径
    if (wildcardToRe(pat).test(norm) || norm.includes(pat)) return { reason: rule.reason || 'ignored', evidence: rule.evidence || '' };
  }
  return null;
}

async function collectFiles(paths) {
  const out = [];
  for (const p of paths) {
    let st;
    try { st = await fs.stat(p); } catch { continue; }
    if (st.isDirectory()) {
      const walked = await walkFiles(p, { skipDirs: ['node_modules', '.git', 'dist', 'build', '.vismith'] });
      for (const f of walked) if (isUiSource(f.rel)) out.push({ path: f.path, rel: path.relative(process.cwd(), f.path) });
    } else if (st.isFile() && isUiSource(p)) out.push({ path: p, rel: p });
  }
  const seen = new Set(); const uniq = [];
  for (const f of out) if (!seen.has(f.path)) { seen.add(f.path); uniq.push(f); }
  return uniq;
}

// ---------------- rules ----------------
const HEX_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([\d.,\s%]+\)|hsla?\([\d.,\s%deg]+\)/g;
const SPACING_RE = /(?:margin|padding|gap|margin-top|margin-bottom|margin-left|margin-right|padding-top|padding-bottom|padding-left|padding-right|row-gap|column-gap)[^:;{}]*:\s*[^;{}]*?(\d+(?:\.\d+)?)px/gi;
const FONTSIZE_RE = /font-size\s*:\s*(\d+(?:\.\d+)?)px/gi;
// v0.2 类名层（E1 发现 #2：Tailwind 类名逃逸 CSS 值扫描）
const TW_TEXT_SIZE = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60, '7xl': 72, '8xl': 96, '9xl': 128 };
const TW_TEXT_CLASS_RE = /(?:^|[\s"'`:])text-(2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|xs|sm|base|lg|xl)\b/g;
// 带色号的颜色类：bg-emerald-600 / text-ink-900 / from-blue-500 …（中段 opacity 等非色工具排除）
const TW_COLOR_CLASS_RE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|accent|caret|decoration|outline|shadow)-([a-z][a-z0-9]*)-(\d{2,3})\b/g;
const TW_NON_COLOR_MID = new Set(['opacity', 'indent', 'align', 'leading', 'tracking', 'basis', 'origin', 'offset', 'length', 'weight']);
const TW_DEFAULT_PALETTE = new Set(['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']);
const MARKUP_RE = /\.(html|vue|tsx|jsx|svelte|astro)$/i;
const STYLE_MARKUP_RE = /\.(css|scss|vue|tsx|jsx|html|svelte)$/i;
const WITH_JS_RE = /\.(css|scss|vue|tsx|jsx|ts|js|html|svelte|astro)$/i;

function makeFinding(id, o) {
  return { id, severity: o.severity, confidence: o.confidence || 'heuristic', rule: o.rule, evidence: { file: o.file || '-', line: o.line || 0, detail: o.detail }, fix_hint: o.fixHint || '', verify: o.verify || '' };
}

// v0.2 分级（ADR-14，hallmark Floor/Reflex 思想）：确定性 error 不可豁免；其余可留痕豁免
function tierOf(fd) {
  return fd.severity === 'error' && fd.confidence === 'certain' ? 'floor' : 'reflex';
}

function effectiveLen(s) {
  return String(s || '').replace(/[\s\p{P}\p{S}]/gu, '').length;
}

function ruleCHK01(ctx) {
  const findings = [];
  const th = 4.5;
  const c = ctx.contract && ctx.contract.tokens && ctx.contract.tokens.colors;
  if (c && (c.neutrals || c.surface)) {
    const surface = parseColor(c.surface || '#FFFFFF');
    const pairs = [];
    const neutrals = Array.isArray(c.neutrals) ? c.neutrals : [];
    for (const n of neutrals) pairs.push(['neutrals:' + n + ' on surface:' + (c.surface || '#FFFFFF'), n, c.surface || '#FFFFFF']);
    if (c.text_on_primary && c.primary) pairs.push(['text_on_primary:' + c.text_on_primary + ' on primary:' + c.primary, c.text_on_primary, c.primary]);
    for (const [label, fg, bg] of pairs) {
      const a = parseColor(fg), b = parseColor(bg);
      if (!a || !b) continue;
      const r = contrastRatio(a, b);
      if (r < th) findings.push({ id: 'CHK-01', severity: 'error', confidence: 'certain', rule: 'contrast', evidence: { file: '.vismith/contract.json', line: 0, detail: label + ' = ' + fmtRatio(r) + ' < ' + th }, fix_hint: '调整该 token 档位使对比度 >= 4.5:1（用更深的文本中性色或更浅背景）', verify: 'node scripts/contract.mjs validate 后重跑 checks.mjs，CHK-01 无 error' });
    }
    // v0.3 类名×surface 交叉验证（E2 仲裁坐实：契约未登记的色档曾使检查器全盲）
    const twFile = ctx.files.find((f) => /^tailwind\.config\.(js|ts|cjs|mjs)$/i.test(path.basename(f.rel)));
    if (twFile) {
      const shades = flattenColorShades(twFile.text);
      const textClassRe = /(?:^|[\s"'`:])(?:placeholder:)?text-([a-z][a-z0-9]*?)-(\d{2,3})\b/g;
      for (const f of ctx.files) {
        if (!MARKUP_RE.test(f.rel) || f === twFile) continue;
        let cm; textClassRe.lastIndex = 0;
        const bad = new Map();
        while ((cm = textClassRe.exec(f.text)) !== null) {
          const hex = shades[cm[1] + '-' + cm[2]];
          const col = hex ? parseColor(hex) : null;
          if (!col) continue;
          const r = contrastRatio(col, surface);
          if (r < 4.5) bad.set(cm[1] + '-' + cm[2], Math.min(bad.get(cm[1] + '-' + cm[2]) ?? 99, r));
          if (bad.size >= 8) break;
        }
        if (bad.size) findings.push(makeFinding('CHK-01', { severity: 'warning', confidence: 'heuristic', rule: 'contrast-class', file: f.rel, line: 0, detail: '文本色档类 ' + [...bad].map(([k, r]) => k + ' ' + fmtRatio(r)).join('；') + '（对 surface ' + (c.surface || '#FFFFFF') + ' < 4.5:1；若用于深色底可留痕豁免）', fixHint: '换更深文本档入契约，或该处确为深底/非正文场景时以具体理由豁免', verify: '重跑 checks.mjs，CHK-01 contrast-class 清零或已留痕' }));
      }
    }
    if (!findings.length && pairs.length) findings.push(makeFinding('CHK-01', { severity: 'info', confidence: 'certain', rule: 'contrast', file: '.vismith/contract.json', line: 0, detail: 'contract 颜色配对共 ' + pairs.length + ' 组，全部 >= ' + th + ':1', fixHint: '', verify: '' }));
    return findings;
  }
  // no contract: line-level fg/bg pairing heuristic
  for (const f of ctx.files) {
    if (!STYLE_MARKUP_RE.test(f.rel)) continue;
    const lines = f.text.split('\n');
    let pairs = 0;
    for (let i = 0; i < lines.length && pairs < 50; i++) {
      const fg = /(?:^|[;{]\s*)color\s*:\s*(#[0-9a-fA-F]{3,8}\b|rgba?\([\d.,\s%]+\))/.exec(lines[i]);
      const bg = /background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8}\b|rgba?\([\d.,\s%]+\))/.exec(lines[i]);
      if (fg && bg) {
        pairs++;
        const a = parseColor(fg[1]), b = parseColor(bg[1]);
        if (a && b) {
          const r = contrastRatio(a, b);
          if (r < 4.5) findings.push({ id: 'CHK-01', severity: 'warning', confidence: 'heuristic', rule: 'contrast', evidence: { file: f.rel, line: i + 1, detail: fg[1] + ' on ' + bg[1] + ' = ' + fmtRatio(r) + ' < 4.5:1（无契约，按行级配对推断）' }, fix_hint: '确认该处文本/背景组合；建立 contract 后可精确校验', verify: '提供 --contract 后重跑' });
        }
      }
    }
  }
  if (!ctx.contract) findings.push({ id: 'CHK-01', severity: 'info', confidence: 'certain', rule: 'contrast', evidence: { file: '-', line: 0, detail: '未提供 --contract，仅执行行级降级检查' }, fix_hint: '运行 contract.mjs init/extract 建立契约后精确校验', verify: '' });
  return findings;
}

function ruleCHK02(ctx) {
  const findings = [];
  const scale = ctx.contract && ctx.contract.tokens && ctx.contract.tokens.spacing && Array.isArray(ctx.contract.tokens.spacing.scale) ? new Set(ctx.contract.tokens.spacing.scale.map(Number)) : null;
  for (const f of ctx.files) {
    if (scale && !isTokenDefFile(f.rel) && STYLE_MARKUP_RE.test(f.rel)) {
      let m0; SPACING_RE.lastIndex = 0;
      const off = [];
      while ((m0 = SPACING_RE.exec(f.text)) !== null) {
        if (!scale.has(parseFloat(m0[1]))) off.push({ v: m0[1], line: lineOfIndex(f.text, m0.index) });
        if (off.length >= 5) break;
      }
      if (off.length) findings.push({ id: 'CHK-02', severity: 'warning', confidence: 'certain', rule: 'magic-spacing', evidence: { file: f.rel, line: off[0].line, detail: off.length + ' 处间距不在 contract spacing.scale（如 ' + off.slice(0, 3).map((b) => b.v + 'px').join(', ') + '）' }, fix_hint: '使用 scale 内档位；确需新档位先入契约', verify: '重跑 checks.mjs，CHK-02 magic-spacing 清零' });
    }
    if (isTokenDefFile(f.rel)) continue;
    // v0.2：契约存在时，直接使用 Tailwind 原生调色板类 = off-token（E1: bg-emerald-600 逃逸案例）
    if (ctx.contract && MARKUP_RE.test(f.rel)) {
      let cm; TW_COLOR_CLASS_RE.lastIndex = 0;
      const raw = new Set();
      while ((cm = TW_COLOR_CLASS_RE.exec(f.text)) !== null) {
        if (!TW_NON_COLOR_MID.has(cm[1]) && TW_DEFAULT_PALETTE.has(cm[1])) raw.add(cm[1] + '-' + cm[2]);
        if (raw.size >= 8) break;
      }
      if (raw.size) findings.push(makeFinding('CHK-02', { severity: 'warning', confidence: 'heuristic', rule: 'off-token-color-class', file: f.rel, line: 0, detail: 'Tailwind 原生调色板类 ' + [...raw].slice(0, 6).join(', ') + '（契约已定义颜色体系时应走语义 token）', fixHint: '映射到 contract tokens（如 success/primary/ink 系）或在契约显式登记该色', verify: '重跑 checks.mjs，CHK-02 off-token-color-class 清零或记例外' }));
    }
    if (!WITH_JS_RE.test(f.rel)) continue;
    let m, count = 0, firstLine = 0;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(f.text)) !== null) {
      count++;
      if (!firstLine) firstLine = lineOfIndex(f.text, m.index);
      if (count > 200) break;
    }
    if (count > 0) findings.push({ id: 'CHK-02', severity: 'warning', confidence: 'certain', rule: 'hardcoded-color', evidence: { file: f.rel, line: firstLine, detail: count + ' 处硬编码颜色（首个位于此行）' }, fix_hint: '改用 contract tokens / 主题变量；例外记入 .vismith/exceptions.md', verify: '重跑 checks.mjs，CHK-02 计数下降或已豁免' });
  }
  return findings;
}

function ruleCHK03(ctx) {
  const base = (ctx.contract && ctx.contract.tokens && ctx.contract.tokens.spacing && ctx.contract.tokens.spacing.base) || 4;
  const findings = [];
  for (const f of ctx.files) {
    if (!STYLE_MARKUP_RE.test(f.rel)) continue;
    let m; SPACING_RE.lastIndex = 0;
    const bad = [];
    while ((m = SPACING_RE.exec(f.text)) !== null) {
      const v = parseFloat(m[1]);
      if (v % base !== 0) bad.push({ v, line: lineOfIndex(f.text, m.index) });
      if (bad.length >= 10) break;
    }
    if (bad.length) findings.push({ id: 'CHK-03', severity: 'warning', confidence: 'heuristic', rule: 'spacing-baseline', evidence: { file: f.rel, line: bad[0].line, detail: bad.length + ' 处间距非 ' + base + 'px 倍数（如 ' + bad.slice(0, 3).map((b) => b.v + 'px').join(', ') + '）' }, fix_hint: '对齐 spacing scale；确有意为之记入 exceptions', verify: '重跑 checks.mjs，CHK-03 通过' });
  }
  return findings;
}

function ruleCHK04(ctx) {
  const scale = ctx.contract && ctx.contract.tokens && ctx.contract.tokens.typography && ctx.contract.tokens.typography.scale;
  if (!Array.isArray(scale) || !scale.length) return [{ id: 'CHK-04', severity: 'info', confidence: 'certain', rule: 'type-scale', evidence: { file: '-', line: 0, detail: 'contract 未定义 typography.scale，跳过' }, fix_hint: '在 contract 中声明字号阶', verify: '' }];
  const allowed = new Set(scale.map(Number));
  const findings = [];
  for (const f of ctx.files) {
    if (isTokenDefFile(f.rel)) continue;
    if (!STYLE_MARKUP_RE.test(f.rel)) continue;
    let m; FONTSIZE_RE.lastIndex = 0;
    const bad = [];
    while ((m = FONTSIZE_RE.exec(f.text)) !== null) {
      if (!allowed.has(parseFloat(m[1]))) bad.push({ v: m[1], line: lineOfIndex(f.text, m.index) });
      if (bad.length >= 10) break;
    }
    if (bad.length) findings.push(makeFinding('CHK-04', { severity: 'warning', rule: 'type-scale', file: f.rel, line: bad[0].line, detail: bad.length + ' 处 font-size 不在 contract 阶梯（如 ' + bad.slice(0, 3).map((b) => b.v + 'px').join(', ') + '）', fixHint: '使用 scale 内字号；新档位先进契约再使用', verify: '重跑 checks.mjs，CHK-04 通过' }));
    // v0.2：Tailwind 字号类（text-lg=18px 等）对照阶梯（E1: text-lg 逃逸案例）
    if (MARKUP_RE.test(f.rel)) {
      let cm; TW_TEXT_CLASS_RE.lastIndex = 0;
      const cbad = [];
      while ((cm = TW_TEXT_CLASS_RE.exec(f.text)) !== null) {
        const px = TW_TEXT_SIZE[cm[1]];
        if (px && !allowed.has(px)) cbad.push({ v: 'text-' + cm[1] + '=' + px + 'px', line: lineOfIndex(f.text, cm.index) });
        if (cbad.length >= 10) break;
      }
      if (cbad.length) findings.push(makeFinding('CHK-04', { severity: 'warning', confidence: 'heuristic', rule: 'type-scale', file: f.rel, line: cbad[0].line, detail: 'Tailwind 字号类 ' + cbad.slice(0, 3).map((b) => b.v).join(', ') + ' 不在 contract 阶梯', fixHint: '改用阶梯内档位（如 text-base/text-xl），或先在契约 scale 登记该字号', verify: '重跑 checks.mjs，CHK-04 通过' }));
    }
  }
  return findings;
}

function ruleCHK05(ctx) {
  const interactiveRe = /<button|<a\s|@click|onClick|:hover|\.btn|role="button"/i;
  const focusRe = /:focus-visible|:focus-within|focus-visible:|focus:ring|focus-visible:ring|outline[^;]*focus/i;
  let interactive = null;
  const all = ctx.files.map((f) => f.text).join('\n');
  for (const f of ctx.files) {
    const idx = f.text.search(interactiveRe);
    if (idx >= 0) { interactive = { f, line: lineOfIndex(f.text, idx) }; break; }
  }
  if (!interactive) return [];
  if (focusRe.test(all)) return [];
  return [{ id: 'CHK-05', severity: 'error', confidence: 'heuristic', rule: 'focus-visible', evidence: { file: interactive.f.rel, line: interactive.line, detail: '存在交互元素但全部扫描文件中未见 :focus-visible / focus ring 方案' }, fix_hint: '为可聚焦元素添加可见焦点样式（tailwind: focus-visible:ring-2）', verify: '重跑 checks.mjs，CHK-05 通过' }];
}

function ruleCHK06(ctx) {
  const findings = [];
  for (const f of ctx.files) {
    if (!MARKUP_RE.test(f.rel)) continue;
    const lines = f.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let m = /<img(?![^>]*\balt\s*=)[^>]*>/i.exec(line);
      if (m) findings.push({ id: 'CHK-06', severity: 'error', confidence: 'certain', rule: 'img-alt', evidence: { file: f.rel, line: i + 1, detail: 'img 缺少 alt 属性' }, fix_hint: '补充 alt（装饰性图像用 alt=""）', verify: '重跑 checks.mjs' });
      if (/<div[^>]*\bonclick\b/i.test(line)) findings.push({ id: 'CHK-06', severity: 'error', confidence: 'certain', rule: 'clickable-div', evidence: { file: f.rel, line: i + 1, detail: 'div 绑定 onclick（不可聚焦/无语义）' }, fix_hint: '改用 button 或 role="button" + tabindex + 键盘事件', verify: '重跑 checks.mjs' });
      if (/<label(?![^>]*\bfor\b)[^>]*>\s*<\/label>/i.test(line)) findings.push({ id: 'CHK-06', severity: 'error', confidence: 'certain', rule: 'empty-label', evidence: { file: f.rel, line: i + 1, detail: '空 label 且无 for 关联' }, fix_hint: '补 for 指向输入 id，或包裹控件并写标签文本', verify: '重跑 checks.mjs' });
    }
  }
  return findings;
}

function ruleCHK07(ctx) {
  const findings = [];
  const widthRe = /(?:^|[^-])width\s*:\s*(\d{3,})px/gi;
  for (const f of ctx.files) {
    if (!STYLE_MARKUP_RE.test(f.rel)) continue;
    let m; widthRe.lastIndex = 0;
    while ((m = widthRe.exec(f.text)) !== null) {
      const line = f.text.slice(Math.max(0, m.index - 200), m.index + 200);
      if (!/min-width|max-width/i.test(line)) {
        findings.push({ id: 'CHK-07', severity: 'info', confidence: 'heuristic', rule: 'fixed-width', evidence: { file: f.rel, line: lineOfIndex(f.text, m.index), detail: '固定宽 ' + m[1] + 'px 且邻近无 min/max-width' }, fix_hint: '窄屏溢出风险：考虑 max-width 或响应式宽度', verify: '缩窄视口验证无横向滚动' });
      }
      if (findings.length >= 20) return findings;
    }
  }
  return findings;
}

// v0.2 新规则
function ruleCHK08(ctx) {
  const motionRe = /animate-(?:pulse|bounce|spin|ping)|transition-(?:all|colors|opacity|transform)|animation\s*:|@keyframes/i;
  const reducedRe = /motion-reduce|motion-safe|prefers-reduced-motion/i;
  const all = ctx.files.map((f) => f.text).join('\n');
  if (!motionRe.test(all) || reducedRe.test(all)) return [];
  const f = ctx.files.find((x) => motionRe.test(x.text));
  return [makeFinding('CHK-08', { severity: 'info', rule: 'reduced-motion', file: f.rel, line: 0, detail: '存在动效但未提供 prefers-reduced-motion 适配', fixHint: '动效处加 motion-reduce: 变体或媒体查询降级', verify: '重跑 checks.mjs，CHK-08 通过' })];
}

function ruleCHK09(ctx) {
  const findings = [];
  for (const f of ctx.files) {
    if (!/\.html$/i.test(f.rel)) continue;
    let prev = 0;
    const lines = f.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = /<(h[1-6])[\s>]/i.exec(lines[i]);
      if (!m) continue;
      const lv = parseInt(m[1][1], 10);
      if (prev === 0 && lv !== 1) findings.push(makeFinding('CHK-09', { severity: 'warning', rule: 'heading-order', file: f.rel, line: i + 1, detail: '首个标题为 h' + lv + '（文档级页面应以 h1 锚定）', fixHint: '主标题用 h1；纯片段文档除外', verify: '重跑 checks.mjs，CHK-09 通过' }));
      else if (prev && lv - prev > 1) findings.push(makeFinding('CHK-09', { severity: 'warning', rule: 'heading-order', file: f.rel, line: i + 1, detail: 'h' + prev + ' → h' + lv + ' 层级跳跃', fixHint: '补齐中间层级或修正标签', verify: '重跑 checks.mjs，CHK-09 通过' }));
      prev = lv;
      if (findings.length >= 10) return findings;
    }
  }
  return findings;
}

function ruleCHK10(ctx) {
  for (const f of ctx.files) {
    if (!/\.html$/i.test(f.rel)) continue;
    const idx = f.text.search(/<html/i);
    if (idx >= 0 && !/<html[^>]*\blang\s*=\s*["'][a-z]{2}(?:-[A-Za-z]{2,4})?["']/i.test(f.text)) {
      return [makeFinding('CHK-10', { severity: 'error', confidence: 'certain', rule: 'html-lang', file: f.rel, line: lineOfIndex(f.text, idx), detail: '<html> 缺少 lang 属性（屏幕阅读器发音依赖）', fixHint: '加 lang="zh-CN" / lang="en" 等', verify: '重跑 checks.mjs，CHK-10 通过' })];
    }
  }
  return [];
}

const RULES = [
  { id: 'CHK-01', fn: ruleCHK01 }, { id: 'CHK-02', fn: ruleCHK02 }, { id: 'CHK-03', fn: ruleCHK03 },
  { id: 'CHK-04', fn: ruleCHK04 }, { id: 'CHK-05', fn: ruleCHK05 }, { id: 'CHK-06', fn: ruleCHK06 }, { id: 'CHK-07', fn: ruleCHK07 },
  { id: 'CHK-08', fn: ruleCHK08 }, { id: 'CHK-09', fn: ruleCHK09 }, { id: 'CHK-10', fn: ruleCHK10 }
];

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.paths.length) { console.error('用法：node scripts/checks.mjs <paths...> [--contract F] [--json] [--rules a,b] [--strict]'); process.exit(2); }
  let contract = null;
  if (opts.contract) { try { contract = JSON.parse(await fs.readFile(opts.contract, 'utf8')); } catch (e) { console.error('contract 读取失败: ' + e.message); process.exit(2); } }
  const cfgPath = opts.config || path.join(process.cwd(), '.vismith', 'rules.json');
  const ignores = await loadIgnores(cfgPath);
  const fileInfos = await collectFiles(opts.paths);
  const files = [];
  for (const f of fileInfos) files.push({ rel: f.rel, text: await readText(f.path) });
  const ctx = { files, contract, ignores };
  const findings = [];
  for (const r of RULES) {
    if (opts.rules && !opts.rules.includes(r.id)) continue;
    let out = [];
    try { out = r.fn(ctx) || []; } catch (e) { out = [{ id: r.id, severity: 'info', confidence: 'certain', rule: r.id + '-error', evidence: { file: '-', line: 0, detail: '规则执行失败：' + e.message }, fix_hint: '', verify: '' }]; }
    for (const fd of out) {
      fd.tier = tierOf(fd);
      const ign = ignored(fd.id, String(fd.evidence.file), ignores);
      if (ign) {
        if (fd.tier === 'floor') {
          fd.evidence.detail += '（豁免被拒：该发现为 floor 级（确定性 error），不可豁免——修复它）';
        } else if (effectiveLen(ign.reason) < 12) {
          fd.evidence.detail += '（豁免无效：理由有效字符不足 12（当前 ' + effectiveLen(ign.reason) + '），须写明具体依据）';
        } else {
          fd.severity = 'info';
          fd.evidence.detail += '（已豁免：' + ign.reason + '｜证据：' + (ign.evidence || '未提供') + '）';
        }
      }
      findings.push(fd);
    }
  }
  const order = { error: 0, warning: 1, info: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity]);
  const summary = { error: 0, warning: 0, info: 0 };
  for (const f of findings) summary[f.severity]++;
  const payload = {
    tool: 'vismith-checks', version: 1, generated_at: new Date().toISOString(),
    target: opts.paths, contract_present: !!contract, files_scanned: files.length,
    summary, findings
  };
  if (opts.json) console.log(JSON.stringify(payload, null, 2));
  else {
    console.log('Vismith 静态检查：' + files.length + ' 个文件' + (contract ? '（含契约）' : '（无契约，部分规则降级）'));
    console.log('error ' + summary.error + ' | warning ' + summary.warning + ' | info ' + summary.info);
    for (const f of findings) console.log('[' + f.severity + '] ' + f.id + ' ' + f.evidence.file + ':' + f.evidence.line + ' — ' + f.evidence.detail + (f.fix_hint ? ' → ' + f.fix_hint : ''));
  }
  if (opts.strict && summary.error > 0) process.exit(1);
  return 0;
}

runMain(main, 'vismith-checks');
