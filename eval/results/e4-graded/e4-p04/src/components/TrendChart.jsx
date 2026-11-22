import { useState } from 'react';
import { CARD } from './ui.jsx';
import { IconChartLine, IconTable } from './icons.jsx';

// 主图（INV-002）：卡内含 SVG 折线图 + 可切换的可见数据表（可访问的事实源）+ 一句话结论
const Y_MAX = 800;
const Y_TICKS = [0, 200, 400, 600, 800];

function buildGeometry(series) {
  const width = 640;
  const height = 288;
  const pad = { top: 24, right: 28, bottom: 32, left: 44 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const step = innerW / (series.length - 1);
  const baseline = pad.top + innerH;
  const points = series.map((row, index) => ({
    ...row,
    index,
    x: pad.left + index * step,
    y: pad.top + (1 - row.count / Y_MAX) * innerH,
  }));
  const line = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
  const lastPoint = points[points.length - 1];
  const area = `${line} L${lastPoint.x.toFixed(1)} ${baseline} L${points[0].x.toFixed(1)} ${baseline} Z`;
  return { width, height, pad, innerW, innerH, baseline, points, line, area };
}

function ChartView({ series, geometry, ariaLabel }) {
  const { points } = geometry;
  const last = points[points.length - 1];
  const max = points.reduce((best, point) => (point.count > best.count ? point : best), points[0]);
  return (
    <svg viewBox={`0 0 ${geometry.width} ${geometry.height}`} className="h-72 w-full" role="img" aria-label={ariaLabel}>
      {Y_TICKS.map((tick) => {
        const y = geometry.pad.top + (1 - tick / Y_MAX) * geometry.innerH;
        return (
          <g key={tick}>
            <line
              x1={geometry.pad.left}
              x2={geometry.width - geometry.pad.right}
              y1={y}
              y2={y}
              strokeWidth="1"
              className="stroke-ink-200"
            />
            <text
              x={geometry.pad.left - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-ink-500 text-xs tabular-nums"
            >
              {tick}
            </text>
          </g>
        );
      })}
      <path d={geometry.area} className="fill-primary-600" fillOpacity="0.15" />
      <path
        d={geometry.line}
        className="stroke-primary-600"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((point) => (
        <circle
          key={point.label}
          cx={point.x}
          cy={point.y}
          r="3"
          strokeWidth="1.5"
          className="fill-white stroke-primary-600"
        />
      ))}
      <text
        x={last.x}
        y={last.y - 10}
        textAnchor="end"
        className="fill-primary-700 text-xs font-semibold tabular-nums"
      >
        {last.count}
      </text>
      <text
        x={max.x}
        y={max.y - 10}
        textAnchor="middle"
        className="fill-ink-700 text-xs font-medium tabular-nums"
      >
        {max.count}
      </text>
      {points
        .filter((point) => point.index % 2 === 0 || point.index === points.length - 1)
        .map((point) => (
          <text
            key={`x-${point.label}`}
            x={point.x}
            y={geometry.height - 8}
            textAnchor={point.index === points.length - 1 ? 'end' : 'middle'}
            className="fill-ink-500 text-xs tabular-nums"
          >
            {point.label}
          </text>
        ))}
    </svg>
  );
}

function TableView({ series }) {
  return (
    <div className="max-h-72 overflow-y-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">近 14 天每日工单量与较前日变化</caption>
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-ink-200 text-xs text-ink-500">
            <th scope="col" className="py-2 pr-4 text-left font-medium">
              日期
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-medium">
              星期
            </th>
            <th scope="col" className="py-2 pr-4 text-right font-medium">
              工单量
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              较前日
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((row) => (
            <tr key={row.label} className="border-b border-ink-100 last:border-b-0">
              <td className="py-2 pr-4 tabular-nums text-ink-700">{row.label}</td>
              <td className="py-2 pr-4 text-ink-500">{row.weekday}</td>
              <td className="py-2 pr-4 text-right font-medium tabular-nums text-ink-900">{row.count}</td>
              <td className="py-2 text-right tabular-nums text-ink-700">{row.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TrendChart({ series, summary }) {
  const [view, setView] = useState('chart');
  const geometry = buildGeometry(series);
  const last = series[series.length - 1];
  const max = series.reduce((best, row) => (row.count > best.count ? row : best), series[0]);
  const ariaLabel = `近 14 天工单量折线图：${series[0].label} 为 ${series[0].count} 单，${max.label} 达最高的 ${max.count} 单，最新 ${last.label}（今日 14:32 快照）为 ${last.count} 单。完整数值请切换到数据表视图查看。`;
  const segment =
    'inline-flex h-8 items-center gap-2 px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1';
  return (
    <article className={CARD}>
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-ink-200 p-4">
        <div className="min-w-0">
          <h2 id="trend-heading" className="text-base font-semibold text-ink-900">
            近 14 天工单量趋势
          </h2>
          <p className="mt-1 text-sm text-ink-600">{summary}；今日为 14:32 快照的部分日数据</p>
        </div>
        <div role="group" aria-label="趋势视图切换：图表或数据表" className="inline-flex shrink-0 rounded-md border border-ink-200 bg-white">
          <button
            type="button"
            onClick={() => setView('chart')}
            aria-pressed={view === 'chart'}
            className={segment + (view === 'chart' ? ' rounded-l-md bg-ink-100 text-ink-900' : ' rounded-l-md text-ink-600 hover:bg-ink-50')}
          >
            <IconChartLine className="h-4 w-4" />
            图表
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            aria-pressed={view === 'table'}
            className={segment + (view === 'table' ? ' rounded-r-md bg-ink-100 text-ink-900' : ' rounded-r-md text-ink-600 hover:bg-ink-50')}
          >
            <IconTable className="h-4 w-4" />
            数据表
          </button>
        </div>
      </div>
      <div className="p-4">
        {view === 'chart' ? (
          <ChartView series={series} geometry={geometry} ariaLabel={ariaLabel} />
        ) : (
          <TableView series={series} />
        )}
      </div>
    </article>
  );
}
