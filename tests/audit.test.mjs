// 审计回归：双轴评审发现修复的验证。Run: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKILL = path.join(REPO, 'vismith');

function run(args, cwd) {
  return new Promise((resolve) => {
    execFile(process.execPath, args, { cwd: cwd || SKILL }, (err, stdout, stderr) => {
      resolve({ code: err ? err.code : 0, stdout: String(stdout), stderr: String(stderr) });
    });
  });
}

const PREC = ['invariants', 'a11y_hard', 'project_constraints', 'tokens', 'style_preferences'];
const MIN_CONTRACT = { version: 1, meta: { product_type: 'admin-console' }, style: { direction: 'test' }, tokens: { colors: { neutrals: ['#94A3B8'], surface: '#FFFFFF' }, typography: { scale: [12, 14, 16] }, spacing: { base: 4, scale: [4, 8, 12, 16] } }, a11y: { min_contrast_normal_text: 4.5 }, precedence: PREC };

async function tmp() { return fs.mkdtemp(path.join(os.tmpdir(), 'vismith-audit-')); }

test('search: --min-margin 强制弃权（歧义保护）', async () => {
  const r = await run(['scripts/search.mjs', '对比度', '--min-margin', '999', '--json']);
  const out = JSON.parse(r.stdout);
  assert.equal(out.abstain, true);
  assert.equal(out.results.length, 0);
});

test('search: 默认 margin 不误伤正常命中', async () => {
  const r = await run(['scripts/search.mjs', '对比度', '--json']);
  const out = JSON.parse(r.stdout);
  assert.equal(out.abstain, false);
  assert.equal(out.results[0].id, 'contrast-principle');
});

test('FR-2 验收：合法契约样例 >= 3 全过', async () => {
  const dir = await tmp();
  const tpl = JSON.parse(await fs.readFile(path.join(SKILL, 'assets', 'templates', 'contract.template.json'), 'utf8'));
  const s2 = { ...MIN_CONTRACT, meta: { product_type: 'marketing-site' } };
  const s3 = structuredClone(tpl); s3.tokens.radius = { sm: 2, md: 6, lg: 10 };
  const files = [path.join(dir, 'v1.json'), path.join(dir, 'v2.json'), path.join(dir, 'v3.json')];
  await Promise.all([fs.writeFile(files[0], JSON.stringify(MIN_CONTRACT)), fs.writeFile(files[1], JSON.stringify(s2)), fs.writeFile(files[2], JSON.stringify(s3))]);
  for (const f of files) {
    const r = await run(['scripts/contract.mjs', 'validate', f]);
    assert.equal(r.code, 0, f + ': ' + r.stderr);
  }
});

test('FR-2 验收：非法契约样例 >= 3 全拒', async () => {
  const dir = await tmp();
  const b1 = { ...MIN_CONTRACT, meta: { product_type: 'game' } };
  const b2 = { version: 1, style: { direction: 'x' }, a11y: { min_contrast_normal_text: 4.5 }, precedence: PREC };
  const b3 = structuredClone(MIN_CONTRACT); b3.invariants = [{ id: 'INV-1', type: 'functional' }];
  const files = [path.join(dir, 'b1.json'), path.join(dir, 'b2.json'), path.join(dir, 'b3.json')];
  await Promise.all([fs.writeFile(files[0], JSON.stringify(b1)), fs.writeFile(files[1], JSON.stringify(b2)), fs.writeFile(files[2], JSON.stringify(b3))]);
  for (const f of files) {
    const r = await run(['scripts/contract.mjs', 'validate', f]);
    assert.equal(r.code, 1, f + ' 应被拒绝');
    assert.ok(r.stderr.length > 0);
  }
});

test('CHK-01 契约模式：低对比 neutrals 报 error', async () => {
  const dir = await tmp();
  const c = path.join(dir, 'c.json');
  await fs.writeFile(c, JSON.stringify(MIN_CONTRACT));
  const css = path.join(dir, 'page.css');
  await fs.writeFile(css, '.x { margin: 16px; }\n');
  const r = await run(['scripts/checks.mjs', css, '--contract', c, '--json']);
  const out = JSON.parse(r.stdout);
  const hits = out.findings.filter((f) => f.id === 'CHK-01' && f.severity === 'error');
  assert.ok(hits.length >= 1, JSON.stringify(out.findings));
  assert.ok(hits[0].evidence.detail.includes('2.'));
});

test('CHK-02 magic-spacing / CHK-04 type-scale / CHK-06 empty-label', async () => {
  const dir = await tmp();
  const c = path.join(dir, 'c.json');
  await fs.writeFile(c, JSON.stringify(MIN_CONTRACT));
  const css = path.join(dir, 'scale.css');
  await fs.writeFile(css, '.a { font-size: 15px; padding: 10px; margin-top: 12px; }\n');
  const html = path.join(dir, 'label.html');
  await fs.writeFile(html, '<label></label><input id="q">\n');
  const r = await run(['scripts/checks.mjs', css, html, '--contract', c, '--json']);
  const out = JSON.parse(r.stdout);
  const rules = new Set(out.findings.map((f) => f.rule));
  assert.ok(rules.has('magic-spacing'), '缺 magic-spacing：' + JSON.stringify([...rules]));
  assert.ok(rules.has('type-scale'), '缺 type-scale：' + JSON.stringify([...rules]));
  assert.ok(rules.has('empty-label'), '缺 empty-label：' + JSON.stringify([...rules]));
});
