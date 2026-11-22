// 主机清单列定义：59 个数据列，8 个分组。
// width 单位 px（渲染时以数值样式写入 col/thick 单元格，保证冻结偏移可精确累加）。
// align: 'num' → 右对齐 + tabular-nums；frozen: 冻结列（主机名、内网IP，见 INV-001）。

export const GROUPS = [
  { id: 'base', label: '基础信息' },
  { id: 'env', label: '环境与部署' },
  { id: 'tags', label: '标签与归属' },
  { id: 'spec', label: '规格' },
  { id: 'net', label: '网络' },
  { id: 'cost', label: '费用' },
  { id: 'owner', label: '负责人' },
  { id: 'runtime', label: '运行状态' }
];

export const SEL_COL_WIDTH = 40;

export const COLUMNS = [
  // ---- 基础信息（9） ----
  { key: 'hostname', label: '主机名', group: 'base', width: 280, align: 'left', frozen: true, type: 'hostname' },
  { key: 'innerIp', label: '内网IP', group: 'base', width: 130, align: 'left', frozen: true, type: 'ip' },
  { key: 'instanceId', label: '实例ID', group: 'base', width: 200, align: 'left', type: 'mono' },
  { key: 'publicIp', label: '公网IP', group: 'base', width: 140, align: 'left', type: 'ip' },
  { key: 'status', label: '状态', group: 'base', width: 104, align: 'left', type: 'status' },
  { key: 'os', label: '操作系统', group: 'base', width: 170, align: 'left' },
  { key: 'kernel', label: '内核版本', group: 'base', width: 180, align: 'left', type: 'mono' },
  { key: 'sn', label: '序列号(SN)', group: 'base', width: 170, align: 'left', type: 'mono' },
  { key: 'enrolledAt', label: '录入时间', group: 'base', width: 120, align: 'left' },

  // ---- 环境与部署（8） ----
  { key: 'env', label: '环境', group: 'env', width: 88, align: 'left' },
  { key: 'region', label: '地域', group: 'env', width: 140, align: 'left' },
  { key: 'zone', label: '可用区', group: 'env', width: 92, align: 'left' },
  { key: 'dc', label: '机房', group: 'env', width: 96, align: 'left' },
  { key: 'cluster', label: '集群', group: 'env', width: 170, align: 'left' },
  { key: 'app', label: '应用', group: 'env', width: 140, align: 'left' },
  { key: 'role', label: '用途', group: 'env', width: 100, align: 'left' },
  { key: 'remark', label: '备注', group: 'env', width: 210, align: 'left' },

  // ---- 标签与归属（8） ----
  { key: 'bizLine', label: '业务线', group: 'tags', width: 130, align: 'left' },
  { key: 'productLine', label: '产品线', group: 'tags', width: 150, align: 'left' },
  { key: 'costCenter', label: '成本中心', group: 'tags', width: 130, align: 'left' },
  { key: 'team', label: '团队', group: 'tags', width: 150, align: 'left' },
  { key: 'secLevel', label: '保密级别', group: 'tags', width: 100, align: 'left' },
  { key: 'monitorLevel', label: '监控等级', group: 'tags', width: 100, align: 'left' },
  { key: 'backupPolicy', label: '备份策略', group: 'tags', width: 130, align: 'left' },
  { key: 'releaseBatch', label: '发布批次', group: 'tags', width: 110, align: 'left' },

  // ---- 规格（8） ----
  { key: 'cpu', label: 'vCPU', group: 'spec', width: 76, align: 'num' },
  { key: 'mem', label: '内存', group: 'spec', width: 92, align: 'num' },
  { key: 'disk', label: '系统盘', group: 'spec', width: 92, align: 'num' },
  { key: 'diskType', label: '磁盘类型', group: 'spec', width: 110, align: 'left' },
  { key: 'gpu', label: 'GPU', group: 'spec', width: 130, align: 'left' },
  { key: 'machineType', label: '机型', group: 'spec', width: 150, align: 'left' },
  { key: 'arch', label: '架构', group: 'spec', width: 96, align: 'left' },
  { key: 'virtType', label: '形态', group: 'spec', width: 104, align: 'left' },

  // ---- 网络（8） ----
  { key: 'bandwidth', label: '带宽', group: 'net', width: 96, align: 'num' },
  { key: 'vpc', label: 'VPC', group: 'net', width: 150, align: 'left', type: 'mono' },
  { key: 'subnet', label: '交换机/子网', group: 'net', width: 170, align: 'left', type: 'mono' },
  { key: 'sg', label: '安全组', group: 'net', width: 150, align: 'left' },
  { key: 'domain', label: '解析域名', group: 'net', width: 210, align: 'left', type: 'mono' },
  { key: 'lb', label: 'LB分组', group: 'net', width: 140, align: 'left' },
  { key: 'firewall', label: '防火墙', group: 'net', width: 96, align: 'left' },
  { key: 'ports', label: '开放端口', group: 'net', width: 92, align: 'num' },

  // ---- 费用（6） ----
  { key: 'monthlyCost', label: '月费用(¥)', group: 'cost', width: 110, align: 'num', type: 'cost' },
  { key: 'billing', label: '计费方式', group: 'cost', width: 100, align: 'left' },
  { key: 'expireAt', label: '到期日', group: 'cost', width: 110, align: 'left' },
  { key: 'discount', label: '折扣', group: 'cost', width: 76, align: 'left' },
  { key: 'billOwner', label: '账单归属', group: 'cost', width: 130, align: 'left' },
  { key: 'costHint', label: '优化建议', group: 'cost', width: 140, align: 'left', type: 'costHint' },

  // ---- 负责人（5） ----
  { key: 'owner', label: '负责人', group: 'owner', width: 92, align: 'left' },
  { key: 'email', label: '邮箱', group: 'owner', width: 190, align: 'left' },
  { key: 'dept', label: '部门', group: 'owner', width: 150, align: 'left' },
  { key: 'oncall', label: '值班组', group: 'owner', width: 120, align: 'left' },
  { key: 'ticket', label: '工单组', group: 'owner', width: 130, align: 'left' },

  // ---- 运行状态（7） ----
  { key: 'cpuUsg', label: 'CPU使用率', group: 'runtime', width: 110, align: 'num', type: 'pct' },
  { key: 'memUsg', label: '内存使用率', group: 'runtime', width: 110, align: 'num', type: 'pct' },
  { key: 'diskUsg', label: '磁盘使用率', group: 'runtime', width: 110, align: 'num', type: 'pct' },
  { key: 'lastAlert', label: '最近告警', group: 'runtime', width: 180, align: 'left' },
  { key: 'uptime', label: '运行时长', group: 'runtime', width: 96, align: 'num' },
  { key: 'lastInspect', label: '最近巡检', group: 'runtime', width: 110, align: 'left' },
  { key: 'probe', label: '探活', group: 'runtime', width: 84, align: 'left' }
];

export const DATA_COL_COUNT = COLUMNS.length; // 59

// 冻结数据列（顺序即表头顺序的前缀），选择列恒在其左且同样冻结
export const FROZEN_DATA_KEYS = COLUMNS.filter((c) => c.frozen).map((c) => c.key);
