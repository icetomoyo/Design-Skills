// 权限模型与步骤定义
// INV-003：权限差异发生在渲染层——HR 视角不渲染财务字段组与“审批人指定”步，
// DOM 中不出现这些字段（含已填值），不是 CSS/禁用隐藏。
export const ROLES = {
  hr: {
    id: 'hr',
    label: 'HR 专员',
    user: '陈慧',
    showFinance: false,
    showApproverStep: false,
    scopeNote:
      '当前为 HR 专员视角：薪资与预算字段由财务管理员在定薪环节维护（本页不出现），流程不含“审批人指定”步，共 3 步。',
  },
  admin: {
    id: 'admin',
    label: '管理员',
    user: '张明远',
    showFinance: true,
    showApproverStep: true,
    scopeNote:
      '当前为管理员视角：可见并填写薪资与预算字段，流程包含“审批人指定”步，共 4 步。',
  },
};

// 财务字段清单：整组仅对管理员渲染
export const FINANCE_FIELDS = ['salaryGrade', 'monthlySalary', 'budgetCenterId'];

export const STEP_DEFS = [
  {
    id: 'basic',
    title: '基本信息',
    hint: '证件与联系方式',
    fields: ['name', 'idNumber', 'mobile', 'email', 'hireDate', 'employmentType'],
  },
  {
    id: 'position',
    title: '岗位与权限',
    hint: '部门、岗位与系统开通',
    fields: ['departmentId', 'positionId', 'managerId', 'permissionIds', 'effectDate'],
    financeFields: FINANCE_FIELDS,
  },
  {
    id: 'approver',
    title: '审批人指定',
    hint: '流程流转节点',
    roles: ['admin'], // HR 视角不渲染此步
    fields: ['deptApproverId', 'financeApproverId', 'approverNote'],
  },
  {
    id: 'review',
    title: '复核提交',
    hint: '核对并启动流程',
    fields: ['confirmed'],
  },
];

export function visibleSteps(roleId) {
  return STEP_DEFS.filter((s) => !s.roles || s.roles.includes(roleId));
}

// 某步骤在给定视角下需要校验/渲染的字段（管理员才追加财务字段）
export function fieldsOfStep(step, roleId) {
  const base = [...step.fields];
  if (step.financeFields && roleId === 'admin') base.push(...step.financeFields);
  return base;
}

export const FIELD_LABELS = {
  name: '姓名',
  idNumber: '证件号码',
  mobile: '手机号',
  email: '邮箱',
  hireDate: '入职日期',
  employmentType: '用工类型',
  departmentId: '部门',
  positionId: '岗位',
  managerId: '直属上级',
  permissionIds: '系统权限',
  effectDate: '生效日期',
  salaryGrade: '定薪档级',
  monthlySalary: '月薪标准',
  budgetCenterId: '预算中心',
  deptApproverId: '部门审批人',
  financeApproverId: '财务审批人',
  approverNote: '审批备注',
  confirmed: '确认声明',
};

export const EMPLOYMENT_TYPES = [
  { id: 'full', name: '正式员工' },
  { id: 'intern', name: '实习生' },
  { id: 'dispatch', name: '劳务派遣' },
  { id: 'rehire', name: '退休返聘' },
];
