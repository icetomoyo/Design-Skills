import { useEffect, useRef, useState } from 'react';
import { COLUMNS, DEFAULT_VISIBLE, FROZEN_KEYS, GROUPS } from '../data/columns.js';

// 列显隐弹层：冻结列锁定；全部显示 / 恢复默认；本地即时生效（INV-002 保障冻结列不可隐藏）
export default function ColumnSettings({ open, onClose, onApply, visibleKeys, openerRef }) {
  const [filter, setFilter] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return () => {
      const el = openerRef && openerRef.current;
      if (el && document.contains(el)) el.focus();
    };
  }, [open, openerRef]);

  if (!open) return null;

  const toggle = (key) => {
    if (FROZEN_KEYS.includes(key)) return; // 冻结列不可隐藏
    const next = new Set(visibleKeys);
    if (next.has(key)) {
      if (next.size <= 1) return; // 至少保留一列
      next.delete(key);
    } else {
      next.add(key);
    }
    onApply(next);
  };

  const showAll = () => onApply(new Set(COLUMNS.map((c) => c.key)));
  const resetDefault = () => {
    onApply(new Set(DEFAULT_VISIBLE));
    setFilter('');
  };

  const kw = filter.trim().toLowerCase();
  const list = COLUMNS.filter((c) =>
    !kw ? true : (c.label + c.key + c.group).toLowerCase().includes(kw)
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onMouseDown={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-label="列显示设置"
        className="panel absolute right-0 top-10 z-50 flex max-h-96 w-80 flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            onClose();
          }
        }}
      >
        <div className="flex flex-none items-center justify-between border-b border-ink-100 px-3 py-2">
          <span className="text-sm font-semibold text-ink-900">列显示设置</span>
          <span className="text-xs text-ink-500">
            已显示 {visibleKeys.size}/{COLUMNS.length} 列
          </span>
        </div>
        <div className="border-b border-ink-100 p-2">
          <label htmlFor="col-filter" className="sr-only">
            筛选列名
          </label>
          <input
            id="col-filter"
            ref={inputRef}
            type="search"
            className="tbx"
            value={filter}
            placeholder="筛选列名（共 60 列）…"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-1" role="group" aria-label="全部数据列">
          {GROUPS.map((g) => {
            const items = list.filter((c) => c.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <div className="px-2 pb-1 pt-2 text-xs font-medium text-ink-500">{g}</div>
                {items.map((c) => {
                  const frozen = FROZEN_KEYS.includes(c.key);
                  return (
                    <label
                      key={c.key}
                      className={`flex items-center gap-2 rounded px-2 py-1 text-sm ${
                        frozen ? 'cursor-default' : 'cursor-pointer hover:bg-ink-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="dt-chk"
                        checked={visibleKeys.has(c.key)}
                        disabled={frozen}
                        onChange={() => toggle(c.key)}
                      />
                      <span className="flex-1 text-ink-700">{c.label}</span>
                      {frozen ? <span className="text-xs text-ink-500">冻结 · 必显</span> : null}
                    </label>
                  );
                })}
              </div>
            );
          })}
          {!list.length ? (
            <p className="px-2 py-6 text-center text-sm text-ink-500">没有匹配「{filter}」的列名</p>
          ) : null}
        </div>
        <div className="flex flex-none items-center justify-between gap-2 border-t border-ink-100 px-3 py-2">
          <div className="flex items-center gap-2">
            <button type="button" className="btn px-2 text-xs" onClick={showAll}>
              全部显示
            </button>
            <button type="button" className="btn px-2 text-xs" onClick={resetDefault}>
              恢复默认
            </button>
          </div>
          <button type="button" className="btn btn-primary px-3 text-xs" onClick={onClose}>
            完成
          </button>
        </div>
      </div>
    </>
  );
}
