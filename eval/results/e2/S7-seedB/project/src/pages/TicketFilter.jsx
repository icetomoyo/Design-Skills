import React, { useEffect, useRef, useState } from 'react';

// 工单筛选页（可访问性精修：键盘全流程 + 语义结构；视觉方向不变——评测样例，非范本）
// 全站统一焦点样式：键盘聚焦时 2px accent 描边 + 2px 偏移（不使用 outline:none）
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600';

export default function TicketFilter({ tickets }) {
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shown = tickets.filter((t) => t.title.includes(q));
  const dialogRef = useRef(null);
  const exportTriggerRef = useRef(null);

  // 弹层打开：焦点移入对话框（tabIndex=-1 容器）
  useEffect(() => {
    if (showModal) dialogRef.current?.focus();
  }, [showModal]);

  // 关闭：焦点归还触发器（导出结果按钮）
  const closeModal = () => {
    setShowModal(false);
    exportTriggerRef.current?.focus();
  };

  // Esc 关闭 + Tab 焦点圈定（在弹层可聚焦元素间循环，不逃逸到底层页面）
  const onDialogKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const nodes = dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select, textarea'
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">工单筛选</h1>
      <h2 className="text-sm mt-4">按关键词过滤当前队列</h2>

      <form className="mt-16 flex gap-8" aria-label="筛选工单" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="text-sm text-ink-600">关键词</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className={`rounded border border-ink-100 px-12 py-8 ${FOCUS}`} />
        <button type="button" onClick={() => setQ('')} className={`rounded bg-accent-500 text-white px-16 py-8 text-sm ${FOCUS}`}>清空</button>
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
            onKeyDown={onDialogKeyDown}
            className="bg-white rounded p-24 max-w-md"
          >
            <h2 id="export-dialog-title" className="text-lg font-medium text-ink-900">导出确认</h2>
            <p className="mt-8 text-sm text-ink-600">将导出匹配的 {shown.length} 条工单为 CSV。</p>
            <button type="button" aria-label="关闭" onClick={closeModal} className={`float-right text-xl cursor-pointer ${FOCUS}`}>&times;</button>
            <button type="button" className={`mt-16 rounded bg-accent-500 text-white px-24 py-8 ${FOCUS}`}>导出</button>
          </div>
        </div>
      )}

      <button type="button" ref={exportTriggerRef} onClick={() => setShowModal(true)} className={`mt-24 text-sm text-accent-600 underline ${FOCUS}`}>导出结果…</button>
    </main>
  );
}
