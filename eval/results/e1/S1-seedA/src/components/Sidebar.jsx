import { IconOverview, IconTickets, IconReports, IconTeam, IconSettings } from './icons.jsx';

const NAV_ITEMS = [
  { id: 'overview', label: '运营总览', Icon: IconOverview, active: true },
  { id: 'tickets', label: '工单', Icon: IconTickets },
  { id: 'reports', label: '报表', Icon: IconReports },
  { id: 'team', label: '坐席团队', Icon: IconTeam },
  { id: 'settings', label: '设置', Icon: IconSettings },
];

function BrandMark() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-white">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
        <path d="M5 7h14v7.5H9.5L5 18z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-night lg:flex">
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-6">
        <BrandMark />
        <span className="text-base font-semibold text-white">Deskflow</span>
        <span className="text-xs text-nightsub">客服工单平台</span>
      </div>
      <nav aria-label="主导航" className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 pt-1 text-xs text-nightsub">运营</p>
        {NAV_ITEMS.map(({ id, label, Icon: NavIcon, active }) => (
          <a
            key={id}
            href="#"
            aria-current={active ? 'page' : undefined}
            className={`focus-ring flex h-9 items-center gap-3 rounded-md px-3 text-sm transition-colors ${
              active ? 'bg-primary font-medium text-white' : 'text-nighttext hover:bg-night-raised'
            }`}
          >
            <NavIcon size="16" />
            {label}
          </a>
        ))}
      </nav>
      <div className="border-t border-night-raised">
        <div className="flex items-center gap-2.5 px-6 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-night-raised text-sm font-medium text-nighttext">
            林
          </span>
          <div>
            <p className="text-sm text-nighttext">林岚</p>
            <p className="text-xs text-nightsub">运营主管</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// 窄屏（<lg）下的水平导航，与侧栏共用 NAV_ITEMS
export function MobileNav() {
  return (
    <nav
      aria-label="主导航"
      className="flex gap-1 overflow-x-auto border-b border-line bg-white px-4 py-2 lg:hidden"
    >
      {NAV_ITEMS.map(({ id, label, active }) => (
        <a
          key={id}
          href="#"
          aria-current={active ? 'page' : undefined}
          className={`focus-ring whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
            active ? 'bg-primary/10 font-medium text-primary' : 'text-body hover:bg-raised'
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
