export default function KpiCard({ kpi }) {
  const trendTone = kpi.trend === 'better' ? 'text-success' : 'text-danger';
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <h3 className="text-sm text-slate-600">{kpi.label}</h3>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-medium tabular-nums text-slate-900">{kpi.value}</span>
        <span className="text-sm text-slate-600">{kpi.unit}</span>
      </p>
      <p className="mt-3 flex flex-wrap items-baseline gap-2 text-sm">
        <span className={`tabular-nums ${trendTone}`}>
          <span aria-hidden="true">{kpi.direction === 'up' ? '▲' : '▼'}</span>{' '}
          {kpi.delta}
        </span>
        <span className="text-slate-600">vs {kpi.baseline}</span>
      </p>
    </article>
  );
}
