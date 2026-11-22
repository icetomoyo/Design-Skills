// 步骤指示器：已完成可点击返回（数据保留），当前步 aria-current="step"，
// 未开始步不可跳转；DOM 序即视觉序（CHK-05）。
function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m3 8.5 3.5 3.5L13 4.5" />
    </svg>
  );
}

export default function Stepper({ steps, current, onGoToStep }) {
  return (
    <nav aria-label="入职步骤">
      <ol className="flex list-none flex-wrap items-center gap-2 p-0">
        {steps.map((s, i) => {
          const connector = i < steps.length - 1 && (
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-ink-200" />
          );
          if (i < current) {
            return (
              <li key={s.id} className="flex list-none items-center gap-2">
                <button
                  type="button"
                  onClick={() => onGoToStep(i)}
                  aria-label={`返回第 ${i + 1} 步：${s.title}（已完成）`}
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-ink-600 transition-colors motion-reduce:transition-none hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-100 text-success-700">
                    <CheckIcon />
                  </span>
                  {s.title}
                </button>
                {connector}
              </li>
            );
          }
          if (i === current) {
            return (
              <li key={s.id} className="flex list-none items-center gap-2">
                <span
                  aria-current="step"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2 py-1 text-sm font-medium text-brand-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-on-brand">
                    {i + 1}
                  </span>
                  {s.title}
                </span>
                {connector}
              </li>
            );
          }
          return (
            <li key={s.id} className="flex list-none items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-ink-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-500">
                  {i + 1}
                </span>
                {s.title}
              </span>
              {connector}
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-xs text-ink-500">
        第 {current + 1} 步，共 {steps.length} 步；点击已完成的步骤可返回修改，内容不会丢失
      </p>
    </nav>
  );
}
