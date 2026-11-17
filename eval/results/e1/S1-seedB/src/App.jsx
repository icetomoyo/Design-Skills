import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import KpiCard from './components/KpiCard.jsx';
import TrendChart from './components/TrendChart.jsx';
import UnassignedList from './components/UnassignedList.jsx';
import { LoadingState, ErrorState } from './components/PageStates.jsx';
import { useOverview } from './hooks/useOverview.js';

export default function App() {
  const { status, data, error, reload } = useOverview();
  const [query, setQuery] = useState('');

  const filteredTickets = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data.unassignedTickets;
    return data.unassignedTickets.filter(
      (t) =>
        t.subject.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
    );
  }, [data, query]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-slate-900 focus:shadow-card"
      >
        跳到主要内容
      </a>
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar query={query} onQueryChange={setQuery} asOf={data ? data.meta.asOf : '—'} />
          <main id="main" className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
            {status === 'loading' ? (
              <LoadingState />
            ) : status === 'error' ? (
              <ErrorState error={error} onRetry={reload} />
            ) : (
              data && (
                <>
                  <section aria-label="今日关键指标">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {data.kpis.map((kpi) => (
                        <KpiCard key={kpi.id} kpi={kpi} />
                      ))}
                    </div>
                  </section>
                  <section aria-label="工单量趋势" className="mt-6">
                    <TrendChart series={data.trendSeries} asOf={data.meta.asOf} />
                  </section>
                  <section aria-label="未分配工单" className="mt-6">
                    <UnassignedList
                      tickets={filteredTickets}
                      total={data.unassignedTotal}
                      query={query}
                      onClearQuery={() => setQuery('')}
                    />
                  </section>
                </>
              )
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
