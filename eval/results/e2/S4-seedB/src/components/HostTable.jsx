import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SEL_COL_WIDTH } from '../data/columns';
import { formatCellValue, usageTone } from '../lib/format';
import { CHECKBOX, StatusDot, cn } from './ui.jsx';

// 主机表格：59+ 列横向滚动、前两列（主机名/内网IP）+ 选择列冻结、1 万行窗口化虚拟滚动。
// 行高由密度决定（紧凑 32 / 舒适 44），列宽与冻结偏移固定 → 密度切换不错位（INV-001/002/005）。

const OVERSCAN = 8;

const TD_BASE = 'border-b border-line px-2 align-middle whitespace-nowrap overflow-hidden text-ellipsis';

const COST_HINT_TONE = {
  正常: 'text-ink-500',
  空闲可缩容: 'text-warning-700',
  建议转包年: 'text-primary-700',
  即将到期: 'text-danger-700',
  可降配观察: 'text-warning-700'
};

function DataCell({ row, col, frozenLeft, isFrozenEdge, onOpenHost }) {
  const text = formatCellValue(row, col);
  const isFrozen = frozenLeft !== undefined;
  const style = { width: col.width, ...(isFrozen ? { left: frozenLeft } : null) };
  const cls = cn(
    TD_BASE,
    'text-xs',
    col.align === 'num' ? 'text-right tabular-nums text-ink-700' : 'text-left text-ink-700',
    col.type === 'mono' || col.type === 'ip' ? 'tabular-nums' : null,
    isFrozen && 'sticky z-10 bg-inherit',
    isFrozenEdge && 'border-r border-line'
  );

  if (col.type === 'hostname') {
    return (
      <td style={style} className={cn(cls, 'text-primary-700')}>
        <button
          type="button"
          onClick={() => onOpenHost(row)}
          title={`查看 ${row.hostname} 全部字段`}
          className="max-w-full truncate text-left font-medium text-primary-700 underline decoration-primary-100 decoration-2 underline-offset-2 transition-colors hover:text-primary-600 hover:decoration-primary-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {row.hostname}
        </button>
      </td>
    );
  }
  if (col.type === 'status') {
    return (
      <td style={style} className={cls} title={text}>
        <StatusDot status={row.status} />
      </td>
    );
  }
  if (col.type === 'pct') {
    const pct = row[col.key];
    return (
      <td style={style} className={cls} title={text}>
        <span className="flex items-center justify-end gap-1.5">
          <span className="tabular-nums">{pct}%</span>
          <span aria-hidden="true" className="inline-block h-1 w-12 shrink-0 overflow-hidden rounded bg-line">
            <span className={cn('block h-full', usageTone(pct))} style={{ width: Math.min(100, pct) }} />
          </span>
        </span>
      </td>
    );
  }
  if (col.type === 'costHint') {
    return (
      <td style={style} className={cn(cls, COST_HINT_TONE[text] || 'text-ink-500')} title={text}>
        {text}
      </td>
    );
  }
  return (
    <td style={style} className={cls} title={text}>
      {text}
    </td>
  );
}

export default function HostTable({ rows, columns, rowHeight, viewportH, selectedIds, onToggleRow, onToggleAll, onOpenHost }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);
  const prevRowHeightRef = useRef(rowHeight);
  const [scrollTop, setScrollTop] = useState(0);

  // 密度切换：行高变化时按比例保持滚动行位置，避免视觉跳行（INV-005）
  useEffect(() => {
    const el = scrollRef.current;
    const prev = prevRowHeightRef.current;
    if (el && prev !== rowHeight) {
      el.scrollTop = Math.round((el.scrollTop / prev) * rowHeight);
      prevRowHeightRef.current = rowHeight;
      setScrollTop(el.scrollTop);
    }
  }, [rowHeight]);

  // rAF 节流的滚动采样：滚动中只渲染可见窗口 ± OVERSCAN 行
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
    });
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const total = rows.length;
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
  const end = Math.min(total, Math.ceil((scrollTop + viewportH) / rowHeight) + OVERSCAN);
  const windowRows = rows.slice(start, end);

  const totalWidth = SEL_COL_WIDTH + columns.reduce((s, c) => s + c.width, 0);

  // 冻结偏移：选择列 left=0，其后冻结列依次累加（宽度固定 → 与表头严格对齐）
  const frozenOffsets = useMemo(() => {
    const map = new Map();
    let off = SEL_COL_WIDTH;
    for (const c of columns) {
      if (!c.frozen) break;
      map.set(c.key, off);
      off += c.width;
    }
    return map;
  }, [columns]);
  const frozenKeys = [...frozenOffsets.keys()];
  const frozenEdgeKey = frozenKeys.length ? frozenKeys[frozenKeys.length - 1] : null;

  const selectedInRows = useMemo(() => {
    let n = 0;
    for (const r of rows) if (selectedIds.has(r.id)) n += 1;
    return n;
  }, [rows, selectedIds]);
  const allChecked = total > 0 && selectedInRows === total;
  const someChecked = selectedInRows > 0 && !allChecked;

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-auto bg-surface"
        style={{ height: viewportH }}
        tabIndex={-1}
        aria-label="主机列表滚动区域"
      >
        <table className="host-grid w-max text-xs" style={{ width: totalWidth }} aria-rowcount={total}>
          <caption className="sr-only">
            主机清单：{columns.length} 个数据列 + 选择列，当前筛选共 {total} 行，虚拟滚动渲染
          </caption>
          <colgroup>
            <col style={{ width: SEL_COL_WIDTH }} />
            {columns.map((c) => (
              <col key={c.key} style={{ width: c.width }} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ height: rowHeight }}>
              <th
                scope="col"
                style={{ width: SEL_COL_WIDTH, left: 0 }}
                className="sticky top-0 z-30 border-b border-line bg-canvas px-1 text-center"
              >
                <input
                  type="checkbox"
                  className={CHECKBOX}
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked;
                  }}
                  onChange={() => onToggleAll(allChecked)}
                  aria-label={allChecked ? '取消全选当前筛选结果' : '全选当前筛选结果'}
                />
              </th>
              {columns.map((col) => {
                const left = frozenOffsets.get(col.key);
                const isFrozen = left !== undefined;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width, ...(isFrozen ? { left } : null) }}
                    title={col.label}
                    className={cn(
                      'sticky top-0 overflow-hidden whitespace-nowrap text-ellipsis border-b border-line bg-canvas px-2 text-xs font-medium text-ink-600',
                      col.align === 'num' ? 'text-right' : 'text-left',
                      isFrozen ? 'z-30' : 'z-20',
                      col.key === frozenEdgeKey && 'border-r border-line'
                    )}
                  >
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {start > 0 && (
              <tr aria-hidden="true" style={{ height: start * rowHeight }}>
                <td colSpan={columns.length + 1} className="border-0 p-0" style={{ height: start * rowHeight }} />
              </tr>
            )}
            {windowRows.map((row, i) => {
              const isSel = selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  style={{ height: rowHeight }}
                  aria-rowindex={start + i + 1}
                  aria-selected={isSel}
                  className={isSel ? 'bg-primary-50' : 'hover:bg-canvas'}
                >
                  <td
                    style={{ left: 0 }}
                    className={cn(TD_BASE, 'sticky z-10 border-r border-line bg-inherit px-1 text-center')}
                  >
                    <input
                      type="checkbox"
                      className={CHECKBOX}
                      checked={isSel}
                      onChange={() => onToggleRow(row.id)}
                      aria-label={`选择主机 ${row.hostname}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <DataCell
                      key={col.key}
                      row={row}
                      col={col}
                      frozenLeft={frozenOffsets.get(col.key)}
                      isFrozenEdge={col.key === frozenEdgeKey}
                      onOpenHost={onOpenHost}
                    />
                  ))}
                </tr>
              );
            })}
            {end < total && (
              <tr aria-hidden="true" style={{ height: (total - end) * rowHeight }}>
                <td colSpan={columns.length + 1} className="border-0 p-0" style={{ height: (total - end) * rowHeight }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 窗口信息条：虚拟化可观测（渲染行数 / 总行数 / 冻结列数） */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface px-4 py-2 text-xs text-ink-500">
        <span className="tabular-nums">
          虚拟窗口：第 {start + 1}–{Math.min(end, total)} 行 · 渲染 {windowRows.length} / {total} 行 · 已选 {selectedInRows} 行
        </span>
        <span className="tabular-nums">
          密度 {rowHeight === 32 ? '紧凑 32px' : '舒适 44px'} · 冻结前 {frozenKeys.length} 列 + 选择列 · 横向滚动共 {totalWidth} px 宽
        </span>
      </div>
    </div>
  );
}
