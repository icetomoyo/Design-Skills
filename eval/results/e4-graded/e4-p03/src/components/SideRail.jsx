import { IconGauge, IconTicket, IconChart, IconAgents, IconRules, IconSettings } from './icons.jsx'
import { SNAPSHOT } from '../data/mock.js'

const NAV = [
  { id: 'overview', label: '总览', icon: IconGauge, active: true },
  { id: 'tickets', label: '工单', icon: IconTicket, count: '316' },
  { id: 'reports', label: '报表', icon: IconChart },
  { id: 'agents', label: '坐席', icon: IconAgents },
  { id: 'rules', label: '分配规则', icon: IconRules },
  { id: 'settings', label: '设置', icon: IconSettings },
]

export default function SideRail() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-rail text-rail-text">
      {/* 产品标识：手绘雪花六出印记 + 名称 */}
      <div className="flex items-center gap-3 px-5 pb-6 pt-5">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" className="text-term-ice">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
            <path d="M12 6.5l2-2M12 6.5l-2-2M12 17.5l2 2M12 17.5l-2 2" />
          </g>
        </svg>
        <div>
          <p className="text-[15px] font-semibold leading-5 tracking-wide">云翎客服台</p>
          <p className="text-xs text-rail-muted">工单运营 · 企业版</p>
        </div>
      </div>

      <nav aria-label="主导航" className="flex-1">
        <p className="px-5 pb-2 text-xs tracking-widest text-rail-muted">运营</p>
        <ul>
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#/${item.id}`}
                aria-current={item.active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded px-4 py-3 text-sm transition-colors duration-150 ${
                  item.active
                    ? 'bg-rail-hover font-medium text-rail-text'
                    : 'text-rail-muted hover:bg-rail-hover hover:text-rail-text'
                }`}
              >
                <item.icon className={`shrink-0 ${item.active ? 'text-term-ice' : ''}`} />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className="tnum rounded bg-rail-line px-2 py-1 text-xs text-rail-text">
                    {item.count}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 时令签：竖排节气（世界的排印传统，兼作今日历注） */}
      <div className="flex items-end justify-between gap-4 border-t border-rail-line px-5 py-4">
        <div className="flex h-40 flex-col items-center justify-between rounded border border-rail-line py-4">
          <p className="vertical-term text-[15px] font-medium leading-none">{SNAPSHOT.termNow}</p>
          <p className="vertical-term text-[11px] leading-none text-rail-muted">
            {SNAPSHOT.termNowPentad}
          </p>
        </div>
        <div className="flex-1 pb-1">
          <p className="text-xs text-rail-muted">今日</p>
          <p className="tnum mt-1 text-sm">{SNAPSHOT.today}</p>
          <p className="mt-4 text-[11px] leading-4 text-rail-muted">
            {SNAPSHOT.termPrev} 11-07 起
            <br />
            {SNAPSHOT.termNow} 11-22 起
          </p>
        </div>
      </div>
    </aside>
  )
}
