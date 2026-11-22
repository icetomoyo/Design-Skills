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

test('v0.2: CHK-02 off-token-color-class 与 CHK-04 text-* 类名层', async () => {
  const dir = await tmp();
  const c = path.join(dir, 'c.json');
  const c2 = { ...MIN_CONTRACT, tokens: { ...MIN_CONTRACT.tokens, typography: { scale: [12, 14, 16, 20, 24, 30] } } };
  await fs.writeFile(c, JSON.stringify(c2));
  const jsx = path.join(dir, 'App.jsx');
  await fs.writeFile(jsx, 'export default () => (\n  <div className="p-4 bg-emerald-600 text-ink-600 text-lg text-base">x</div>\n);\n');
  const r = await run(['scripts/checks.mjs', jsx, '--contract', c, '--json']);
  const out = JSON.parse(r.stdout);
  const rules = new Set(out.findings.map((f) => f.rule));
  assert.ok(rules.has('off-token-color-class'), '应命中 bg-emerald-600：' + JSON.stringify([...rules]));
  assert.ok(!out.findings.some((f) => f.rule === 'off-token-color-class' && f.evidence.detail.includes('ink-600')), '自定义语义名 bg-ink-600 不应误报');
  assert.ok(out.findings.some((f) => f.rule === 'type-scale' && f.evidence.detail.includes('text-lg')), 'text-lg=18px 不在阶梯应命中');
  assert.ok(!out.findings.some((f) => f.rule === 'type-scale' && f.evidence.detail.includes('text-base')), 'text-base=16px 在阶梯内不应命中');
});

test('v0.2 波2: tier 分级豁免（floor 拒绝 / reflex 理由不足无效 / 有效降级留痕）', async () => {
  const dir = await tmp();
  const c = path.join(dir, 'c.json');
  await fs.writeFile(c, JSON.stringify(MIN_CONTRACT)); // 含 #94A3B8 低对比（floor）
  const css = path.join(dir, 'page.css');
  await fs.writeFile(css, '.a { margin: 10px; }\n.b { margin: 12px; }\n');
  const cfg = path.join(dir, 'rules.json');
  await fs.writeFile(cfg, JSON.stringify({
    'CHK-01': { files: ['**/contract.json'], reason: '视觉稿如此规定不能改', evidence: 'design-v3.png' },
    'CHK-03': { files: [css], reason: '遗留模块像素对齐第三方组件视觉稿' }
  }));
  const r = await run(['scripts/checks.mjs', css, '--contract', c, '--config', cfg, '--json']);
  const out = JSON.parse(r.stdout);
  const c1 = out.findings.find((f) => f.id === 'CHK-01' && f.severity === 'error');
  assert.ok(c1, '应存在对比度 error');
  assert.ok(c1.evidence.detail.includes('豁免被拒'), 'floor 豁免应被拒绝：' + c1.evidence.detail);
  assert.ok(out.findings.some((f) => f.id === 'CHK-03' && f.evidence.detail.includes('已豁免：遗留模块')), 'reflex 有效豁免应降级留痕');
  // 理由不足：换弱理由重跑
  await fs.writeFile(cfg, JSON.stringify({ 'CHK-03': { files: [css], reason: '太短' } }));
  const r2 = await run(['scripts/checks.mjs', css, '--contract', c, '--config', cfg, '--json']);
  const out2 = JSON.parse(r2.stdout);
  const c3 = out2.findings.find((f) => f.id === 'CHK-03');
  assert.ok(c3 && c3.severity === 'warning' && c3.evidence.detail.includes('豁免无效'), '弱理由豁免应无效且保持 warning');
  assert.ok(out2.findings.every((f) => typeof f.tier === 'string'), 'findings 应带 tier 字段');
});

test('v0.3: CHK-01 contrast-class 类名×surface 交叉验证（E2 盲区回归）', async () => {
  const dir = await tmp();
  const proj = path.join(dir, 'proj');
  await fs.mkdir(proj, { recursive: true });
  const c = { ...MIN_CONTRACT, tokens: { ...MIN_CONTRACT.tokens, colors: { neutrals: ['#475569'], surface: '#FFFFFF' } } };
  const cpath = path.join(dir, 'c.json');
  await fs.writeFile(cpath, JSON.stringify(c));
  await fs.writeFile(path.join(proj, 'tailwind.config.js'), "export default { theme: { extend: { colors: { ink: { 400: '#94A3B8', 900: '#0F172A' } } } } }\n");
  const jsx = path.join(proj, 'App.jsx');
  await fs.writeFile(jsx, 'export default () => (\n  <div className="text-ink-400 text-ink-900">x</div>\n);\n');
  const r = await run(['scripts/checks.mjs', jsx, path.join(proj, 'tailwind.config.js'), '--contract', cpath, '--json']);
  const out = JSON.parse(r.stdout);
  const hit = out.findings.find((f) => f.rule === 'contrast-class');
  assert.ok(hit, 'text-ink-400 对白底 ~2.56:1 应命中（E2 盲区）：' + JSON.stringify(out.findings.map((f) => f.rule)));
  assert.ok(hit.evidence.detail.includes('ink-400'), hit.evidence.detail);
  assert.ok(!hit.evidence.detail.includes('ink-900'), 'ink-900 高对比不应命中');
  assert.equal(hit.severity, 'warning');
  assert.equal(hit.tier, 'reflex');
});

test('v0.2 波2: CHK-08/09/10 新规则正反例', async () => {
  const dir = await tmp();
  const bad = path.join(dir, 'bad.html');
  await fs.writeFile(bad, '<!doctype html>\n<html>\n<body>\n<h2>二级先行</h2>\n<h4>跳级</h4>\n<div class="animate-pulse">x</div>\n</body>\n</html>\n');
  const r = await run(['scripts/checks.mjs', bad, '--json']);
  const out = JSON.parse(r.stdout);
  assert.ok(out.findings.some((f) => f.id === 'CHK-10' && f.tier === 'floor'), '缺 lang 应为 floor error');
  assert.ok(out.findings.some((f) => f.id === 'CHK-09' && f.evidence.detail.includes('h2')), '首标题 h2 应命中');
  assert.ok(out.findings.some((f) => f.id === 'CHK-09' && f.evidence.detail.includes('跳跃')), 'h2→h4 跳级应命中');
  assert.ok(out.findings.some((f) => f.id === 'CHK-08'), '动效无 reduced-motion 应命中');
  const ok = path.join(dir, 'ok.html');
  await fs.writeFile(ok, '<!doctype html>\n<html lang="zh-CN">\n<body>\n<h1>主标</h1>\n<h2>次级</h2>\n<div class="animate-pulse motion-reduce:animate-none">x</div>\n</body>\n</html>\n');
  const r2 = await run(['scripts/checks.mjs', ok, '--json']);
  const o2 = JSON.parse(r2.stdout);
  assert.ok(!o2.findings.some((f) => ['CHK-08', 'CHK-09', 'CHK-10'].includes(f.id)), '合规文件不应命中新规则：' + JSON.stringify(o2.findings.map((f) => f.id + ':' + f.rule)));
});

test('v0.2: extract spacing 默认刻度判定与漂移警告', async () => {
  const dir = await tmp();
  const proj = path.join(dir, 'proj');
  await fs.mkdir(proj, { recursive: true });
  await fs.writeFile(path.join(proj, 'tailwind.config.js'), "export default { theme: { extend: { spacing: { 2: '0.5rem', 4: '4px', tight: '6px' } } } }\n");
  const r = await run(['scripts/contract.mjs', 'extract', '--dir', proj]);
  const txt = r.stdout;
  assert.ok(txt.includes('等值') && txt.includes('2='), '应剔除默认刻度项 2=0.5rem：' + txt.slice(0, 300));
  assert.ok(txt.includes('语义漂移'), '应对 4=4px 给漂移警告：' + txt.slice(0, 300));
  const m = /"spacing"[\s\S]*?"scale"\s*:\s*\[([^\]]*)\]/.exec(txt);
  assert.ok(m, 'draft 应含 spacing.scale');
  assert.ok(m[1].includes('4') && m[1].includes('6'), '漂移值 4px 与语义键 6px 应保留在 scale：' + m[1]);
  assert.ok(!/\b8\b/.test(m[1]), '默认等值项 8px（键2）应被剔除：' + m[1]);
});
