import { useMemo, useState } from 'react';

const W = 1060;
const H = 300;
const PAD = { top: 16, right: 104, bottom: 28, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const Y_MAX = 900;
const Y_TICKS = [0, 300, 600, 900];

export default function TrendChart({ series, asOf }) {
  const [range, setRange] = useState(14);
  const [active, setActive] = useState(null);

  const view = useMemo(() => series.slice(-range), [series, range]);
  const n = view.length;
  const last = view[n - 1];
  const current = active === null ? n - 1 : active;
  const point = view[current];

  const xAt = (i) => PAD.left + (i * PLOT_W) / (n - 1);
  const yAt = (v) => PAD.top + PLOT_H - (v / Y_MAX) * PLOT_H;
  const linePath = (key) =>
    view
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(d[key]).toFixed(1)}`)
      .join(' ');
  const areaPath = `${linePath('created')} L${xAt(n - 1).toFixed(1)},${(PAD.top + PLOT_H).toFixed(1)} L${PAD.left},${(PAD.top + PLOT_H).toFixed(1)} Z`;
  const labelStep = Math.ceil(n / 7);
  const endLabelY = Math.max(yAt(last.resolved), yAt(last.created) + 16);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="trend-heading" className="text-lg font-medium">
            近 {range} 天工单量趋势
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            新增 vs 已解决 · 今日为进行中数据（截至 {asOf}）
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="trend-range" className="text-sm text-slate-600">
            时间范围
          </label>
          <select
            id="trend-range"
            value={range}
            onChange={(event) => {
              setRange(Number(event.target.value));
              setActive(null);
            }}
            className="h-8 rounded-md border border-slate-300 bg-white px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <option value={14}>近 14 天</option>
            <option value={30}>近 30 天</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <svg width="20" height="8" aria-hidden="true">
            <line x1="0" y1="4" x2="20" y2="4" strokeWidth="2" className="stroke-primary" />
          </svg>
          新增
        </span>
        <span className="flex items-center gap-2">
          <svg width="20" height="8" aria-hidden="true">
            <line x1="0" y1="4" x2="20" y2="4" strokeWidth="2" strokeDasharray="4 3" className="stroke-slate-500" />
          </svg>
          已解决
        </span>
        <p className="ml-auto tabular-nums" aria-live="polite">
          {point.date}：新增 <span className="font-medium text-slate-900">{point.created}</span> · 已解决{' '}
          <span className="font-medium text-slate-900">{point.resolved}</span>
          {current === n - 1 ? '（今日）' : ''}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`近 ${range} 天新增与已解决工单量折线图，逐日数值见下方数据表`}
        className="mt-2 w-full"
      >
        {Y_TICKS.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={yAt(tick)}
              y2={yAt(tick)}
              strokeWidth="1"
              className="stroke-slate-200"
            />
            <text
              x={PAD.left - 8}
              y={yAt(tick) + 4}
              textAnchor="end"
              className="fill-slate-600 text-xs tabular-nums"
            >
              {tick}
            </text>
          </g>
        ))}
        {view.map((d, i) =>
          i % labelStep === 0 || i === n - 1 ? (
            <text
              key={d.date}
              x={xAt(i)}
              y={H - 8}
              textAnchor="middle"
              className="fill-slate-600 text-xs tabular-nums"
            >
              {d.date}
            </text>
          ) : null
        )}
        <path d={areaPath} className="fill-primary/15" />
        <path d={linePath('resolved')} fill="none" strokeWidth="2" strokeDasharray="5 4" className="stroke-slate-500" />
        <path d={linePath('created')} fill="none" strokeWidth="2" className="stroke-primary" />
        {active !== null && (
          <line
            x1={xAt(active)}
            x2={xAt(active)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            strokeWidth="1"
            strokeDasharray="3 3"
            className="stroke-slate-400"
          />
        )}
        <circle cx={xAt(current)} cy={yAt(point.resolved)} r="4" strokeWidth="2" className="fill-white stroke-slate-500" />
        <circle cx={xAt(current)} cy={yAt(point.created)} r="4" strokeWidth="2" className="fill-white stroke-primary" />
        <text x={xAt(n - 1) + 8} y={yAt(last.created) + 4} className="fill-primary text-xs font-medium tabular-nums">
          新增 {last.created}
        </text>
        <text x={xAt(n - 1) + 8} y={endLabelY + 4} className="fill-slate-600 text-xs tabular-nums">
          已解决 {last.resolved}
        </text>
        {view.map((d, i) => (
          <rect
            key={`hit-${d.date}`}
            x={xAt(i) - PLOT_W / n / 2}
            y={PAD.top}
            width={PLOT_W / n}
            height={PLOT_H}
            tabIndex={0}
            className="fill-transparent outline-primary focus-visible:outline focus-visible:outline-2"
            aria-label={`${d.date}：新增 ${d.created}，已解决 ${d.resolved}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          />
        ))}
      </svg>

      <details className="mt-3 rounded-md border border-slate-200">
        <summary className="cursor-pointer select-none px-4 py-2 text-sm text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          查看每日数据表（{n} 天）
        </summary>
        <table className="w-full text-sm">
          <caption className="sr-only">近 {n} 天新增与已解决工单量</caption>
          <thead>
            <tr className="border-t border-slate-200 text-left text-xs text-slate-600">
              <th scope="col" className="px-4 py-2 font-medium">
                日期
              </th>
              <th scope="col" className="px-4 py-2 text-right font-medium">
                新增
              </th>
              <th scope="col" className="px-4 py-2 text-right font-medium">
                已解决
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 tabular-nums">
            {view.map((d) => (
              <tr key={d.date}>
                <td className="px-4 py-2 text-slate-700">{d.date === last.date ? `${d.date}（今日）` : d.date}</td>
                <td className="px-4 py-2 text-right text-slate-900">{d.created}</td>
                <td className="px-4 py-2 text-right text-slate-900">{d.resolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
