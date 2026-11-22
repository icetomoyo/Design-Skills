import { useState } from 'react';
import { unassignedQueue, unassignedTotal, priorityMeta } from '../data/mock.js';
import { IconInbox } from './icons.jsx';

/**
 * 未分配工单 Top 8 列表。
 * - 每行含主题、优先级、编号/渠道/等待时长与「分配」入口；
 * - 队列为空时渲染空态（说明 + 入口），通过「预览空态」开关演示。
 */
export default function UnassignedList() {
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <section className="flex h-full flex-col rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-6 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900">未分配工单</h2>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 tabular-nums">
            Top 8
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowEmpty((v) => !v)}
          className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:border-indigo-600 hover:text-indigo-600"
        >
          {showEmpty ? '返回列表' : '预览空态'}
        </button>
      </div>

      {showEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400" aria-hidden="true">
            <IconInbox className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm font-medium text-slate-900">队列已清空</p>
          <p className="mt-2 max-w-[220px] text-xs leading-5 text-slate-500">
            当前没有等待分配的工单，新工单将按「自动分配」规则派发给在岗坐席。
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              配置分配规则
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              刷新队列
            </button>
          </div>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-slate-100">
            {unassignedQueue.map((t) => {
              const p = priorityMeta[t.priority];
              return (
                <li key={t.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">{t.subject}</span>
                      <span className={`shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${p.cls}`}>
                        {p.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      <span className="font-mono">{t.id}</span> · {t.channel} · 等待{' '}
                      <span className="font-medium text-slate-600 tabular-nums">{t.wait}</span> 分钟
                    </p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
                  >
                    分配
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              查看全部 {unassignedTotal} 条未分配
            </button>
            <span className="text-xs text-slate-500">按优先级 + 等待时长排序</span>
          </div>
        </>
      )}
    </section>
  );
}
