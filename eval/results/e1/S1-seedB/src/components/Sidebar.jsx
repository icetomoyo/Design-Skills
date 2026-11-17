export const NAV_ITEMS = [
  { id: 'overview', label: '运营总览', href: '#overview', active: true },
  { id: 'tickets', label: '工单', href: '#tickets', active: false },
  { id: 'routing', label: '分派规则', href: '#routing-rules', active: false },
  { id: 'reports', label: '报表', href: '#reports', active: false },
  { id: 'agents', label: '坐席', href: '#agents', active: false },
  { id: 'settings', label: '设置', href: '#settings', active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex" aria-label="侧栏">
      <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-4">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="rounded bg-primary">
          <path
            d="M5 10.5 8.6 14 15 6.5"
            fill="none"
            className="stroke-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-base font-medium">Deskflow</span>
        <span className="text-xs text-slate-600">工单平台</span>
      </div>
      <nav aria-label="主导航" className="flex-1 px-2 py-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={
                  item.active
                    ? 'block rounded-md bg-primary px-3 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                    : 'block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
        <p className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
          坐席在线 37/45
        </p>
      </div>
    </aside>
  );
}
