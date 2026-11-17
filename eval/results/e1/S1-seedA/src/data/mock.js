// mock 数据 —— 数量级按中型 B 端客服团队校准：
// 日新建工单 200~900 区间（周末回落），不含“99999”式假数据特征。
// 所有页面结论（日均/峰值/解决率/环比）均由以下原始数据计算得出。

export const DATE_TODAY = '2026-11-17'; // 周二
export const RANGE_LABEL = '11/04 – 11/17';

export const kpis = [
  {
    id: 'created',
    label: '今日新增工单',
    value: 486,
    previous: 452,
    unit: '单',
    unitWord: '单',
    fmt: 'count',
    goodWhen: 'down', // 新增变少 = 负载下降
  },
  {
    id: 'firstResponse',
    label: '平均首次响应',
    value: 26,
    previous: 30,
    unit: '分钟',
    unitWord: '分钟',
    fmt: 'count',
    goodWhen: 'down',
  },
  {
    id: 'sla',
    label: 'SLA 达标率',
    value: 92.4,
    previous: 93.5,
    unit: '%',
    fmt: 'pp', // 百分点
    goodWhen: 'up',
  },
  {
    id: 'agents',
    label: '活跃坐席',
    value: 38,
    previous: 35,
    unit: '人 / 45',
    unitWord: '人',
    fmt: 'count',
    goodWhen: 'up',
  },
];

// 近 14 天工单量趋势（周六/周日回落）
export const trendSeries = [
  { date: '2026-11-04', label: '11/04', weekday: '三', created: 456, resolved: 441 },
  { date: '2026-11-05', label: '11/05', weekday: '四', created: 492, resolved: 477 },
  { date: '2026-11-06', label: '11/06', weekday: '五', created: 468, resolved: 453 },
  { date: '2026-11-07', label: '11/07', weekday: '六', created: 289, resolved: 276 },
  { date: '2026-11-08', label: '11/08', weekday: '日', created: 312, resolved: 298 },
  { date: '2026-11-09', label: '11/09', weekday: '一', created: 462, resolved: 448 },
  { date: '2026-11-10', label: '11/10', weekday: '二', created: 478, resolved: 463 },
  { date: '2026-11-11', label: '11/11', weekday: '三', created: 511, resolved: 488 },
  { date: '2026-11-12', label: '11/12', weekday: '四', created: 476, resolved: 461 },
  { date: '2026-11-13', label: '11/13', weekday: '五', created: 449, resolved: 433 },
  { date: '2026-11-14', label: '11/14', weekday: '六', created: 298, resolved: 284 },
  { date: '2026-11-15', label: '11/15', weekday: '日', created: 322, resolved: 307 },
  { date: '2026-11-16', label: '11/16', weekday: '一', created: 452, resolved: 437 },
  { date: '2026-11-17', label: '11/17', weekday: '二', created: 486, resolved: 452 },
];

// 未分配工单 Top 8（按等待时长降序）。id 存纯数字，渲染时再加 # 前缀。
export const unassignedTickets = [
  { id: '5821', priority: 'P1', subject: '登录后反复被登出，影响 20 人团队', waitedLabel: '4 小时 12 分', waitedMinutes: 252 },
  { id: '5794', priority: 'P1', subject: 'API 密钥轮换后 Webhook 全部失效', waitedLabel: '3 小时 40 分', waitedMinutes: 220 },
  { id: '5768', priority: 'P2', subject: '无法导出上月账单 CSV', waitedLabel: '2 小时 55 分', waitedMinutes: 175 },
  { id: '5749', priority: 'P2', subject: 'SSO 元数据证书过期，新成员无法激活', waitedLabel: '2 小时 18 分', waitedMinutes: 138 },
  { id: '5731', priority: 'P2', subject: 'iOS 17 附件上传失败（客户为教育版）', waitedLabel: '1 小时 47 分', waitedMinutes: 107 },
  { id: '5712', priority: 'P3', subject: '报表时区与账户设置不一致', waitedLabel: '1 小时 05 分', waitedMinutes: 65 },
  { id: '5703', priority: 'P3', subject: '邮件回复工单偶发丢失附件', waitedLabel: '46 分', waitedMinutes: 46 },
  { id: '5697', priority: 'P3', subject: '协作坐席只读权限申请', waitedLabel: '32 分', waitedMinutes: 32 },
];

// 完整队列中除 Top 8 外的未分配数（页脚计数用）
export const unassignedBacklogOthers = 15;
