// validate.mjs — S5 静态契约校验器（vismith 引擎被实验约束禁用后的降级替代）
// 用法: node validate.mjs   （在 eval/results/e4/C/S5/ 下运行）
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const proj = join(root, 'project');
const errors = [];
const passes = [];
const check = (ok, label) => (ok ? passes.push('PASS ' + label) : errors.push('FAIL ' + label));

// ---------- 工具：WCAG 对比度 ----------
const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => hexToRgb(h).reduce((a, c, i) => a + [0.2126, 0.7152, 0.0722][i] * lin(c), 0);
const ratio = (f, b) => {
  const [a, c] = [lum(f), lum(b)].sort((x, y) => y - x);
  return (a + 0.05) / (c + 0.05);
};

// ---------- 0. 产物存在性 ----------
const contract = JSON.parse(readFileSync(join(root, 'contract.json'), 'utf8'));
check(true, 'contract.json 存在且可解析');
check(!existsSync(join(root, '.vismith')) && !existsSync(join(proj, '.vismith')), '未产出 .vismith/（隔离约束）');

// ---------- 1. CHK-01 对比度（契约 semanticUsage 逐条验算） ----------
const cfg = readFileSync(join(proj, 'tailwind.config.js'), 'utf8');
const tokenHex = {};
for (const m of cfg.matchAll(/\b([A-Za-z][\w-]*)\s*:\s*\{([^{}]+)\}/g)) {
  for (const p of m[2].matchAll(/([A-Za-z0-9]+)\s*:\s*'(#[0-9A-Fa-f]{6})'/g)) {
    tokenHex[`${m[1]}-${p[1]}`] = p[2];
  }
}
for (const u of contract.semanticUsage) {
  if (!u.min) continue;
  const key = u.class.replace(/^(text|bg)-/, '');
  let fg = tokenHex[key];
  if (!fg) {
    const parts = u.class.split('/');
    if (parts[1] === 'text-white' && tokenHex[parts[0].replace(/^bg-/, '')]) fg = '#FFFFFF';
  }
  if (!fg || !u.on) { errors.push(`FAIL CHK-01 无法解析 ${u.role} (${u.class})`); continue; }
  const r = ratio(fg, u.on);
  check(r >= u.min, `CHK-01 ${u.role} ${u.class} on ${u.on} = ${r.toFixed(2)}:1 (min ${u.min})`);
}

// ---------- 2. CHK-02 裸十六进制色 & 令牌存在性（src/pages 全部 .jsx） ----------
const pagesDir = join(proj, 'src', 'pages');
const jsx = readdirSync(pagesDir).filter((f) => f.endsWith('.jsx'));
check(jsx.length === 2, `两页面存在: ${jsx.join(', ')}`);
const usedTokens = new Set();
for (const f of jsx) {
  const src = readFileSync(join(pagesDir, f), 'utf8');
  check(!/#[0-9A-Fa-f]{3,8}\b/.test(src), `CHK-02 ${f} 无裸十六进制色`);
  for (const m of src.matchAll(/\b(?:text|bg|border|divide)-([a-z0-9]+-[a-z0-9]+)\b/g)) usedTokens.add(m[1]);
}
for (const t of usedTokens) check(!!tokenHex[t], `CHK-02 令牌 ${t} 已定义于 tailwind.config.js`);

// ---------- 3. CHK-06 间距 4px 基线 ----------
for (const m of cfg.matchAll(/(\d+)\s*:\s*'(\d+)px'/g)) {
  check(parseInt(m[2]) % 4 === 0, `CHK-06 config spacing ${m[1]}=${m[2]}px 在 4px 基线上`);
}
for (const f of jsx) {
  const src = readFileSync(join(pagesDir, f), 'utf8');
  check(!/(margin|padding)[A-Za-z]*\s*:\s*'?\d+px/.test(src), `CHK-06 ${f} 无内联 margin/padding 像素值（含 13px/17px 归位）`);
  check(!/'1[37]px'/.test(src), `CHK-06 ${f} 无 13px/17px 残留`);
}

// ---------- 4. CHK-IMG 图片 alt ----------
for (const f of jsx) {
  const src = readFileSync(join(pagesDir, f), 'utf8');
  const imgs = [...src.matchAll(/<img\b[^>]*>/g)];
  for (const im of imgs) check(/alt="[^"]+"/.test(im[0]), `CHK-IMG ${f} <img> 携带非空 alt`);
}

// ---------- 5. decisions.log >= 2 条决策 ----------
const log = readFileSync(join(root, 'decisions.log'), 'utf8');
check((log.match(/^D\d+/gm) || []).length >= 2, `decisions.log 决策条数 >= 2（实际 ${(log.match(/^D\d+/gm) || []).length}）`);

// ---------- 汇总 ----------
for (const p of passes) console.log(p);
for (const e of errors) console.log(e);
console.log(`\n${errors.length === 0 ? 'VALIDATE PASS (' + passes.length + ' checks)' : 'VALIDATE FAIL: ' + errors.length + ' errors'}`);
process.exit(errors.length ? 1 : 0);
