import { TextField, SelectField, CheckboxGroup } from '../components/Field.jsx';
import { todayISO } from '../validation.js';
import { InfoIcon } from '../components/Icons.jsx';

/**
 * 第 2 步：岗位与权限。
 * 财务字段组（定薪档级/月薪标准/预算中心）仅管理员视角渲染；
 * HR 视角整组不出现在 DOM 中（INV-003，非 CSS/禁用隐藏），仅保留一条业务说明。
 */
export default function StepPosition({ values, errors, dict, role, onChange, onBlur }) {
  const showFinance = role === 'admin';
  const dept = dict.departments.find((d) => d.id === values.departmentId);
  const positions = dept ? dept.positions : [];
  const managers = dict.managers.filter(
    (m) => !values.departmentId || m.deptId === values.departmentId,
  );

  return (
    <div>
      <h3 className="mb-4 text-sm font-medium text-ink-900">部门与岗位</h3>
      <SelectField
        id="departmentId"
        label="部门"
        required
        error={errors.departmentId}
        value={values.departmentId}
        onChange={onChange}
        onBlur={onBlur}
        options={dict.departments.map((d) => ({
          value: d.id,
          label: `${d.name}（${d.headcount} 人）`,
        }))}
      />
      <SelectField
        id="positionId"
        label="岗位"
        required
        error={errors.positionId}
        disabled={!dept}
        placeholder={dept ? '请选择岗位' : '请先选择部门'}
        value={values.positionId}
        onChange={onChange}
        onBlur={onBlur}
        options={positions.map((p) => ({ value: p.id, label: `${p.name} · ${p.level}` }))}
      />
      <SelectField
        id="managerId"
        label="直属上级"
        required
        error={errors.managerId}
        disabled={!dept}
        placeholder={dept ? (managers.length ? '请选择直属上级' : '该部门暂无登记负责人') : '请先选择部门'}
        value={values.managerId}
        onChange={onChange}
        onBlur={onBlur}
        options={managers.map((m) => ({ value: m.id, label: `${m.name} · ${m.title}` }))}
      />
      <CheckboxGroup
        id="permissionIds"
        legendLabel="系统权限"
        required
        error={errors.permissionIds}
        groups={dict.permissionGroups}
        values={values.permissionIds}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        id="effectDate"
        label="权限生效日期"
        required
        error={errors.effectDate}
        hint="默认随入职日期生效"
        type="date"
        min={values.hireDate || todayISO()}
        value={values.effectDate}
        onChange={onChange}
        onBlur={onBlur}
      />
      {showFinance ? (
        <>
          <h3 className="mb-4 mt-2 text-sm font-medium text-ink-900">薪资与预算（仅管理员可见）</h3>
          <SelectField
            id="salaryGrade"
            label="定薪档级"
            required
            error={errors.salaryGrade}
            value={values.salaryGrade}
            onChange={onChange}
            onBlur={onBlur}
            options={dict.salaryGrades.map((g) => ({ value: g, label: g }))}
          />
          <TextField
            id="monthlySalary"
            label="月薪标准"
            required
            error={errors.monthlySalary}
            unit="元/月"
            hint="税前固定部分；试用期按 80% 执行"
            inputMode="decimal"
            placeholder="例如 18000"
            value={values.monthlySalary}
            onChange={onChange}
            onBlur={onBlur}
          />
          <SelectField
            id="budgetCenterId"
            label="预算中心"
            required
            error={errors.budgetCenterId}
            value={values.budgetCenterId}
            onChange={onChange}
            onBlur={onBlur}
            options={dict.budgetCenters.map((b) => ({ value: b.id, label: b.name }))}
          />
        </>
      ) : (
        <div className="mb-2 flex items-start gap-2 rounded-md border border-ink-200 bg-ink-50 p-3">
          <InfoIcon className="mt-1 h-4 w-4 shrink-0 text-ink-500" />
          <p className="text-sm leading-6 text-ink-700">
            薪资与预算信息由财务管理员在定薪环节补充，HR 专员办理入职时无需填写。
          </p>
        </div>
      )}
    </div>
  );
}
