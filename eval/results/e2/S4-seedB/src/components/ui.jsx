// 共享 UI 原语：按钮/输入样式常量（契约 components.button/table 的 Tailwind 落地）。
// 颜色一律走 tailwind.config.js 语义 token（primary/ink/success/...），不使用原生调色板类。

const BTN_BASE =
  'inline-flex h-8 select-none items-center justify-center gap-1 rounded-md px-3 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60';

export const BTN_PRIMARY = `${BTN_BASE} bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700`;
export const BTN_DANGER = `${BTN_BASE} bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-700`;
export const BTN_GHOST = `${BTN_BASE} border border-line bg-surface text-ink-700 hover:bg-canvas active:bg-canvas`;
export const BTN_DANGER_GHOST = `${BTN_BASE} border border-danger-500 bg-surface text-danger-700 hover:bg-danger-50 active:bg-danger-50`;

// 小号变体（独立常量而非运行时覆盖：Tailwind 同属性工具类的生效顺序取决于样式表生成顺序，不可靠）
const BTN_BASE_SM =
  'inline-flex h-7 select-none items-center justify-center gap-1 rounded-md px-2 text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60';
export const BTN_GHOST_SM = `${BTN_BASE_SM} border border-line bg-surface text-ink-700 hover:bg-canvas active:bg-canvas`;
export const BTN_DANGER_GHOST_SM = `${BTN_BASE_SM} border border-danger-500 bg-surface text-danger-700 hover:bg-danger-50 active:bg-danger-50`;

export const INPUT =
  'h-8 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink-900 placeholder:text-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 focus-visible:ring-offset-surface';

export const SELECT = `${INPUT} pr-8`;

export const CHECKBOX =
  'size-3.5 cursor-pointer accent-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600';

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

const STATUS_DOT = {
  运行中: 'bg-success-500',
  维护中: 'bg-warning-500',
  已停机: 'bg-danger-500',
  未知: 'bg-ink-500'
};

const STATUS_TEXT = {
  运行中: 'text-success-700',
  维护中: 'text-warning-700',
  已停机: 'text-danger-700',
  未知: 'text-ink-600'
};

// 状态用“点 + 文本”，不只靠颜色区分（tables-density 知识）
export function StatusDot({ status, withText = true }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', STATUS_TEXT[status] || 'text-ink-600')}>
      <span aria-hidden="true" className={cn('inline-block size-2 shrink-0 rounded-full', STATUS_DOT[status] || 'bg-ink-500')} />
      {withText ? <span>{status}</span> : <span className="sr-only">{status}</span>}
    </span>
  );
}
