// 合成演示数据 · 数量级按真实客服工单平台校准（日 200–900 单）
// 快照日期：2026-11-22（周日）。窗口 11-09 – 11-22 跨越节气 立冬(11-07) → 小雪(11-22)。
// 本文件所有数字为 mock，不代表任何真实业务。

export const SNAPSHOT = {
  today: '2026-11-22',
  windowStart: '2026-11-09',
  termNow: '小雪',
  termNowPentad: '一候 · 虹藏不见',
  termPrev: '立冬',
  termBoundaryDate: '2026-11-22', // 立冬 → 小雪 分界（趋势图末柱）
  refreshNote: '数据每 5 分钟刷新',
}

export const KPIS = [
  {
    id: 'new-tickets',
    label: '今日新增工单',
    value: '316',
    unit: '单',
    delta: { dir: 'down', value: '73', pct: '18.8%', tone: 'neutral' },
    note: '周日量级回落（截至 14:00）',
  },
  {
    id: 'first-response',
    label: '平均首次响应',
    value: '12.4',
    unit: '分钟',
    delta: { dir: 'down', value: '1.7', pct: '12.1%', tone: 'ok' },
    note: '昨日 14.1 分钟',
  },
  {
    id: 'sla-rate',
    label: 'SLA 达标率',
    value: '96.8',
    unit: '%',
    delta: { dir: 'down', value: '0.6', pct: 'pp', tone: 'warn' },
    note: '目标 ≥ 95% · 昨日 97.4%',
  },
  {
    id: 'active-agents',
    label: '活跃坐席',
    value: '22',
    unit: '/ 28 人',
    delta: { dir: 'up', value: '2', pct: '人', tone: 'ok' },
    note: '值班 8 人 · 在线 22 人',
  },
]

// 近 14 天工单量（趋势主图）。term: 'lidong' | 'xiaoxue' 决定柱色（物候色卡）。
export const TREND = [
  { date: '11-09', weekday: '周一', volume: 512, term: 'lidong' },
  { date: '11-10', weekday: '周二', volume: 604, term: 'lidong' },
  { date: '11-11', weekday: '周三', volume: 588, term: 'lidong' },
  { date: '11-12', weekday: '周四', volume: 671, term: 'lidong' },
  { date: '11-13', weekday: '周五', volume: 705, term: 'lidong' },
  { date: '11-14', weekday: '周六', volume: 348, term: 'lidong' },
  { date: '11-15', weekday: '周日', volume: 302, term: 'lidong' },
  { date: '11-16', weekday: '周一', volume: 597, term: 'lidong' },
  { date: '11-17', weekday: '周二', volume: 640, term: 'lidong' },
  { date: '11-18', weekday: '周三', volume: 662, term: 'lidong' },
  { date: '11-19', weekday: '周四', volume: 718, term: 'lidong' },
  { date: '11-20', weekday: '周五', volume: 743, term: 'lidong' },
  { date: '11-21', weekday: '周六', volume: 389, term: 'lidong' },
  { date: '11-22', weekday: '周日', volume: 316, term: 'xiaoxue' }, // 跨入小雪
]

// 未分配工单 Top 8：按 优先级 + 等待时长 排序，等待越久越靠前。
export const UNASSIGNED = [
  {
    id: '#24817',
    title: 'API 网关 5xx 比例激增，企业客户集成中断',
    channel: '电话',
    priority: 'urgent',
    waitingMin: 126,
    slaLeftMin: 14,
  },
  {
    id: '#24796',
    title: '支付回调失败，订单状态卡在「处理中」',
    channel: '在线',
    priority: 'urgent',
    waitingMin: 88,
    slaLeftMin: 52,
  },
  {
    id: '#24802',
    title: '邮件通知未送达（QQ 企业邮域被退信）',
    channel: '邮件',
    priority: 'high',
    waitingMin: 74,
    slaLeftMin: 166,
  },
  {
    id: '#24788',
    title: '移动端 App 登录闪退（iOS 18.1）',
    channel: '在线',
    priority: 'high',
    waitingMin: 61,
    slaLeftMin: 179,
  },
  {
    id: '#24775',
    title: '数据导出超过 10 万行时超时',
    channel: '工单',
    priority: 'medium',
    waitingMin: 47,
    slaLeftMin: 373,
  },
  {
    id: '#24809',
    title: '子账号权限丢失，无法访问知识库',
    channel: '在线',
    priority: 'medium',
    waitingMin: 33,
    slaLeftMin: 417,
  },
  {
    id: '#24811',
    title: '发票抬头信息修改后未同步',
    channel: '邮件',
    priority: 'low',
    waitingMin: 21,
    slaLeftMin: 1188,
  },
  {
    id: '#24814',
    title: '两重复工单申请合并',
    channel: '工单',
    priority: 'low',
    waitingMin: 8,
    slaLeftMin: 1432,
  },
]

// 空态演示：将 App 中的 UNASSIGNED 换成本数组即可查看空态。
export const UNASSIGNED_EMPTY = []
