// 固定字典 mock（S2 场景：数量级对齐中型企业，约 300–800 人规模）
// 命名/数量刻意保持真实业务量级：12 个部门、14 个岗位、10 位可选审批人。

export const DEPARTMENTS = [
  { id: 'tech', name: '技术研发部', code: 'RD' },
  { id: 'data', name: '数据智能部', code: 'DI' },
  { id: 'product', name: '产品设计部', code: 'PD' },
  { id: 'growth', name: '市场增长部', code: 'MG' },
  { id: 'sales', name: '销售部', code: 'SL' },
  { id: 'cs', name: '客户成功部', code: 'CS' },
  { id: 'hr', name: '人力资源部', code: 'HR' },
  { id: 'finance', name: '财务部', code: 'FI' },
  { id: 'legal', name: '法务合规部', code: 'LG' },
  { id: 'admin', name: '行政部', code: 'GA' },
  { id: 'supply', name: '供应链管理部', code: 'SC' },
  { id: 'oversea', name: '海外事业部', code: 'OS' },
];

export const JOB_ROLES = [
  { id: 'fe', name: '前端工程师', dept: 'tech' },
  { id: 'be', name: '后端工程师', dept: 'tech' },
  { id: 'qa', name: '测试工程师', dept: 'tech' },
  { id: 'sre', name: '运维工程师', dept: 'tech' },
  { id: 'algo', name: '算法工程师', dept: 'data' },
  { id: 'analyst', name: '数据分析师', dept: 'data' },
  { id: 'pm', name: '产品经理', dept: 'product' },
  { id: 'designer', name: 'UI 设计师', dept: 'product' },
  { id: 'marcom', name: '市场专员', dept: 'growth' },
  { id: 'salesrep', name: '销售代表', dept: 'sales' },
  { id: 'csm', name: '客户成功经理', dept: 'cs' },
  { id: 'hrofficer', name: 'HR 专员', dept: 'hr' },
  { id: 'accountant', name: '财务专员', dept: 'finance' },
  { id: 'paralegal', name: '法务专员', dept: 'legal' },
];

// 可选审批人/上级（中文人名 mock；与当前登录用户不同人）
export const PEOPLE = [
  { id: 'p01', name: '陈景明', title: '技术部负责人', dept: '技术研发部' },
  { id: 'p02', name: '林晚晴', title: '产品总监', dept: '产品设计部' },
  { id: 'p03', name: '周子昂', title: '数据智能部经理', dept: '数据智能部' },
  { id: 'p04', name: '沈亦菲', title: '增长负责人', dept: '市场增长部' },
  { id: 'p05', name: '赵启航', title: '华东销售总监', dept: '销售部' },
  { id: 'p06', name: '吴思远', title: '客户成功经理', dept: '客户成功部' },
  { id: 'p07', name: '郑雨桐', title: 'HRBP', dept: '人力资源部' },
  { id: 'p08', name: '韩志诚', title: '财务经理', dept: '财务部' },
  { id: 'p09', name: '苏黎', title: '法务负责人', dept: '法务合规部' },
  { id: 'p10', name: '马啸风', title: '行政主管', dept: '行政部' },
];

export const WORK_SITES = [
  '北京总部 · 望京 A 座',
  '上海分公司 · 张江园区',
  '深圳研发中心 · 科技园',
  '杭州办公室 · 西溪',
  '成都办公室 · 高新南区',
  '远程办公',
];

export const EMPLOYMENT_TYPES = ['正式全职', '合同制', '劳务派遣', '实习生', '兼职'];

export const PROBATION_OPTIONS = [
  { value: 0, label: '无试用期（转正调入）' },
  { value: 3, label: '3 个月' },
  { value: 6, label: '6 个月' },
];

// 成本中心（财务口径 mock）
export const COST_CENTERS = [
  { id: 'CC-1001', name: 'CC-1001 · 技术研发' },
  { id: 'CC-1002', name: 'CC-1002 · 数据与算法' },
  { id: 'CC-2001', name: 'CC-2001 · 产品设计' },
  { id: 'CC-3001', name: 'CC-3001 · 市场与销售' },
  { id: 'CC-4001', name: 'CC-4001 · 职能支持' },
  { id: 'CC-4002', name: 'CC-4002 · 海外业务' },
];

// 提交成功后的入职流程节点模板（role 决定第 2 节点的说明文案）
export const PROCESS_TEMPLATE = [
  { id: 'accept', title: '资料受理', desc: '入职单已建档，HR 录入信息已锁定' },
  { id: 'comp', title: '薪酬与审批确认', desc: null /* 按 role 填充 */ },
  { id: 'account', title: '账号与权限开通', desc: '企业邮箱、门禁与业务系统账号' },
  { id: 'device', title: '设备与工位准备', desc: '按岗位标准配发电脑与外设' },
  { id: 'training', title: '入职培训安排', desc: '新员工训练营与部门带教匹配' },
  { id: 'onboard', title: '入职日报到', desc: '工牌拍照、合同签署与迎新' },
];

export const CURRENT_USER = { id: 'u-wang', name: '王岚', title: 'HR 专员' };

// 角色定义：HR 视角不可见财务字段与「审批人指定」步；管理员全字段可见
export const ROLES = {
  hr: { id: 'hr', label: 'HR 专员（当前登录）', canSeeFinance: false, canAssignApprover: false },
  admin: { id: 'admin', label: '系统管理员', canSeeFinance: true, canAssignApprover: true },
};
