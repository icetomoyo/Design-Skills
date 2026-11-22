import React, { useEffect, useRef, useState } from 'react';

// 统一键盘焦点样式（CHK-05）：focus-visible 焦点环，全站一致；未移除原生焦点样式
const focusRing = 'focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2';

// 工单筛选页（既有页面，含若干可访问性缺陷——评测样例，非范本）
export default function TicketFilter({ tickets }) {
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shown = tickets.filter((t) => t.title.includes(q));
  const exportTriggerRef = useRef(null); // “导出结果…”：弹层关闭后归还焦点
  const dialogRef = useRef(null);        // 弹层容器：圈定焦点查询范围

  // 弹层焦点管理：打开时移入焦点、Tab 圈定、Esc 关闭、关闭后焦点归还触发器
  useEffect(() => {
    if (!showModal) return undefined;
    const dialog = dialogRef.current;
    const focusables = () =>
      Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    focusables()[0]?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = dialog.contains(document.activeElement) ? document.activeElement : first;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      exportTriggerRef.current?.focus();
    };
  }, [showModal]);

  return (
    <main className="max-w-3xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">工单筛选</h1>
      <h2 className="text-sm mt-4">按关键词过滤当前队列</h2>

      <form className="mt-16 flex gap-8" aria-label="筛选工单" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="text-sm text-ink-600">关键词</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className={`rounded border border-ink-100 px-12 py-8 ${focusRing}`} />
        <button type="button" onClick={() => setQ('')} className={`rounded bg-accent-500 text-white px-16 py-8 text-sm ${focusRing}`}><i>清空</i></button>
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
            aria-describedby="export-dialog-desc"
            className="bg-white rounded p-24 max-w-md"
          >
            <h2 id="export-dialog-title" className="text-lg font-medium text-ink-900">导出确认</h2>
            <p id="export-dialog-desc" className="mt-8 text-sm text-ink-600">将导出匹配的 {shown.length} 条工单为 CSV。</p>
            <button type="button" aria-label="关闭" onClick={() => setShowModal(false)} className={`float-right text-xl cursor-pointer ${focusRing}`}>&times;</button>
            <button type="button" className={`mt-16 rounded bg-accent-500 text-white px-24 py-8 ${focusRing}`}>导出</button>
          </div>
        </div>
      )}

      <button type="button" ref={exportTriggerRef} onClick={() => setShowModal(true)} className={`mt-24 text-sm text-accent-600 underline ${focusRing}`}>导出结果…</button>
    </main>
  );
}
