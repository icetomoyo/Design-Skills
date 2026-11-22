import React from 'react';

// 工单运营总览页（既有页面，含若干待修复缺陷——评测用样例，非范本）
export default function Dashboard({ tickets }) {
  const unassigned = tickets.filter((t) => !t.assignee).slice(0, 8);
  return (
    <main className="max-w-6xl mx-auto p-24 font-sans bg-ink-50">
      <header className="mb-16">
        <h1 className="text-2xl font-semibold text-ink-900">工单运营总览</h1>
        <p className="mt-4 text-ink-600">今日服务台状态一览</p>
      </header>

      <section className="grid grid-cols-4 gap-16 mt-12">
        <div className="bg-white rounded-md p-16">
          <div className="text-sm text-ink-600">今日新增工单</div>
          <div className="text-3xl font-semibold text-ink-900">{tickets.length}</div>
        </div>
        <div className="bg-white rounded-md p-16">
          <div className="text-sm text-ink-600">平均首次响应</div>
          <div className="text-3xl font-semibold text-ink-900">3.2<span className="text-sm"> 分钟</span></div>
        </div>
        <div className="bg-white rounded-md p-16">
          <div className="text-sm text-ink-600">SLA 达标率</div>
          <div className="text-3xl font-semibold text-warm-600">98.4%</div>
        </div>
        <div className="bg-white rounded-md p-16">
          <div className="text-sm text-ink-600">活跃坐席</div>
          <div className="text-3xl font-semibold text-ink-900">14</div>
        </div>
      </section>

      <section className="mt-32 bg-white rounded-lg p-24">
        <h2 className="text-lg font-medium text-ink-900">未分配工单</h2>
        <ul className="mt-12 divide-y divide-ink-100">
          {unassigned.map((t) => (
            <li key={t.id} className="py-12 flex items-center justify-between">
              <span className="text-ink-900">{t.title}</span>
              <a href={'/tickets/' + t.id} className="text-link">处理</a>
            </li>
          ))}
        </ul>
      </section>

      <img src="/banner-q3.png" alt="第三季度服务台运营横幅" className="mt-24 rounded-md w-full" />
    </main>
  );
}
