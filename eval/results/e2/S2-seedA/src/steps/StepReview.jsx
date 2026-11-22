import { EMPLOYMENT_TYPES } from '../permissions.js';
import { ConfirmCheck } from '../components/Field.jsx';
import { InfoIcon } from '../components/Icons.jsx';

function fmtSalary(v) {
  const n = Number(String(v).replace(/[,，\s]/g, ''));
  return Number.isFinite(n) ? `${n.toLocaleString('zh-Hans-CN')} 元/月` : String(v);
}

function Row({ term, children }) {
  return (
    <div className="grid grid-cols-3 gap-4 border-b border-ink-100 py-2 last:border-b-0">
      <dt className="text-sm text-ink-500">{term}</dt>
      <dd className="col-span-2 min-w-0 text-sm text-ink-900">{children}</dd>
    </div>
  );
}

function Section({ title, stepIndex, onEditStep, children }) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between border-b border-ink-200 pb-2">
        <h3 className="text-sm font-medium text-ink-900">{title}</h3>
        <button
          type="button"
          onClick={() => onEditStep(stepIndex)}
          className="rounded text-sm text-primary-700 underline underline-offset-2 transition-colors hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
        >
          编辑{title}
        </button>
      </div>
      <dl className="pt-1">{children}</dl>
    </section>
  );
}

/**
 * 最后一步：复核提交。只读定义列表分组 + 每组“编辑”回跳（数据保留）+ 确认勾选。
 * HR 视角不渲染财务行与审批人组；管理员全量呈现。
 */
export default function StepReview({ role, values, errors, dict, onEditStep, onChange, onBlur }) {
  const showFinance = role === 'admin';
  const dept = dict.departments.find((d) => d.id === values.departmentId);
  const pos = dept?.positions.find((p) => p.id === values.positionId);
  const mgr = dict.managers.find((m) => m.id === values.managerId);
  const type = EMPLOYMENT_TYPES.find((t) => t.id === values.employmentType)?.name;
  const permItems = dict.permissionGroups
    .flatMap((g) => g.items)
    .filter((i) => values.permissionIds.includes(i.id));
  const budget = dict.budgetCenters.find((b) => b.id === values.budgetCenterId)?.name;
  const depApp = dict.approvers.find((a) => a.id === values.deptApproverId);
  const finApp = dict.approvers.find((a) => a.id === values.financeApproverId);
  const ccNames = dict.approvers.filter((a) => values.ccIds.includes(a.id)).map((a) => a.name);

  return (
    <div>
      <Section title="基本信息" stepIndex={0} onEditStep={onEditStep}>
        <Row term="姓名">{values.name}</Row>
        <Row term="证件号码">
          <span className="tabular-nums">{values.idNumber}</span>
        </Row>
        <Row term="手机号">
          <span className="tabular-nums">{values.mobile}</span>
        </Row>
        <Row term="邮箱">{values.email}</Row>
        <Row term="入职日期">{values.hireDate}</Row>
        <Row term="用工类型">{type}</Row>
      </Section>
      <Section title="岗位与权限" stepIndex={1} onEditStep={onEditStep}>
        <Row term="部门">{dept ? `${dept.name}（${dept.headcount} 人）` : ''}</Row>
        <Row term="岗位">{pos ? `${pos.name} · ${pos.level}` : ''}</Row>
        <Row term="直属上级">{mgr ? `${mgr.name}（${mgr.title}）` : ''}</Row>
        <Row term="权限生效日期">{values.effectDate}</Row>
        <Row term="系统权限">
          <span className="flex flex-wrap gap-1">
            {permItems.map((i) => (
              <span
                key={i.id}
                className="rounded border border-ink-200 bg-ink-50 px-1 text-xs leading-5 text-ink-700"
              >
                {i.name}
              </span>
            ))}
          </span>
        </Row>
        {showFinance ? (
          <>
            <Row term="定薪档级">{values.salaryGrade}</Row>
            <Row term="月薪标准">
              <span className="tabular-nums">{fmtSalary(values.monthlySalary)}</span>
              （试用期 80%）
            </Row>
            <Row term="预算中心">{budget}</Row>
          </>
        ) : null}
      </Section>
      {role === 'admin' ? (
        <Section title="审批人指定" stepIndex={2} onEditStep={onEditStep}>
          <Row term="部门审批人">{depApp ? `${depApp.name}（${depApp.title}）` : ''}</Row>
          <Row term="财务审批人">{finApp ? `${finApp.name}（${finApp.title}）` : ''}</Row>
          {ccNames.length ? <Row term="抄送人">{ccNames.join('、')}</Row> : null}
          {values.approverNote ? <Row term="审批备注">{values.approverNote}</Row> : null}
        </Section>
      ) : (
        <div className="mb-6 flex items-start gap-2 rounded-md border border-ink-200 bg-ink-50 p-3">
          <InfoIcon className="mt-1 h-4 w-4 shrink-0 text-ink-500" />
          <p className="text-sm leading-6 text-ink-700">
            薪资与预算由财务管理员在定薪环节补充；HR 提交的流程按部门默认规则流转，无需指定审批人。
          </p>
        </div>
      )}
      <ConfirmCheck
        id="confirmed"
        checked={values.confirmed}
        error={errors.confirmed}
        onChange={onChange}
        onBlur={onBlur}
        label="我已核对以上信息，确认无误并提交启动入职流程。"
      />
      <p className="text-xs leading-5 text-ink-500">
        提交后信息进入入职流程，仅 HR 与相关审批人可见；办理进度可在“入职管理 · 进行中”跟踪。
      </p>
    </div>
  );
}
