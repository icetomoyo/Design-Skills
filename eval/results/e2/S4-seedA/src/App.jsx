import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COLUMNS, COLUMN_MAP, DEFAULT_VISIBLE, FROZEN_KEYS } from './data/columns.js';
import { useHosts } from './hooks/useHosts.js';
import VirtualTable from './components/VirtualTable.jsx';
import ColumnSettings from './components/ColumnSettings.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { EmptyState, ErrorState, TableSkeleton } from './components/StateViews.jsx';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadVisibleKeys() {
  try {
    const raw = JSON.parse(window.localStorage.getItem('hosts.cols') || 'null');
    if (Array.isArray(raw) && raw.length) {
      const set = new Set(raw.filter((k) => COLUMN_MAP[k]));
      for (const k of FROZEN_KEYS) set.add(k); // 冻结列永远必显
      return set;
    }
  } catch {
    /* 本地数据损坏则回退默认 */
  }
  return new Set(DEFAULT_VISIBLE);
}

export default function App() {
  const [hosts, { reload, patchRows }] = useHosts();
  const [query, setQuery] = useState('');
  const [density, setDensity] = useState(() => {
    return window.localStorage.getItem('hosts.density') === 'comfy' ? 'comfy' : 'compact';
  });
  const [visibleKeys, setVisibleKeys] = useState(loadVisibleKeys);
  const [selected, setSelected] = useState(() => new Set());
  const [colsOpen, setColsOpen] = useState(false);
  const [dialog, setDialog] = useState(null); // { type: 'restart' | 'tag' }
  const [busy, setBusy] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const [tagError, setTagError] = useState('');
  const [toast, setToast] = useState(null);
  const anchorRef = useRef(null); // shift 范围选择锚点
  const openerRef = useRef(null); // 弹层/弹窗触发器，关闭后归还焦点
  const toastTimer = useRef(0);

  useEffect(() => {
    window.localStorage.setItem('hosts.density', density);
  }, [density]);
  useEffect(() => {
    window.localStorage.setItem('hosts.cols', JSON.stringify([...visibleKeys]));
  }, [visibleKeys]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message, tone = 'success') => {
    setToast({ message, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const rows = hosts.rows;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      (
        r.hostname +
        ' ' +
        r.ip_private +
        ' ' +
        r.ip_public +
        ' ' +
        r.owner +
        ' ' +
        r.team +
        ' ' +
        r.app +
        ' ' +
        r.host_id +
        ' ' +
        r.tags.join(' ')
      )
        .toLowerCase()
        .includes(q)
    );
  }, [rows, query]);

  const allSelected = useMemo(
    () => filtered.length > 0 && filtered.every((r) => selected.has(r.id)),
    [filtered, selected]
  );
  const someSelected = selected.size > 0;

  // —— 选择（键盘可达：原生 checkbox；Shift 范围选择） ——
  const toggleRow = useCallback(
    (id, index, shift) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (shift && anchorRef.current !== null) {
          const [a, b] =
            anchorRef.current <= index ? [anchorRef.current, index] : [index, anchorRef.current];
          for (let i = a; i <= b; i++) next.add(filtered[i].id);
        } else if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
      anchorRef.current = index;
    },
    [filtered]
  );

  const toggleAll = useCallback(
    (on) => {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of filtered) {
          if (on) next.add(r.id);
          else next.delete(r.id);
        }
        return next;
      });
      anchorRef.current = null;
    },
    [filtered]
  );

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  // —— 批量操作：计数 -> 确认 -> 执行 -> 完成反馈（INV-003/004） ——
  const openDialog = (type, el) => {
    openerRef.current = el || null;
    setTagValue('');
    setTagError('');
    setBusy(false);
    setDialog({ type });
  };

  const closeDialog = useCallback(() => {
    if (busy) return;
    setDialog(null);
  }, [busy]);

  const confirmBatch = async () => {
    const ids = new Set(selected);
    const n = ids.size;
    setBusy(true);
    await sleep(900); // 模拟下发耗时
    if (dialog.type === 'restart') {
      patchRows((r) => (ids.has(r.id) ? { ...r, status: 'restarting' } : r));
      setDialog(null);
      setBusy(false);
      notify(`已完成：已向 ${n} 台主机下发重启指令，预计 1–2 分钟内恢复运行`);
      setTimeout(() => {
        patchRows((r) => (ids.has(r.id) && r.status === 'restarting' ? { ...r, status: 'running' } : r));
      }, 2000);
    } else {
      const value = tagValue.trim();
      if (!value) {
        setTagError('请填写标签内容（格式如 tier:core）');
        setBusy(false);
        return;
      }
      patchRows((r) =>
        ids.has(r.id) && !r.tags.includes(value) ? { ...r, tags: [...r.tags, value] } : r
      );
      setDialog(null);
      setBusy(false);
      notify(`已完成：已为 ${n} 台主机添加标签「${value}」（同名片标签已跳过）`);
    }
    anchorRef.current = null;
    setSelected(new Set());
  };

  const selectedHostnames = useMemo(() => {
    if (!dialog || selected.size === 0) return [];
    const out = [];
    for (const r of rows) {
      if (selected.has(r.id)) out.push(r.hostname);
      if (out.length >= 3) break;
    }
    return out;
  }, [dialog, rows, selected]);

  const columns = useMemo(() => COLUMNS.filter((c) => visibleKeys.has(c.key)), [visibleKeys]);
  const rowH = density === 'comfy' ? 40 : 32;

  return (
    <div className="flex h-full min-w-0 flex-col" data-density={density}>
      {/* 顶栏 */}
      <header className="flex h-12 flex-none items-center justify-between gap-2 border-b border-ink-200 bg-white px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div
            aria-hidden="true"
            className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-primary-600 text-sm font-semibold text-white"
          >
            星
          </div>
          <span className="truncate text-sm font-semibold text-ink-900">星链运维平台</span>
          <span aria-hidden="true" className="text-xs text-ink-400">
            /
          </span>
          <span className="truncate text-sm text-ink-600">主机清单</span>
        </div>
        <div className="flex flex-none items-center gap-2">
          <span className="chip">生产环境</span>
          <span className="chip">值班：138****0099</span>
          <span className="chip">ops@constellation</span>
        </div>
      </header>

      {/* 工具栏 */}
      <section
        aria-label="表格工具栏"
        className="flex flex-none flex-wrap items-end justify-between gap-2 px-4 pb-3 pt-4"
      >
        <div className="min-w-0">
          <h1 className="text-xl font-semibold leading-6 text-ink-900">主机清单</h1>
          <p className="mt-1 text-sm text-ink-600">
            共 {rows.length.toLocaleString('zh-CN')} 台 · {COLUMNS.length} 个资产字段 · 首两列（主机名 / 内网
            IP）已冻结
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-full max-w-xs sm:w-64">
            <label htmlFor="host-search" className="sr-only">
              搜索主机名 / IP / 负责人 / 团队 / 标签
            </label>
            <input
              id="host-search"
              type="search"
              className="tbx"
              placeholder="搜索主机名 / IP / 负责人…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div
            role="group"
            aria-label="表格密度切换"
            className="flex overflow-hidden rounded-md border border-ink-300 bg-white"
          >
            <button
              type="button"
              aria-pressed={density === 'compact'}
              className={`h-8 px-3 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 focus-visible:ring-offset-white ${
                density === 'compact'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-ink-700 hover:bg-ink-50'
              }`}
              onClick={() => setDensity('compact')}
            >
              紧凑
            </button>
            <button
              type="button"
              aria-pressed={density === 'comfy'}
              className={`h-8 border-l border-ink-300 px-3 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 focus-visible:ring-offset-white ${
                density === 'comfy'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-ink-700 hover:bg-ink-50'
              }`}
              onClick={() => setDensity('comfy')}
            >
              舒适
            </button>
          </div>
          <button
            type="button"
            className="btn"
            onClick={reload}
            disabled={hosts.status === 'loading'}
          >
            刷新
          </button>
          <div className="relative">
            <button
              type="button"
              className="btn"
              aria-haspopup="dialog"
              aria-expanded={colsOpen}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setColsOpen(true);
              }}
            >
              列设置
              <span className="text-xs text-ink-500">
                {visibleKeys.size}/{COLUMNS.length}
              </span>
            </button>
            <ColumnSettings
              open={colsOpen}
              onClose={() => setColsOpen(false)}
              onApply={setVisibleKeys}
              visibleKeys={visibleKeys}
              openerRef={openerRef}
            />
          </div>
        </div>
      </section>

      {/* 批量操作条：选中即现，带计数（INV-003） */}
      {someSelected && hosts.status === 'success' ? (
        <div
          role="status"
          className="mx-4 mb-2 flex flex-none flex-wrap items-center gap-2 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2"
        >
          <span className="text-sm font-semibold text-ink-900">
            已选 {selected.size.toLocaleString('zh-CN')} 台主机
          </span>
          <span aria-hidden="true" className="h-4 w-px bg-ink-300" />
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => openDialog('restart', e.currentTarget)}
          >
            批量重启…
          </button>
          <button
            type="button"
            className="btn"
            onClick={(e) => openDialog('tag', e.currentTarget)}
          >
            批量打标签…
          </button>
          <span className="hidden text-xs text-ink-600 md:inline">
            勾选行首复选框选择；Shift + 勾选可范围选择；复选框可 Tab 键盘触达
          </span>
          <button type="button" className="btn btn-ghost ml-auto" onClick={clearSelection}>
            清除选择
          </button>
        </div>
      ) : null}

      {/* 主体四态 */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        {hosts.status === 'loading' ? (
          <TableSkeleton rowCount={Math.max(8, Math.floor(520 / rowH))} />
        ) : hosts.status === 'error' ? (
          <ErrorState message={hosts.error} code={hosts.code} onRetry={reload} />
        ) : rows.length === 0 ? (
          <EmptyState
            kind="vacuum"
            onAction={(label) => notify(`已收到请求：${label}（演示环境）`, 'info')}
          />
        ) : filtered.length === 0 ? (
          <EmptyState kind="filtered" keyword={query} onClear={() => setQuery('')} />
        ) : (
          <div className="mx-4 mb-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-ink-200 bg-white">
            <VirtualTable
              rows={filtered}
              columns={columns}
              density={density}
              selected={selected}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              allSelected={allSelected}
              someSelected={someSelected}
            />
          </div>
        )}
      </main>

      {/* 页脚状态条 */}
      <footer className="flex flex-none flex-wrap items-center justify-between gap-2 border-t border-ink-200 bg-white px-4 py-2 text-xs text-ink-500">
        <span>
          共 {rows.length.toLocaleString('zh-CN')} 台 · 筛选后显示 {filtered.length.toLocaleString('zh-CN')}{' '}
          台 · 已选 {selected.size.toLocaleString('zh-CN')} 台 · 显示 {visibleKeys.size}/
          {COLUMNS.length} 列
        </span>
        <span>
          虚拟滚动：仅渲染可视区窗口（固定行高 {rowH}px + overscan 6）· 密度与列设置已本地记忆
        </span>
      </footer>

      {/* 批量操作确认（INV-003：无确认不执行） */}
      {dialog ? (
        <ConfirmDialog
          tone={dialog.type === 'restart' ? 'danger' : 'primary'}
          title={
            dialog.type === 'restart'
              ? `确认重启 ${selected.size.toLocaleString('zh-CN')} 台主机？`
              : `为 ${selected.size.toLocaleString('zh-CN')} 台主机打标签`
          }
          confirmLabel={dialog.type === 'restart' ? `确认重启 ${selected.size} 台` : '添加标签'}
          busyLabel={dialog.type === 'restart' ? '正在下发重启指令…' : '正在写入标签…'}
          busy={busy}
          onCancel={closeDialog}
          onConfirm={confirmBatch}
          openerRef={openerRef}
        >
          {dialog.type === 'restart' ? (
            <div className="space-y-2">
              <p>
                即将重启：
                <span className="font-medium text-ink-900">
                  {selectedHostnames.join('、')}
                  {selected.size > 3 ? ` 等 ${selected.size} 台` : ''}
                </span>
                。
              </p>
              <p className="rounded-md border border-danger-100 bg-danger-50 px-3 py-2 text-danger-700">
                重启期间主机上的服务将中断约 1–2 分钟；生产环境建议避开业务高峰执行。
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="tag-input" className="block font-medium text-ink-800">
                标签内容（键:值）
              </label>
              <input
                id="tag-input"
                type="text"
                className="tbx"
                list="tag-presets"
                placeholder="如 tier:core"
                value={tagValue}
                onChange={(e) => {
                  setTagValue(e.target.value);
                  setTagError('');
                }}
                disabled={busy}
              />
              <datalist id="tag-presets">
                <option value="tier:core" />
                <option value="tier:standard" />
                <option value="charge:费用支出" />
                <option value="charge:资本支出" />
                <option value="arch:arm" />
              </datalist>
              {tagError ? (
                <p role="alert" className="text-xs text-danger-700">
                  {tagError}
                </p>
              ) : (
                <p className="text-xs text-ink-500">
                  将写入所选 {selected.size} 台主机的「标签」列；已存在同名片标签的主机会自动跳过。
                </p>
              )}
            </div>
          )}
        </ConfirmDialog>
      ) : null}

      {/* 完成反馈（aria-live 播报，INV-004） */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-14 z-50 flex justify-center px-4">
        {toast ? (
          <div className="toast" role="status">
            <span
              aria-hidden="true"
              className={`inline-block h-2 w-2 flex-none rounded-full ${
                toast.tone === 'success' ? 'bg-success-600' : 'bg-info-600'
              }`}
            />
            {toast.message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
