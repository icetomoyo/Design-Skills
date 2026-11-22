import { ICONS, IconArrowUp, IconArrowDown } from './Icons.jsx';

// KPI 卡三要素：标签 + 数字 + 变化（vs 昨日）。
// 网格容器默认 stretch + 卡片 h-full → 四卡同高。
// 方向结论由文字承载（"较昨日 -76 张"），箭头与颜色仅辅助（color-not-only）。
export default function KpiCard({ kpi }) {
  const Icon = ICONS[kpi.icon];
  const Arrow = kpi.change.dir === 'up' ? IconArrowUp : IconArrowDown;
  const toneClass = kpi.change.good ? 'text-success' : 'text-destructive-foreground';

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-primary-700">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-medium text-muted-foreground">{kpi.label}</h3>
      </div>

      <p className="mt-3 flex items-baseline gap-1">
        <span className="tnum text-3xl font-semibold text-slate-900">{kpi.value}</span>
        {kpi.unit && <span className="text-sm text-muted-foreground">{kpi.unit}</span>}
      </p>

      <p className={`tnum mt-2 flex items-center gap-1 text-sm font-medium ${toneClass}`}>
        <Arrow />
        <span>
          较昨日 {kpi.change.abs}
          {kpi.change.pct ? `（${kpi.change.pct}）` : ''}
        </span>
        <span className="sr-only">{kpi.change.good ? '，优于昨日水平' : '，需关注'}</span>
      </p>

      <p className="tnum mt-auto border-t border-border pt-3 text-xs text-slate-500">{kpi.note}</p>
    </article>
  );
}
