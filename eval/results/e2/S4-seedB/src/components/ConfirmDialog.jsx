import { useEffect, useRef } from 'react';
import { BTN_DANGER, BTN_GHOST, BTN_PRIMARY } from './ui.jsx';

// 批量操作确认对话框：点名数量与对象；执行中禁用双按钮 + 内联进度，杜绝双击重复提交；
// Esc 关闭（执行中不可关），关闭后焦点归还触发器（INV-003 / INV-004）。
export default function ConfirmDialog({
  open,
  title,
  tone = 'primary',
  confirmLabel,
  confirmDisabled = false,
  busy = false,
  busyText,
  onConfirm,
  onCancel,
  children,
  footerNote
}) {
  const cancelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;
    cancelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && !busy) onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus?.();
    };
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="relative w-full max-w-md rounded-lg bg-surface p-6 shadow-xl"
      >
        <h2 id="confirm-dialog-title" className="text-base font-semibold text-ink-900">{title}</h2>
        <div className="mt-4">{children}</div>
        {busy && (
          <p role="status" className="mt-4 flex items-center gap-2 text-sm text-ink-600">
            <span aria-hidden="true" className="inline-block size-4 animate-spin rounded-full border-2 border-line border-t-primary-600 motion-reduce:animate-none" />
            {busyText}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button ref={cancelRef} type="button" onClick={onCancel} disabled={busy} className={BTN_GHOST}>
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy || confirmDisabled}
            className={tone === 'danger' ? BTN_DANGER : BTN_PRIMARY}
          >
            {confirmLabel}
          </button>
        </div>
        {footerNote && <p className="mt-3 text-xs text-ink-500">{footerNote}</p>}
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭对话框"
        onClick={busy ? undefined : onCancel}
        className="absolute inset-0 -z-10 cursor-default bg-ink-900/40"
      />
    </div>
  );
}
