import { useEffect, useRef, useState } from 'react';
import { COLUMNS, GROUPS } from '../data/columns';
import { BTN_GHOST, BTN_PRIMARY, CHECKBOX, INPUT } from './ui.jsx';

// 列显隐面板：分组 + 搜索；冻结列（主机名/内网IP）不可隐藏；
// 至少保留 3 个可见数据列，防止把表格藏空。
export default function ColumnSettingsPanel({ triggerRef, hiddenKeys, onToggleKey, onShowAll, onClose }) {
  const [filter, setFilter] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      triggerRef.current?.focus?.();
    };
  }, [onClose, triggerRef]);

  const visibleCount = COLUMNS.length - hiddenKeys.size;
  const canHideMore = visibleCount > 3;
  const kw = filter.trim().toLowerCase();

  return (
    <div
      role="dialog"
      aria-label="列显示设置"
      className="absolute right-0 top-full z-40 mt-2 w-96 overflow-hidden rounded-lg border border-line bg-surface shadow-lg"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭列设置"
        onClick={onClose}
        className="fixed inset-0 z-[-1] cursor-default"
      />
      <div className="border-b border-line px-4 py-3">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-ink-900">列显示设置</p>
          <p className="text-xs text-ink-500">已显示 {visibleCount} / {COLUMNS.length} 列</p>
        </div>
        <div className="mt-2">
          <label htmlFor="col-filter" className="sr-only">搜索列名</label>
          <input
            ref={searchRef}
            id="col-filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="搜索列名，如 IP / 费用 / 告警"
            className={INPUT}
          />
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto py-1">
        {GROUPS.map((g) => {
          const cols = COLUMNS.filter((c) => c.group === g.id && (!kw || c.label.toLowerCase().includes(kw) || c.key.toLowerCase().includes(kw)));
          if (!cols.length) return null;
          return (
            <div key={g.id} className="mb-1">
              <p className="px-4 pb-1 pt-2 text-xs font-semibold text-ink-500">{g.label}（{cols.length} 列）</p>
              {cols.map((col) => {
                const checked = !hiddenKeys.has(col.key);
                const disabled = col.frozen || (!checked && !canHideMore);
                return (
                  <div key={col.key} className="flex items-center gap-2 px-4 py-1">
                    <input
                      id={`colvis-${col.key}`}
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => onToggleKey(col.key)}
                      className={CHECKBOX}
                    />
                    <label htmlFor={`colvis-${col.key}`} className="flex-1 cursor-pointer text-sm text-ink-700">
                      {col.label}
                    </label>
                    {col.frozen ? (
                      <span className="text-xs text-primary-700" title="冻结列始终显示，不可隐藏">冻结</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
        {kw && !GROUPS.some((g) => COLUMNS.some((c) => c.group === g.id && (c.label.toLowerCase().includes(kw) || c.key.toLowerCase().includes(kw)))) && (
          <p className="px-4 py-6 text-center text-xs text-ink-500">没有匹配「{filter}」的列</p>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        <button type="button" onClick={onShowAll} className={BTN_PRIMARY}>
          显示全部 {COLUMNS.length} 列
        </button>
        <button type="button" onClick={onClose} className={BTN_GHOST}>
          完成
        </button>
        <span className="ml-auto text-xs text-ink-500">设置已本地记忆</span>
      </div>
    </div>
  );
}
