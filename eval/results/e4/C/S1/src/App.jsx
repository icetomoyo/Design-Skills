import SideRail from './components/SideRail.jsx'
import TopBar from './components/TopBar.jsx'
import KpiCard from './components/KpiCard.jsx'
import TrendChart from './components/TrendChart.jsx'
import UnassignedQueue from './components/UnassignedQueue.jsx'
import { KPIS, UNASSIGNED, SNAPSHOT } from './data/mock.js'

export default function App() {
  return (
    <div className="flex min-h-screen bg-ground">
      <SideRail />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-6">
          {/* KPI 行：四卡同高共基线，数字 + 标签 + vs 昨日 */}
          <section aria-label="今日关键指标" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </section>

          {/* 主图 8/12（内容宽 2/3）+ 次块列表 4/12 */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <TrendChart />
            </div>
            <div className="lg:col-span-4">
              <UnassignedQueue tickets={UNASSIGNED} />
            </div>
          </div>

          {/* 数据来源声明：合成演示数据，页内可辨 */}
          <footer className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-4 text-xs text-ink-muted">
            <span className="rounded border border-line px-2 py-1 font-medium text-ink-muted">演示数据</span>
            <span className="tnum">
              合成生成 · 快照 {SNAPSHOT.today} 14:00 · 云翎客服运营台
            </span>
          </footer>
        </main>
      </div>
    </div>
  )
}
