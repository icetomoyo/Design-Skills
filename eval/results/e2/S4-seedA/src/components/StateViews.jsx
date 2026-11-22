// 数据页四态视图（generate.md §4）：骨架 / 错误 / 空态（真空 + 筛选无结果）

export function TableSkeleton({ rowCount = 14 }) {
  return (
    <div role="status" aria-busy="true" className="min-h-0 flex-1 overflow-hidden px-4 py-3">
      <span className="sr-only">正在加载主机数据…</span>
      <div className="panel overflow-hidden" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-ink-100 px-3 py-2">
          <span className="sk-bar" style={{ width: 16 }} />
          <span className="sk-bar" style={{ width: 200 }} />
          <span className="sk-bar" style={{ width: 120 }} />
          <span className="sk-bar" style={{ width: 140 }} />
          <span className="sk-bar ml-auto" style={{ width: 96 }} />
        </div>
        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-ink-50 px-3 py-2">
            <span className="sk-bar" style={{ width: 16 }} />
            <span className="sk-bar" style={{ width: 150 + ((i * 37) % 90) }} />
            <span className="sk-bar" style={{ width: 110 }} />
            <span className="sk-bar" style={{ width: 70 + ((i * 53) % 60) }} />
            <span className="sk-bar ml-auto" style={{ width: 80 + ((i * 29) % 50) }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ message, code, onRetry }) {
  return (
    <div role="alert" className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      <div aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-50 text-danger-600">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M10 5v6" strokeLinecap="round" />
          <circle cx="10" cy="14.4" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="10" cy="10" r="8.4" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-ink-900">主机清单加载失败</h2>
      <p className="max-w-md text-sm text-ink-600">
        {message}。可以先重试一次；若仍失败，请把下方错误码发给平台值班（值班渠道见顶栏）。
      </p>
      <p className="text-xs text-ink-500">
        错误码：<code className="rounded bg-ink-100 px-1 py-0.5">{code}</code>
      </p>
      <button type="button" className="btn btn-primary mt-2" onClick={onRetry}>
        重试
      </button>
    </div>
  );
}

export function EmptyState({ kind, keyword, onClear, onAction }) {
  const vacuum = kind === 'vacuum';
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      <div aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-500">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="4" width="14" height="12" rx="1.5" />
          <path d="M3 7.5h14M6.5 11h4M6.5 13.5h7" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-ink-900">
        {vacuum ? '当前资产池还没有主机' : `没有匹配「${keyword}」的主机`}
      </h2>
      <p className="max-w-md text-sm text-ink-600">
        {vacuum
          ? '接入云账号或从 CMDB 导入资产后，这里会展示全部主机及其 60 个资产字段。'
          : '试试更短的关键词（支持主机名 / IP / 负责人 / 团队 / 标签），或清除筛选查看全部主机。'}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {vacuum ? (
          <>
            <button type="button" className="btn btn-primary" onClick={() => onAction('接入云账号')}>
              接入云账号
            </button>
            <button type="button" className="btn" onClick={() => onAction('下载导入模板')}>
              下载导入模板
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onClear}>
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
