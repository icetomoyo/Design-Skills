// 校验规则（INV-002）：失焦触发 + “下一步”/“提交”兜底。
// 约定：每个校验器返回错误文案（'' 表示通过）；文案说明“怎么修”，不只说“格式错误”。

const CN_NAME_RE = /^[\u4e00-\u9fa5]{2,10}(·[\u4e00-\u9fa5]{2,10})?$/;
const LATIN_NAME_RE = /^[A-Za-z][A-Za-z\s'.-]{1,39}$/;
const MOBILE_RE = /^1[3-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ID_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ID_CHECK_CODES = '10X98765432';

/** GB 11643 十八位身份证校验位验证 */
export function isValidIdNumber(v) {
  if (!/^\d{17}[\dXx]$/.test(v)) return false;
  let sum = 0;
  for (let i = 0; i < 17; i += 1) sum += Number(v[i]) * ID_WEIGHTS[i];
  return ID_CHECK_CODES[sum % 11] === v[17].toUpperCase();
}

function toDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return null;
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function todayStart() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** 本地时区的今天（YYYY-MM-DD），供 date input 的 min 使用 */
export function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function validateField(fieldId, values, dict) {
  const v = values[fieldId];
  switch (fieldId) {
    case 'name': {
      const t = String(v || '').trim();
      if (!t) return '请输入姓名';
      if (!CN_NAME_RE.test(t) && !LATIN_NAME_RE.test(t)) {
        return '请输入 2-10 位中文姓名（少数民族姓名可用 · 分隔）';
      }
      return '';
    }
    case 'idNumber':
      if (!v) return '请输入证件号码';
      if (!isValidIdNumber(v)) return '请核对 18 位身份证号（出生日期段与末位校验码）';
      return '';
    case 'mobile':
      if (!v) return '请输入手机号';
      if (!MOBILE_RE.test(String(v).trim())) return '请输入 11 位大陆手机号（1 开头，不含空格或短横线）';
      return '';
    case 'email':
      if (!v) return '请输入邮箱';
      if (!EMAIL_RE.test(String(v).trim())) return '请输入有效邮箱，例如 wang.yizhou@example.com';
      return '';
    case 'hireDate': {
      if (!v) return '请选择入职日期';
      const d = toDate(v);
      if (!d) return '请选择有效日期';
      if (d < todayStart()) return '入职日期不能早于今天；往期入职请走员工档案补录流程';
      return '';
    }
    case 'employmentType':
      return v ? '' : '请选择用工类型';
    case 'departmentId':
      return v ? '' : '请选择部门';
    case 'positionId': {
      if (!v) return '请选择岗位';
      const dept = (dict?.departments || []).find((d) => d.id === values.departmentId);
      if (dept && !dept.positions.some((p) => p.id === v)) return '该岗位不属于所选部门，请重新选择';
      return '';
    }
    case 'managerId': {
      if (!v) return '请选择直属上级';
      const m = (dict?.managers || []).find((x) => x.id === v);
      if (m && values.departmentId && m.deptId !== values.departmentId) {
        return '直属上级需与员工同部门，请重新选择';
      }
      return '';
    }
    case 'permissionIds':
      return Array.isArray(v) && v.length > 0 ? '' : '请至少勾选 1 项系统权限（基础办公项默认开通）';
    case 'effectDate': {
      if (!v) return '请选择权限生效日期';
      const d = toDate(v);
      const h = toDate(values.hireDate);
      if (d && h && d < h) return '生效日期不能早于入职日期';
      return '';
    }
    case 'salaryGrade':
      return v ? '' : '请选择定薪档级';
    case 'monthlySalary': {
      if (v === '' || v == null) return '请输入月薪标准';
      const n = Number(String(v).replace(/[,，\s]/g, ''));
      if (!Number.isFinite(n)) return '请输入数字金额，例如 18000';
      if (n < 3000 || n > 300000) return '月薪标准需在 3,000 至 300,000 元之间';
      return '';
    }
    case 'budgetCenterId':
      return v ? '' : '请选择预算中心';
    case 'deptApproverId':
      return v ? '' : '请选择部门审批人';
    case 'financeApproverId': {
      if (!v) return '请选择财务审批人';
      if (v === values.deptApproverId) return '财务审批人需与部门审批人为不同的人';
      return '';
    }
    case 'approverNote':
      return (v || '').length <= 200 ? '' : '审批备注不超过 200 字';
    case 'confirmed':
      return v ? '' : '请先勾选“我已核对以上信息”再提交';
    default:
      return '';
  }
}

/** 对一组字段执行校验，返回 { fieldId: 错误文案 } */
export function validateFields(fieldIds, values, dict) {
  const errors = {};
  for (const id of fieldIds) {
    const msg = validateField(id, values, dict);
    if (msg) errors[id] = msg;
  }
  return errors;
}
