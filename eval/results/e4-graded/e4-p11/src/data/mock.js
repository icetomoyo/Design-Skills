// ── mock 数据 ────────────────────────────────────────────────
// 数量级刻意贴近真实客服平台：日新增工单 200-900，响应 15-30 分钟，
// SLA 90%+，坐席规模 40+。无编造的营销数字。

export const meta = {
  today: '2025-06-13',
  weekday: '周五',
  updated: '18:00',
  refreshCycle: '每 5 分钟',
};

export const kpis = [
  {
    id: 'tickets',
    label: '今日新增工单',
    value: '647',
    unit: '单',
    icon: 'ticket',
    change: { dir: 'up', text: '+29（+4.7%）', good: false },
    caption: '昨日 618 单 · 14 天均值 466 单',
  },
  {
    id: 'frt',
    label: '平均首次响应',
    value: '18',
    unit: '分钟',
    icon: 'clock',
    change: { dir: 'down', text: '-3 分钟（-14.3%）', good: true },
    caption: '昨日 21 分钟 · 目标 ≤30 分钟',
  },
  {
    id: 'sla',
    label: 'SLA 达标率',
    value: '92.4',
    unit: '%',
    icon: 'shield',
    change: { dir: 'up', text: '+1.3 pp', good: true },
    caption: '昨日 91.1% · 目标 95%',
  },
  {
    id: 'agents',
    label: '活跃坐席',
    value: '37',
    unit: '/ 45 人',
    icon: 'users',
    change: { dir: 'down', text: '-3', good: false },
    caption: '昨日 40 人 · 当前排班缺口 8 人',
  },
];

// 近 14 天新建工单量（周末自然回落）
export const ticketTrend = [
  { date: '05-31', count: 268 },
  { date: '06-01', count: 243 },
  { date: '06-02', count: 452 },
  { date: '06-03', count: 489 },
  { date: '06-04', count: 471 },
  { date: '06-05', count: 528 },
  { date: '06-06', count: 561 },
  { date: '06-07', count: 312 },
  { date: '06-08', count: 286 },
  { date: '06-09', count: 534 },
  { date: '06-10', count: 572 },
  { date: '06-11', count: 549 },
  { date: '06-12', count: 618 },
  { date: '06-13', count: 647 },
];

export const priorityMeta = {
  P1: { label: 'P1 紧急', cls: 'border-red-200 bg-red-50 text-red-700' },
  P2: { label: 'P2 高', cls: 'border-amber-200 bg-amber-50 text-amber-700' },
  P3: { label: 'P3 普通', cls: 'border-sky-200 bg-sky-50 text-sky-700' },
  P4: { label: 'P4 低', cls: 'border-slate-200 bg-slate-100 text-slate-600' },
};

// 未分配工单 Top 8（按优先级 + 等待时长排序）
export const unassignedQueue = [
  { id: 'TKT-10982', subject: '重复扣款，客户已在电话中投诉', priority: 'P1', channel: '电话', wait: 47 },
  { id: 'TKT-10971', subject: '企业版 SSO 登录报错（租户全员）', priority: 'P1', channel: '邮件', wait: 22 },
  { id: 'TKT-10976', subject: '数据导出接口持续返回 502', priority: 'P2', channel: '在线', wait: 18 },
  { id: 'TKT-10969', subject: '子账号无法重置密码', priority: 'P2', channel: '邮件', wait: 15 },
  { id: 'TKT-10964', subject: '发票抬头修改后未生效', priority: 'P2', channel: '邮件', wait: 9 },
  { id: 'TKT-10958', subject: '移动端推送重复提醒', priority: 'P3', channel: '在线', wait: 6 },
  { id: 'TKT-10952', subject: '报表时区显示错误（UTC+8）', priority: 'P3', channel: '在线', wait: 4 },
  { id: 'TKT-10947', subject: 'API 限流阈值如何申请提升', priority: 'P4', channel: '在线', wait: 2 },
];

export const unassignedTotal = 23;
