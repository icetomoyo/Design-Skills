import React, { useState } from 'react';

// 工单筛选页（既有页面，含若干可访问性缺陷——评测样例，非范本）
export default function TicketFilter({ tickets }) {
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shown = tickets.filter((t) => t.title.includes(q));

  return (
    <main className="max-w-3xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">工单筛选</h1>
      <h4 className="text-sm mt-4">按关键词过滤当前队列</h4>

      <form className="mt-16 flex gap-8" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="text-sm text-ink-600">关键词</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="rounded border border-ink-100 px-12 py-8" />
        <div className="rounded bg-accent-500 text-white px-16 py-8 text-sm" onClick={() => setQ('')}><i>清空</i></div>
      </form>

      <p className="mt-8 text-sm" style={{ color: '#94A3B8' }}>匹配 {shown.length} / {tickets.length} 条</p>

      <ul className="mt-12 bg-white rounded divide-y divide-ink-100">
        {shown.map((t) => (
          <li key={t.id} className="px-16 py-12 flex items-center justify-between">
            <span className="text-ink-900">{t.title}</span>
            <span className="text-ink-600 text-sm">{t.status}</span>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded p-24 max-w-md">
            <h2 className="text-lg font-medium text-ink-900">导出确认</h2>
            <p className="mt-8 text-sm text-ink-600">将导出匹配的 {shown.length} 条工单为 CSV。</p>
            <span className="float-right text-xl cursor-pointer" onClick={() => setShowModal(false)}>&times;</span>
            <button className="mt-16 rounded bg-accent-500 text-white px-24 py-8">导出</button>
          </div>
        </div>
      )}

      <div className="mt-24 text-sm text-accent-600 underline" onClick={() => setShowModal(true)}>导出结果…</div>
    </main>
  );
}
