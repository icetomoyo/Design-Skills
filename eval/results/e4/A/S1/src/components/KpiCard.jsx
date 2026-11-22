import { IconTrendUp, IconTrendDown } from './icons.jsx';

/**
 * KPI 卡：标签 + 数值 + 变化（vs 昨日）+ 基准说明。
 * change.good 已按业务语义判定（工单升=坏，响应降=好…），颜色只表达好坏。
 */
export default function KpiCard({ kpi, icon }) {
  const Trend = kpi.change.dir === 'up' ? IconTrendUp : IconTrendDown;
  return (
    <section className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-600">{kpi.label}</h3>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {kpi.value}
        </span>
        <span className="text-sm text-slate-500">{kpi.unit}</span>
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            kpi.change.good ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <Trend className="h-4 w-4" />
          {kpi.change.text}
        </span>
        <span className="text-xs text-slate-500">vs 昨日</span>
      </div>

      <p className="mt-2 text-xs text-slate-500">{kpi.caption}</p>
    </section>
  );
}
