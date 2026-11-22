#!/usr/bin/env node
// S5 refine 自检（免 vismith 实现，对应 CHK-01 对比度 / CHK-02 组件内裸色值 / CHK-04 img alt / CHK-06 4px 间距基线）
// 用法: node checks.mjs [projectDir]  （默认 ./project）
// 说明: 对比度按两个实际表面(#FFFFFF 卡片 / #F8FAFC 页面底)取较差值判定，阈值 4.5:1（大字 3:1）。
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), 'project');
const PAGES = ['src/pages/Dashboard.jsx', 'src/pages/Settings.jsx'];
const SURFACES = ['#FFFFFF', '#F8FAFC']; // bg-white 卡片 / bg-ink-50 页面

const { default: cfg } = await import('file://' + join(root, 'tailwind.config.js').replaceAll('\\', '/'));
const colors = {};
for (const [ns, v] of Object.entries(cfg.theme.extend.colors ?? {})) {
  if (typeof v === 'string') colors[ns] = v;
  else for (const [k, hex] of Object.entries(v)) colors[`${ns}-${k}`] = hex;
}

function srgb(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function lum(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
  return 0.2126 * srgb(parseInt(n.slice(0, 2), 16)) + 0.7152 * srgb(parseInt(n.slice(2, 4), 16)) + 0.0722 * srgb(parseInt(n.slice(4, 6), 16));
}
function ratio(fg, bg) { const a = lum(fg), b = lum(bg); const [hi, lo] = a > b ? [a, b] : [b, a]; return (hi + 0.05) / (lo + 0.05); }

const errors = [];
const push = (code, file, line, msg) => errors.push(`${code} ${file}:${line} ${msg}`);

for (const rel of PAGES) {
  const file = join(root, rel);
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    const no = i + 1;
    const styleRaw = ln.match(/style=\{\{([^}]*)\}\}/)?.[1] ?? '';
    // CHK-06 只管间距：剥掉 boxShadow 值（阴影偏移不是间距，属 CHK-02 裸色值范畴）
    const style = styleRaw.replace(/box[Ss]hadow:\s*(['"]).*?\1/g, '');

    // CHK-02: 组件内裸色值（含阴影色，用未剥除的 styleRaw）
    const hexMatch = styleRaw.match(/#([0-9a-fA-F]{3,8})\b/);
    if (hexMatch) push('CHK-02', rel, no, `裸 hex 色值 #${hexMatch[1]}（应使用语义 token）`);
    if (/rgba?\(/.test(styleRaw)) push('CHK-02', rel, no, `裸 rgba 色值（应使用语义 token）`);

    // CHK-06: style 内联 px 间距不在 4px 基线
    for (const m of style.matchAll(/([\d.]+)px/g)) {
      const v = parseFloat(m[1]);
      if (v % 4 !== 0) push('CHK-06', rel, no, `内联间距 ${v}px 不在 4px 基线`);
    }

    // CHK-04: img 缺 alt
    if (/<img[\s>]/.test(ln) && !/\balt=/.test(ln)) push('CHK-04', rel, no, 'img 缺少 alt 属性');

    // CHK-01: 前景/背景对比度
    const large = /(text-(3xl|2xl|xl))\b/.test(ln) && /(font-semibold|font-bold)/.test(ln);
    const need = large ? 3.0 : 4.5;
    let fg = null;
    if (hexMatch) fg = '#' + hexMatch[1];
    const tok = ln.match(/\btext-([a-z]+(?:-\d+)?)\b/);
    if (!fg && tok && colors[tok[1]] && tok[1] !== 'white') fg = colors[tok[1]];
    if (fg && /^#([0-9a-fA-F]{3,8})$/.test(fg)) {
      const bgs = /bg-white/.test(ln) ? ['#FFFFFF']
        : /bg-accent-\d+/.test(ln) ? [colors[(ln.match(/bg-(accent-\d+)/)?.[1])]]
        : SURFACES;
      const worst = Math.min(...bgs.map((b) => ratio(fg, b)));
      if (worst < need) push('CHK-01', rel, no, `对比度 ${worst.toFixed(2)}:1 < ${need}:1 (${fg} on ${bgs.join('/')})`);
    }
  });
}

// CHK-06: 间距 token 本身须为 4 的倍数
for (const [k, v] of Object.entries(cfg.theme.extend.spacing ?? {})) {
  if (parseFloat(v) % 4 !== 0) push('CHK-06', 'tailwind.config.js', `spacing.${k}`, `${v} 不在 4px 基线`);
}

if (errors.length) {
  console.log(`FAIL: ${errors.length} 个错误`);
  for (const e of errors) console.log(' - ' + e);
  process.exit(1);
}
console.log('PASS: 0 错误（CHK-01 对比度 / CHK-02 裸色值 / CHK-04 alt / CHK-06 间距基线 全部通过）');
