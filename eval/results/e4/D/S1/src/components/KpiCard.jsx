import { IconTrendUp, IconTrendDown, KPI_ICONS } from './icons.jsx';
import { CARD } from './ui.jsx';

// KPI 卡（INV-001）：三要素 标签 + 数值 + 较昨日变化；同高由网格拉伸 + h-full 保证
export function KpiCard({ kpi }) {
  const Icon = KPI_ICONS[kpi.icon];
  const TrendIcon = kpi.change.direction === 'up' ? IconTrendUp : IconTrendDown;
  const tone = kpi.change.good ? 'text-success-700' : 'text-danger-700';
  return (
    <article className={CARD + ' flex h-full flex-col p-4'}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-ink-600">{kpi.label}</p>
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-ink-500" /> : null}
      </div>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums text-ink-900">{kpi.value}</span>
        <span className="text-sm text-ink-600">{kpi.unit}</span>
      </p>
      <p className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-sm">
        <span className={'inline-flex items-center gap-1 font-medium ' + tone}>
          <TrendIcon className="h-4 w-4" />
          {kpi.change.display}
        </span>
        <span className="text-ink-500">{kpi.change.baseline}</span>
      </p>
      {kpi.note ? <p className="mt-1 text-xs text-ink-500">{kpi.note}</p> : null}
    </article>
  );
}
