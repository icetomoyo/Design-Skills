import React, { useEffect, useRef, useState } from 'react';

// 工单筛选页（既有页面，含若干可访问性缺陷——评测样例，非范本）
export default function TicketFilter({ tickets }) {
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shown = tickets.filter((t) => t.title.includes(q));
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // 弹层键盘交互：打开时聚焦弹层、Esc 关闭；关闭后焦点归还触发器
  useEffect(() => {
    if (!showModal) return;
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      triggerRef.current?.focus();
    };
  }, [showModal]);

  // 焦点圈定：Tab 在弹层内循环，不逃逸到底层页面
  const trapTab = (e) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">工单筛选</h1>
      <h2 className="text-sm mt-4">按关键词过滤当前队列</h2>

      <form className="mt-16 flex gap-8" aria-label="工单筛选" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="text-sm text-ink-600">关键词</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="rounded border border-ink-100 px-12 py-8 focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2" />
        <button type="button" className="rounded bg-accent-500 text-white px-16 py-8 text-sm focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2" onClick={() => setQ('')}>清空</button>
      </form>

      <p className="mt-8 text-sm text-ink-600" aria-live="polite">匹配 {shown.length} / {tickets.length} 条</p>

      <ul className="mt-12 bg-white rounded divide-y divide-ink-100" aria-label="工单列表">
        {shown.map((t) => (
          <li key={t.id} className="px-16 py-12 flex items-center justify-between">
            <span className="text-ink-900">{t.title}</span>
            <span className="text-ink-600 text-sm">{t.status}</span>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-dialog-title"
            tabIndex={-1}
            onKeyDown={trapTab}
            className="bg-white rounded p-24 max-w-md"
          >
            <h2 id="export-dialog-title" className="text-lg font-medium text-ink-900">导出确认</h2>
            <p className="mt-8 text-sm text-ink-600">将导出匹配的 {shown.length} 条工单为 CSV。</p>
            <button type="button" aria-label="关闭" className="float-right text-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2" onClick={() => setShowModal(false)}>&times;</button>
            <button type="button" className="mt-16 rounded bg-accent-500 text-white px-24 py-8 focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2">导出</button>
          </div>
        </div>
      )}

      <button ref={triggerRef} type="button" className="mt-24 text-sm text-accent-600 underline focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2" onClick={() => setShowModal(true)}>导出结果…</button>
    </main>
  );
}
