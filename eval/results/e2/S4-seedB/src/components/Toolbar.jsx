import { BTN_GHOST, INPUT, SELECT, cn } from './ui.jsx';

const ENV_OPTIONS = [
  ['all', '全部环境'],
  ['prod', '生产 prod'],
  ['staging', '预发 staging'],
  ['test', '测试 test'],
  ['dev', '开发 dev']
];

// 工具栏：搜索（URL 同步 q）/ 环境筛选 / 密度切换 / 刷新 / 列设置入口
export default function Toolbar({
  kw,
  onKwChange,
  envFilter,
  onEnvFilter,
  density,
  onDensity,
  visibleColCount,
  totalColCount,
  onToggleColumns,
  columnsOpen,
  columnsBtnRef,
  onRefresh,
  loading,
  children // 列设置面板（锚定在列设置按钮旁）
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
      <div className="min-w-0 flex-1 basis-52 sm:max-w-xs">
        <label htmlFor="host-search" className="sr-only">搜索主机</label>
        <input
          id="host-search"
          type="search"
          value={kw}
          onChange={(e) => onKwChange(e.target.value)}
          placeholder="搜索主机名 / IP / 实例ID / 应用"
          className={INPUT}
        />
      </div>
      <div className="w-36">
        <label htmlFor="env-filter" className="sr-only">按环境筛选</label>
        <select id="env-filter" value={envFilter} onChange={(e) => onEnvFilter(e.target.value)} className={SELECT}>
          {ENV_OPTIONS.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      <div role="group" aria-label="表格密度" className="flex rounded-md border border-line bg-surface p-0.5">
        {[
          ['compact', '紧凑'],
          ['comfy', '舒适']
        ].map(([v, l]) => (
          <button
            key={v}
            type="button"
            aria-pressed={density === v}
            onClick={() => onDensity(v)}
            className={cn(
              'h-7 rounded px-3 text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
              density === v ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:text-ink-900'
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <span className="flex-1" />

      <button type="button" onClick={onRefresh} disabled={loading} className={BTN_GHOST}>
        {loading ? '刷新中…' : '刷新'}
      </button>
      <div className="relative">
        <button
          ref={columnsBtnRef}
          type="button"
          onClick={onToggleColumns}
          aria-expanded={columnsOpen}
          aria-haspopup="dialog"
          className={BTN_GHOST}
        >
          列设置（{visibleColCount}/{totalColCount}）
        </button>
        {children}
      </div>
    </div>
  );
}
