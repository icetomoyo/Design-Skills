import { useState } from 'react';
import Sidebar, { MobileNav } from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import KpiCard from './components/KpiCard.jsx';
import TrendChart from './components/TrendChart.jsx';
import UnassignedList from './components/UnassignedList.jsx';
import { kpis, DATE_TODAY } from './data/mock.js';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-canvas font-sans text-body">
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        跳到主内容
      </a>

      <div className="flex">
        <Sidebar />
        <div className="flex w-full min-w-0 flex-col lg:w-auto lg:flex-1">
          <TopBar query={query} onQueryChange={setQuery} />
          <MobileNav />
          <main id="main-content" className="flex-1">
            <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
              <header>
                <h1 className="text-xl font-semibold tracking-normal text-ink">运营总览</h1>
                <p className="mt-1 text-sm text-muted">
                  Deskflow 客服工单平台 · {DATE_TODAY} · 指标均对比昨日
                </p>
              </header>

              {/* KPI 行：4 张同高指标卡（数字 + 标签 + vs 昨日变化） */}
              <section
                aria-label="今日核心指标"
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {kpis.map((kpi) => (
                  <KpiCard key={kpi.id} kpi={kpi} />
                ))}
              </section>

              {/* 主图：占满内容宽（>=2/3） */}
              <section aria-label="工单量趋势" className="mt-6">
                <TrendChart />
              </section>

              {/* 第二数据块：列表（非同权重图表） */}
              <section aria-label="未分配工单" className="mt-6">
                <UnassignedList query={query} onClearQuery={() => setQuery('')} />
              </section>

              <p className="mt-6 text-xs text-muted">
                演示页面：数据为按中型客服团队数量级校准的 mock，不代表任何真实客户。
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
