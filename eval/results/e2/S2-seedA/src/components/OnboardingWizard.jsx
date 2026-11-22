import { useEffect, useMemo, useRef, useState } from 'react';
import { FIELD_LABELS, ROLES, visibleSteps, fieldsOfStep } from '../permissions.js';
import { validateField, validateFields } from '../validation.js';
import { submitOnboarding } from '../data/dictionaries.js';
import WizardSteps from './WizardSteps.jsx';
import ErrorSummary from './ErrorSummary.jsx';
import { WizardSkeleton, LoadError, DictEmpty } from './StatePanels.jsx';
import { SubmitSuccess, SubmitFailure } from './FlowResult.jsx';
import { PrimaryButton, SecondaryButton } from './Button.jsx';
import StepBasic from '../steps/StepBasic.jsx';
import StepPosition from '../steps/StepPosition.jsx';
import StepApprover from '../steps/StepApprover.jsx';
import StepReview from '../steps/StepReview.jsx';
import { InfoIcon, Spinner } from './Icons.jsx';

const INITIAL_VALUES = {
  name: '',
  idNumber: '',
  mobile: '',
  email: '',
  hireDate: '',
  employmentType: '',
  departmentId: '',
  positionId: '',
  managerId: '',
  permissionIds: [],
  effectDate: '',
  // 以下三组仅管理员视角渲染（HR 视角不进 DOM，见 permissions.js）
  salaryGrade: '',
  monthlySalary: '',
  budgetCenterId: '',
  deptApproverId: '',
  financeApproverId: '',
  ccIds: [],
  approverNote: '',
  confirmed: false,
};

function Card({ children }) {
  return (
    <div className="rounded-lg border border-ink-200 bg-white p-6 shadow-card sm:p-8">{children}</div>
  );
}

function PageHeader({ role }) {
  const r = ROLES[role];
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold text-ink-900">新员工入职</h1>
      <p className="mt-1 text-sm text-ink-500">
        建立员工档案、开通系统权限并启动审批流程；全流程平均 3 个工作日。
      </p>
      <div className="mt-3 flex items-start gap-2 rounded-md border border-primary-100 bg-primary-50 px-3 py-2">
        <InfoIcon className="mt-1 h-4 w-4 shrink-0 text-primary-700" />
        <p className="text-sm leading-6 text-ink-700">
          {r.scopeNote}
          <span className="ml-1 text-xs text-ink-500">右上角可切换视角，对比权限差异。</span>
        </p>
      </div>
    </div>
  );
}

export default function OnboardingWizard({ role, dictState }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [stepId, setStepId] = useState('basic');
  const [submit, setSubmit] = useState({ status: 'idle', ticket: null, message: '' });

  const summaryRef = useRef(null);
  const failPanelRef = useRef(null);
  const headingRef = useRef(null);
  const mountedOnce = useRef(false);

  const dict = dictState.status === 'success' ? dictState.data : null;
  const steps = visibleSteps(role);
  const stepIndex = Math.max(0, steps.findIndex((s) => s.id === stepId));
  const currentStep = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  // 视角切换：当前步在新区不可见时落到复核步；清理不可见字段的残留错误
  useEffect(() => {
    if (!steps.some((s) => s.id === stepId)) setStepId('review');
    const visible = new Set(steps.flatMap((s) => fieldsOfStep(s, role)));
    setErrors((prev) => {
      const next = {};
      for (const [k, v] of Object.entries(prev)) if (visible.has(k)) next[k] = v;
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // 字典就绪后按公司默认策略预勾系统权限（只补一次，不覆盖用户选择）
  useEffect(() => {
    if (!dict) return;
    setValues((v) =>
      v.permissionIds.length
        ? v
        : {
            ...v,
            permissionIds: dict.permissionGroups
              .flatMap((g) => g.items)
              .filter((i) => i.default)
              .map((i) => i.id),
          },
    );
  }, [dict]);

  // 步骤/提交状态切换后移动焦点（跳过首屏；失败聚焦失败面板）
  useEffect(() => {
    if (!mountedOnce.current) {
      mountedOnce.current = true;
      return;
    }
    if (submit.status === 'error') {
      failPanelRef.current?.focus();
      return;
    }
    if (submit.status === 'success' || submit.status === 'submitting') return;
    headingRef.current?.focus();
  }, [stepId, submit.status]);

  const handleChange = (fieldId, value) => {
    const prev = values;
    const next = { ...prev, [fieldId]: value };
    // 换部门：清理不属于新部门的岗位与上级，避免脏数据进入复核
    if (fieldId === 'departmentId' && dict) {
      const dept = dict.departments.find((d) => d.id === value);
      if (dept) {
        if (!dept.positions.some((p) => p.id === next.positionId)) next.positionId = '';
        if (!dict.managers.some((m) => m.id === next.managerId && m.deptId === value)) {
          next.managerId = '';
        }
      }
    }
    // 入职日期变化：未手动改过（或等值跟随）的生效日期随动
    if (fieldId === 'hireDate' && (!prev.effectDate || prev.effectDate === prev.hireDate)) {
      next.effectDate = value;
    }
    setValues(next);
    // 已有错误的字段输入时即时复验，修复即清除
    if (errors[fieldId]) {
      const msg = validateField(fieldId, next, dict);
      setErrors((e) => {
        const n = { ...e };
        if (msg) n[fieldId] = msg;
        else delete n[fieldId];
        return n;
      });
    }
  };

  const handleBlur = (fieldId) => {
    const msg = validateField(fieldId, values, dict);
    setErrors((e) => {
      const n = { ...e };
      if (msg) n[fieldId] = msg;
      else delete n[fieldId];
      return n;
    });
  };

  const goStep = (index) => setStepId(steps[index].id);

  const focusSummarySoon = () => {
    setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const doSubmit = () => {
    const allFields = steps.flatMap((s) => fieldsOfStep(s, role));
    const errs = validateFields(allFields, values, dict);
    if (Object.keys(errs).length) {
      // 提交前汇总阻断：跳到首个错误所在步骤并聚焦错误摘要（INV-002）
      const firstBad = steps.find((s) => fieldsOfStep(s, role).some((f) => errs[f]));
      setErrors((prev) => ({ ...prev, ...errs }));
      setStepId(firstBad.id);
      focusSummarySoon();
      return;
    }
    setSubmit({ status: 'submitting', ticket: null, message: '' });
    submitOnboarding({ ...values, submittedBy: ROLES[role].user, role })
      .then((ticket) => setSubmit({ status: 'success', ticket, message: '' }))
      .catch((error) =>
        setSubmit({ status: 'error', ticket: null, message: String(error?.message || error) }),
      );
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (e.nativeEvent?.isComposing) return; // IME 兜底（正常由 onKeyDown 拦截）
    if (submit.status === 'submitting') return;
    const fields = fieldsOfStep(currentStep, role);
    const errs = validateFields(fields, values, dict);
    setErrors((prev) => {
      const next = { ...prev };
      for (const f of fields) delete next[f];
      return { ...next, ...errs };
    });
    if (Object.keys(errs).length) {
      focusSummarySoon();
      return;
    }
    if (!isLast) {
      setStepId(steps[stepIndex + 1].id);
      return;
    }
    doSubmit();
  };

  // 中文输入法组词期间的 Enter 是确认候选，不是提交（uu-forms-efficiency）
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing) e.preventDefault();
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStepId('basic');
    setSubmit({ status: 'idle', ticket: null, message: '' });
    setTimeout(() => headingRef.current?.focus(), 0);
  };

  const jumpToField = (fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) el.focus();
  };

  // 错误摘要内容：当前步字段优先，其余可见步骤错误殿后（视角切换的边缘情况）
  const summaryErrors = useMemo(() => {
    const out = {};
    for (const f of fieldsOfStep(currentStep, role)) if (errors[f]) out[f] = errors[f];
    for (const s of steps) {
      for (const f of fieldsOfStep(s, role)) {
        if (errors[f] && !(f in out)) out[f] = errors[f];
      }
    }
    return out;
  }, [errors, currentStep, steps, role]);

  let body;
  if (dictState.status === 'loading') {
    body = (
      <Card>
        <WizardSkeleton />
      </Card>
    );
  } else if (dictState.status === 'error') {
    body = (
      <Card>
        <LoadError message={dictState.error} onRetry={dictState.reload} />
      </Card>
    );
  } else if (!dict.departments.length) {
    body = (
      <Card>
        <DictEmpty onRetry={dictState.reload} />
      </Card>
    );
  } else if (submit.status === 'success') {
    body = (
      <SubmitSuccess
        ticket={submit.ticket}
        role={role}
        values={values}
        dict={dict}
        onReset={handleReset}
      />
    );
  } else {
    body = (
      <Card>
        <div className="border-b border-ink-200 pb-5">
          <WizardSteps steps={steps} currentIndex={stepIndex} onGoTo={goStep} />
        </div>
        {submit.status === 'error' ? (
          <div className="pt-6">
            <SubmitFailure message={submit.message} panelRef={failPanelRef} />
          </div>
        ) : null}
        <form onSubmit={handleNext} onKeyDown={handleKeyDown} noValidate className={submit.status === 'error' ? '' : 'pt-6'}>
          <section aria-labelledby={`step-${currentStep.id}-heading`}>
            <h2
              id={`step-${currentStep.id}-heading`}
              ref={headingRef}
              tabIndex={-1}
              className="flex flex-wrap items-baseline gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-4"
            >
              <span className="text-lg font-semibold text-ink-900">{currentStep.title}</span>
              <span className="text-sm font-normal text-ink-500">
                第 {stepIndex + 1} / {steps.length} 步
              </span>
            </h2>
            <p className="mt-1 text-sm text-ink-500">{currentStep.hint}</p>
            <ErrorSummary
              errors={summaryErrors}
              labels={FIELD_LABELS}
              onJump={jumpToField}
              actionText={isLast ? '提交' : '进入下一步'}
              panelRef={summaryRef}
            />
            <div className="pt-2">
              {currentStep.id === 'basic' ? (
                <StepBasic values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} />
              ) : null}
              {currentStep.id === 'position' ? (
                <StepPosition
                  values={values}
                  errors={errors}
                  dict={dict}
                  role={role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ) : null}
              {currentStep.id === 'approver' ? (
                <StepApprover
                  values={values}
                  errors={errors}
                  dict={dict}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ) : null}
              {currentStep.id === 'review' ? (
                <StepReview
                  role={role}
                  values={values}
                  errors={errors}
                  dict={dict}
                  onEditStep={goStep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ) : null}
            </div>
          </section>
          <div className="mt-2 flex items-center justify-between border-t border-ink-200 pt-4">
            {stepIndex > 0 ? (
              <SecondaryButton type="button" onClick={() => setStepId(steps[stepIndex - 1].id)}>
                上一步
              </SecondaryButton>
            ) : (
              <span aria-hidden="true" />
            )}
            {isLast ? (
              <PrimaryButton type="submit" disabled={submit.status === 'submitting'}>
                {submit.status === 'submitting' ? (
                  <>
                    <Spinner />
                    提交中…
                  </>
                ) : (
                  '提交并启动流程'
                )}
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit">下一步</PrimaryButton>
            )}
          </div>
        </form>
      </Card>
    );
  }

  return (
    <div>
      <PageHeader role={role} />
      {body}
      <p className="mt-4 text-center text-xs text-ink-500">
        原型演示开关（URL 参数）：?mock=slow · error · empty · submit-fail；默认当前用户为 HR
        专员。
      </p>
    </div>
  );
}
