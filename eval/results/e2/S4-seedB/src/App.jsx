import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COLUMNS, FROZEN_DATA_KEYS } from './data/columns';
import { getMockModeFromLocation } from './data/mockHosts';
import { useHosts } from './hooks/useHosts';
import Toolbar from './components/Toolbar.jsx';
import ColumnSettingsPanel from './components/ColumnSettingsPanel.jsx';
import BulkBar from './components/BulkBar.jsx';
import HostTable from './components/HostTable.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import DetailDrawer from './components/DetailDrawer.jsx';
import ToastStack from './components/Toast.jsx';
import { EmptyFilterResult, EmptyInventory, ErrorPanel, TableSkeleton } from './components/PageStates.jsx';
import { INPUT } from './components/ui.jsx';

const SELECT_SM =
  'h-7 w-40 rounded-md border border-line bg-surface px-2 text-xs text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600';

const LS_COLS = 's4-seedb.colvis.v1';
const LS_DENSITY = 's4-seedb.density.v1';
const ROW_HEIGHTS = { compact: 32, comfy: 44 };
const TAG_RE = /^[\w.-]+=[\w.-]+$/;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* 隐私模式等场景静默降级：仅失去记忆，不影响功能 */
  }
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-500">{label}</p>
      <p className="text-sm font-semibold tabular-nums text-ink-900">{value}</p>
    </div>
  );
}

export default function App() {
  const { status, rows, error, mode, reload, changeMode } = useHosts(getMockModeFromLocation());

  const [kw, setKw] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('q') || '';
    } catch {
      return '';
    }
  });
  const [envFilter, setEnvFilter] = useState('all');
  const [density, setDensity] = useState(() => {
    const v = loadJSON(LS_DENSITY, 'compact');
    return v === 'comfy' ? 'comfy' : 'compact';
  });
  const [hiddenList, setHiddenList] = useState(() => loadJSON(LS_COLS, []).filter((k) => !FROZEN_DATA_KEYS.includes(k)));
  const hiddenKeys = useMemo(() => new Set(hiddenList), [hiddenList]);

  const [selected, setSelected] = useState(() => new Set());
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [drawerHost, setDrawerHost] = useState(null);
  const [dialog, setDialog] = useState(null); // null | { kind: 'restart' } | { kind: 'tag' }
  const [tagInput, setTagInput] = useState('inspection=passed');
  const [busy, setBusy] = useState(false);
  const [toasts, setToasts] = useState([]);

  const columnsBtnRef = useRef(null);
  const toastSeq = useRef(0);

  const rowHeight = ROW_HEIGHTS[density];
  const visibleColumns = useMemo(() => COLUMNS.filter((c) => !hiddenKeys.has(c.key)), [hiddenKeys]);

  useEffect(() => saveJSON(LS_DENSITY, density), [density]);
  useEffect(() => saveJSON(LS_COLS, hiddenList), [hiddenList]);

  // 搜索词同步进 URL（可分享、可后退），300ms 防抖
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        const u = new URL(window.location);
        if (kw) u.searchParams.set('q', kw);
        else u.searchParams.delete('q');
        window.history.replaceState(null, '', u);
      } catch {
        /* ignore */
      }
    }, 300);
    return () => window.clearTimeout(t);
  }, [kw]);

  const filtered = useMemo(() => {
    const k = kw.trim().toLowerCase();
    return rows.filter((r) => {
      if (envFilter !== 'all' && r.env !== envFilter) return false;
      if (!k) return true;
      return (
        r.hostname.includes(k) ||
        r.innerIp.includes(k) ||
        r.publicIp.includes(k) ||
        r.instanceId.toLowerCase().includes(k) ||
        r.app.includes(k) ||
        r.cluster.includes(k) ||
        r.owner.includes(k)
      );
    });
  }, [rows, kw, envFilter]);

  const stats = useMemo(() => {
    let running = 0;
    let alerts = 0;
    let cost = 0;
    for (const r of rows) {
      if (r.status === '运行中') running += 1;
      if (r.lastAlert !== '无') alerts += 1;
      cost += r.monthlyCost;
    }
    return { total: rows.length, running, alerts, cost };
  }, [rows]);

  // 表格视口高度：跟随窗口高度，保证一屏内工具栏+表格+信息条不产生页面级横向/纵向抖动
  const [viewportH, setViewportH] = useState(600);
  useEffect(() => {
    const calc = () => setViewportH(Math.max(320, window.innerHeight - 360));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // 重新加载（含四态切换）时清空选择，避免批量条挂着陈旧的选中计数
  useEffect(() => {
    if (status === 'loading') setSelected(new Set());
  }, [status]);

  // ---- 选择 ----
  const toggleRow = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllFiltered = useCallback(
    (currentlyAll) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (currentlyAll) {
          for (const r of filtered) next.delete(r.id);
        } else {
          for (const r of filtered) next.add(r.id);
        }
        return next;
      });
    },
    [filtered]
  );

  // ---- 列显隐 ----
  const toggleColumnKey = useCallback((key) => {
    setHiddenList((prev) => {
      if (FROZEN_DATA_KEYS.includes(key)) return prev; // 冻结列不可隐藏
      const has = prev.includes(key);
      if (!has && COLUMNS.length - prev.length <= 3) return prev; // 至少保留 3 个数据列
      return has ? prev.filter((k) => k !== key) : [...prev, key];
    });
  }, []);
  const showAllColumns = useCallback(() => setHiddenList([]), []);

  // ---- toast ----
  const pushToast = useCallback((toast) => {
    const id = `t${(toastSeq.current += 1)}`;
    setToasts((prev) => [...prev.slice(-2), { id, ...toast }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 6000);
  }, []);
  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  // ---- 批量操作：确认 -> 执行中（禁用+进度） -> 完成反馈（成功/失败计数，失败点名可重试） ----
  const selectedRows = useMemo(() => rows.filter((r) => selected.has(r.id)), [rows, selected]);

  const runBatch = useCallback(
    (kind, tag) => {
      setBusy(true);
      const targets = selectedRows;
      window.setTimeout(() => {
        // 模拟部分失败：批量 >= 20 台时最后一台 SSH 超时（失败不静默，toast 点名原因）
        const failed = targets.length >= 20 ? [targets[targets.length - 1]] : [];
        const okCount = targets.length - failed.length;
        if (kind === 'restart') {
          pushToast({
            tone: failed.length ? 'partial' : 'success',
            title: `批量重启完成：成功 ${okCount} 台${failed.length ? `，失败 ${failed.length} 台` : ''}`,
            detail: failed.length
              ? `失败：${failed[0].hostname}（SSH 连接超时，已跳过）。可在工单中心对该主机单独重试。`
              : `${targets.length} 台主机已全部下发重启指令并恢复运行。`
          });
        } else {
          pushToast({
            tone: 'success',
            title: `已为 ${targets.length} 台主机添加标签 ${tag}`,
            detail: '标签正在异步下发，预计 1 分钟内全量生效。'
          });
        }
        setBusy(false);
        setDialog(null);
        setSelected(new Set());
      }, 1500);
    },
    [selectedRows, pushToast]
  );

  const tagValid = TAG_RE.test(tagInput.trim());
  const closeDialog = useCallback(() => {
    if (!busy) setDialog(null);
  }, [busy]);
  const closeDrawer = useCallback(() => setDrawerHost(null), []);

  const clearFilters = useCallback(() => {
    setKw('');
    setEnvFilter('all');
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#hosts-table"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        跳到主机列表
      </a>

      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-end gap-x-8 gap-y-3 px-6 py-4">
          <div>
            <p className="text-xs text-ink-500">运维资产平台 · 资产清单</p>
            <h1 className="text-xl font-semibold text-ink-900">主机清单</h1>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Stat label="主机总数" value={stats.total.toLocaleString('zh-CN')} />
            <Stat label="运行中" value={stats.running.toLocaleString('zh-CN')} />
            <Stat label="告警中" value={stats.alerts.toLocaleString('zh-CN')} />
            <Stat label="月费用合计" value={`¥ ${(stats.cost / 10000).toFixed(1)} 万`} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="mock-mode" className="text-xs text-ink-500">
              演示状态
            </label>
            <select
              id="mock-mode"
              value={mode}
              onChange={(e) => changeMode(e.target.value)}
              title="验证数据四态：也可通过 URL 参数 ?mock=slow / error / empty 触达"
              className={SELECT_SM}
            >
              <option value="ok">正常数据（1 万行）</option>
              <option value="slow">模拟慢加载</option>
              <option value="error">模拟服务错误</option>
              <option value="empty">模拟空清单</option>
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-6 py-4">
        <section className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
          <Toolbar
            kw={kw}
            onKwChange={setKw}
            envFilter={envFilter}
            onEnvFilter={setEnvFilter}
            density={density}
            onDensity={setDensity}
            visibleColCount={visibleColumns.length}
            totalColCount={COLUMNS.length}
            onToggleColumns={() => setColumnsOpen((v) => !v)}
            columnsOpen={columnsOpen}
            columnsBtnRef={columnsBtnRef}
            onRefresh={reload}
            loading={status === 'loading'}
          >
            {columnsOpen && (
              <ColumnSettingsPanel
                triggerRef={columnsBtnRef}
                hiddenKeys={hiddenKeys}
                onToggleKey={toggleColumnKey}
                onShowAll={showAllColumns}
                onClose={() => setColumnsOpen(false)}
              />
            )}
          </Toolbar>

          {selected.size > 0 && (
            <BulkBar
              count={selected.size}
              busy={busy}
              onClear={() => setSelected(new Set())}
              onRestart={() => setDialog({ kind: 'restart' })}
              onTag={() => setDialog({ kind: 'tag' })}
            />
          )}

          <div id="hosts-table">
            {status === 'loading' && <TableSkeleton rowHeight={rowHeight} rows={Math.ceil(viewportH / rowHeight)} />}
            {status === 'error' && <ErrorPanel error={error} onRetry={reload} />}
            {status === 'success' && filtered.length === 0 && (
              (kw.trim() || envFilter !== 'all'
                ? <EmptyFilterResult kw={kw} env={envFilter} onClear={clearFilters} />
                : <EmptyInventory onReload={reload} />)
            )}
            {status === 'success' && filtered.length > 0 && (
              <HostTable
                rows={filtered}
                columns={visibleColumns}
                rowHeight={rowHeight}
                viewportH={viewportH}
                selectedIds={selected}
                onToggleRow={toggleRow}
                onToggleAll={toggleAllFiltered}
                onOpenHost={setDrawerHost}
              />
            )}
          </div>
        </section>

        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
          <span>点击主机名查看全部 {COLUMNS.length} 项字段；单元格悬停可看完整值。</span>
          <span>列显隐与密度选择已在本机记忆（localStorage）。</span>
          <span>批量操作先确认后执行，完成后给成功/失败计数。</span>
        </p>
      </main>

      {/* 批量重启确认 */}
      <ConfirmDialog
        open={dialog?.kind === 'restart'}
        title="确认批量重启"
        tone="danger"
        confirmLabel={busy ? '正在执行…' : `确认重启 ${selected.size} 台`}
        busy={busy}
        busyText={`正在向 ${selected.size} 台主机下发重启指令…`}
        onConfirm={() => runBatch('restart')}
        onCancel={closeDialog}
        footerNote="重启会中断业务进程；生产环境请确认已进入变更窗口。"
      >
        <p className="text-sm text-ink-700">
          即将重启 <strong className="font-semibold text-ink-900">{selected.size}</strong> 台主机：
        </p>
        <ul className="mt-2 max-h-32 overflow-y-auto rounded-md border border-line bg-canvas px-3 py-2 text-xs tabular-nums text-ink-600">
          {selectedRows.slice(0, 6).map((r) => (
            <li key={r.id} className="truncate">
              {r.hostname}（{r.innerIp}）
            </li>
          ))}
          {selectedRows.length > 6 && <li>……共 {selectedRows.length} 台</li>}
        </ul>
      </ConfirmDialog>

      {/* 批量打标签确认 */}
      <ConfirmDialog
        open={dialog?.kind === 'tag'}
        title="批量打标签"
        confirmLabel={busy ? '正在执行…' : `为 ${selected.size} 台主机添加标签`}
        confirmDisabled={!tagValid}
        busy={busy}
        busyText={`正在为 ${selected.size} 台主机写入标签…`}
        onConfirm={() => runBatch('tag', tagInput.trim())}
        onCancel={closeDialog}
        footerNote="标签格式 key=value；写入后可配合筛选快速圈选这批主机。"
      >
        <label htmlFor="tag-input" className="block text-sm text-ink-700">
          标签内容（格式 key=value）
        </label>
        <input
          id="tag-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="inspection=passed"
          className={INPUT}
          aria-describedby="tag-hint"
          autoComplete="off"
        />
        <p id="tag-hint" className="mt-2 text-xs text-ink-500">
          {tagValid ? `将为 ${selected.size} 台主机添加标签 ${tagInput.trim()}。` : '请输入 key=value 格式，例如 inspection=passed。'}
        </p>
      </ConfirmDialog>

      {drawerHost && <DetailDrawer host={drawerHost} onClose={closeDrawer} />}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
