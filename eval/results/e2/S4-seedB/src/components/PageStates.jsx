// 数据页四态（generate.md §4 硬规则）：骨架加载 / 错误 / 空态（真空与筛选无结果分开）。
// 成功态即正常表格内容（HostTable）。

export function TableSkeleton({ rowHeight = 32, rows = 14 }) {
  return (
    <div role="status" aria-busy="true" className="bg-surface">
      <span className="sr-only">正在加载主机清单…</span>
      {/* 表头占位：与真实表头同高，避免加载完成后跳动 */}
      <div className="flex items-center gap-3 border-b border-line bg-canvas px-4" style={{ height: rowHeight }}>
        <div className="h-3 w-44 rounded bg-ink-500/20 animate-pulse motion-reduce:animate-none" />
        <div className="h-3 w-24 rounded bg-ink-500/20 animate-pulse motion-reduce:animate-none" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-line px-4"
          style={{ height: rowHeight }}
          aria-hidden="true"
        >
          <div className="h-3 w-64 rounded bg-ink-500/15 animate-pulse motion-reduce:animate-none" style={{ animationDelay: `${(i % 6) * 80}ms` }} />
          <div className="h-3 w-24 rounded bg-ink-500/15 animate-pulse motion-reduce:animate-none" />
          <div className="h-3 w-16 rounded bg-ink-500/15 animate-pulse motion-reduce:animate-none" />
          <div className="ml-auto h-3 w-20 rounded bg-ink-500/15 animate-pulse motion-reduce:animate-none" />
        </div>
      ))}
    </div>
  );
}

export function ErrorPanel({ error, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="text-base font-semibold text-ink-900">主机清单加载失败</p>
      <p className="max-w-md text-sm text-ink-600">
        资产清单服务没有在预期时间内响应（错误码 {error?.code || 'UNKNOWN'}）。数据未加载，不影响你已保存的列设置。
        你可以点击重试；若持续失败，请联系平台值班（工单组 OPS-平台组）。
      </p>
      <button type="button" onClick={onRetry} className="mt-1 inline-flex h-8 items-center rounded-md bg-primary-600 px-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1">
        重试
      </button>
    </div>
  );
}

// 真空：确实没有任何资产
export function EmptyInventory({ onReload }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="text-base font-semibold text-ink-900">还没有主机资产</p>
      <p className="max-w-md text-sm text-ink-600">
        当前账号名下没有任何主机。接入云账号或登记裸金属/自建机房资产后，清单会自动同步到这里。
      </p>
      <button
        type="button"
        onClick={onReload}
        className="mt-1 inline-flex h-8 items-center rounded-md border border-line bg-surface px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-canvas motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
      >
        重新加载
      </button>
    </div>
  );
}

// 筛选无结果：说明命中条件 + 清除筛选出口
export function EmptyFilterResult({ kw, env, onClear }) {
  const cond = [kw && `关键词「${kw}」`, env !== 'all' && `环境「${env}」`].filter(Boolean).join(' + ');
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="text-base font-semibold text-ink-900">没有匹配的主机</p>
      <p className="max-w-md text-sm text-ink-600">
        当前筛选 {cond || '条件'} 没有命中任何主机。可以更换关键词（支持主机名 / IP / 实例ID / 应用名），
        或清除全部筛选查看 10,000 台主机。
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-1 inline-flex h-8 items-center rounded-md border border-line bg-surface px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-canvas motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
      >
        清除筛选
      </button>
    </div>
  );
}
