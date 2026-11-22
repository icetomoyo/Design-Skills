// ============================================================
// Mock 数据 —— 数量级依据（避免 12345 类假数据特征）
// 订阅制工单 SaaS 的中型客户（约 40 名坐席）典型负载：
//   工作日 600~760 张/日，周末回落到 240~300 张/日，
//   14 天合计约 7,230 张；首次响应 4~5 分钟；SLA 达标率 92~95%。
// ============================================================

export const meta = {
  productName: '云枢Desk',
  pageTitle: '运营总览',
  dataAsOf: '数据截止 2026-03-11 18:00 · 每小时刷新',
};

// 近 14 天工单量趋势（趋势→折线图：chart 域检索结果 1）
export const trend = {
  granularity: '按日汇总',
  rangeLabel: '近 14 天（02-26 至 03-11）',
  unit: '张/日',
  days: [
    { date: '02-26', weekday: '四', value: 618, weekend: false },
    { date: '02-27', weekday: '五', value: 642, weekend: false },
    { date: '02-28', weekday: '六', value: 287, weekend: true },
    { date: '03-01', weekday: '日', value: 243, weekend: true },
    { date: '03-02', weekday: '一', value: 596, weekend: false },
    { date: '03-03', weekday: '二', value: 671, weekend: false },
    { date: '03-04', weekday: '三', value: 638, weekend: false },
    { date: '03-05', weekday: '四', value: 702, weekend: false },
    { date: '03-06', weekday: '五', value: 755, weekend: false },
    { date: '03-07', weekday: '六', value: 291, weekend: true },
    { date: '03-08', weekday: '日', value: 264, weekend: true },
    { date: '03-09', weekday: '一', value: 623, weekend: false },
    { date: '03-10', weekday: '二', value: 688, weekend: false },
    { date: '03-11', weekday: '三', value: 612, weekend: false, isToday: true },
  ],
};

// KPI：数字 + 标签 + 变化（vs 昨日）三要素；goodWhen 声明方向语义，
// 颜色只做辅助，方向与结论由文字承载（color-not-decorative-only）。
export const kpis = [
  {
    id: 'new-tickets',
    icon: 'inbox',
    label: '今日新增工单',
    value: '612',
    unit: '张',
    change: { abs: '-76 张', pct: '-11.0%', dir: 'down', good: true, goodWhen: 'down' },
    note: '今日已解决 437 张 · 转入明日 41 张',
  },
  {
    id: 'first-response',
    icon: 'clock',
    label: '平均首次响应',
    value: '4分12秒',
    unit: '',
    change: { abs: '-26 秒', pct: '-9.3%', dir: 'down', good: true, goodWhen: 'down' },
    note: '目标 5 分钟内 · 连续 6 天达标',
  },
  {
    id: 'sla-rate',
    icon: 'shield',
    label: 'SLA 达标率',
    value: '94.2',
    unit: '%',
    change: { abs: '+1.1 pp', pct: '', dir: 'up', good: true, goodWhen: 'up' },
    note: '今日 SLA 内待跟进 26 张 · 临界 9 张',
  },
  {
    id: 'active-agents',
    icon: 'headset',
    label: '活跃坐席',
    value: '36',
    unit: '/ 42 在编',
    change: { abs: '-3 人', pct: '', dir: 'down', good: false, goodWhen: 'up' },
    note: '晚班 18:00 后到岗 6 人 · 在线率 85.7%',
  },
];

// 未分配工单 Top 8（按等待时长降序）；priority 文字承载语义，色点仅辅助
export const unassignedTickets = [
  { id: 'TKD-20471', subject: '客户无法导出上月账单（企业版）', priority: '紧急', channel: '邮件', waitMinutes: 134, slaLeft: 'SLA 剩 46 分钟' },
  { id: 'TKD-20468', subject: 'API 回调重试导致重复扣费', priority: '紧急', channel: 'API', waitMinutes: 112, slaLeft: 'SLA 剩 1 小时' },
  { id: 'TKD-20465', subject: '单点登录后组织架构未同步', priority: '高', channel: '在线', waitMinutes: 91 },
  { id: 'TKD-20462', subject: '移动端附件上传卡在 99%', priority: '高', channel: '在线', waitMinutes: 68 },
  { id: 'TKD-20458', subject: '子账号权限模板复制失败', priority: '中', channel: '邮件', waitMinutes: 58 },
  { id: 'TKD-20455', subject: '报表导出 CSV 用 Excel 打开乱码', priority: '中', channel: 'API', waitMinutes: 43 },
  { id: 'TKD-20451', subject: '工单合并误操作后需要恢复', priority: '中', channel: '电话', waitMinutes: 27 },
  { id: 'TKD-20447', subject: '更换发票抬头后开票失败', priority: '低', channel: '邮件', waitMinutes: 12 },
];

// 侧栏导航（icon + 文字标签：nav-label-icon；当前项由 aria-current + 高亮指示）
export const navSections = [
  {
    title: '运营',
    items: [
      { id: 'overview', icon: 'dashboard', label: '运营总览', active: true },
      { id: 'tickets', icon: 'tickets', label: '全部工单' },
      { id: 'queue', icon: 'queue', label: '分配队列', badge: '8' },
      { id: 'reports', icon: 'chart', label: '报表中心' },
    ],
  },
  {
    title: '客户与配置',
    items: [
      { id: 'customers', icon: 'customers', label: '客户列表' },
      { id: 'sla', icon: 'shield', label: 'SLA 策略' },
      { id: 'settings', icon: 'settings', label: '系统设置' },
    ],
  },
];

// 等待时长格式化：134 -> '2小时14分'
export function formatWait(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}小时${m}分` : `${m}分钟`;
}
