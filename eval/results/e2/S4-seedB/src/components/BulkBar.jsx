import { BTN_DANGER_GHOST_SM, BTN_GHOST_SM } from './ui.jsx';

// 选中后出现的批量操作条：已选计数 | 清除 | 批量动作（动作文案随数量变形）
export default function BulkBar({ count, busy, onClear, onRestart, onTag }) {
  return (
    <div role="region" aria-label="批量操作" className="flex flex-wrap items-center gap-3 border-b border-line bg-primary-50 px-4 py-2">
      <span className="text-sm font-semibold text-primary-700">已选 {count} 台主机</span>
      <span className="text-xs text-primary-700/80">批量操作会先弹确认框，确认后才会执行</span>
      <span className="flex-1" />
      <button type="button" onClick={onClear} disabled={busy} className={BTN_GHOST_SM}>
        清除选择
      </button>
      <button type="button" onClick={onTag} disabled={busy} className={BTN_GHOST_SM}>
        打标签…
      </button>
      <button type="button" onClick={onRestart} disabled={busy} className={BTN_DANGER_GHOST_SM}>
        重启…
      </button>
    </div>
  );
}
