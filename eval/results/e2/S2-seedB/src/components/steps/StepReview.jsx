// 复核提交步：错误汇总（role=alert，聚焦标题，逐条跳转到字段）+ 已填信息核对 + 确认勾选。
// 汇总条目按 DOM/视觉顺序生成（首条即第一个错误）。
import { useEffect, useRef } from 'react';
import { CheckboxField } from '../fields.jsx';
import { COST_CENTERS, DEPARTMENTS, JOB_ROLES, PEOPLE, PROBATION_OPTIONS } from '../../data/dict.js';
import { formatCNY } from '../../lib/format.js';

function Row({ label, value, muted }) {
  return (
    <div className="flex gap-4 py-1">
      <dt className="w-32 shrink-0 text-sm text-ink-500">{label}</dt>
      <dd className={`m-0 min-w-0 break-words text-sm ${muted ? 'text-ink-400' : 'text-ink-900'}`}>{value}</dd>
    </div>
  );
}

const dash = (v) => (v === '' || v === null || v === undefined ? '—' : v);

export default function StepReview({ role, data, errors, summaryItems, onJump, onChange, onBlur }) {
  const summaryRef = useRef(null);

  useEffect(() => {
    if (summaryItems && summaryItems.length) {
      if (summaryRef.current) summaryRef.current.focus();
    }
  }, [summaryItems]);

  const deptName = (id) => (DEPARTMENTS.find((d) => d.id === id) || {}).name || dash(id);
  const roleName = (id) => (JOB_ROLES.find((r) => r.id === id) || {}).name || dash(id);
  const personLabel = (id) => {
    const p = PEOPLE.find((x) => x.id === id);
    return p ? `${p.name}（${p.title}）` : dash(id);
  };
  const probationLabel = (v) =>
    (PROBATION_OPTIONS.find((o) => String(o.value) === String(v)) || {}).label || '—';
  const costCenterName = (id) => (COST_CENTERS.find((c) => c.id === id) || {}).name || dash(id);

  return (
    <div className="flex flex-col gap-6">
      {summaryItems && summaryItems.length > 0 && (
        <div role="alert" aria-labelledby="err-summary-title" className="rounded-md border border-danger-600 bg-danger-50 p-4">
          <h3
            id="err-summary-title"
            ref={summaryRef}
            tabIndex={-1}
            className="m-0 text-sm font-semibold text-danger-700"
          >
            有 {summaryItems.length} 项信息需要修改，提交已阻断
          </h3>
          <ul className="mt-2 mb-0 flex list-none flex-col gap-1 p-0">
            {summaryItems.map((it) => (
              <li key={it.name} className="text-sm">
                <button
                  type="button"
                  onClick={() => onJump(it.name)}
                  className="rounded-sm text-left text-danger-700 underline underline-offset-2 transition-colors motion-reduce:transition-none hover:text-danger-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {it.stepTitle} · {it.label}：{it.message}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 mb-0 text-xs text-ink-600">点击任一条可返回对应步骤并聚焦到该字段。</p>
        </div>
      )}

      <section aria-labelledby="rev-basic">
        <h3 id="rev-basic" className="m-0 text-sm font-semibold text-ink-800">
          基本信息
        </h3>
        <dl className="mt-2 mb-0 flex flex-col p-0">
          <Row label="姓名" value={dash(data.fullName)} />
          <Row label="手机号" value={dash(data.phone)} />
          <Row label="个人邮箱" value={dash(data.email)} />
          <Row label="身份证号" value={dash(data.idCard)} />
          <Row label="入职日期" value={dash(data.hireDate)} />
          <Row label="用工性质" value={dash(data.employmentType)} />
        </dl>
      </section>

      <section aria-labelledby="rev-position">
        <h3 id="rev-position" className="m-0 text-sm font-semibold text-ink-800">
          岗位与权限
        </h3>
        <dl className="mt-2 mb-0 flex flex-col p-0">
          <Row label="部门" value={deptName(data.department)} />
          <Row label="岗位" value={roleName(data.jobRole)} />
          <Row label="直属上级" value={personLabel(data.supervisor)} />
          <Row label="工作地点" value={dash(data.workSite)} />
          <Row label="试用期" value={probationLabel(data.probationMonths)} />
          {role === 'admin' ? (
            <>
              <Row label="试用期月薪" value={`¥ ${formatCNY(data.salaryProbation)} / 月`} />
              <Row label="转正月薪" value={`¥ ${formatCNY(data.salaryRegular)} / 月`} />
              <Row label="成本中心" value={costCenterName(data.costCenter)} />
            </>
          ) : (
            <Row label="薪酬与成本" value="由系统管理员在审批阶段补充（HR 视角不渲染该字段组）" muted />
          )}
        </dl>
      </section>

      {role === 'admin' && (
        <section aria-labelledby="rev-approver">
          <h3 id="rev-approver" className="m-0 text-sm font-semibold text-ink-800">
            审批人指定
          </h3>
          <dl className="mt-2 mb-0 flex flex-col p-0">
            <Row label="主审批人" value={personLabel(data.mainApprover)} />
            <Row
              label="抄送人"
              value={
                data.ccList.length ? data.ccList.map((id) => personLabel(id).split('（')[0]).join('、') : '—'
              }
            />
            <Row label="审批说明" value={dash(data.approveNote)} />
          </dl>
        </section>
      )}
      {role === 'hr' && (
        <p className="m-0 rounded-md border border-ink-200 bg-ink-50 p-3 text-xs leading-5 text-ink-600">
          审批链说明：HR 提交后由系统管理员在「审批人指定」步骤完成审批链配置（该步骤在 HR
          视角不渲染），随后进入薪酬确认与账号开通。
        </p>
      )}

      <section aria-labelledby="rev-confirm">
        <h3 id="rev-confirm" className="m-0 text-sm font-semibold text-ink-800">
          确认提交
        </h3>
        <div className="mt-2">
          <CheckboxField
            id="confirmChecked"
            label="确认核对"
            error={errors.confirmChecked}
            checked={data.confirmChecked}
            onChange={(e) => onChange('confirmChecked', e.target.checked)}
            onBlur={() => onBlur('confirmChecked')}
          >
            我已核对以上信息，确认提交入职申请
          </CheckboxField>
          <p className="m-0 text-xs text-ink-500">
            如需修改，点击上方步骤条中已完成的步骤即可返回，已填内容会保留。
          </p>
        </div>
      </section>
    </div>
  );
}
