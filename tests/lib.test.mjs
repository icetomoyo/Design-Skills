// Vismith unit tests: frontmatter parser + color math. Run: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, validateEntryMeta, FrontmatterError } from '../vismith/scripts/lib/frontmatter.mjs';
import { parseColor, contrastRatio, fmtRatio } from '../vismith/scripts/lib/colors.mjs';

test('frontmatter: 解析合法扁平条目（数组/引号/注释）', () => {
  const text = '---\nid: demo\ntitle: "演示 条目"\ncategory: a11y\nproduct_types: [saas-dashboard, admin-console]  # 注释\nkind: principle\nsource: original\nscope_note: 全部\ntech_stacks: []\n---\n\n正文内容';
  const { data, body } = parseFrontmatter(text, 'demo.md');
  assert.equal(data.id, 'demo');
  assert.equal(data.title, '演示 条目');
  assert.deepEqual(data.product_types, ['saas-dashboard', 'admin-console']);
  assert.deepEqual(data.tech_stacks, []);
  assert.ok(body.trimStart().startsWith('正文内容'), 'body 应在闭合符后保留原文，实际: ' + JSON.stringify(body.slice(0, 20)));
});

test('frontmatter: 拒绝嵌套映射', () => {
  assert.throws(() => parseFrontmatter('---\na: { x: 1 }\n---\nb', 'n.md'), FrontmatterError);
});

test('frontmatter: 拒绝缺失闭合符与空值', () => {
  assert.throws(() => parseFrontmatter('---\na: 1\n', 'n.md'), FrontmatterError);
  assert.throws(() => parseFrontmatter('---\na:\n---\n', 'n.md'), FrontmatterError);
});

test('frontmatter: validateEntryMeta 校验必填与 kind 枚举', () => {
  const base = { id: 'x', title: 't', category: 'c', product_types: ['p'], tech_stacks: ['h'], kind: 'principle', source: 'original', scope_note: 's' };
  validateEntryMeta(base, 'ok.md');
  assert.throws(() => validateEntryMeta({ ...base, kind: 'wish' }, 'bad.md'), FrontmatterError);
  assert.throws(() => validateEntryMeta({ ...base, id: undefined }, 'bad2.md'), FrontmatterError);
});

test('colors: 解析 hex/rgb/hsl', () => {
  assert.deepEqual(parseColor('#000000'), { r: 0, g: 0, b: 0 });
  assert.deepEqual(parseColor('#FFF'), { r: 255, g: 255, b: 255 });
  const rgb = parseColor('rgb(100, 116, 139)');
  assert.equal(Math.round(rgb.r), 100);
  const hsl = parseColor('hsl(215, 25%, 27%)');
  assert.ok(hsl && hsl.r > 40 && hsl.r < 60);
  assert.equal(parseColor('not-a-color'), null);
});

test('colors: WCAG 比值已知值', () => {
  const black = parseColor('#000000'), white = parseColor('#FFFFFF');
  const ratio = contrastRatio(black, white);
  assert.ok(ratio > 20.9 && ratio < 21.1, '黑白应约 21:1，实际 ' + ratio);
  const slate = parseColor('#64748B'), surface = parseColor('#F8FAFC');
  const r2 = contrastRatio(slate, surface);
  assert.ok(r2 > 4.4 && r2 < 4.7, '#64748B on #F8FAFC 实算约 4.55:1（通过 4.5），实际 ' + r2);
  const weak = parseColor('#94A3B8');
  const r3 = contrastRatio(weak, surface);
  assert.ok(r3 > 2.3 && r3 < 2.6, '#94A3B8 on #F8FAFC 实算约 2.45:1（应判失败），实际 ' + r3);
  assert.equal(fmtRatio(r2), r2.toFixed(2) + ':1');
});
