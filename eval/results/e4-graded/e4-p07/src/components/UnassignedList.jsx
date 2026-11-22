import { unassignedTickets, formatWait } from '../data/mock.js';
import { IconInbox, IconChevronRight } from './Icons.jsx';

// 第二数据块 = 列表（非第二张同权图）。
// 优先级语义由文字承载（"紧急/高/中/低"），色点仅辅助（color-not-only）。
const DOT = {
  紧急: 'bg-destructive',
  高: 'bg-accent',
  中: 'bg-primary',
  低: 'bg-slate-500',
};

// 空态（ux 域检索：Empty States → 说明 + 行动入口）
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-primary-700">
        <IconInbox className="h-6 w-6" />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-slate-900">暂无未分配工单</h3>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        当前所有新工单均已按分配规则进入坐席或队列；新工单进入后，这里会按等待时长显示前
        8 条。
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 cursor-pointer items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary-700"
        >
          前往分配队列
        </button>
        <a
          href="#"
          className="cursor-pointer text-sm font-medium text-primary-700 transition-colors duration-150 hover:text-primary"
        >
          查看自动分配规则
        </a>
      </div>
    </div>
  );
}

export default function UnassignedList({ tickets = unassignedTickets }) {
  const isEmpty = tickets.length === 0;

  return (
    <section
      aria-labelledby="unassigned-title"
      className="flex h-full flex-col rounded-lg border border-border bg-card shadow-card"
    >
      <header className="flex items-center gap-2 border-b border-border px-5 py-4">
        <h2 id="unassigned-title" className="text-base font-semibold text-slate-900">
          未分配工单
        </h2>
        {!isEmpty && (
          <span className="tnum rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
            Top {tickets.length}
          </span>
        )}
        <span className="flex-1" />
        <a
          href="#"
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary-700 transition-colors duration-150 hover:text-primary"
        >
          查看全部
          <IconChevronRight className="h-4 w-4" />
        </a>
      </header>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <ul className="divide-y divide-border">
            {tickets.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  aria-label={`${t.priority}工单 ${t.id}：${t.subject}，${t.channel}渠道，已等待${formatWait(t.waitMinutes)}，打开工单`}
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left transition-colors duration-150 hover:bg-slate-50"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[t.priority]}`} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="tnum block text-xs text-muted-foreground">
                      {t.id} · {t.channel}
                    </span>
                    <span className="block truncate text-sm font-medium text-slate-900">{t.subject}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="tnum block text-sm text-slate-700">
                      {t.priority} · 等待 {formatWait(t.waitMinutes)}
                    </span>
                    {t.slaLeft && (
                      <span className="tnum block text-xs text-destructive-foreground">{t.slaLeft}</span>
                    )}
                  </span>
                  <IconChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                </button>
              </li>
            ))}
          </ul>
          <footer className="border-t border-border px-5 py-3">
            <p className="tnum text-xs text-slate-500">共 23 张未分配 · 按等待时长降序，此处显示前 8 张</p>
          </footer>
        </>
      )}
    </section>
  );
}
