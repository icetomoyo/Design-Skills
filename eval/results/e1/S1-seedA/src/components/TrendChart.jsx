import { trendSeries, RANGE_LABEL } from '../data/mock.js';

// 主图：近 14 天工单量趋势（原生 SVG 折线，占满内容宽度）
// - 新建：primary 实线 + 15% 面积；已解决：body 虚线 —— 线型区分 + 线端直接标签
// - 附一句话结论 + 可见数据表（可访问的事实源）
const W = 840;
const H = 320;
const M = { top: 16, right: 104, bottom: 32, left: 48 };
const Y_MAX = 600;
const Y_TICKS = [0, 200, 400, 600];
const N = trendSeries.length;

const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const x = (i) => M.left + (i * IW) / (N - 1);
const y = (v) => M.top + IH - (v / Y_MAX) * IH;
const toLine = (key) =>
  trendSeries.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ');

const createdPath = toLine('created');
const resolvedPath = toLine('resolved');
const areaPath = `${createdPath} L${x(N - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

const sumOf = (key) => trendSeries.reduce((acc, d) => acc + d[key], 0);
const avgOf = (key) => Math.round(sumOf(key) / N);
const peakIndex = trendSeries.reduce((best, d, i) => (d.created > trendSeries[best].created ? i : best), 0);
const peak = trendSeries[peakIndex];
const last = trendSeries[N - 1];
const resolveRate = ((sumOf('resolved') / sumOf('created')) * 100).toFixed(1);
const summary = `近 14 天日均新建 ${avgOf('created')} 单、已解决 ${avgOf('resolved')} 单，整体解决率 ${resolveRate}%；单日峰值 ${peak.label}（${peak.created} 单）。`;

function LegendLine({ dashed, tone }) {
  return (
    <svg width="20" height="8" viewBox="0 0 20 8" aria-hidden="true" focusable="false" className={tone}>
      <path d="M0 4h20" stroke="currentColor" strokeWidth="2" strokeDasharray={dashed ? '4 4' : undefined} />
    </svg>
  );
}

export default function TrendChart() {
  return (
    <figure className="card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">近 14 天工单量趋势</h2>
          <p className="mt-1 text-sm text-muted">{RANGE_LABEL} · 单位：单/日</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-body">
          <span className="flex items-center gap-1.5">
            <LegendLine tone="text-primary" />
            新建
          </span>
          <span className="flex items-center gap-1.5">
            <LegendLine dashed tone="text-body" />
            已解决
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="trend-title trend-desc"
        className="mt-4 h-auto w-full"
      >
        <title id="trend-title">近 14 天工单量趋势（新建与已解决，单位：单/日）</title>
        <desc id="trend-desc">{summary}</desc>

        {Y_TICKS.map((t) => (
          <g key={t}>
            <line
              x1={M.left}
              x2={W - M.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-line"
              strokeWidth="1"
              strokeDasharray={t === 0 ? undefined : '3 4'}
            />
            <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className="fill-subtle text-xs tabular-nums">
              {t}
            </text>
          </g>
        ))}

        {trendSeries.map((d, i) =>
          i % 2 === 0 || i === N - 1 ? (
            <text
              key={d.date}
              x={x(i)}
              y={H - 10}
              textAnchor="middle"
              className="fill-subtle text-xs tabular-nums"
            >
              {d.label}
            </text>
          ) : null
        )}

        <path d={areaPath} className="fill-primary/15" />
        <path
          d={resolvedPath}
          fill="none"
          className="stroke-body"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={createdPath}
          fill="none"
          className="stroke-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 峰值标记：形状 + 文本 */}
        <circle
          cx={x(peakIndex)}
          cy={y(peak.created)}
          r="3.5"
          className="fill-white stroke-primary"
          strokeWidth="2"
        />
        <text x={x(peakIndex)} y={y(peak.created) - 10} textAnchor="middle" className="fill-muted text-xs">
          峰值 {peak.created}
        </text>

        {/* 线端直接标签 */}
        <circle cx={x(N - 1)} cy={y(last.created)} r="3.5" className="fill-primary" />
        <text x={x(N - 1) + 10} y={y(last.created) + 4} className="fill-primary text-xs font-medium">
          新建 {last.created}
        </text>
        <circle cx={x(N - 1)} cy={y(last.resolved)} r="3.5" className="fill-body" />
        <text x={x(N - 1) + 10} y={y(last.resolved) + 4} className="fill-body text-xs font-medium">
          已解决 {last.resolved}
        </text>
      </svg>

      <figcaption className="mt-3 text-sm text-muted">{summary}</figcaption>

      <details className="mt-4 rounded-md border border-line" open>
        <summary className="focus-ring cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-body">
          每日数据表（14 天）
        </summary>
        <table className="w-full border-t border-line text-sm">
          <caption className="sr-only">近 14 天每日新建、已解决与净增工单数</caption>
          <thead>
            <tr className="bg-raised">
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-muted">
                日期
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-muted">
                新建
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-muted">
                已解决
              </th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-muted">
                净增
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {trendSeries.map((d) => {
              const net = d.created - d.resolved;
              return (
                <tr key={d.date} className="border-t border-line">
                  <td className="px-3 py-2 text-body">
                    {d.label}（{d.weekday}）
                  </td>
                  <td className="px-3 py-2 text-right text-body">{d.created}</td>
                  <td className="px-3 py-2 text-right text-body">{d.resolved}</td>
                  <td className={`px-3 py-2 text-right ${net >= 0 ? 'text-danger' : 'text-success'}`}>
                    {net >= 0 ? '+' : ''}
                    {net}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
