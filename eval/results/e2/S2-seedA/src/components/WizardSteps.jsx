import { CheckIcon } from './Icons.jsx';

/**
 * 步骤指示（INV-001）：当前步 aria-current="step"；已完成步可点击回退（数据保留）；
 * 未到达步不可点；连接线纯装饰。切换时由 sr-only 区 polite 播报进度。
 */
export default function WizardSteps({ steps, currentIndex, onGoTo }) {
  const current = steps[currentIndex];
  return (
    <nav aria-label="入职步骤">
      <p className="sr-only" aria-live="polite">
        当前第 {currentIndex + 1} 步，共 {steps.length} 步：{current.title}
        {currentIndex > 0 ? `，前 ${currentIndex} 步已完成` : ''}
      </p>
      <ol className="flex items-center">
        {steps.map((s, i) => {
          const done = i < currentIndex;
          const isCurrent = i === currentIndex;
          const circleCls = done
            ? 'bg-success-600 text-white'
            : isCurrent
              ? 'bg-primary-600 text-white'
              : 'border border-ink-300 bg-white text-ink-500';
          const titleCls = done
            ? 'text-ink-700'
            : isCurrent
              ? 'text-ink-900'
              : 'text-ink-500';
          const body = (
            <>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${circleCls}`}
              >
                {done ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <span className="tabular-nums">{i + 1}</span>
                )}
              </span>
              <span className="min-w-0">
                <span className={`block truncate text-sm font-medium ${titleCls}`}>{s.title}</span>
                <span className="block truncate text-xs text-ink-500">{done ? '已完成' : s.hint}</span>
              </span>
            </>
          );
          return (
            <li key={s.id} className="flex min-w-0 items-center">
              {done ? (
                <button
                  type="button"
                  onClick={() => onGoTo(i)}
                  title={`回到“${s.title}”，已填数据保留`}
                  className="flex min-w-0 items-center gap-2 rounded-md p-1 text-left transition-colors hover:bg-ink-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
                >
                  {body}
                  <span className="sr-only">（已完成步骤，点击返回）</span>
                </button>
              ) : (
                <span
                  className="flex min-w-0 items-center gap-2 p-1"
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {body}
                </span>
              )}
              {i < steps.length - 1 ? (
                <div className="mx-2 h-px w-6 shrink-0 bg-ink-200" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
