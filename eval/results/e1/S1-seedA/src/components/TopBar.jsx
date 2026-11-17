import { IconSearch } from './icons.jsx';
import { RANGE_LABEL } from '../data/mock.js';

export default function TopBar({ query, onQueryChange }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-line bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
            <path d="M5 7h14v7.5H9.5L5 18z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-ink">Deskflow</span>
      </div>

      <form role="search" className="w-full max-w-sm lg:ml-2" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="unassigned-search" className="sr-only">
          搜索未分配工单（主题、编号或优先级）
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle">
            <IconSearch size="16" />
          </span>
          <input
            id="unassigned-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="搜索未分配工单（主题 / 编号 / 优先级）"
            className="focus-ring h-9 w-full rounded-md border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted"
          />
        </div>
      </form>

      <div className="ml-auto hidden items-center gap-2.5 sm:flex">
        <p className="text-xs text-muted">数据周期 {RANGE_LABEL}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
          林
        </span>
      </div>
    </header>
  );
}
