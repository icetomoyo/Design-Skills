// 演示数据（mock）。数量级对齐真实订阅制工单平台：日工单 200-900。
// 非真实统计；页面上已标注“演示数据”。
// 日期区间 10-19 至 11-17（11-17 为“今日”，周二，数据截至 14:30，为进行中数值）。

export const DEMO_NOTE = '演示数据';
export const AS_OF = '11-17 14:30';

// 近 30 天工单量趋势（created=新增，resolved=已解决）
export const trendSeries = [
  { date: '10-19', created: 704, resolved: 672 },
  { date: '10-20', created: 658, resolved: 641 },
  { date: '10-21', created: 712, resolved: 690 },
  { date: '10-22', created: 668, resolved: 655 },
  { date: '10-23', created: 745, resolved: 701 },
  { date: '10-24', created: 268, resolved: 301 },
  { date: '10-25', created: 242, resolved: 276 },
  { date: '10-26', created: 761, resolved: 720 },
  { date: '10-27', created: 705, resolved: 688 },
  { date: '10-28', created: 728, resolved: 714 },
  { date: '10-29', created: 694, resolved: 677 },
  { date: '10-30', created: 782, resolved: 736 },
  { date: '10-31', created: 292, resolved: 315 },
  { date: '11-01', created: 254, resolved: 283 },
  { date: '11-02', created: 788, resolved: 749 },
  { date: '11-03', created: 742, resolved: 731 },
  { date: '11-04', created: 776, resolved: 758 },
  { date: '11-05', created: 731, resolved: 712 },
  { date: '11-06', created: 824, resolved: 778 },
  { date: '11-07', created: 311, resolved: 334 },
  { date: '11-08', created: 276, resolved: 298 },
  { date: '11-09', created: 802, resolved: 764 },
  { date: '11-10', created: 757, resolved: 741 },
  { date: '11-11', created: 791, resolved: 776 },
  { date: '11-12', created: 744, resolved: 728 },
  { date: '11-13', created: 861, resolved: 812 },
  { date: '11-14', created: 324, resolved: 349 },
  { date: '11-15', created: 287, resolved: 312 },
  { date: '11-16', created: 812, resolved: 781 },
  { date: '11-17', created: 486, resolved: 459 },
];

// KPI：value=当前值；delta=与基准的变化（带符号）；baseline=对比基准说明
export const kpis = [
  {
    id: 'new-today',
    label: '今日新增工单（截至 14:30）',
    value: 486,
    unit: '张',
    delta: '+37（+8.2%）',
    direction: 'up',
    trend: 'worse',
    baseline: '昨日同期 449 张',
  },
  {
    id: 'first-response',
    label: '平均首次响应',
    value: 16.4,
    unit: '分钟',
    delta: '-1.7（-9.4%）',
    direction: 'down',
    trend: 'better',
    baseline: '昨日全天 18.1 分钟',
  },
  {
    id: 'sla-rate',
    label: 'SLA 达标率',
    value: 94.2,
    unit: '%',
    delta: '+0.6 个百分点',
    direction: 'up',
    trend: 'better',
    baseline: '昨日全天 93.6%',
  },
  {
    id: 'active-agents',
    label: '活跃坐席',
    value: 37,
    unit: '/ 45 人',
    delta: '+3 人',
    direction: 'up',
    trend: 'better',
    baseline: '昨日同期 34 人',
  },
];

// 未分配工单队列（按优先级与等待时长排序，取前 8）
export const unassignedTickets = [
  {
    id: 'TK-5837',
    priority: 'P1',
    subject: '企业版扣费失败导致 3 个坐席被停用',
    customer: '云帆科技',
    channel: '邮件',
    waitMinutes: 47,
    slaLeftText: '13 分钟',
    slaRisk: true,
  },
  {
    id: 'TK-5834',
    priority: 'P1',
    subject: '生产环境 API 网关持续返回 502',
    customer: '星野游戏',
    channel: '电话',
    waitMinutes: 38,
    slaLeftText: '22 分钟',
    slaRisk: true,
  },
  {
    id: 'TK-5829',
    priority: 'P1',
    subject: '数据导出任务连续失败 4 次',
    customer: '蓝鲸物流',
    channel: '门户',
    waitMinutes: 31,
    slaLeftText: '29 分钟',
    slaRisk: true,
  },
  {
    id: 'TK-5841',
    priority: 'P2',
    subject: 'SSO 登录后权限组丢失',
    customer: '极客教育',
    channel: '聊天',
    waitMinutes: 26,
    slaLeftText: '1 小时 14 分',
    slaRisk: false,
  },
  {
    id: 'TK-5838',
    priority: 'P2',
    subject: '报表订阅邮件未送达',
    customer: '恒明零售',
    channel: '邮件',
    waitMinutes: 21,
    slaLeftText: '1 小时 43 分',
    slaRisk: false,
  },
  {
    id: 'TK-5833',
    priority: 'P2',
    subject: '移动端附件上传卡住',
    customer: '云帆科技',
    channel: '聊天',
    waitMinutes: 18,
    slaLeftText: '2 小时 05 分',
    slaRisk: false,
  },
  {
    id: 'TK-5830',
    priority: 'P3',
    subject: '调整发票抬头与税号',
    customer: '星野游戏',
    channel: '邮件',
    waitMinutes: 12,
    slaLeftText: '6 小时 30 分',
    slaRisk: false,
  },
  {
    id: 'TK-5826',
    priority: 'P3',
    subject: '咨询套餐升级价格与席位合并',
    customer: '新签线索',
    channel: '门户',
    waitMinutes: 8,
    slaLeftText: '11 小时',
    slaRisk: false,
  },
];

export const unassignedTotal = 23;

export function fetchOverview() {
  // 加 ?mock=error 可演示错误态（本地开发用）
  const forceError =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('mock') === 'error';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        reject(new Error('MOCK_FETCH_FAILED'));
      } else {
        resolve({
          kpis,
          trendSeries,
          unassignedTickets,
          unassignedTotal,
          meta: { asOf: AS_OF, demo: true },
        });
      }
    }, 240);
  });
}
