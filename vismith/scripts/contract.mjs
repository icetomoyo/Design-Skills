// Vismith - Design Contract tool (M2, HLD 3.2). Zero-dep.
// Commands: init --dir D | validate F | extract --dir D [--out F] | show F [--section S]
import path from 'node:path';
import fs from 'node:fs/promises';
import { walkFiles, readText } from './lib/fsutil.mjs';
import { SKILL_ROOT, runMain } from './lib/cli.mjs';
import { extractTailwindTheme } from './lib/twtheme.mjs';

const SCHEMA_PATH = path.join(SKILL_ROOT, 'assets', 'contract.schema.json');
const TEMPLATE_PATH = path.join(SKILL_ROOT, 'assets', 'templates', 'contract.template.json');
const CANON_PRECEDENCE = ['invariants', 'a11y_hard', 'project_constraints', 'tokens', 'style_preferences'];

function usage() {
  return [
    'Usage:',
    '  node scripts/contract.mjs init --dir <project> [--force]',
    '  node scripts/contract.mjs validate <contract.json>',
    '  node scripts/contract.mjs extract --dir <project> [--out draft.json]',
    '  node scripts/contract.mjs show <contract.json> [--section tokens|meta|a11y|invariants]'
  ].join('\n');
}

// ---- mini JSON Schema validator (type/enum/required/properties/items/minItems) ----
function miniValidate(schema, data, at, errors) {
  at = at || '$';
  if (schema.type) {
    const t = Array.isArray(data) ? 'array' : typeof data;
    const okMap = { object: 'object', array: 'array', string: 'string', number: 'number', boolean: 'boolean' };
    const expect = schema.type;
    const actual = okMap[t] || t;
    const pass = expect === actual || (expect === 'number' && actual === 'number');
    if (!pass) { errors.push(at + ': expected ' + expect + ', got ' + actual); return; }
  }
  if (schema.enum && !schema.enum.includes(data)) errors.push(at + ': ' + JSON.stringify(data) + ' not in [' + schema.enum.join(', ') + ']');
  if (schema.type === 'object' || schema.properties) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      for (const r of schema.required || []) if (!(r in data)) errors.push(at + ': missing required "' + r + '"');
      for (const k of Object.keys(schema.properties || {})) if (k in data) miniValidate(schema.properties[k], data[k], at + '.' + k, errors);
      if (schema.additionalProperties === false) {
        const allowed = new Set(Object.keys(schema.properties || {}));
        for (const k of Object.keys(data)) if (!allowed.has(k)) errors.push(at + ': unknown key "' + k + '"');
      }
    }
  }
  if (schema.type === 'array' && Array.isArray(data)) {
    if (schema.minItems && data.length < schema.minItems) errors.push(at + ': needs >= ' + schema.minItems + ' items');
    if (schema.items) data.forEach((it, i) => miniValidate(schema.items, it, at + '[' + i + ']', errors));
  }
}

async function cmdValidate(file) {
  const [schemaRaw, dataRaw] = await Promise.all([fs.readFile(SCHEMA_PATH, 'utf8'), fs.readFile(file, 'utf8')]);
  let data;
  try { data = JSON.parse(dataRaw); } catch (e) { console.error('JSON 解析失败: ' + e.message); process.exit(1); }
  const schema = JSON.parse(schemaRaw);
  const errors = [];
  miniValidate(schema, data, 'contract', errors);
  const prec = data && data.precedence;
  if (JSON.stringify(prec) !== JSON.stringify(CANON_PRECEDENCE)) {
    errors.push('contract.precedence 必须恰好等于 [' + CANON_PRECEDENCE.join(', ') + ']');
  }
  if (errors.length) {
    console.error('contract 无效（' + errors.length + ' 处）：');
    for (const e of errors) console.error('  - ' + e);
    process.exit(1);
  }
  console.log('contract 有效：' + file);
  return 0;
}

async function cmdInit(dir, force) {
  const vdir = path.join(dir, '.vismith');
  const target = path.join(vdir, 'contract.json');
  try { await fs.access(target); if (!force) { console.error('已存在 ' + target + '（用 --force 覆盖）'); process.exit(1); } } catch {}
  await fs.mkdir(vdir, { recursive: true });
  const tpl = await fs.readFile(TEMPLATE_PATH, 'utf8');
  await fs.writeFile(target, tpl, 'utf8');
  const stamp = new Date().toISOString().slice(0, 10);
  await fs.writeFile(path.join(vdir, 'decisions.log.md'), '# 设计决策记录\n\n| 日期 | 决策 | 理由 | 替代方案 |\n|---|---|---|---|\n| ' + stamp + ' | 初始化 contract | Vismith init | 从零建立 |\n', 'utf8');
  await fs.writeFile(path.join(vdir, 'exceptions.md'), '# 例外与豁免\n\n<!-- 记录偏离 contract 的已批准例外：日期 / 范围 / 原因 / 复审期 -->\n', 'utf8');
  await fs.writeFile(path.join(vdir, 'rules.json'), '{}\n', 'utf8');
  console.log('已创建 ' + target + '（模板草案）。请按项目实际修订 meta/style/tokens，然后运行 validate。');
  return 0;
}

// ---- heuristic extractors（extractTailwindTheme 已抽至 lib/twtheme.mjs 共享）----
function extractCssVars(uiFiles) {
  const vars = { colors: {}, fonts: {}, radius: {}, spacing: {} };
  const varRe = /--([A-Za-z0-9-]+)\s*:\s*([^;]+);/g;
  for (const f of uiFiles) {
    if (!/\.(css|scss)$/i.test(f.rel)) continue;
    let m;
    while ((m = varRe.exec(f.text)) !== null) {
      const name = m[1], val = m[2].trim();
      if (/color|primary|success|danger|warning|gray|slate|neutral|red|green|blue|yellow/i.test(name) && /^#|rgba?\(|hsla?\(/i.test(val)) vars.colors[name] = val;
      else if (/font/i.test(name)) vars.fonts[name] = val;
      else if (/radius/i.test(name)) vars.radius[name] = val;
      else if (/space|gap|padding|margin/i.test(name) && /^\d/.test(val)) vars.spacing[name] = val;
    }
  }
  return vars;
}

async function cmdExtract(dir, outFile) {
  const files = await walkFiles(dir, { exts: ['.js', '.ts', '.cjs', '.mjs', '.css', '.scss'], maxFiles: 800 });
  const tw = files.filter((f) => /^tailwind\.config\.(js|ts|cjs|mjs)$/i.test(path.basename(f.rel)));
  const read = [];
  for (const f of files.slice(0, 400)) read.push({ rel: f.rel, text: await readText(f.path) });
  const draft = {
    version: 1,
    meta: { product_type: '', audience: '', scenarios: [] },
    brand: { personality: [], references: [] },
    style: { direction: '', do_not: [] },
    tokens: { colors: {}, typography: { body: '', display: '', scale: [] }, spacing: { base: 4, scale: [] }, radius: {}, shadow: {} },
    components: {},
    layout: { breakpoints: {}, density: '' },
    a11y: { min_contrast_normal_text: 4.5, focus_visible: 'required', keyboard: 'required' },
    invariants: [],
    constraints: { project: [], pages: {} },
    precedence: ['invariants', 'a11y_hard', 'project_constraints', 'tokens', 'style_preferences'],
    provenance: { created: new Date().toISOString().slice(0, 10), updated: new Date().toISOString().slice(0, 10), decisions: '.vismith/decisions.log.md', note: 'draft by vismith extract; review before saving' }
  };
  const notes = [];
  if (tw.length) {
    const text = await readText(tw[0].path);
    const theme = extractTailwindTheme(text);
    if (Object.keys(theme.colors).length) { draft.tokens.colors = theme.colors; notes.push('colors 来自 ' + tw[0].rel); }
    const bodyKey = Object.keys(theme.fontFamily).find((k2) => /^(sans|body|base|default)$/i.test(k2)) || Object.keys(theme.fontFamily)[0];
    if (Object.keys(theme.fontFamily).length) { const first = (k) => String(theme.fontFamily[k]).replace(/[[\]']/g, '').split(',')[0].trim(); draft.tokens.typography.body = first(bodyKey); notes.push('typography 来自 ' + tw[0].rel); }
    const toPx = (v) => { const m2 = /^([\d.]+)(rem|px|em)?$/.exec(String(v).trim()); if (!m2) return NaN; const n2 = parseFloat(m2[1]); return (m2[2] === 'rem' || m2[2] === 'em') ? Math.round(n2 * 16 * 10) / 10 : n2; };
    if (Object.keys(theme.fontSize).length) { const sizes = Object.values(theme.fontSize).map(toPx).filter((n2) => !isNaN(n2) && n2 > 0).sort((a, b) => a - b); if (sizes.length) draft.tokens.typography.scale = [...new Set(sizes)]; }
    if (Object.keys(theme.borderRadius).length) { draft.tokens.radius = Object.fromEntries(Object.entries(theme.borderRadius).map(([k, v]) => [k, toPx(v)]).filter((pair) => !isNaN(pair[1]))); }
    if (Object.keys(theme.spacing).length) {
      // v0.2 默认刻度判定（E1 发现 #1）：数字键 n 的 Tailwind 默认值 = n*0.25rem = 4n px
      const vals = [], defaulted = [], drifted = [];
      for (const [k, v] of Object.entries(theme.spacing)) {
        const px = toPx(v);
        if (isNaN(px) || px <= 0 || px > 128) continue;
        const kn = parseFloat(k);
        if (/^\d+(\.\d+)?$/.test(String(k).trim())) {
          if (Math.abs(px - 4 * kn) < 0.01) { defaulted.push(k + '=' + px + 'px'); continue; }
          drifted.push(k + '=' + v + '→' + px + 'px（默认键 ' + k + ' 应为 ' + 4 * kn + 'px）');
        }
        vals.push(px);
      }
      if (defaulted.length) notes.push('spacing：' + defaulted.length + ' 项与 Tailwind 默认刻度等值（键 n = n×0.25rem），视为未自定义剔除：' + defaulted.slice(0, 5).join(', '));
      if (drifted.length) notes.push('spacing 语义漂移警告：' + drifted.slice(0, 5).join('；') + ' —— 数字键重定义默认刻度会改变 p-n 含义，建议语义键或标准 rem 公式（见 references/contract.md）');
      if (vals.length) draft.tokens.spacing.scale = [...new Set(vals)].sort((a, b) => a - b);
    }
  } else {
    notes.push('未找到 tailwind.config.*');
  }
  const cssVars = extractCssVars(read);
  if (Object.keys(cssVars.colors).length) { draft.tokens.colors = Object.assign({}, cssVars.colors, draft.tokens.colors); notes.push('CSS 变量颜色 ' + Object.keys(cssVars.colors).length + ' 个'); }
  if (notes.length) draft.notes = notes; // 随草稿持久化，转正前人工审阅
  const out = JSON.stringify(draft, null, 2) + '\n';
  if (outFile) { await fs.writeFile(outFile, out, 'utf8'); console.log('草稿已写入 ' + outFile + '；' + notes.join('；')); }
  else { console.log(out); if (notes.length) console.error('// notes: ' + notes.join('； ')); }
  return 0;
}

async function cmdShow(file, section) {
  const data = JSON.parse(await fs.readFile(file, 'utf8'));
  if (section && data[section] !== undefined) console.log('[' + section + ']\n' + JSON.stringify(data[section], null, 2));
  else console.log(JSON.stringify(data, null, 2));
  return 0;
}

async function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  const get = (flag) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : undefined; };
  if (cmd === 'validate' && argv[1]) return cmdValidate(argv[1]);
  if (cmd === 'init') return cmdInit(get('--dir') || '.', argv.includes('--force'));
  if (cmd === 'extract') return cmdExtract(get('--dir') || '.', get('--out'));
  if (cmd === 'show' && argv[1]) return cmdShow(argv[1], get('--section'));
  console.log(usage());
  return cmd ? 2 : 0;
}

runMain(main, 'vismith-contract');
