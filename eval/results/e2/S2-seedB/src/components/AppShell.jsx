// 后台骨架（playbook-admin-console）：侧栏 240px + 顶栏 56px + 内容区 padding 24。
// 侧栏导航为演示静态结构（不可交互），仅当前页有 aria-current="page"。
import { ROLES } from '../data/dict.js';

const NAV_ITEMS = ['员工档案', '新员工入职', '入职流程看板', '审批中心', '权限与角色'];

export default function AppShell({ role, onRoleChange, currentUser, children }) {
  return (
    <div className="min-h-screen bg-canvas text-ink-800">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-2 focus-visible:top-2 focus-visible:z-10 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:text-brand-700 focus-visible:shadow-card"
      >
        跳到主要内容
      </a>
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-200 bg-surface md:flex">
          <div className="flex h-14 items-center gap-2 border-b border-ink-200 px-4">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-on-brand"
            >
              启
            </span>
            <span className="text-sm font-semibold text-ink-900">启程 HR</span>
            <span className="text-xs text-ink-400">入职流程</span>
          </div>
          <nav aria-label="主导航" className="flex-1 px-2 py-4">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {NAV_ITEMS.map((item) => {
                const isCurrent = item === '新员工入职';
                return (
                  <li key={item}>
                    {isCurrent ? (
                      <span
                        aria-current="page"
                        className="block rounded-md bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700"
                      >
                        {item}
                      </span>
                    ) : (
                      <span className="block cursor-default rounded-md px-3 py-2 text-sm text-ink-500" title="演示页未实现该模块">
                        {item}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-ink-200 p-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-200 text-xs font-medium text-ink-700"
              >
                {currentUser.name.slice(0, 1)}
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-ink-800">{currentUser.name}</span>
                <span className="text-xs text-ink-500">{currentUser.title}</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-ink-200 bg-surface px-6">
            <nav aria-label="面包屑">
              <ol className="m-0 flex list-none items-center gap-2 p-0 text-xs text-ink-500">
                <li>入职管理</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink-700">
                  新员工入职
                </li>
              </ol>
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="role-switch" className="text-xs text-ink-500">
                  演示视角
                </label>
                <select
                  id="role-switch"
                  value={role}
                  onChange={(e) => onRoleChange(e.target.value)}
                  className="h-8 rounded-md border border-ink-300 bg-surface px-2 text-sm text-ink-800 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
                >
                  {Object.values(ROLES).map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <span className="hidden text-xs text-ink-400 sm:inline">用于验证权限差异</span>
            </div>
          </header>
          <main id="main" className="flex-1 px-6 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
