import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Topbar } from './components/Topbar.jsx';
import { KpiCard } from './components/KpiCard.jsx';
import { TrendChart } from './components/TrendChart.jsx';
import { UnassignedList } from './components/UnassignedList.jsx';
import { OverviewSkeleton, OverviewError } from './components/PageStates.jsx';
import { useOverview } from './hooks/useOverview.js';
import { getScenario } from './data/mockOverview.js';

export default function App() {
  const scenario = useMemo(() => getScenario(), []);
  const { status, data, error, reload } = useOverview(scenario);
  const [assignedIds, setAssignedIds] = useState([]);
  const [lastAssigned, setLastAssigned] = useState('');

  // 数据重新载入后清空本地分配态，列表与数据口径保持一致
  useEffect(() => {
    setAssignedIds([]);
    setLastAssigned('');
  }, [data]);

  const unassigned = data ? data.unassigned.filter((ticket) => !assignedIds.includes(ticket.id)) : [];

  const handleAssign = (ticket) => {
    setAssignedIds((prev) => [...prev, ticket.id]);
    setLastAssigned(`已分配 ${ticket.id}（${ticket.subject}）给 ${ticket.agent}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas-100 font-sans text-ink-700 antialiased lg:flex-row">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-700 focus:shadow-card"
      >
        跳到主要内容
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar generatedAt={data ? data.generatedAt : ''} loading={status === 'loading'} onReload={reload} />
        <main id="main-content" className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-6 lg:px-8">
          {scenario !== 'success' && (
            <p className="mb-4 rounded-md border border-ink-200 bg-canvas-50 px-4 py-3 text-sm text-ink-700">
              mock 演示场景：<span className="font-medium">{scenario}</span>
              （用 URL 参数 ?mock=loading / error / empty / success 切换，默认 success）
            </p>
          )}
          {status === 'loading' && <OverviewSkeleton />}
          {status === 'error' && <OverviewError error={error} onRetry={reload} />}
          {status === 'success' && data && (
            <>
              <section aria-labelledby="kpi-heading">
                <h2 id="kpi-heading" className="sr-only">
                  今日关键指标
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {data.kpis.map((kpi) => (
                    <KpiCard key={kpi.id} kpi={kpi} />
                  ))}
                </div>
              </section>
              <section aria-labelledby="trend-heading" className="mt-6">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
                  <div className="min-w-0 xl:col-span-3">
                    <TrendChart series={data.series} summary={data.trendSummary} />
                  </div>
                  <div className="min-w-0">
                    <UnassignedList
                      items={unassigned}
                      total={data.unassignedTotal}
                      lastAssigned={lastAssigned}
                      onAssign={handleAssign}
                    />
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
