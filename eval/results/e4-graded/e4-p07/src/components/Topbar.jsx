import { IconMenu, IconSearch, IconBell, IconRefresh } from './Icons.jsx';

const iconBtn =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-slate-700 ' +
  'transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card px-4 sm:px-6">
      <button type="button" aria-label="打开导航菜单" className={`${iconBtn} lg:hidden`}>
        <IconMenu className="h-5 w-5" />
      </button>

      <form role="search" className="hidden md:block" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="global-search" className="sr-only">
          搜索工单、客户或 TKD 编号
        </label>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="global-search"
            type="search"
            placeholder="搜索工单 / 客户 / TKD 编号"
            className="h-9 w-64 rounded-md border border-border bg-card pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors duration-150 hover:border-slate-300 focus:border-primary"
          />
        </div>
      </form>

      <div className="flex-1" />

      <div>
        <label htmlFor="range-select" className="sr-only">
          统计时间范围
        </label>
        <select
          id="range-select"
          defaultValue="14d"
          className="h-9 cursor-pointer rounded-md border border-border bg-card px-2 text-sm text-slate-700 transition-colors duration-150 hover:border-slate-300"
        >
          <option value="1d">今日</option>
          <option value="7d">近 7 天</option>
          <option value="14d">近 14 天</option>
        </select>
      </div>

      <button type="button" aria-label="刷新数据" className={iconBtn}>
        <IconRefresh className="h-4 w-4" />
      </button>

      <button type="button" aria-label="通知，3 条未读" className={`relative ${iconBtn}`}>
        <IconBell className="h-4 w-4" />
        <span className="tnum absolute -right-0.5 -top-0.5 rounded-full bg-destructive px-1.5 text-[10px] font-medium leading-4 text-white">
          3
        </span>
      </button>

      <div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-primary-700"
          aria-hidden="true"
        >
          陈
        </span>
        <div>
          <p className="text-sm font-medium leading-tight text-slate-900">陈默</p>
          <p className="text-xs leading-tight text-muted-foreground">运营主管</p>
        </div>
      </div>
    </header>
  );
}
