import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const OVERSCAN = 6; // 上下各多渲染 6 行，快速滚动不露白
const GUTTER_W = 44; // 行首选择框列
const HEADER_H = 36;

const STATUS_DOT = {
  running: 'bg-success-600',
  stopped: 'bg-ink-400',
  maintaining: 'bg-warn-600',
  fault: 'bg-danger-600',
  restarting: 'bg-info-600',
};

/**
 * 虚拟化数据表（INV-001/002）：
 * - 固定行高（32/40 由密度决定）+ 绝对定位行 + overscan，DOM 只含可视区窗口；
 * - 首两列（主机名 / 内网 IP）+ 选择列 sticky left，与滚动容器同源行高，不错行；
 * - 表头 sticky top，冻结表头单元格为 corner（双向 sticky，z-index 最高）。
 */
export default function VirtualTable({
  rows,
  columns,
  density,
  selected,
  onToggleRow,
  onToggleAll,
  allSelected,
  someSelected,
}) {
  const rowH = density === 'comfy' ? 40 : 32;
  const scrollRef = useRef(null);
  const rafRef = useRef(0);
  const allRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewH, setViewH] = useState(640);

  // 视口高度（密度切换 / 窗口缩放都即时感知）
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      for (const ent of entries) setViewH(ent.contentRect.height);
    });
    ro.observe(el);
    setViewH(el.clientHeight || 640);
    return () => ro.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  // 数据集长度变化（筛选 / 重载）时回到顶部，避免 scrollTop 越界
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = 0;
      setScrollTop(0);
    }
  }, [rows.length]);

  const onScroll = useCallback((e) => {
    const el = e.currentTarget;
    if (rafRef.current) return; // rAF 节流，滚动中行高稳定
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      setScrollTop(el.scrollTop);
    });
  }, []);

  // 表头全选框半选态
  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

  // 冻结列的 left 偏移（选择列 + 依次累计）
  const frozenLefts = useMemo(() => {
    const lefts = new Map();
    let x = GUTTER_W;
    for (const c of columns) {
      if (!c.frozen) continue;
      lefts.set(c.key, x);
      x += c.w;
    }
    return lefts;
  }, [columns]);

  const totalW = useMemo(() => GUTTER_W + columns.reduce((s, c) => s + c.w, 0), [columns]);

  const start = Math.max(
    0,
    Math.min(Math.floor(scrollTop / rowH) - OVERSCAN, Math.max(0, rows.length - 1))
  );
  const end = Math.min(rows.length, Math.ceil((scrollTop + viewH) / rowH) + OVERSCAN);
  const windowRows = rows.slice(start, end);

  const cellText = useCallback(
    (col, row) => (col.fmt ? col.fmt(row) : String(row[col.key] ?? '')),
    []
  );

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="dt-scroll min-h-0 min-w-0 flex-1"
      role="grid"
      aria-label={`主机清单数据表，共 ${rows.length} 行`}
      aria-rowcount={rows.length + 1}
    >
      <div className="relative" style={{ width: totalW }}>
        {/* 表头：sticky top；冻结表头为 corner（top+left 双向 sticky） */}
        <div role="row" className="dt-hrow" style={{ height: HEADER_H }}>
          <div
            role="columnheader"
            aria-label="行选择"
            className="dt-h dt-fz sticky left-0 justify-center"
            style={{ width: GUTTER_W, zIndex: 40 }}
          >
            <input
              ref={allRef}
              type="checkbox"
              className="dt-chk"
              checked={allSelected}
              disabled={rows.length === 0}
              onChange={(e) => onToggleAll(e.target.checked)}
              aria-label="全选当前筛选结果"
            />
          </div>
          {columns.map((col) => {
            const fz = Boolean(col.frozen);
            return (
              <div
                key={col.key}
                role="columnheader"
                className={`dt-h${fz ? ' dt-fz sticky' : ''}${col.align === 'num' ? ' dt-num' : ''}`}
                style={fz ? { width: col.w, left: frozenLefts.get(col.key), zIndex: 40 } : { width: col.w }}
                title={`${col.label}（${col.group}）`}
              >
                {col.label}
              </div>
            );
          })}
        </div>

        {/* 表体：绝对定位虚拟行（只渲染 start..end 窗口） */}
        <div className="relative" style={{ height: rows.length * rowH, marginTop: HEADER_H }}>
          {windowRows.map((row, i) => {
            const abs = start + i;
            const isSel = selected.has(row.id);
            return (
              <div
                key={row.id}
                role="row"
                aria-rowindex={abs + 2}
                aria-selected={isSel}
                data-sel={isSel ? 'on' : 'off'}
                className="dt-row"
                style={{ position: 'absolute', top: abs * rowH, height: rowH, width: totalW }}
              >
                <div
                  role="gridcell"
                  className="dt-c dt-fz sticky left-0 justify-center"
                  style={{ width: GUTTER_W, zIndex: 20 }}
                >
                  <input
                    type="checkbox"
                    className="dt-chk"
                    checked={isSel}
                    onChange={(e) => onToggleRow(row.id, abs, e.nativeEvent.shiftKey)}
                    aria-label={`选择主机 ${row.hostname}`}
                  />
                </div>
                {columns.map((col) => {
                  const text = cellText(col, row);
                  const fz = Boolean(col.frozen);
                  return (
                    <div
                      key={col.key}
                      role="gridcell"
                      className={`dt-c${fz ? ' dt-fz sticky' : ''}${col.align === 'num' ? ' dt-num' : ''}${
                        col.key === 'hostname' ? ' dt-host' : ''
                      }`}
                      style={fz ? { width: col.w, left: frozenLefts.get(col.key), zIndex: 20 } : { width: col.w }}
                      title={text || undefined}
                    >
                      {col.key === 'status' ? (
                        <span className="flex items-center gap-1">
                          <span
                            aria-hidden="true"
                            className={`dt-dot ${STATUS_DOT[row.status] || 'bg-ink-400'}`}
                          />
                          <span>{text}</span>
                        </span>
                      ) : (
                        text
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
