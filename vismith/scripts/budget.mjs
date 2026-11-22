// Vismith - token budget validation (ADR-13 / H6). Dev tool: exit 1 on violation.
import path from 'node:path';
import fs from 'node:fs/promises';
import { SKILL_ROOT, runMain } from './lib/cli.mjs';

async function main() {
  const raw = JSON.parse(await fs.readFile(path.join(SKILL_ROOT, 'assets', 'budget.json'), 'utf8'));
  const budget = {};
  for (const k of Object.keys(raw)) if (k !== '//') budget[k] = raw[k];
  const violations = [];
  const checked = [];
  for (const [pattern, limit] of Object.entries(budget)) {
    let files = [];
    if (pattern.includes('*')) {
      let dir = SKILL_ROOT, ext = pattern;
      const star = path.basename(pattern);
      if (star.includes('*')) {
        dir = path.join(SKILL_ROOT, path.dirname(pattern));
        ext = '.' + star.split('.').pop();
      }
      let entries = [];
      try { entries = await fs.readdir(dir); } catch { entries = []; }
      // SOURCES.md 为来源登记表（非 LLM 面向、不进上下文），不计入条目预算
      files = entries.filter((f) => f.endsWith(ext) && f !== 'SOURCES.md').map((f) => path.join(dir, f));
    } else {
      files = [path.join(SKILL_ROOT, pattern)];
    }
    for (const f of files) {
      let st;
      try { st = await fs.stat(f); } catch { continue; }
      const size = st.size;
      checked.push(path.relative(SKILL_ROOT, f) + ' ' + size + '/' + limit + 'B');
      if (size > limit) violations.push(path.relative(SKILL_ROOT, f) + ': ' + size + 'B > ' + limit + 'B');
    }
  }
  console.log('vismith budget: ' + checked.length + ' files checked');
  if (violations.length) {
    console.error('超限 ' + violations.length + ' 个：');
    for (const v of violations) console.error('  - ' + v);
    process.exit(1);
  }
  console.log('全部在预算内');
  return 0;
}

runMain(main, 'vismith-budget');
