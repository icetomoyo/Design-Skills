import { cn } from './ui.jsx';

// 批量操作完成反馈：toast 只承载瞬时结果通知（3-5s 自动消失 + 手动关闭），
// 失败清单在 detail 中点名主机与原因，不静默（uu-action-feedback / uu-search-bulk）。
export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex w-80 items-start gap-3 rounded-lg border border-line border-l-4 bg-surface p-4 shadow-lg transition-opacity motion-reduce:transition-none',
            t.tone === 'partial' ? 'border-l-warning-600' : 'border-l-success-600'
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink-900">{t.title}</p>
            {t.detail && <p className="mt-1 break-words text-xs text-ink-600">{t.detail}</p>}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="关闭通知"
            className="shrink-0 rounded p-1 text-ink-500 transition-colors hover:bg-canvas hover:text-ink-700 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
