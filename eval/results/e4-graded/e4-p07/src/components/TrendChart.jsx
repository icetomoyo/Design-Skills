import { useState } from 'react';
import { trend } from '../data/mock.js';
import { IconDownload } from './Icons.jsx';

// 主图：近 14 天工单量趋势。
// 依据 chart 域检索（Trend Over Time → Line Chart）：
//   - 14 点 < 1000 → SVG 直绘，无需图表库（禁 npm 亦满足）
//   - 折线 #2563EB + 20% 透明度面积填充；网格线 slate-200 低对比
//   - 周末列浅色底纹（形状辅助，不只靠色相）
//   - 今日点直接标注数值（direct-labeling）
//   - 悬停/键盘焦点显示精确值（tooltip-on-interact / tooltip-keyboard）
//   - 数据表兜底（data-table）+ 屏幕阅读器摘要（screen-reader-summary）
const W = 600;
const H = 240;
const PAD = { top: 20, right: 44, bottom: 40, left: 44 };
const Y_MAX = 800;
const TICKS = [0, 200, 400, 600, 800];

const plotW = W - PAD.left - PAD.right; // 512
const plotH = H - PAD.top - PAD.bottom; // 180
const x = (i) => PAD.left + (plotW / (trend.days.length - 1)) * i;
const y = (v) => PAD.top + plotH - (v / Y_MAX) * plotH;

function ChartEmpty() {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
      <p className="text-sm font-medium text-slate-900">暂无趋势数据</p>
      <p className="text-sm text-muted-foreground">当前时间范围内没有工单量记录，调整范围后重试。</p>
    </div>
  );
}

export default function TrendChart() {
  const [focused, setFocused] = useState(null);
  const days = trend.days;

  if (days.length === 0) return <ChartEmpty />;

  const points = days.map((d, i) => ({ ...d, cx: x(i), cy: y(d.value) }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.cx.toFixed(2)} ${p.cy.toFixed(2)}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].cx.toFixed(2)} ${(PAD.top + plotH).toFixed(2)} L${PAD.left} ${(PAD.top + plotH).toFixed(2)} Z`;

  // 周末连续段 → 浅色底纹列（含前后半格）
  const weekendBands = [];
  let run = null;
  points.forEach((p, i) => {
    if (p.weekend && !run) run = { from: i };
    if (run && (!p.weekend || i === points.length - 1)) {
      const to = p.weekend && i === points.length - 1 ? i : i - 1;
      const start = run.from === 0 ? points[0].cx : (points[run.from - 1].cx + points[run.from].cx) / 2;
      const end = to === points.length - 1 ? points[to].cx : (points[to].cx + points[to + 1].cx) / 2;
      weekendBands.push({ x: start, w: end - start });
      run = null;
    }
  });

  const maxDay = days.reduce((a, b) => (b.value > a.value ? b : a), days[0]);
  const minDay = days.reduce((a, b) => (b.value < a.value ? b : a), days[0]);
  const today = days[days.length - 1];
  const xLabelIndices = days.map((_, i) => i).filter((i) => i % 2 === 0 || i === days.length - 1);

  return (
    <section
      aria-labelledby="trend-title"
      className="rounded-lg border border-border bg-card p-5 shadow-card"
    >
      <header className="flex flex-wrap items-center gap-2">
        <div>
          <h2 id="trend-title" className="text-base font-semibold text-slate-900">
            工单量趋势
          </h2>
          <p className="text-xs text-muted-foreground">
            {trend.rangeLabel} · {trend.granularity}
          </p>
        </div>
        <span className="flex-1" />
        {/* legend-visible：图例紧贴图表 */}
        <ul className="flex items-center gap-4 text-xs text-muted-foreground" aria-label="图例">
          <li className="flex items-center gap-1.5">
            <svg width="16" height="8" aria-hidden="true">
              <line x1="0" y1="4" x2="16" y2="4" stroke="#2563EB" strokeWidth="2" />
            </svg>
            工单量（{trend.unit}）
          </li>
          <li className="flex items-center gap-1.5">
            <svg width="12" height="12" aria-hidden="true">
              <rect x="0" y="0" width="12" height="12" fill="#F1F5F9" />
            </svg>
            周末
          </li>
          <li className="flex items-center gap-1.5">
            <svg width="12" height="12" aria-hidden="true">
              <circle cx="6" cy="6" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
            今日
          </li>
        </ul>
        <button
          type="button"
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50"
        >
          <IconDownload className="h-3.5 w-3.5" />
          导出 CSV
        </button>
      </header>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 h-auto w-full"
        role="img"
        aria-label={`近14天工单量折线图：工作日稳定在600到760张，周末回落至240到300张；最高为${maxDay.date}的${maxDay.value}张，最低为${minDay.date}的${minDay.value}张，今日${today.date}为${today.value}张`}
      >
        {/* 周末底纹列 */}
        {weekendBands.map((b, i) => (
          <rect key={i} x={b.x} y={PAD.top} width={b.w} height={plotH} fill="#F1F5F9" />
        ))}

        {/* 网格线 + Y 轴刻度（含单位） */}
        {TICKS.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#E2E8F0" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(t) + 3} textAnchor="end" className="tnum fill-slate-500" fontSize="10">
              {t}
            </text>
          </g>
        ))}
        <text x={PAD.left - 8} y={PAD.top - 8} textAnchor="end" fontSize="10" fill="#475569">
          张
        </text>

        {/* 面积 + 折线 */}
        <path d={areaPath} fill="#2563EB" fillOpacity="0.2" />
        <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* 今日点：直接标注 */}
        <circle cx={x(days.length - 1)} cy={y(today.value)} r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
        <text x={x(days.length - 1)} y={y(today.value) - 22} textAnchor="end" fontSize="11" fontWeight="600" fill="#1E293B" className="tnum">
          {today.value}
        </text>
        <text x={x(days.length - 1)} y={y(today.value) - 10} textAnchor="end" fontSize="10" fill="#475569">
          今日
        </text>

        {/* 数据点：悬停原生提示 + 键盘可达 */}
        {points.map((p, i) => (
          <circle
            key={p.date}
            cx={p.cx}
            cy={p.cy}
            r="9"
            tabIndex={0}
            role="img"
            aria-label={`${p.date} 周${p.weekday}，${p.value} 张${p.isToday ? '（今日）' : ''}`}
            className={
              'cursor-pointer fill-transparent stroke-transparent stroke-[0] transition-colors duration-150 ' +
              'hover:stroke-primary-700/60 hover:stroke-[1.5] focus-visible:stroke-primary-700 focus-visible:stroke-[2]'
            }
            onFocus={() => setFocused(i)}
            onBlur={() => setFocused(null)}
            onMouseEnter={() => setFocused(i)}
            onMouseLeave={() => setFocused(null)}
          >
            <title>{`${p.date}（周${p.weekday}）${p.value} 张${p.isToday ? ' · 今日' : ''}`}</title>
          </circle>
        ))}
        {focused !== null && (
          <circle cx={points[focused].cx} cy={points[focused].cy} r="3.5" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="1.5" pointerEvents="none" />
        )}

        {/* X 轴标签（隔日抽稀，避免拥挤） */}
        {xLabelIndices.map((i) => (
          <text key={i} x={x(i)} y={PAD.top + plotH + 20} textAnchor="middle" fontSize="10" fill="#475569" className="tnum">
            {days[i].date}
          </text>
        ))}
      </svg>

      {/* data-table：图表的数据表兜底（可展开） */}
      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-medium text-primary-700 transition-colors duration-150 hover:text-primary">
          查看数据表（无障碍备用）
        </summary>
        <table className="tnum mt-2 w-full border-collapse text-sm">
          <caption className="sr-only">近 14 天每日工单量数据表</caption>
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">日期</th>
              <th scope="col" className="py-2 pr-4 font-medium">星期</th>
              <th scope="col" className="py-2 text-right font-medium">工单量（张）</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.date} className="border-b border-border/60">
                <td className="py-1.5 pr-4 text-slate-700">{d.date}</td>
                <td className="py-1.5 pr-4 text-slate-700">周{d.weekday}</td>
                <td className="py-1.5 text-right text-slate-900">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}
