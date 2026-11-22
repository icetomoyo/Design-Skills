import { IconSearch, IconBell, IconAgents } from './icons.jsx'
import { SNAPSHOT } from '../data/mock.js'

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-6 border-b border-line bg-paper px-6">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold leading-7">运营总览</h1>
        {/* 实时读出行：当前窗口 / 节气段 / 刷新节奏 常驻 */}
        <p className="tnum mt-1 truncate text-xs text-ink-muted">
          {SNAPSHOT.windowStart.replace('2026-', '')} – {SNAPSHOT.today.replace('2026-', '')} ·{' '}
          {SNAPSHOT.termPrev} → {SNAPSHOT.termNow} · {SNAPSHOT.refreshNote}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="hidden items-center gap-2 rounded border border-line px-3 py-1 text-xs text-ink-muted md:inline-flex">
          <IconAgents width="14" height="14" />
          坐席 <span className="tnum text-ink">22/28</span> 在线
        </span>

        <label className="relative hidden lg:block">
          <span className="sr-only">搜索工单、客户或坐席</span>
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            placeholder="搜索工单 / 客户 / 坐席"
            className="w-56 rounded border border-line bg-ground py-1 pl-9 pr-3 text-sm placeholder:text-ink-muted focus:border-term-xiaoxue focus:outline-none"
          />
        </label>

        <button
          type="button"
          className="relative rounded p-2 text-ink-muted transition-colors duration-150 hover:bg-ground hover:text-ink"
          aria-label="通知（2 条未读）"
        >
          <IconBell />
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-state-danger"
          />
        </button>

        <div className="flex items-center gap-2 border-l border-line pl-4">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-rail text-sm font-medium text-rail-text"
          >
            陈
          </span>
          <div className="hidden xl:block">
            <p className="text-sm leading-4">陈铭</p>
            <p className="text-xs text-ink-muted">值班负责人</p>
          </div>
        </div>
      </div>
    </header>
  )
}
