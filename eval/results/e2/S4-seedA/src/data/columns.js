// 主机清单 60 列定义（vismith contract: pages.hosts-table.columns_total=60）
// 顺序即表格列序：首两列（主机名、内网 IP）冻结（INV-002）。
// align: 'num' 右对齐 + tabular-nums（INV-005）；'left' 文本左对齐。

const pct = (v) => `${v.toFixed(1)}%`;
const money = (v) => `¥${Math.round(v).toLocaleString('zh-CN')}`;

export const STATUS_LABELS = {
  running: '运行中',
  stopped: '已停机',
  maintaining: '维护中',
  fault: '故障',
  restarting: '重启中',
};

export const GROUPS = [
  '基础信息',
  '网络',
  '规格',
  '标签',
  '监控',
  '成本',
  '负责人与生命周期',
  '安全合规',
];

export const COLUMNS = [
  // —— 基础信息（冻结区：主机名 / 内网 IP）——
  { key: 'hostname', label: '主机名', group: '基础信息', w: 260, frozen: true },
  { key: 'ip_private', label: '内网 IP', group: '网络', w: 150, frozen: true },
  { key: 'status', label: '状态', group: '基础信息', w: 108, fmt: (r) => STATUS_LABELS[r.status] || r.status },
  { key: 'env', label: '环境', group: '基础信息', w: 84 },
  { key: 'region', label: '地域', group: '基础信息', w: 130 },
  { key: 'az', label: '可用区', group: '基础信息', w: 150 },
  { key: 'datacenter', label: '机房', group: '基础信息', w: 150 },
  { key: 'host_id', label: '实例 ID', group: '基础信息', w: 190 },
  { key: 'dns', label: '域名', group: '基础信息', w: 260 },
  { key: 'cluster', label: '所属集群', group: '基础信息', w: 190 },

  // —— 网络 ——
  { key: 'ip_public', label: '公网 IP', group: '网络', w: 150 },
  { key: 'vip', label: '绑定 VIP', group: '网络', w: 150 },
  { key: 'subnet', label: '子网', group: '网络', w: 150 },
  { key: 'vpc', label: 'VPC', group: '网络', w: 140 },
  { key: 'security_group', label: '安全组', group: '网络', w: 210 },
  { key: 'mac', label: 'MAC 地址', group: '网络', w: 170 },
  { key: 'bandwidth_mbps', label: '带宽 (Mbps)', group: '网络', w: 120, align: 'num', fmt: (r) => String(r.bandwidth_mbps) },
  { key: 'port_open', label: '开放端口', group: '网络', w: 120 },

  // —— 规格 ——
  { key: 'instance_type', label: '规格族', group: '规格', w: 200 },
  { key: 'vcpu', label: 'vCPU', group: '规格', w: 88, align: 'num', fmt: (r) => String(r.vcpu) },
  { key: 'mem_gb', label: '内存 (GB)', group: '规格', w: 100, align: 'num', fmt: (r) => String(r.mem_gb) },
  { key: 'disk_gb', label: '系统盘 (GB)', group: '规格', w: 110, align: 'num', fmt: (r) => String(r.disk_gb) },
  { key: 'disk_type', label: '磁盘类型', group: '规格', w: 110 },
  { key: 'gpu', label: 'GPU', group: '规格', w: 80, align: 'num', fmt: (r) => (r.gpu > 0 ? `×${r.gpu}` : '—') },
  { key: 'arch', label: '架构', group: '规格', w: 90 },
  { key: 'os', label: '操作系统', group: '规格', w: 150 },
  { key: 'kernel', label: '内核版本', group: '规格', w: 170 },
  { key: 'agent_version', label: 'Agent 版本', group: '规格', w: 110 },

  // —— 标签 ——
  { key: 'tags', label: '标签', group: '标签', w: 280, fmt: (r) => r.tags.join(' · ') },
  { key: 'app', label: '应用', group: '标签', w: 110 },
  { key: 'business_line', label: '业务线', group: '标签', w: 110 },
  { key: 'priority', label: '优先级', group: '标签', w: 90 },
  { key: 'project', label: '所属项目', group: '标签', w: 150 },

  // —— 监控 ——
  { key: 'cpu_pct', label: 'CPU 使用率', group: '监控', w: 110, align: 'num', fmt: (r) => pct(r.cpu_pct) },
  { key: 'mem_pct', label: '内存使用率', group: '监控', w: 110, align: 'num', fmt: (r) => pct(r.mem_pct) },
  { key: 'disk_pct', label: '磁盘使用率', group: '监控', w: 110, align: 'num', fmt: (r) => pct(r.disk_pct) },
  { key: 'uptime_days', label: '连续运行 (天)', group: '监控', w: 120, align: 'num', fmt: (r) => String(r.uptime_days) },
  { key: 'last_heartbeat', label: '最近心跳', group: '监控', w: 160 },
  { key: 'alert_count', label: '未恢复告警', group: '监控', w: 100, align: 'num', fmt: (r) => String(r.alert_count) },

  // —— 成本 ——
  { key: 'monthly_cost', label: '月费用', group: '成本', w: 110, align: 'num', fmt: (r) => money(r.monthly_cost) },
  { key: 'last_month_cost', label: '上月费用', group: '成本', w: 110, align: 'num', fmt: (r) => money(r.last_month_cost) },
  { key: 'billing_type', label: '计费方式', group: '成本', w: 110 },
  { key: 'discount_pct', label: '折扣 (%)', group: '成本', w: 90, align: 'num', fmt: (r) => String(r.discount_pct) },
  { key: 'cost_center', label: '成本中心', group: '成本', w: 130 },

  // —— 负责人与生命周期 ——
  { key: 'owner', label: '负责人', group: '负责人与生命周期', w: 100 },
  { key: 'team', label: '所属团队', group: '负责人与生命周期', w: 130 },
  { key: 'oncall', label: '值班电话', group: '负责人与生命周期', w: 140 },
  { key: 'supplier', label: '供应商', group: '负责人与生命周期', w: 110 },
  { key: 'purchased_at', label: '购入日期', group: '负责人与生命周期', w: 110 },
  { key: 'expire_at', label: '到期日期', group: '负责人与生命周期', w: 110 },
  { key: 'sla', label: 'SLA', group: '负责人与生命周期', w: 90 },
  { key: 'lifecycle', label: '生命周期', group: '负责人与生命周期', w: 100 },
  { key: 'remark', label: '备注', group: '负责人与生命周期', w: 260 },

  // —— 安全合规 ——
  { key: 'security_level', label: '安全等级', group: '安全合规', w: 110 },
  { key: 'compliance', label: '合规资质', group: '安全合规', w: 130 },
  { key: 'backup_policy', label: '备份策略', group: '安全合规', w: 130 },
  { key: 'patch_level', label: '补丁状态', group: '安全合规', w: 110 },
  { key: 'last_inspection', label: '最近巡检', group: '安全合规', w: 120 },
  { key: 'risk_items', label: '风险项', group: '安全合规', w: 90, align: 'num', fmt: (r) => String(r.risk_items) },
  { key: 'firewall', label: '主机防火墙', group: '安全合规', w: 110 },
  { key: 'audit_status', label: '审计状态', group: '安全合规', w: 100 },
];

export const FROZEN_KEYS = ['hostname', 'ip_private'];

export const DEFAULT_VISIBLE = [
  'hostname',
  'ip_private',
  'status',
  'env',
  'region',
  'instance_type',
  'vcpu',
  'mem_gb',
  'os',
  'monthly_cost',
  'cpu_pct',
  'owner',
  'team',
  'lifecycle',
  'tags',
];

export const COLUMN_MAP = Object.fromEntries(COLUMNS.map((c) => [c.key, c]));
