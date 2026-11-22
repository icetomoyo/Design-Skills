import { IconClock, IconAssign } from './icons.jsx'

const PRIORITY = {
  urgent: { label: '紧急', cls: 'bg-state-dangerBg text-state-danger' },
  high: { label: '高', cls: 'bg-state-warnBg text-state-warn' },
  medium: { label: '中', cls: 'bg-[#E4EFF3] text-term-iceText' },
  low: { label: '低', cls: 'bg-[#EEF1F0] text-ink-muted' },
}

function fmtSla(min) {
  if (min < 60) return `SLA 剩 ${min} 分钟`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `SLA 剩 ${h} 小时 ${m} 分` : `SLA 剩 ${h} 小时`
}

function fmtWait(min) {
  return `${min} 分钟`
}

/**
 * 未分配工单 Top 8（次数据块：列表而非第二张同权图）。
 * 传入空数组即呈现空态（说明 + 入口）。
 */
export default function UnassignedQueue({ tickets }) {
  const isEmpty = !tickets || tickets.length === 0

  return (
    <section aria-label="未分配工单" className="flex h-full flex-col rounded-md border border-line bg-paper shadow-card">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold leading-6">未分配工单</h2>
          {!isEmpty && (
            <span className="tnum rounded bg-[#E4EFF3] px-2 py-1 text-xs font-medium text-term-iceText">
              Top 8 · 待派
            </span>
          )}
        </div>
        <button
          type="button"
          className="rounded px-2 py-1 text-xs font-medium text-term-iceText transition-colors duration-150 hover:bg-ground"
        >
          全部工单 →
        </button>
      </div>

      {isEmpty ? (
        /* 空态：说明 + 两个入口 */
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true" className="text-term-xiaoxue">
            <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 26l14-12 14 12" />
              <path d="M15 24v14h18V24" />
              <path d="M22 38v-8h4v8" />
            </g>
          </svg>
          <h3 className="mt-4 text-sm font-medium">队列已清空</h3>
          <p className="mt-2 max-w-64 text-xs leading-5 text-ink-muted">
            所有进入未分配池的工单都已有坐席负责。新工单到达时会实时出现在这里，并按优先级与等待时长排序。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              className="rounded bg-rail px-3 py-1 text-xs font-medium text-rail-text transition-colors duration-150 hover:bg-rail-hover active:translate-y-px"
            >
              查看全部工单
            </button>
            <button
              type="button"
              className="rounded border border-line px-3 py-1 text-xs font-medium text-ink transition-colors duration-150 hover:bg-ground"
            >
              配置自动分配规则
            </button>
          </div>
        </div>
      ) : (
        <ol className="divide-y divide-line">
          {tickets.map((t) => {
            const p = PRIORITY[t.priority]
            const slaDanger = t.slaLeftMin < 60
            return (
              <li key={t.id} className="flex items-start gap-3 px-5 py-3 transition-colors duration-150 hover:bg-ground">
                <span
                  className={`mt-1 shrink-0 rounded px-2 py-1 text-xs font-medium ${p.cls}`}
                  title={`优先级：${p.label}`}
                >
                  {p.label}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm leading-5" title={t.title}>
                    {t.title}
                  </p>
                  <p className="tnum mt-1 text-xs leading-4 text-ink-muted">
                    {t.id} · {t.channel} ·{' '}
                    <span className={slaDanger ? 'font-medium text-state-danger' : ''}>{fmtSla(t.slaLeftMin)}</span>
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded bg-rail px-2 py-1 text-xs font-medium text-rail-text transition-colors duration-150 hover:bg-rail-hover active:translate-y-px"
                  >
                    <IconAssign aria-hidden="true" />
                    派单
                  </button>
                  <span className="tnum flex items-center gap-1 text-xs text-ink-muted">
                    <IconClock aria-hidden="true" />
                    已等 {fmtWait(t.waitingMin)}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
