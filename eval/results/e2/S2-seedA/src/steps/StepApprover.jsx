import { SelectField, TextAreaField, CheckboxGroup } from '../components/Field.jsx';

/**
 * 第 3 步（仅管理员）：审批人指定。
 * 本步整体带 roles:['admin']，HR 视角连步骤都不渲染（见 permissions.js）。
 */
export default function StepApprover({ values, errors, dict, onChange, onBlur }) {
  const approverOpts = dict.approvers.map((a) => ({ value: a.id, label: `${a.name} · ${a.title}` }));
  const financeOpts = approverOpts.map((o) =>
    o.value === values.deptApproverId
      ? { ...o, label: `${o.label}（不可与部门审批人重复）`, disabled: true }
      : o,
  );
  const ccCandidates = dict.approvers.filter(
    (a) => a.id !== values.deptApproverId && a.id !== values.financeApproverId,
  );

  return (
    <div>
      <h3 className="mb-4 text-sm font-medium text-ink-900">审批节点</h3>
      <SelectField
        id="deptApproverId"
        label="部门审批人"
        required
        error={errors.deptApproverId}
        hint="提交后首先流转至该审批人"
        value={values.deptApproverId}
        onChange={onChange}
        onBlur={onBlur}
        options={approverOpts}
      />
      <SelectField
        id="financeApproverId"
        label="财务审批人"
        required
        error={errors.financeApproverId}
        hint="核定薪资与预算中心占用"
        value={values.financeApproverId}
        onChange={onChange}
        onBlur={onBlur}
        options={financeOpts}
      />
      <h3 className="mb-4 mt-2 text-sm font-medium text-ink-900">抄送与备注</h3>
      <CheckboxGroup
        id="ccIds"
        legendLabel="抄送人"
        values={values.ccIds}
        onChange={onChange}
        onBlur={onBlur}
        groups={[
          {
            group: '可选抄送人（不可与审批人重复）',
            items: ccCandidates.map((a) => ({ id: a.id, name: a.name, desc: a.title, default: false })),
          },
        ]}
      />
      <TextAreaField
        id="approverNote"
        label="审批备注"
        required={false}
        error={errors.approverNote}
        hint="补充给审批人的信息，如到岗时间的特殊安排"
        maxLength={200}
        placeholder="例如：候选人目前在外地，入职当天下午到岗"
        value={values.approverNote}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
