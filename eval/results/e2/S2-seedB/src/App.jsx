// S2 · 新员工入职 3 步向导（HR 视角默认，管理员视角 +1 步）
// 权限差异为条件渲染：HR 不渲染财务字段与「审批人指定」步骤（INV-001）。
import AppShell from './components/AppShell.jsx';
import Stepper from './components/Stepper.jsx';
import StepBasic from './components/steps/StepBasic.jsx';
import StepPosition from './components/steps/StepPosition.jsx';
import StepApprover from './components/steps/StepApprover.jsx';
import StepReview from './components/steps/StepReview.jsx';
import { FailurePanel, SuccessPanel } from './components/SubmitOutcome.jsx';
import { btnPrimary, btnSecondary } from './components/buttons.js';
import { CURRENT_USER, ROLES } from './data/dict.js';
import { useOnboardingWizard } from './hooks/useOnboardingWizard.js';

export default function App() {
  const wiz = useOnboardingWizard();
  const isLast = wiz.stepIndex === wiz.steps.length - 1;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Enter 键：非末步=下一步（IME 组词 Enter 不会触发隐式提交），末步=提交
    if (isLast) wiz.submit();
    else wiz.goNext();
  };

  const bind = { data: wiz.data, errors: wiz.errors, onChange: wiz.setValue, onBlur: wiz.handleBlur };
  const submitting = wiz.phase === 'submitting';

  return (
    <AppShell role={wiz.role} onRoleChange={wiz.switchRole} currentUser={CURRENT_USER}>
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4">
        {wiz.phase === 'success' && wiz.result ? (
          <SuccessPanel result={wiz.result} role={wiz.role} onReset={wiz.resetAll} />
        ) : (
          <>
            {wiz.phase === 'error' && wiz.failure && (
              <FailurePanel
                failure={wiz.failure}
                filledCount={wiz.filledCount}
                onRetry={wiz.submit}
                onBack={wiz.backToEdit}
                busy={submitting}
              />
            )}

            <header className="flex flex-col gap-1">
              <h1 className="m-0 text-xl font-semibold text-ink-900">新员工入职</h1>
              <p className="m-0 text-sm leading-6 text-ink-500">
                按 offer 信息录入新员工资料，提交后自动进入入职流程。当前视角：
                {ROLES[wiz.role].label}
                {wiz.role === 'hr'
                  ? '，薪酬/成本字段与「审批人指定」步骤不渲染（共 3 步）'
                  : '，可见全部字段与步骤（共 4 步）'}
              </p>
            </header>

            <Stepper steps={wiz.steps} current={wiz.stepIndex} onGoToStep={wiz.goToStep} />

            <form
              onSubmit={handleFormSubmit}
              noValidate
              aria-label={`入职向导，第 ${wiz.stepIndex + 1} 步：${wiz.step.title}`}
              className="rounded-lg border border-ink-200 bg-surface p-6 shadow-card"
            >
              <h2 className="m-0 text-lg font-semibold text-ink-900">{wiz.step.title}</h2>
              <p className="mt-1 text-xs text-ink-500">
                带
                <span aria-hidden="true" className="text-danger-600">
                  *
                </span>
                <span className="sr-only">星号</span>
                为必填项；失焦即时校验
              </p>

              <div className="mt-4">
                {wiz.step.id === 'basic' && <StepBasic {...bind} />}
                {wiz.step.id === 'position' && <StepPosition {...bind} role={wiz.role} />}
                {wiz.step.id === 'approver' && <StepApprover {...bind} />}
                {wiz.step.id === 'review' && (
                  <StepReview
                    role={wiz.role}
                    data={wiz.data}
                    errors={wiz.errors}
                    summaryItems={wiz.summaryItems}
                    onJump={wiz.jumpToField}
                    onChange={wiz.setValue}
                    onBlur={wiz.handleBlur}
                  />
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-2 border-t border-ink-200 pt-4">
                {wiz.stepIndex > 0 ? (
                  <button type="button" onClick={wiz.goBack} className={btnSecondary}>
                    上一步
                  </button>
                ) : (
                  <span aria-hidden="true" />
                )}
                {isLast ? (
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className={btnPrimary}
                  >
                    {submitting ? '提交中…' : '提交入职申请'}
                  </button>
                ) : (
                  <button type="button" onClick={wiz.goNext} className={btnPrimary}>
                    下一步
                  </button>
                )}
              </div>
            </form>
          </>
        )}

        <p aria-live="polite" className="m-0 sr-only">
          {wiz.announcement}
        </p>

        <p className="m-0 text-xs leading-5 text-ink-400">
          演示环境：提交请求由本地 mock 服务处理（约 0.6 秒延迟），未连接真实后端；在 URL
          追加 ?mock=submit-error 可体验提交失败与数据保留路径。顶栏「演示视角」可切换 HR
          专员 / 系统管理员，用于验证权限差异。
        </p>
      </div>
    </AppShell>
  );
}
