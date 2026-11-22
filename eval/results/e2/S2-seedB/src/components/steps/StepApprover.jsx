// 第 3 步（仅管理员）：审批人指定。HR 视角整个步骤不进入 steps 列表，本组件不会被渲染。
import { SelectField, TextareaField } from '../fields.jsx';
import { PEOPLE } from '../../data/dict.js';

export default function StepApprover({ data, errors, onChange, onBlur }) {
  const approverOptions = PEOPLE.filter((p) => p.id !== data.supervisor).map((p) => ({
    value: p.id,
    label: `${p.name} · ${p.title}`,
  }));
  const ccCandidates = PEOPLE.slice(0, 6);
  const toggleCc = (id, checked) =>
    onChange('ccList', checked ? [...data.ccList, id] : data.ccList.filter((x) => x !== id));

  return (
    <div className="flex flex-col gap-4">
      <SelectField
        id="mainApprover"
        label="主审批人"
        error={errors.mainApprover}
        options={approverOptions}
        hint="默认审批链：直属上级 → 部门负责人 → HRBP；主审批人不能与直属上级为同一人"
        value={data.mainApprover}
        onChange={(e) => onChange('mainApprover', e.target.value)}
        onBlur={() => onBlur('mainApprover')}
      />

      <fieldset className="m-0 border-0 p-0">
        <legend className="p-0 text-sm font-medium text-ink-700">抄送人（选填）</legend>
        <p className="mt-1 text-xs text-ink-500">薪酬确认节点将同步抄送给所选人员</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ccCandidates.map((p) => (
            <label
              key={p.id}
              htmlFor={`f-ccList-${p.id}`}
              className="flex items-center gap-2 rounded-md border border-ink-200 px-2 py-2 text-sm text-ink-700 transition-colors motion-reduce:transition-none hover:bg-ink-100 focus-within:ring-2 focus-within:ring-brand-600"
            >
              <input
                id={`f-ccList-${p.id}`}
                name="ccList"
                type="checkbox"
                checked={data.ccList.includes(p.id)}
                onChange={(e) => toggleCc(p.id, e.target.checked)}
                className="h-4 w-4 rounded-sm border border-ink-300 text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
              />
              {p.name} · {p.title}
            </label>
          ))}
        </div>
      </fieldset>

      <TextareaField
        id="approveNote"
        label="给审批人的说明"
        required={false}
        error={errors.approveNote}
        rows={2}
        placeholder="如：该岗位为关键补位，请优先安排审批"
        hint="将展示在审批人的待办详情中"
        value={data.approveNote}
        onChange={(e) => onChange('approveNote', e.target.value)}
        onBlur={() => onBlur('approveNote')}
      />
    </div>
  );
}
