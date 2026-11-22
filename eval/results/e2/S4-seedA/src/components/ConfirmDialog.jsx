import { useEffect, useRef } from 'react';

// 批量操作确认弹窗（INV-003/004）：alertdialog + Esc 关闭 + 焦点圈 + 关闭后焦点归还触发器
export default function ConfirmDialog({
  tone = 'primary',
  title,
  confirmLabel,
  busyLabel = '处理中…',
  busy = false,
  onCancel,
  onConfirm,
  openerRef,
  children,
}) {
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    const first = tone === 'danger' ? cancelRef.current : confirmRef.current;
    if (first) first.focus();
  }, [tone]);

  // 关闭（卸载）后把焦点还给触发器；触发器已卸载时退回搜索框
  useEffect(() => {
    return () => {
      const el = openerRef && openerRef.current;
      if (el && document.contains(el)) el.focus();
      else {
        const fallback = document.getElementById('host-search');
        if (fallback) fallback.focus();
      }
    };
  }, [openerRef]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && !busy) {
      e.preventDefault();
      onCancel();
      return;
    }
    if (e.key === 'Tab') {
      const items = [cancelRef.current, confirmRef.current].filter(Boolean);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        aria-describedby="dlg-desc"
        className="panel w-full max-w-md p-4"
        onKeyDown={onKeyDown}
      >
        <h2 id="dlg-title" className="text-base font-semibold text-ink-900">
          {title}
        </h2>
        <div id="dlg-desc" className="mt-2 text-sm text-ink-600">
          {children}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button ref={cancelRef} type="button" className="btn" onClick={onCancel} disabled={busy}>
            取消
          </button>
          <button
            ref={confirmRef}
            type="button"
            className={tone === 'danger' ? 'btn btn-danger' : 'btn btn-primary'}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? busyLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
