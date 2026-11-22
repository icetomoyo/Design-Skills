import { useEffect, useRef } from 'react';
import { COLUMNS, GROUPS } from '../data/columns';
import { formatCellValue } from '../lib/format';
import { StatusDot } from './ui.jsx';

// 单行全字段详情抽屉：被截断单元格的完整展开途径（INV-006）。
// Esc 关闭、关闭后焦点归还触发器、背板按钮关闭（不用 div onclick）。
export default function DetailDrawer({ host, onClose }) {
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    openerRef.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="host-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col bg-surface shadow-xl"
      >
        <header className="flex items-start gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-500">主机详情 · 全部 {COLUMNS.length} 项字段</p>
            <h2 id="host-drawer-title" className="mt-0.5 break-all text-base font-semibold text-ink-900">
              {host.hostname}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-600">
              <StatusDot status={host.status} />
              <span className="tabular-nums">{host.innerIp}</span>
              <span>{host.env} · {host.region} · {host.zone}</span>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭主机详情"
            className="rounded p-1.5 text-ink-500 transition-colors hover:bg-canvas hover:text-ink-700 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {GROUPS.map((g) => (
            <section key={g.id} className="mb-5" aria-label={g.label}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">{g.label}</h3>
              <dl className="flex flex-col gap-1.5">
                {COLUMNS.filter((c) => c.group === g.id).map((col) => (
                  <div key={col.key} className="flex items-baseline gap-4">
                    <dt className="w-28 shrink-0 text-xs text-ink-500">{col.label}</dt>
                    <dd className="min-w-0 flex-1 break-words text-sm tabular-nums text-ink-900">{formatCellValue(host, col)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <footer className="border-t border-line px-5 py-3 text-xs text-ink-500">
          负责人 {host.owner}（{host.email}）· 值班 {host.oncall} · 月费用 ¥ {host.monthlyCost.toLocaleString('zh-CN')}
        </footer>
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭主机详情"
        onClick={onClose}
        className="absolute inset-0 -z-10 cursor-default bg-ink-900/40"
      />
    </div>
  );
}
