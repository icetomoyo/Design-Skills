import { IconSearch, IconBell, IconChevronDown } from './icons.jsx';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
      <div className="relative w-72">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          placeholder="搜索工单、客户或坐席"
          className="h-9 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          示例数据
        </span>

        <button
          type="button"
          aria-label="通知（3 条未读）"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <IconBell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />
        </button>

        <span className="h-6 w-px bg-slate-200" aria-hidden="true" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            LK
          </span>
          <span className="text-sm text-slate-700">李凯</span>
          <IconChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </header>
  );
}
