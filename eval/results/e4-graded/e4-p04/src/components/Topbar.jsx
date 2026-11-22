import { useState } from 'react';
import { IconSearch, IconRefresh } from './icons.jsx';
import { BTN_SECONDARY } from './ui.jsx';

// 顶栏（INV-003）：高 64px（h-16），标题非问候式，时间戳具体
export function Topbar({ generatedAt, loading, onReload }) {
  const [range, setRange] = useState('14d');
  return (
    <header className="sticky top-0 z-10 border-b border-ink-200 bg-white">
      <div className="flex h-16 flex-wrap items-center gap-4 px-4 lg:px-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold text-ink-900">运营总览</h1>
          <p className="truncate text-xs text-ink-500">
            数据截至 {generatedAt || '—'}（UTC+8）· 示例数据
          </p>
        </div>
        <form role="search" className="hidden md:block" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="global-search" className="sr-only">
            搜索工单、客户或工单号
          </label>
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              id="global-search"
              type="search"
              placeholder="搜索工单 / 客户"
              className="h-8 w-64 rounded-md border border-ink-200 bg-white pl-10 pr-3 text-sm text-ink-900 placeholder:text-ink-500 focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600"
            />
          </div>
        </form>
        <div className="hidden items-center gap-2 lg:flex">
          <label htmlFor="trend-range" className="text-sm text-ink-600">
            时间范围
          </label>
          <select
            id="trend-range"
            value={range}
            onChange={(event) => setRange(event.target.value)}
            className="h-8 rounded-md border border-ink-200 bg-white px-2 text-sm text-ink-700 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
          >
            <option value="14d">近 14 天</option>
            <option value="30d">近 30 天</option>
            <option value="90d">近 90 天</option>
          </select>
        </div>
        <button type="button" onClick={onReload} disabled={loading} className={BTN_SECONDARY + (loading ? ' opacity-60' : '')}>
          <IconRefresh className={'h-4 w-4' + (loading ? ' animate-spin motion-reduce:animate-none' : '')} />
          刷新
        </button>
      </div>
    </header>
  );
}
