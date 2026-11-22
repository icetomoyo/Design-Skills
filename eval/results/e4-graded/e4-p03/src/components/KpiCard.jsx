import { IconArrowUp, IconArrowDown } from './icons.jsx'

const TONE = {
  ok: 'text-state-ok',
  warn: 'text-state-warn',
  danger: 'text-state-danger',
  neutral: 'text-ink-muted',
}

/**
 * KPI 卡：数字 + 标签 + 变化（vs 昨日）三要素。
 * 四卡同高共基线（外层 grid 拉伸）；数字共用固定字号阶梯 36px + 表格数字。
 */
export default function KpiCard({ kpi }) {
  const Arrow = kpi.delta.dir === 'up' ? IconArrowUp : IconArrowDown
  return (
    <section
      aria-label={kpi.label}
      className="flex h-full flex-col rounded-md border border-line bg-paper p-5 shadow-card"
    >
      <h3 className="text-sm text-ink-muted">{kpi.label}</h3>

      <p className="mt-3 flex items-baseline gap-2">
        <span className="tnum text-4xl font-semibold leading-10 tracking-tight">{kpi.value}</span>
        <span className="text-sm text-ink-muted">{kpi.unit}</span>
      </p>

      <p className={`mt-3 flex items-center gap-1 text-sm ${TONE[kpi.delta.tone]}`}>
        <Arrow aria-hidden="true" />
        <span className="tnum font-medium">
          {kpi.delta.value}
          {kpi.delta.pct === 'pp' ? ' pp' : ''}
          {kpi.delta.pct !== 'pp' ? ` · ${kpi.delta.pct}` : ''}
        </span>
        <span className="text-xs text-ink-muted">vs 昨日</span>
      </p>

      <p className="mt-auto pt-3 text-xs leading-4 text-ink-muted">{kpi.note}</p>
    </section>
  )
}
