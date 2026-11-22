import { navSections, meta } from '../data/mock.js';
import {
  IconDashboard,
  IconTickets,
  IconQueue,
  IconChart,
  IconCustomers,
  IconShield,
  IconSettings,
} from './Icons.jsx';

const NAV_ICONS = {
  dashboard: IconDashboard,
  tickets: IconTickets,
  queue: IconQueue,
  chart: IconChart,
  customers: IconCustomers,
  shield: IconShield,
  settings: IconSettings,
};

// 品牌几何标记（非文字、无 emoji）
function BrandMark() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
        <path d="M5 16v-5a7 7 0 0 1 14 0v5" />
        <path d="M3 16h4M17 16h4" />
        <path d="M9 20h6" />
      </svg>
    </span>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-card lg:flex"
      aria-label="主导航"
    >
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
        <BrandMark />
        <div>
          <p className="text-sm font-semibold leading-tight text-slate-900">{meta.productName}</p>
          <p className="text-xs leading-tight text-muted-foreground">工单运营平台</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.title}>
            <h2 className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = NAV_ICONS[item.icon];
                return (
                  <li key={item.id}>
                    <a
                      href="#"
                      aria-current={item.active ? 'page' : undefined}
                      className={[
                        'flex h-9 cursor-pointer items-center gap-3 rounded-md border-l-2 px-3 text-sm',
                        'transition-colors duration-150',
                        item.active
                          ? 'border-primary bg-muted font-medium text-primary-700'
                          : 'border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                      ].join(' ')}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="tnum rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
        <span className="text-xs text-muted-foreground">服务状态：正常</span>
      </div>
    </aside>
  );
}
