import { useState } from 'react';
import { ticketTrend } from '../data/mock.js';

const W = 720;
const H = 300;
const M = { top: 16, right: 16, bottom: 32, left: 48 };

export default function TrendChart() {
  const [range, setRange] = useState(14);
  const data = ticketTrend.slice(-range);
  const counts = data.map((d) => d.count);
  const total = counts.reduce((a, b) => a + b, 0);
  const avg = total / counts.length;
  const peak = Math.max(...counts);
  const low = Math.min(...counts);

  const iw = W - M.left - M.right;
  const ih = H - M.top - M.bottom;
  const yMax = Math.ceil(peak / 200) * 200;
  const x = (i) => M.left + (iw * i) / (data.length - 1);
  const y = (v) => M.top + ih - (ih * v) / yMax;

  const ticks = [];
  for (let t = 0; t <= yMax; t += 200) ticks.push(t);

  const line = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.count).toFixed(1)}`)
    .join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const labelStep = data.length > 8 ? 2 : 1;
  const xLabels = data
    .map((d, i) => ({ ...d, i }))
    .filter((d, idx, arr) => d.i % labelStep === 0 || d.i === arr[arr.length - 1].i);

  const last = data.length - 1;
  const today = data[last];

  return (
    <section className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">工单量趋势</h2>
          <p className="mt-1 text-xs text-slate-500">新建工单 / 日 · 周末自然回落</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            均值 <span className="font-medium text-slate-700 tabular-nums">{Math.round(avg)}</span> 单/天
          </span>
          <div
            className="flex rounded-lg border border-slate-300 p-1"
            role="group"
            aria-label="统计范围"
          >
            {[7, 14].map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => setRange(r)}
                className={`rounded px-3 py-1 text-xs font-medium ${
                  range === r ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                近 {r} 天
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`近 ${range} 天新建工单量折线图，今日 ${today.count} 单`}
        >
          {/* 网格与 Y 轴 */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeWidth="1" />
              <text x={M.left - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#64748b">
                {t}
              </text>
            </g>
          ))}

          {/* X 轴标签 */}
          {xLabels.map((d) => (
            <text
              key={d.i}
              x={x(d.i)}
              y={H - 8}
              textAnchor={d.i === last ? 'end' : 'middle'}
              fontSize="12"
              fill="#64748b"
            >
              {d.date}
            </text>
          ))}

          {/* 14 天均值参考线 */}
          <line
            x1={M.left}
            x2={W - M.right}
            y1={y(avg)}
            y2={y(avg)}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x={W - M.right} y={y(avg) - 6} textAnchor="end" fontSize="12" fill="#475569">
            均值 {Math.round(avg)}
          </text>

          {/* 面积与折线 */}
          <path d={area} fill="#4f46e5" fillOpacity="0.08" />
          <path d={line} fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />

          {/* 数据点（含原生提示） */}
          {data.map((d, i) => (
            <g key={d.date}>
              <circle cx={x(i)} cy={y(d.count)} r={i === last ? 4.5 : 3} fill={i === last ? '#4f46e5' : '#ffffff'} stroke="#4f46e5" strokeWidth="1.5">
                <title>{`${d.date} · ${d.count} 单`}</title>
              </circle>
            </g>
          ))}

          {/* 今日标注 */}
          <text
            x={x(last) - 8}
            y={y(today.count) - 12}
            textAnchor="end"
            fontSize="12"
            fontWeight="600"
            fill="#4338ca"
          >
            今日 {today.count}
          </text>
        </svg>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-xs text-slate-500">
        <span>
          峰值 <span className="font-medium text-slate-700 tabular-nums">{peak}</span> · 低谷{' '}
          <span className="font-medium text-slate-700 tabular-nums">{low}</span>
        </span>
        <span>
          {range} 天合计 <span className="font-medium text-slate-700 tabular-nums">{total.toLocaleString()}</span> 单
        </span>
      </div>
    </section>
  );
}
