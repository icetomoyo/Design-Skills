import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import KpiCard from './components/KpiCard.jsx';
import TrendChart from './components/TrendChart.jsx';
import UnassignedList from './components/UnassignedList.jsx';
import { kpis, meta } from './data/mock.js';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* skip-links：跳到主要内容 */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        跳到主要内容
      </a>

      <Sidebar />

      <div className="lg:pl-60">
        <Topbar />

        <main id="main" className="space-y-6 p-4 sm:p-6">
          {/* 页头：任务型标题（非问候语） */}
          <header>
            <h1 className="text-xl font-semibold text-slate-900">{meta.pageTitle}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{meta.dataAsOf}</p>
          </header>

          {/* KPI：3-4 张卡，同高；间距全部落在 Tailwind 4px 基线刻度 */}
          <section aria-label="关键指标" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </section>

          {/* 主图占内容宽 2/3（lg:col-span-2 / 3 列）；第二数据块为列表 */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 xl:gap-6">
            <div className="lg:col-span-2">
              <TrendChart />
            </div>
            <UnassignedList />
          </div>
        </main>
      </div>
    </div>
  );
}
