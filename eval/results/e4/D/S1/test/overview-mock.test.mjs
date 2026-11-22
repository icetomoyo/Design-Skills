// 零依赖功能冒烟测试：node --test test/（验证 mock 数据契约与 INV-006 数量级约束）
import test from 'node:test';
import assert from 'node:assert/strict';
import { SERIES, KPIS, UNASSIGNED_POOL, UNASSIGNED_TOTAL, fetchOverview, getScenario, buildTrendSummary } from '../src/data/mockOverview.js';
import { formatWait } from '../src/lib/format.js';

test('series: 14 天、数量级 200-900、日期唯一', () => {
  assert.equal(SERIES.length, 14);
  const labels = new Set(SERIES.map((row) => row.label));
  assert.equal(labels.size, 14);
  for (const row of SERIES) {
    assert.ok(row.count >= 200 && row.count <= 900, `${row.label} 数量 ${row.count} 超出 200-900`);
  }
});

test('kpis: 4 张卡且三要素齐全（INV-001）', () => {
  assert.equal(KPIS.length, 4);
  for (const kpi of KPIS) {
    assert.ok(kpi.label && kpi.value, `${kpi.id} 缺标签或数值`);
    assert.ok(['up', 'down'].includes(kpi.change.direction), `${kpi.id} 变化缺方向`);
    assert.ok(/^[+-]/.test(kpi.change.display) || kpi.change.display.startsWith('-'), `${kpi.id} 变化缺正负号`);
    assert.equal(kpi.change.baseline, '较昨日');
    assert.equal(typeof kpi.change.good, 'boolean');
  }
});

test('unassigned: 按等待时长降序、id 唯一、字段完整', () => {
  const pool = UNASSIGNED_POOL.slice(0, 8);
  assert.equal(pool.length, 8);
  assert.equal(new Set(pool.map((ticket) => ticket.id)).size, 8);
  for (let index = 1; index < pool.length; index += 1) {
    assert.ok(pool[index - 1].waitingMinutes >= pool[index].waitingMinutes, '未按等待时长降序');
  }
  for (const ticket of pool) {
    assert.ok(['high', 'medium', 'low'].includes(ticket.priority));
    assert.ok(ticket.agent && ticket.subject && ticket.customer);
    assert.equal(typeof ticket.slaRisk, 'boolean');
  }
  assert.ok(UNASSIGNED_TOTAL >= pool.length);
});

test('fetchOverview: success / empty / error 场景（INV-004）', async () => {
  const success = await fetchOverview({ scenario: 'success', delayMs: 0 });
  assert.equal(success.unassigned.length, 8);
  assert.equal(success.unassignedTotal, UNASSIGNED_TOTAL);
  const empty = await fetchOverview({ scenario: 'empty', delayMs: 0 });
  assert.deepEqual(empty.unassigned, []);
  await assert.rejects(
    () => fetchOverview({ scenario: 'error', delayMs: 0 }),
    (error) => error.code === 'OVERVIEW-503',
  );
});

test('getScenario: 参数解析与默认值', () => {
  assert.equal(getScenario('?mock=error'), 'error');
  assert.equal(getScenario('?mock=loading'), 'loading');
  assert.equal(getScenario('?mock=empty'), 'empty');
  assert.equal(getScenario(''), 'success');
  assert.equal(getScenario('?mock=nonsense'), 'success');
});

test('trend summary 与 formatWait 输出', () => {
  const summary = buildTrendSummary(SERIES);
  assert.match(summary, /近 7 天日均 \d{3} 单，较上一周期 [+-]\d+\.\d%/);
  assert.equal(formatWait(168), '2 小时 48 分');
  assert.equal(formatWait(60), '1 小时');
  assert.equal(formatWait(28), '28 分钟');
});
