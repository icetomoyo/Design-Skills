import { IconTrendUp, IconTrendDown } from './icons.jsx';

// 变化描述：方向 + 语义好坏 + 文本 + 基准（变化值永远带方向与基准）
function describeChange(kpi) {
  const diff = kpi.value - kpi.previous;
  const direction = diff >= 0 ? 'up' : 'down';
  const improved = kpi.goodWhen === direction;
  const sign = diff >= 0 ? '+' : '-';
  const abs = Math.abs(diff);
  let text;
  if (kpi.fmt === 'pp') {
    text = `${sign}${abs.toFixed(1)} 个百分点`;
  } else {
    const pct = ((abs / kpi.previous) * 100).toFixed(1);
    text = `${sign}${abs} ${kpi.unitWord}（${sign}${pct}%）`;
  }
  return {
    direction,
    tone: diff === 0 ? 'neutral' : improved ? 'good' : 'bad',
    text,
    baseline: `vs 昨日 ${kpi.previous}${kpi.fmt === 'pp' ? '%' : ''}`,
  };
}

const TONE_TEXT = { good: 'text-success', bad: 'text-danger', neutral: 'text-muted' };

export default function KpiCard({ kpi }) {
  const change = describeChange(kpi);
  const TrendIcon = change.direction === 'up' ? IconTrendUp : IconTrendDown;
  return (
    <article className="card flex h-full flex-col p-4">
      <p className="text-sm text-muted">{kpi.label}</p>
      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums tracking-normal text-ink">{kpi.value}</span>
        <span className="text-sm text-muted">{kpi.unit}</span>
      </p>
      <p className="mt-auto flex items-center gap-1 pt-3 text-sm">
        <TrendIcon className={TONE_TEXT[change.tone]} />
        <span className={`font-medium tabular-nums ${TONE_TEXT[change.tone]}`}>{change.text}</span>
        <span className="text-subtle">{change.baseline}</span>
      </p>
    </article>
  );
}
