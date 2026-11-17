import { NAV_ITEMS } from './Sidebar.jsx';

export default function Topbar({ query, onQueryChange, asOf }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 lg:px-8">
        <details className="relative lg:hidden">
          <summary className="inline-flex h-8 cursor-pointer list-none items-center rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            菜单
          </summary>
          <nav
            aria-label="移动端主导航"
            className="absolute left-0 top-full z-10 mt-2 w-48 rounded-md border border-slate-200 bg-white p-2 shadow-card"
          >
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={item.active ? 'page' : undefined}
                    className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
        <h1 className="text-xl font-medium">运营总览</h1>
        <p className="hidden text-sm text-slate-600 md:inline">数据截至 {asOf} · 演示数据</p>
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <label htmlFor="top-search" className="sr-only">
              搜索未分配工单
            </label>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="none"
              strokeWidth="2"
              className="pointer-events-none absolute left-2 top-2 stroke-slate-500"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" strokeLinecap="round" />
            </svg>
            <input
              id="top-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="搜索工单、客户"
              className="h-8 w-44 rounded-md border border-slate-300 bg-white pl-8 pr-2 text-sm placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:w-56"
            />
          </div>
          <a
            href="#tickets/new"
            className="inline-flex h-8 shrink-0 items-center rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            新建工单
          </a>
        </div>
      </div>
    </header>
  );
}
