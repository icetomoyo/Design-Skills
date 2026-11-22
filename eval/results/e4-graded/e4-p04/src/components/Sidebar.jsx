import { IconGauge, IconTicket, IconUsers, IconChartLine, IconSettings } from './icons.jsx';

const NAV_ITEMS = [
  { id: 'overview', label: '运营总览', href: '#main-content', icon: IconGauge, current: true },
  { id: 'tickets', label: '工单', href: '#', icon: IconTicket, current: false },
  { id: 'customers', label: '客户', href: '#', icon: IconUsers, current: false },
  { id: 'reports', label: '报表', href: '#', icon: IconChartLine, current: false },
  { id: 'settings', label: '设置', href: '#', icon: IconSettings, current: false },
];

// 侧栏（INV-003）：lg 起固定 240px 纵向导航；以下折叠为横向导航条（无弹层语义）
export function Sidebar() {
  return (
    <aside className="border-b border-ink-200 bg-white lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 py-4">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-sm font-semibold text-white"
          aria-hidden="true"
        >
          DP
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">DeskPilot</p>
          <p className="truncate text-xs text-ink-500">客服工单平台</p>
        </div>
      </div>
      <nav aria-label="主导航">
        <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="shrink-0 lg:shrink">
                <a
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={
                    'flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 ' +
                    (item.current
                      ? 'bg-primary-50 font-medium text-primary-700'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900')
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden items-center gap-2 border-t border-ink-200 p-4 lg:flex">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700"
          aria-hidden="true"
        >
          陈
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-900">陈晓</p>
          <p className="truncate text-xs text-ink-500">运营主管</p>
        </div>
      </div>
    </aside>
  );
}
