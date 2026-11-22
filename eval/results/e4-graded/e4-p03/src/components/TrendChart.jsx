import { TREND, SNAPSHOT } from '../data/mock.js'
import { IconTermMark } from './icons.jsx'

// 主图：近 14 天工单量趋势（手绘 SVG，无图表库依赖）。
// 签名动作「节气分界」：11-22 跨入小雪，末柱转冰蓝色 + 分界虚线与竖排标签。
const W = 760
const H = 280
const PAD = { top: 20, right: 16, bottom: 32, left: 40 }
const Y_MAX = 800
const TICKS = [0, 200, 400, 600, 800]

const plotW = W - PAD.left - PAD.right
const plotH = H - PAD.top - PAD.bottom
const slot = plotW / TREND.length
const barW = 30

const y = (v) => PAD.top + plotH * (1 - v / Y_MAX)
const x = (i) => PAD.left + i * slot + (slot - barW) / 2

const maxIdx = TREND.reduce((m, d, i) => (d.volume > TREND[m].volume ? i : m), 0)
const todayIdx = TREND.length - 1
const boundaryX = PAD.left + 13 * slot

function slaLeftText(min) {
  if (min < 60) return `剩 ${min} 分钟`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `剩 ${h} 小时 ${m} 分` : `剩 ${h} 小时`
}

export default function TrendChart() {
  return (
    <section aria-label="近 14 天工单量趋势" className="rounded-md border border-line bg-paper p-5 shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold leading-6">近 14 天工单量趋势</h2>
        <p className="text-xs text-ink-muted">
          单位：单 / 日 · {SNAPSHOT.termPrev} 11-07 起 · {SNAPSHOT.termNow} 11-22 起
        </p>
      </div>

      {/* 图例：物候色卡 + 分界线记号 */}
      <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-[2px] bg-term-lidong" />
          立冬（青黛）
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-[2px] bg-term-xiaoxue" />
          小雪（冰蓝）
        </span>
        <span className="flex items-center gap-2">
          <IconTermMark aria-hidden="true" className="text-term-iceText" />
          节气分界
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`近 14 天每日工单量柱状图，11-09 至 11-21 为立冬段，11-22 跨入小雪。区间最高 743 单（11-20），今日 316 单。`}
        className="mt-2 w-full"
      >
        {/* 网格与 Y 轴刻度 */}
        {TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              stroke={t === 0 ? '#B9C6C4' : '#DCE3E2'}
              strokeWidth="1"
            />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#55666B" className="tnum">
              {t}
            </text>
          </g>
        ))}

        {/* 柱：立冬青黛 / 小雪冰蓝；悬停与键盘焦点可读单日数值 */}
        {TREND.map((d, i) => (
          <rect
            key={d.date}
            x={x(i)}
            y={y(d.volume)}
            width={barW}
            height={plotH + PAD.top - y(d.volume)}
            rx="2"
            fill={d.term === 'xiaoxue' ? '#2E7E9E' : '#3F6672'}
            tabIndex="0"
            className="cursor-pointer transition-opacity duration-150 hover:opacity-75 focus:opacity-75"
          >
            <title>{`${d.date} ${d.weekday} · ${d.volume} 单 · ${d.term === 'xiaoxue' ? '小雪' : '立冬'}`}</title>
          </rect>
        ))}

        {/* 峰值与今日读数 */}
        <text x={x(maxIdx) + barW / 2} y={y(TREND[maxIdx].volume) - 8} textAnchor="middle" fontSize="11" fill="#55666B" className="tnum">
          {`峰值 ${TREND[maxIdx].volume}`}
        </text>
        <text x={x(todayIdx) + barW / 2} y={y(TREND[todayIdx].volume) - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="#2E7E9E" className="tnum">
          {`今日 ${TREND[todayIdx].volume}`}
        </text>

        {/* 节气分界：立冬 → 小雪（11-22），今日柱从虚线右侧开始 */}
        <line
          x1={boundaryX}
          x2={boundaryX}
          y1={PAD.top - 6}
          y2={PAD.top + plotH}
          stroke="#2E7E9E"
          strokeWidth="1.25"
          strokeDasharray="3 4"
        />
        <text
          transform={`rotate(90 ${boundaryX - 7} ${PAD.top + 10})`}
          x={boundaryX - 7}
          y={PAD.top + 10}
          fontSize="11"
          fill="#2E7E9E"
        >
          {`${SNAPSHOT.termNow} · ${SNAPSHOT.termBoundaryDate.replace('2026-', '')}`}
        </text>

        {/* X 轴日期 */}
        {TREND.map((d, i) => (
          <text
            key={d.date}
            x={x(i) + barW / 2}
            y={H - 10}
            textAnchor="middle"
            fontSize="11"
            fill={i === todayIdx ? '#1B2A2E' : '#55666B'}
            fontWeight={i === todayIdx ? 600 : 400}
            className="tnum"
          >
            {d.date}
          </text>
        ))}
      </svg>

      <p className="mt-1 text-xs leading-5 text-ink-muted">
        两周内工作日稳定在 500–750 单，周末回落至 300 单档；今日为周日且跨入{SNAPSHOT.termNow}
        ，量级继续回落，SLA 剩余最短的一单 {slaLeftText(14)}。
      </p>
    </section>
  )
}
