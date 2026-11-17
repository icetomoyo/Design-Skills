// Vismith - cross-platform file utilities (ADR-8). Windows/Unix safe, zero deps.
import path from 'node:path';

export const UI_EXTS = new Set(['.css', '.scss', '.sass', '.less', '.html', '.htm', '.vue', '.tsx', '.jsx', '.ts', '.js', '.mjs', '.cjs', '.svelte', '.astro']);

export async function walkFiles(root, opts) {
  opts = opts || {};
  const exts = opts.exts ? new Set(opts.exts) : null;
  const skipDirs = new Set(opts.skipDirs || ['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage']);
  const maxFiles = opts.maxFiles || 5000;
  const out = [];
  async function dir(d) {
    if (out.length >= maxFiles) return;
    let entries;
    try { entries = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (out.length >= maxFiles) return;
      const full = path.join(d, e.name);
      if (e.isDirectory()) { if (!skipDirs.has(e.name)) await dir(full); continue; }
      if (!e.isFile()) continue;
      if (opts.includeHidden !== true && e.name.startsWith('.')) continue;
      if (exts && !exts.has(path.extname(e.name).toLowerCase())) continue;
      out.push({ path: full, rel: path.relative(root, full) });
    }
  }
  await dir(root);
  return out;
}

import fs from 'node:fs/promises';
export async function readText(p) { return fs.readFile(p, 'utf8'); }

export function isUiSource(rel) { return UI_EXTS.has(path.extname(rel).toLowerCase()); }

export function lineOfIndex(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === '\n') line++;
  return line;
}

