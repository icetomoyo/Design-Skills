import React, { useEffect, useRef, useState } from 'react';

// 工单筛选页（S7 可访问性精修版：键盘全流程可用；视觉方向、布局结构与产品特征不变）
export default function TicketFilter({ tickets }) {
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shown = tickets.filter((t) => t.title.includes(q));
  const exportTriggerRef = useRef(null);
  const dialogCloseRef = useRef(null);
  const dialogRef = useRef(null);

  // 弹层键盘流程：打开即圈定焦点、Tab 循环不逃逸、Esc 关闭、关闭后焦点返回触发器
  useEffect(() => {
    if (!showModal) return undefined;
    const dialog = dialogRef.current;
    dialogCloseRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowModal(false);
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.disabled);
      if (focusables.length === 0) return;
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
    const onFocusIn = (e) => {
      if (dialog && !dialog.contains(e.target)) dialogCloseRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      exportTriggerRef.current?.focus();
    };
  }, [showModal]);

  return (
    <main className="max-w-3xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">工单筛选</h1>
      <h2 className="text-sm mt-4">按关键词过滤当前队列</h2>

      <form className="mt-16 flex gap-8" aria-label="筛选条件" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="text-sm text-ink-600">关键词</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="rounded border border-ink-100 px-12 py-8 focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2" />
        <button type="button" onClick={() => setQ('')} className="rounded bg-accent-500 text-white px-16 py-8 text-sm focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2">清空</button>
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
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="export-dialog-title" className="bg-white rounded p-24 max-w-md">
            <h2 id="export-dialog-title" className="text-lg font-medium text-ink-900">导出确认</h2>
            <p className="mt-8 text-sm text-ink-600">将导出匹配的 {shown.length} 条工单为 CSV。</p>
            <button type="button" ref={dialogCloseRef} aria-label="关闭弹层" onClick={() => setShowModal(false)} className="float-right text-xl cursor-pointer rounded focus-visible:ring-2 focus-visible:ring-accent-600"><span aria-hidden="true">&times;</span></button>
            <button type="button" className="mt-16 rounded bg-accent-500 text-white px-24 py-8 focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2">导出</button>
          </div>
        </div>
      )}

      <button type="button" ref={exportTriggerRef} onClick={() => setShowModal(true)} className="mt-24 text-sm text-accent-600 underline rounded focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2">导出结果…</button>
    </main>
  );
}
