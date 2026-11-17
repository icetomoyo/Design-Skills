import { useState } from 'react';
import { unassignedTickets, unassignedBacklogOthers } from '../data/mock.js';
import { IconInbox, IconSearch } from './icons.jsx';

// 优先级徽章：点 + 文本，不只靠颜色区分
const PRIORITY_BADGE = {
  P1: 'border border-danger/20 bg-danger-soft text-danger',
  P2: 'border border-warn/20 bg-warn-soft text-warn',
  P3: 'border border-line bg-raised text-muted',
};
const PRIORITY_DOT = { P1: 'bg-danger', P2: 'bg-warn', P3: 'bg-muted' };

// 空态分两种：筛选无结果（给清除筛选入口）与真空（给刷新入口）
function EmptyState({ query, onClearQuery, onReload }) {
  if (query) {
    return (
      <div className="border-t border-line px-6 py-12 text-center">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-raised text-subtle">
          <IconSearch size="20" />
        </span>
        <h3 className="mt-3 text-sm font-medium text-body">没有匹配“{query}”的未分配工单</h3>
        <p className="mt-1 text-sm text-muted">换个关键词，或清除筛选查看完整队列。</p>
        <button type="button" className="btn-secondary mt-4" onClick={onClearQuery}>
          清除筛选
        </button>
      </div>
    );
  }
  return (
    <div className="border-t border-line px-6 py-12 text-center">
      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-raised text-subtle">
        <IconInbox size="20" />
      </span>
      <h3 className="mt-3 text-sm font-medium text-body">未分配队列为空</h3>
      <p className="mt-1 text-sm text-muted">当前所有工单都已分配给坐席。新工单进入队列后会显示在这里。</p>
      <button type="button" className="btn-primary mt-4" onClick={onReload}>
        刷新队列
      </button>
    </div>
  );
}

export default function UnassignedList({ query, onClearQuery }) {
  const [assignedIds, setAssignedIds] = useState([]);
  const [lastAction, setLastAction] = useState('');

  const remaining = unassignedTickets.filter((t) => !assignedIds.includes(t.id));
  const q = query.trim().toLowerCase();
  const visible = q
    ? remaining.filter((t) => `${t.subject} ${t.id} ${t.priority}`.toLowerCase().includes(q))
    : remaining;
  const totalWaiting = remaining.length + unassignedBacklogOthers;

  const assign = (ticket) => {
    setAssignedIds((prev) => [...prev, ticket.id]);
    setLastAction(`已分配 #${ticket.id}「${ticket.subject}」`);
  };

  return (
    <section aria-labelledby="unassigned-heading" className="card">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 sm:pb-4">
        <div>
          <h2 id="unassigned-heading" className="text-base font-semibold text-ink">
            未分配工单 Top 8
          </h2>
          <p className="mt-1 text-sm text-muted">按等待时长降序 · 共 {totalWaiting} 单待分配</p>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {lastAction}
      </p>

      {visible.length === 0 ? (
        <EmptyState
          query={q}
          onClearQuery={onClearQuery}
          onReload={() => {
            setAssignedIds([]);
            setLastAction('已重新加载未分配队列');
          }}
        />
      ) : (
        <table className="w-full text-sm">
          <caption className="sr-only">未分配工单列表，按等待时长降序，可将工单分配给坐席</caption>
          <thead>
            <tr className="border-t border-line bg-raised">
              <th scope="col" className="w-24 px-4 py-2.5 text-left text-xs font-medium text-muted sm:px-6">
                优先级
              </th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-medium text-muted sm:px-6">
                主题
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-medium text-muted sm:px-6">
                等待时长
              </th>
              <th scope="col" className="w-20 px-4 py-2.5 text-right text-xs font-medium text-muted sm:px-6">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t.id} className="border-t border-line transition-colors hover:bg-raised">
                <td className="px-4 py-2.5 sm:px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE[t.priority]}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[t.priority]}`} aria-hidden="true" />
                    {t.priority}
                  </span>
                </td>
                <td className="px-4 py-2.5 sm:px-6">
                  <span className="text-body">{t.subject}</span>
                  <span className="ml-2 text-xs text-subtle">#{t.id}</span>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-body sm:px-6">{t.waitedLabel}</td>
                <td className="px-4 py-2.5 text-right sm:px-6">
                  <button
                    type="button"
                    className="btn-row"
                    onClick={() => assign(t)}
                    aria-label={`分配工单 #${t.id} 给坐席`}
                  >
                    分配
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        其余 {unassignedBacklogOthers} 单在完整队列中，本页仅展示等待最久的 Top 8。
      </p>
    </section>
  );
}
