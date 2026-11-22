// 纯函数校验层：错误文案遵循「说怎么修」原则（forms-ux）。

const CHINESE_NAME_RE = /^[\u4e00-\u9fa5][\u4e00-\u9fa5·]{1,19}$/;
const PHONE_RE = /^1[3-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ID_RE = /^\d{17}[\dXx]$/;
const SALARY_RE = /^\d{3,6}$/;

const ID_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ID_CHECK_CHARS = '10X98765432';

export function idChecksumOk(id) {
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += Number(id[i]) * ID_WEIGHTS[i];
  return ID_CHECK_CHARS[sum % 11] === id[17].toUpperCase();
}

export function todayStr() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// 步骤与字段登记表：顺序 = DOM/视觉顺序（CHK-05：焦点序即视觉序）
export const STEP_DEFS = [
  { id: 'basic', title: '基本信息', roles: ['hr', 'admin'] },
  { id: 'position', title: '岗位与权限', roles: ['hr', 'admin'] },
  { id: 'approver', title: '审批人指定', roles: ['admin'] },
  { id: 'review', title: '复核提交', roles: ['hr', 'admin'] },
];

export const FIELD_DEFS = {
  // —— 第 1 步：基本信息 ——
  fullName: { step: 'basic', label: '姓名', roles: ['hr', 'admin'] },
  phone: { step: 'basic', label: '手机号', roles: ['hr', 'admin'] },
  email: { step: 'basic', label: '个人邮箱', roles: ['hr', 'admin'] },
  idCard: { step: 'basic', label: '身份证号', roles: ['hr', 'admin'] },
  hireDate: { step: 'basic', label: '入职日期', roles: ['hr', 'admin'] },
  employmentType: { step: 'basic', label: '用工性质', roles: ['hr', 'admin'] },

  // —— 第 2 步：岗位与权限 ——
  department: { step: 'position', label: '部门', roles: ['hr', 'admin'] },
  jobRole: { step: 'position', label: '岗位', roles: ['hr', 'admin'] },
  supervisor: { step: 'position', label: '直属上级', roles: ['hr', 'admin'] },
  workSite: { step: 'position', label: '工作地点', roles: ['hr', 'admin'] },
  probationMonths: { step: 'position', label: '试用期', roles: ['hr', 'admin'] },
  // 财务字段：仅 admin（HR 视角不渲染，INV-001）
  salaryProbation: { step: 'position', label: '试用期月薪（税前）', roles: ['admin'] },
  salaryRegular: { step: 'position', label: '转正月薪（税前）', roles: ['admin'] },
  costCenter: { step: 'position', label: '成本中心', roles: ['admin'] },

  // —— 第 3 步（仅 admin）：审批人指定 ——
  mainApprover: { step: 'approver', label: '主审批人', roles: ['admin'] },
  ccList: { step: 'approver', label: '抄送人', roles: ['admin'], optional: true },
  approveNote: { step: 'approver', label: '给审批人的说明', roles: ['admin'], optional: true },

  // —— 复核提交 ——
  confirmChecked: { step: 'review', label: '确认核对', roles: ['hr', 'admin'] },
};

export function stepsForRole(role) {
  return STEP_DEFS.filter((s) => s.roles.includes(role));
}

export function fieldNamesForStep(stepId, role) {
  return Object.keys(FIELD_DEFS).filter(
    (name) =>
      FIELD_DEFS[name].step === stepId &&
      FIELD_DEFS[name].roles.includes(role) &&
      !FIELD_DEFS[name].optional
  );
}

export function visibleFieldNames(role) {
  return Object.keys(FIELD_DEFS).filter(
    (name) => FIELD_DEFS[name].roles.includes(role) && !FIELD_DEFS[name].optional
  );
}

export function validateField(name, value, data, role) {
  const v = value === undefined || value === null ? '' : value;
  const emptyStr = typeof v === 'string' && v.trim() === '';
  switch (name) {
    case 'fullName':
      if (emptyStr) return '请输入姓名';
      if (!CHINESE_NAME_RE.test(v.trim())) return '请输入 2–20 位中文姓名，少数民族姓名可用「·」分隔';
      return '';
    case 'phone':
      if (emptyStr) return '请输入手机号';
      if (!PHONE_RE.test(v.trim())) return '请输入 11 位大陆手机号（1 开头，第二位为 3–9）';
      return '';
    case 'email':
      if (emptyStr) return '请输入个人邮箱';
      if (!EMAIL_RE.test(v.trim())) return '请输入有效邮箱地址，如 chenjm@example.com';
      return '';
    case 'idCard':
      if (emptyStr) return '请输入身份证号';
      if (!ID_RE.test(v.trim())) return '请输入 18 位身份证号，末位可为 X';
      if (!idChecksumOk(v.trim())) return '身份证校验位不匹配，请核对前 17 位数字';
      return '';
    case 'hireDate':
      if (emptyStr) return '请选择入职日期';
      if (v < todayStr()) return '入职日期不能早于今天，请重新选择';
      return '';
    case 'employmentType':
    case 'department':
    case 'jobRole':
    case 'supervisor':
    case 'workSite':
      if (emptyStr) return `请选择${FIELD_DEFS[name].label}`;
      return '';
    case 'probationMonths':
      if (v === '' || v === null || v === undefined) return '请选择试用期时长';
      return '';
    case 'salaryProbation':
    case 'salaryRegular': {
      if (emptyStr) return `请输入${FIELD_DEFS[name].label}`;
      if (!SALARY_RE.test(v.trim())) return '请输入 3000–200000 之间的整数（元/月）';
      const n = Number(v);
      if (n < 3000 || n > 200000) return '请输入 3000–200000 之间的整数（元/月）';
      const other = name === 'salaryProbation' ? data.salaryRegular : data.salaryProbation;
      if (SALARY_RE.test(String(other || '').trim())) {
        if (name === 'salaryRegular' && n < Number(other)) return '转正月薪不能低于试用期月薪';
        if (name === 'salaryProbation' && Number(other) < n && String(other).trim() !== '')
          return '试用期月薪不能高于转正月薪，请同步调整';
      }
      return '';
    }
    case 'costCenter':
      if (emptyStr) return '请选择成本中心';
      return '';
    case 'mainApprover':
      if (emptyStr) return '请选择主审批人';
      if (role === 'admin' && v === data.supervisor) return '主审批人不能与直属上级为同一人，请更换';
      return '';
    case 'confirmChecked':
      if (!v) return '请先勾选「我已核对以上信息」，再提交入职申请';
      return '';
    default:
      return '';
  }
}

export function createInitialData() {
  const data = {};
  for (const name of Object.keys(FIELD_DEFS)) {
    data[name] = name === 'confirmChecked' ? false : name === 'ccList' ? [] : '';
  }
  return data;
}
