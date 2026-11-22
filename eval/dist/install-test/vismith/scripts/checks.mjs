// Vismith - deterministic UI checks (M4, HLD 3.4). Lexical/regex level only.
// Usage: node scripts/checks.mjs <paths...> [--contract F] [--json] [--rules a,b] [--config F] [--strict]
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { walkFiles, readText, isUiSource, lineOfIndex } from './lib/fsutil.mjs';
import { parseColor, contrastRatio, fmtRatio } from './lib/colors.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.dirname(SCRIPTS_DIR);

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
  for (const pat of rule.files) if (wildcardToRe(String(pat)).test(norm) || norm.includes(String(pat))) return rule.reason || 'ignored';
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
    if (!findings.length && pairs.length) findings.push({ id: 'CHK-01', severity: 'info', confidence: 'certain', rule: 'contrast', evidence: { file: '.vismith/contract.json', line: 0, detail: 'contract 颜色配对共 ' + pairs.length + ' 组，全部 >= ' + th + ':1' }, fix_hint: '', verify: '' });
    return findings;
  }
  // no contract: line-level fg/bg pairing heuristic
  for (const f of ctx.files) {
    if (!/\.(css|scss|vue|tsx|jsx|html)$/i.test(f.rel)) continue;
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
    if (scale && !isTokenDefFile(f.rel) && /\.(css|scss|vue|tsx|jsx|html|svelte)$/i.test(f.rel)) {
      let m0; SPACING_RE.lastIndex = 0;
      const off = [];
      while ((m0 = SPACING_RE.exec(f.text)) !== null) {
        if (!scale.has(parseFloat(m0[1]))) off.push({ v: m0[1], line: lineOfIndex(f.text, m0.index) });
        if (off.length >= 5) break;
      }
      if (off.length) findings.push({ id: 'CHK-02', severity: 'warning', confidence: 'certain', rule: 'magic-spacing', evidence: { file: f.rel, line: off[0].line, detail: off.length + ' 处间距不在 contract spacing.scale（如 ' + off.slice(0, 3).map((b) => b.v + 'px').join(', ') + '）' }, fix_hint: '使用 scale 内档位；确需新档位先入契约', verify: '重跑 checks.mjs，CHK-02 magic-spacing 清零' });
    }
    if (isTokenDefFile(f.rel)) continue;
    if (!/\.(css|scss|vue|tsx|jsx|ts|js|html|svelte|astro)$/i.test(f.rel)) continue;
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
    if (!/\.(css|scss|vue|tsx|jsx|html|svelte)$/i.test(f.rel)) continue;
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
    if (!/\.(css|scss|vue|tsx|jsx|html)$/i.test(f.rel)) continue;
    let m; FONTSIZE_RE.lastIndex = 0;
    const bad = [];
    while ((m = FONTSIZE_RE.exec(f.text)) !== null) {
      if (!allowed.has(parseFloat(m[1]))) bad.push({ v: m[1], line: lineOfIndex(f.text, m.index) });
      if (bad.length >= 10) break;
    }
    if (bad.length) findings.push({ id: 'CHK-04', severity: 'warning', confidence: 'heuristic', rule: 'type-scale', evidence: { file: f.rel, line: bad[0].line, detail: bad.length + ' 处 font-size 不在 contract 阶梯（如 ' + bad.slice(0, 3).map((b) => b.v + 'px').join(', ') + '）' }, fix_hint: '使用 scale 内字号；新档位先进契约再使用', verify: '重跑 checks.mjs，CHK-04 通过' });
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
    if (!/\.(html|vue|tsx|jsx|svelte|astro)$/i.test(f.rel)) continue;
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
    if (!/\.(css|scss|vue|tsx|jsx|html)$/i.test(f.rel)) continue;
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

const RULES = [
  { id: 'CHK-01', fn: ruleCHK01 }, { id: 'CHK-02', fn: ruleCHK02 }, { id: 'CHK-03', fn: ruleCHK03 },
  { id: 'CHK-04', fn: ruleCHK04 }, { id: 'CHK-05', fn: ruleCHK05 }, { id: 'CHK-06', fn: ruleCHK06 }, { id: 'CHK-07', fn: ruleCHK07 }
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
      const ign = ignored(fd.id, String(fd.evidence.file), ignores);
      if (ign) { fd.severity = 'info'; fd.evidence.detail += '（已豁免：' + ign + '）'; }
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

main().then((c) => process.exit(c)).catch((e) => { console.error('vismith-checks: ' + e.message); process.exit(2); });
