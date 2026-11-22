// 运营总览 mock 数据层（S1）
// 数量级约束（INV-006）：日工单量 200-900；变化值一律带方向与基准；不出现假数据特征数字。
// 四态开关（INV-004）：?mock=loading|error|empty|success，默认 success。

export const SCENARIOS = ['success', 'loading', 'error', 'empty'];

export function getScenario(search) {
  const qs =
    typeof search === 'string'
      ? search
      : typeof window !== 'undefined' && window.location
        ? window.location.search
        : '';
  const value = new URLSearchParams(qs).get('mock');
  return SCENARIOS.includes(value) ? value : 'success';
}

// 近 14 天工单量（11/09 - 11/22，周末自然回落；今日为 14:32 快照的部分日数据）
export const SERIES = [
  { label: '11/09', weekday: '一', count: 468 },
  { label: '11/10', weekday: '二', count: 512 },
  { label: '11/11', weekday: '三', count: 489 },
  { label: '11/12', weekday: '四', count: 534 },
  { label: '11/13', weekday: '五', count: 561 },
  { label: '11/14', weekday: '六', count: 287 },
  { label: '11/15', weekday: '日', count: 243 },
  { label: '11/16', weekday: '一', count: 496 },
  { label: '11/17', weekday: '二', count: 522 },
  { label: '11/18', weekday: '三', count: 508 },
  { label: '11/19', weekday: '四', count: 574 },
  { label: '11/20', weekday: '五', count: 612 },
  { label: '11/21', weekday: '六', count: 331 },
  { label: '11/22', weekday: '日', count: 372 },
];

export function buildTrendRows(series) {
  return series.map((d, i) => {
    const prev = i === 0 ? null : series[i - 1].count;
    const diff = prev === null ? null : d.count - prev;
    return {
      ...d,
      delta: diff === null ? '—' : (diff >= 0 ? '+' : '') + String(diff),
    };
  });
}

export function buildTrendSummary(series) {
  const last7 = series.slice(-7);
  const prev7 = series.slice(-14, -7);
  const avg = (rows) => rows.reduce((sum, r) => sum + r.count, 0) / rows.length;
  const a = avg(last7);
  const b = avg(prev7);
  const pct = ((a - b) / b) * 100;
  return `近 7 天日均 ${Math.round(a)} 单，较上一周期 ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
}

export const KPIS = [
  {
    id: 'new-tickets',
    icon: 'ticket',
    label: '今日新增工单',
    value: '372',
    unit: '单',
    note: '截至今日 14:32',
    change: { direction: 'up', display: '+41（+12.4%）', good: true, baseline: '较昨日' },
  },
  {
    id: 'first-response',
    icon: 'clock',
    label: '平均首次响应',
    value: '16',
    unit: '分 48 秒',
    note: '按已答复工单计算',
    change: { direction: 'down', display: '-1 分 32 秒', good: true, baseline: '较昨日' },
  },
  {
    id: 'sla-rate',
    icon: 'gauge',
    label: 'SLA 达标率',
    value: '92.4',
    unit: '%',
    note: '目标 90%',
    change: { direction: 'up', display: '+0.8 个百分点', good: true, baseline: '较昨日' },
  },
  {
    id: 'active-agents',
    icon: 'headset',
    label: '活跃坐席',
    value: '37',
    unit: '/ 42 在线',
    note: '按当前班次',
    change: { direction: 'down', display: '-2', good: false, baseline: '较昨日' },
  },
];

// 未分配工单池（按等待时长降序，页面取 Top 8）
export const UNASSIGNED_POOL = [
  { id: 'TKT-10482', subject: '结算页重复扣款，申请退款', customer: '星野科技 · 企业版', priority: 'high', waitingMinutes: 168, slaRisk: true, agent: '李婷' },
  { id: 'TKT-10476', subject: '企业 SSO 登录报错 500', customer: '蓝鲸物流 · 企业版', priority: 'high', waitingMinutes: 121, slaRisk: true, agent: '张伟' },
  { id: 'TKT-10471', subject: '批量导入联系人失败（CSV 编码）', customer: '云雀教育 · 专业版', priority: 'medium', waitingMinutes: 94, slaRisk: false, agent: '王倩' },
  { id: 'TKT-10469', subject: 'API 限流阈值如何调整', customer: '恒石制造 · 专业版', priority: 'medium', waitingMinutes: 77, slaRisk: false, agent: '刘洋' },
  { id: 'TKT-10464', subject: '邮件通知延迟约 2 小时', customer: '星野科技 · 企业版', priority: 'high', waitingMinutes: 63, slaRisk: true, agent: '李婷' },
  { id: 'TKT-10461', subject: '移动端附件上传失败', customer: '白鹿设计 · 标准版', priority: 'medium', waitingMinutes: 52, slaRisk: false, agent: '赵敏' },
  { id: 'TKT-10458', subject: '工单分配规则不生效', customer: '云雀教育 · 专业版', priority: 'medium', waitingMinutes: 41, slaRisk: false, agent: '王倩' },
  { id: 'TKT-10454', subject: '发票抬头修改申请', customer: '恒石制造 · 专业版', priority: 'low', waitingMinutes: 28, slaRisk: false, agent: '刘洋' },
  { id: 'TKT-10451', subject: '报表导出为空文件', customer: '白鹿设计 · 标准版', priority: 'low', waitingMinutes: 19, slaRisk: false, agent: '赵敏' },
];

export const UNASSIGNED_TOTAL = 23;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 模拟异步接口：按 scenario 返回不同结局，使四态在运行页面真实可触达
export function fetchOverview({ scenario = 'success', delayMs = 600, signal } = {}) {
  const base = {
    generatedAt: '2026-11-22 14:32',
    series: buildTrendRows(SERIES),
    trendSummary: buildTrendSummary(SERIES),
    kpis: KPIS,
  };
  if (scenario === 'loading') {
    // 载入演示：保持 pending（用户可随时通过顶栏刷新或改参数退出）
    return new Promise(() => {});
  }
  if (scenario === 'error') {
    return wait(delayMs).then(() => {
      const error = new Error('网关超时，运营数据接口未返回');
      error.code = 'OVERVIEW-503';
      throw error;
    });
  }
  return wait(delayMs).then(() => {
    if (signal && signal.aborted) throw new Error('aborted');
    return {
      ...base,
      unassigned: scenario === 'empty' ? [] : UNASSIGNED_POOL.slice(0, 8),
      unassignedTotal: scenario === 'empty' ? 0 : UNASSIGNED_TOTAL,
    };
  });
}
