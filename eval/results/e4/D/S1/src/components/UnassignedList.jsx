import { IconInbox, IconChevronRight } from './icons.jsx';
import { CARD, BTN_PRIMARY, BTN_SECONDARY, LINK } from './ui.jsx';
import { formatWait } from '../lib/format.js';

const PRIORITY_STYLES = {
  high: { label: '高', className: 'bg-danger-100 text-danger-700' },
  medium: { label: '中', className: 'bg-warning-100 text-warning-700' },
  low: { label: '低', className: 'bg-ink-100 text-ink-700' },
};

function UnassignedRow({ ticket, onAssign }) {
  const priority = PRIORITY_STYLES[ticket.priority] || PRIORITY_STYLES.low;
  return (
    <li className="flex items-start gap-2 py-3">
      <span className={'shrink-0 rounded px-2 py-1 text-xs font-medium ' + priority.className}>{priority.label}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink-900" title={ticket.subject}>
          {ticket.subject}
        </p>
        <p className="mt-1 truncate text-xs text-ink-500" title={ticket.customer}>
          {ticket.id} · {ticket.customer}
        </p>
        <p className="mt-1 text-xs">
          <span className="tabular-nums text-ink-500">等待 {formatWait(ticket.waitingMinutes)}</span>
          {ticket.slaRisk ? <span className="ml-2 font-medium text-danger-700">SLA 超时风险</span> : null}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onAssign(ticket)}
        aria-label={`分配工单 ${ticket.id} 给 ${ticket.agent}`}
        className="inline-flex h-8 shrink-0 items-center rounded-md border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
      >
        分配
      </button>
    </li>
  );
}

// 第二数据块（INV-002）：列表而非第二张图；空态提供说明与出口（INV-004）
export function UnassignedList({ items, total, lastAssigned, onAssign }) {
  return (
    <article className={CARD + ' flex h-full flex-col'}>
      <div className="flex items-start justify-between gap-2 border-b border-ink-200 p-4">
        <div className="min-w-0">
          <h2 id="unassigned-heading" className="flex items-center gap-2 text-base font-semibold text-ink-900">
            未分配工单 Top 8
            <span className="rounded bg-ink-100 px-2 py-1 text-xs font-medium tabular-nums text-ink-700">
              {items.length}
            </span>
          </h2>
          <p className="mt-1 text-xs text-ink-500">按等待时长降序 · 优先处理 SLA 风险单</p>
        </div>
        <a href="#" aria-label={`查看全部 ${total} 个未分配工单`} className={LINK + ' shrink-0'}>
          全部 {total}
          <IconChevronRight className="h-4 w-4" />
        </a>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {lastAssigned}
      </p>
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
          <IconInbox className="h-8 w-8 text-ink-500" />
          <p className="text-sm font-medium text-ink-900">当前没有未分配工单</p>
          <p className="text-sm leading-6 text-ink-600">
            新工单已按分配规则进入坐席队列。若队列长时间为空，可检查自动分配规则是否覆盖全部渠道。
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <a href="#" className={BTN_PRIMARY}>
              查看分配规则
            </a>
            <a href="#" className={BTN_SECONDARY}>
              手动新建工单
            </a>
          </div>
        </div>
      ) : (
        <ol className="flex-1 divide-y divide-ink-100 px-4">
          {items.map((ticket) => (
            <UnassignedRow key={ticket.id} ticket={ticket} onAssign={onAssign} />
          ))}
        </ol>
      )}
    </article>
  );
}
