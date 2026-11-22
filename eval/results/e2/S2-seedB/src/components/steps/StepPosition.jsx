// 第 2 步：岗位与权限。
// 财务字段组（试用期月薪/转正月薪/成本中心）仅 role=admin 条件渲染（INV-001：
// 非可见性 CSS 隐藏，HR 视角 DOM 中不存在该字段与任何薪酬数据）。
import { SelectField, TextField } from '../fields.jsx';
import { COST_CENTERS, DEPARTMENTS, JOB_ROLES, PEOPLE, PROBATION_OPTIONS, WORK_SITES } from '../../data/dict.js';

export default function StepPosition({ role, data, errors, onChange, onBlur }) {
  const set = (name) => (e) => onChange(name, e.target.value);
  const blur = (name) => () => onBlur(name);

  const jobOptions = JOB_ROLES.map((r) => ({
    value: r.id,
    label: `${r.name}（${(DEPARTMENTS.find((d) => d.id === r.dept) || {}).name || ''}）`,
  }));
  const supervisorOptions = PEOPLE.map((p) => ({ value: p.id, label: `${p.name} · ${p.title}` }));

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="m-0 border-0 p-0">
        <legend className="p-0 text-sm font-semibold text-ink-800">组织信息</legend>
        <div className="mt-3 flex flex-col gap-3">
          <SelectField
            id="department"
            label="部门"
            error={errors.department}
            options={DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))}
            hint="决定默认审批链走向与系统权限模板"
            value={data.department}
            onChange={set('department')}
            onBlur={blur('department')}
          />
          <SelectField
            id="jobRole"
            label="岗位"
            error={errors.jobRole}
            options={jobOptions}
            hint="岗位与所属部门不匹配时，需管理员在审批时补充说明"
            value={data.jobRole}
            onChange={set('jobRole')}
            onBlur={blur('jobRole')}
          />
          <SelectField
            id="supervisor"
            label="直属上级"
            error={errors.supervisor}
            options={supervisorOptions}
            hint="入职后第一个绩效周期由其带教评估"
            value={data.supervisor}
            onChange={set('supervisor')}
            onBlur={blur('supervisor')}
          />
          <SelectField
            id="workSite"
            label="工作地点"
            error={errors.workSite}
            options={WORK_SITES.map((s) => ({ value: s, label: s }))}
            hint="远程办公需在入职后补签远程办公协议"
            value={data.workSite}
            onChange={set('workSite')}
            onBlur={blur('workSite')}
          />
          <SelectField
            id="probationMonths"
            label="试用期"
            error={errors.probationMonths}
            options={PROBATION_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
            hint="按劳动合同约定，最长不超过 6 个月"
            value={data.probationMonths}
            onChange={set('probationMonths')}
            onBlur={blur('probationMonths')}
          />
        </div>
      </fieldset>

      {role === 'admin' ? (
        <fieldset className="m-0 rounded-md border border-ink-200 p-4">
          <legend className="px-1 text-sm font-semibold text-ink-800">薪酬与成本（仅管理员可见）</legend>
          <div className="mt-3 flex flex-col gap-3">
            <TextField
              id="salaryProbation"
              label="试用期月薪（税前）"
              inputMode="numeric"
              error={errors.salaryProbation}
              hint="单位：元/月，整数，范围 3000–200000"
              placeholder="如：15000"
              value={data.salaryProbation}
              onChange={set('salaryProbation')}
              onBlur={blur('salaryProbation')}
            />
            <TextField
              id="salaryRegular"
              label="转正月薪（税前）"
              inputMode="numeric"
              error={errors.salaryRegular}
              hint="单位：元/月；不能低于试用期月薪"
              placeholder="如：18000"
              value={data.salaryRegular}
              onChange={set('salaryRegular')}
              onBlur={blur('salaryRegular')}
            />
            <SelectField
              id="costCenter"
              label="成本中心"
              error={errors.costCenter}
              options={COST_CENTERS.map((c) => ({ value: c.id, label: c.name }))}
              hint="人力成本归集口径，提交后由财务复核"
              value={data.costCenter}
              onChange={set('costCenter')}
              onBlur={blur('costCenter')}
            />
          </div>
        </fieldset>
      ) : (
        <p className="m-0 rounded-md border border-ink-200 bg-ink-50 p-3 text-xs leading-5 text-ink-600">
          薪酬与成本字段（试用期月薪、转正月薪、成本中心）由系统管理员维护，HR
          视角不渲染该字段组；提交后流程将流转至管理员补充确认。
        </p>
      )}
    </div>
  );
}
