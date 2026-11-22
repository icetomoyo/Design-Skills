import { ROLES } from '../permissions.js';

const NAV = [
  { name: '概览', count: null, active: false },
  { name: '员工档案', count: '在职 308', active: false },
  { name: '入职管理', count: '进行中 5', active: true },
  { name: '离职管理', count: '待交接 3', active: false },
  { name: '组织架构', count: null, active: false },
  { name: '权限中心', count: null, active: false },
];

/**
 * 后台骨架（playbook-admin-console）：侧栏 240px + 顶栏 56px + 内容区 24px padding / 896px 上限。
 * 演示原型：侧栏仅“新员工入职”已实现，其余条目不接路由，不做假链接。
 */
export default function AppShell({ role, onRoleChange, children }) {
  const r = ROLES[role];
  return (
    <div className="min-h-screen bg-ink-100 font-sans text-ink-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        跳到主要内容
      </a>
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-ink-200 bg-white lg:flex">
          <div className="flex h-14 items-center gap-2 border-b border-ink-200 px-4">
            <span
              className="flex h-6 w-6 items-center justify-center rounded bg-primary-600 text-xs font-semibold text-white"
              aria-hidden="true"
            >
              星
            </span>
            <span className="text-sm font-semibold text-ink-900">星航人力 HCM</span>
          </div>
          <nav aria-label="入职管理模块" className="flex-1 overflow-y-auto px-2 py-3">
            <p className="px-2 pb-1 text-xs text-ink-500">入职管理</p>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.name}>
                  {item.active ? (
                    <span
                      aria-current="page"
                      className="flex items-center justify-between rounded-md bg-primary-50 px-2 py-2 text-sm font-medium text-primary-700"
                    >
                      {item.name}
                      {item.count ? <span className="text-xs tabular-nums">{item.count}</span> : null}
                    </span>
                  ) : (
                    <span className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-ink-500">
                      {item.name}
                      {item.count ? <span className="text-xs tabular-nums">{item.count}</span> : null}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-ink-200 p-4">
            <p className="text-xs leading-5 text-ink-500">
              演示原型：仅“新员工入职”向导已实现，其余模块未接线。
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-ink-200 bg-white px-6">
            <nav aria-label="面包屑" className="min-w-0 text-sm text-ink-500">
              <span>入职管理</span>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="font-medium text-ink-900" aria-current="page">
                新员工入职
              </span>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <div
                role="group"
                aria-label="演示视角切换（HR 专员与管理员的权限差异）"
                className="flex rounded-md border border-ink-300 bg-white p-1"
              >
                {Object.values(ROLES).map((rr) => (
                  <button
                    key={rr.id}
                    type="button"
                    onClick={() => onRoleChange(rr.id)}
                    aria-pressed={role === rr.id}
                    className={`rounded px-3 py-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 ${
                      role === rr.id ? 'bg-primary-600 text-white' : 'text-ink-700 hover:bg-ink-50'
                    }`}
                  >
                    {rr.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-100 text-sm font-medium text-ink-700"
                  aria-hidden="true"
                >
                  {r.user.slice(0, 1)}
                </span>
                <span className="hidden text-sm sm:block">
                  <span className="block leading-5 text-ink-900">{r.user}</span>
                  <span className="block text-xs leading-4 text-ink-500">{r.label}</span>
                </span>
              </div>
            </div>
          </header>
          <main id="main-content" className="flex-1 px-6 py-6">
            <div className="mx-auto max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
