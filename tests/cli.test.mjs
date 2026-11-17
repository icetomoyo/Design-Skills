// Vismith CLI integration tests (subprocess). Run: node --test tests/
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

test('search: 中文查询命中知识条目', async () => {
  const r = await run(['scripts/search.mjs', '对比度', '--json']);
  assert.equal(r.code, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.abstain, false);
  assert.equal(out.results[0].id, 'contrast-principle');
});

test('search: 无关查询应弃权并给建议', async () => {
  const r = await run(['scripts/search.mjs', '量子纠缠味噌汤zzz', '--json']);
  const out = JSON.parse(r.stdout);
  assert.equal(out.abstain, true);
  assert.equal(out.results.length, 0);
});

test('search: 类别过滤生效', async () => {
  const r = await run(['scripts/search.mjs', '落地页 营销', '--product-type', 'marketing-site', '--json']);
  const out = JSON.parse(r.stdout);
  assert.equal(out.abstain, false);
  for (const hit of out.results) assert.ok(hit.product_types.includes('marketing-site'));
});

test('contract: 模板通过 validate', async () => {
  const tmp = path.join(await fs.mkdtemp(path.join(os.tmpdir(), 'vismith-')), 'c.json');
  await fs.copyFile(path.join(SKILL, 'assets', 'templates', 'contract.template.json'), tmp);
  const r = await run(['scripts/contract.mjs', 'validate', tmp]);
  assert.equal(r.code, 0, r.stderr);
});

test('contract: 非法样例（坏枚举 + 坏 precedence）被拒', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vismith-'));
  const f1 = path.join(dir, 'bad1.json');
  await fs.writeFile(f1, JSON.stringify({ version: 1, meta: { product_type: 'game' }, style: { direction: 'x' }, tokens: {}, a11y: { min_contrast_normal_text: 4.5 }, precedence: [] }), 'utf8');
  const r1 = await run(['scripts/contract.mjs', 'validate', f1]);
  assert.equal(r1.code, 1);
  const f2 = path.join(dir, 'bad2.json');
  const tpl = JSON.parse(await fs.readFile(path.join(SKILL, 'assets', 'templates', 'contract.template.json'), 'utf8'));
  tpl.precedence = ['style_preferences', 'tokens', 'project_constraints', 'a11y_hard', 'invariants'];
  await fs.writeFile(f2, JSON.stringify(tpl), 'utf8');
  const r2 = await run(['scripts/contract.mjs', 'validate', f2]);
  assert.equal(r2.code, 1);
  assert.ok(r2.stderr.includes('precedence'));
});

test('contract: extract 从 tailwind + CSS 变量产出 tokens 草稿', async () => {
  const dir = path.join(REPO, 'tests', 'fixtures', 'extract');
  const out = path.join(dir, 'draft.tmp.json');
  const r = await run(['scripts/contract.mjs', 'extract', '--dir', dir, '--out', out]);
  assert.equal(r.code, 0, r.stderr);
  const draft = JSON.parse(await fs.readFile(out, 'utf8'));
  assert.equal(draft.tokens.colors.primary, '#0EA5E9');
  assert.equal(draft.tokens.colors.danger, '#EF4444');
  assert.equal(draft.tokens.colors['color-primary'], '#7C3AED');
  assert.ok(draft.tokens.typography.body.includes('Inter'));
  assert.equal(draft.precedence.length, 5);
  await fs.rm(out, { force: true });
});

test('checks: 反例 fixture 命中预期规则', async () => {
  const r = await run(['scripts/checks.mjs', path.join(REPO, 'tests', 'fixtures', 'checks', 'bad.css'), path.join(REPO, 'tests', 'fixtures', 'checks', 'bad.html'), '--json']);
  assert.equal(r.code, 0, 'checks 默认不因发现而非零退出');
  const out = JSON.parse(r.stdout);
  const ids = new Set(out.findings.map((f) => f.id));
  for (const expect of ['CHK-01', 'CHK-02', 'CHK-03', 'CHK-05', 'CHK-06', 'CHK-07']) assert.ok(ids.has(expect), '缺 ' + expect);
  assert.ok(out.summary.error >= 3);
});

test('checks: 正例 fixture 无 error/warning', async () => {
  const r = await run(['scripts/checks.mjs', path.join(REPO, 'tests', 'fixtures', 'checks', 'good.css'), '--json']);
  const out = JSON.parse(r.stdout);
  assert.equal(out.summary.error, 0, JSON.stringify(out.findings));
  assert.equal(out.summary.warning, 0, JSON.stringify(out.findings));
});

test('budget: 全部 LLM 面向文件在预算内', async () => {
  const r = await run(['scripts/budget.mjs']);
  assert.equal(r.code, 0, r.stdout + r.stderr);
  assert.ok(r.stdout.includes('全部在预算内'));
});
