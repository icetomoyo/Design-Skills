const PRIORITY_TONES = {
  P1: 'bg-red-50 text-danger',
  P2: 'bg-amber-50 text-warning',
  P3: 'bg-slate-100 text-slate-700',
};

const SECONDARY_ACTION =
  'inline-flex h-8 items-center rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

function TicketRow({ ticket }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span
        className={`inline-flex h-6 w-10 shrink-0 items-center justify-center rounded text-xs font-medium ${PRIORITY_TONES[ticket.priority]}`}
      >
        {ticket.priority}
      </span>
      <a
        href={`#tickets/${ticket.id}`}
        className="min-w-0 flex-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="block truncate text-sm text-slate-900">{ticket.subject}</span>
        <span className="mt-1 block truncate text-xs tabular-nums text-slate-600">
          {ticket.id} · {ticket.customer} · {ticket.channel}
        </span>
      </a>
      <div className="w-24 shrink-0 text-right">
        <p className="text-sm tabular-nums text-slate-700">等待 {ticket.waitMinutes} 分</p>
        <p className={`text-xs tabular-nums ${ticket.slaRisk ? 'text-danger' : 'text-slate-600'}`}>
          SLA 剩 {ticket.slaLeftText}
        </p>
      </div>
    </li>
  );
}

export default function UnassignedList({ tickets, total, query, onClearQuery }) {
  const trimmed = query.trim();
  const isEmpty = tickets.length === 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-card">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200 px-4 py-3">
        <h2 id="queue-heading" className="text-lg font-medium">
          未分配工单
        </h2>
        <p className="text-sm tabular-nums text-slate-600">
          {isEmpty ? '当前显示 0 单' : `显示前 ${tickets.length} 单`} · 队列共 {total} 单（按优先级与等待时长排序）
        </p>
        <a
          href="#tickets/unassigned"
          className="ml-auto rounded-sm text-sm text-primary underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          查看全部
        </a>
      </header>

      {isEmpty ? (
        <div className="px-4 py-12 text-center">
          <p className="text-sm text-slate-700">
            {trimmed
              ? `没有匹配“${trimmed}”的未分配工单，可调整关键词或清除搜索条件。`
              : '当前没有未分配工单，新工单进入队列后会按分派规则自动分配。'}
          </p>
          <div className="mt-4">
            {trimmed ? (
              <button type="button" onClick={onClearQuery} className={SECONDARY_ACTION}>
                清除搜索条件
              </button>
            ) : (
              <a href="#routing-rules" className={SECONDARY_ACTION}>
                查看分派规则
              </a>
            )}
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200">
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      )}

      <footer className="border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
        工单分派后进入坐席工作台；P1 工单建议 15 分钟内完成首次响应。
      </footer>
    </div>
  );
}
