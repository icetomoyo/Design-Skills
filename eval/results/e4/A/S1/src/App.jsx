import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import KpiCard from './components/KpiCard.jsx';
import TrendChart from './components/TrendChart.jsx';
import UnassignedList from './components/UnassignedList.jsx';
import { IconTicket, IconClock, IconShieldCheck, IconUsers, IconPlus } from './components/icons.jsx';
import { kpis, meta } from './data/mock.js';

const kpiIcons = {
  ticket: <IconTicket className="h-5 w-5" />,
  clock: <IconClock className="h-5 w-5" />,
  shield: <IconShieldCheck className="h-5 w-5" />,
  users: <IconUsers className="h-5 w-5" />,
};

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
          {/* 页头 */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">运营总览</h1>
              <p className="mt-2 text-sm text-slate-500">
                {meta.today}（{meta.weekday}）· 更新于 {meta.updated}，{meta.refreshCycle}刷新
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                导出日报
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <IconPlus className="h-4 w-4" />
                新建工单
              </button>
            </div>
          </div>

          {/* KPI 行（grid 保证同高） */}
          <div className="mt-8 grid grid-cols-2 gap-6 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} icon={kpiIcons[kpi.icon]} />
            ))}
          </div>

          {/* 主图（2/3 宽）+ 待办列表 */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <TrendChart />
            </div>
            <UnassignedList />
          </div>

          <p className="mt-8 text-xs text-slate-500">
            数据为演示用 mock（构建时静态生成），非实时接口。
          </p>
        </main>
      </div>
    </div>
  );
}
