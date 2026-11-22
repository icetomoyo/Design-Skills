// 提交结果反馈：成功 = 入职流程状态时间线 + 出口；失败 = 保留数据 + 重试出口。
// 签名元素：与步骤指示器同构的「编号圆点 + 连接线」时间线。
import { useState } from 'react';
import { btnPrimary, btnSecondary } from './buttons.js';
import { formatDateTime } from '../lib/format.js';

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m3 8.5 3.5 3.5L13 4.5" />
    </svg>
  );
}

function dotClass(state) {
  if (state === 'done')
    return 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-700';
  if (state === 'current')
    return 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-on-brand';
  return 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-500';
}

export function SuccessPanel({ result, role, onReset }) {
  const [copied, setCopied] = useState(false);

  const copyTicket = async () => {
    try {
      await navigator.clipboard.writeText(result.ticketNo);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-labelledby="ok-title" className="rounded-lg border border-ink-200 bg-surface p-6 shadow-card">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-700"
        >
          <CheckIcon />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 id="ok-title" className="m-0 text-lg font-semibold text-ink-900">
            入职申请已提交
          </h2>
          <p className="m-0 text-sm leading-6 text-ink-700">
            申请编号 <strong className="tabular-nums text-ink-900">{result.ticketNo}</strong>
            ，提交时间 {formatDateTime(result.submittedAt)}。
            {role === 'hr'
              ? '薪酬与审批链提交后由系统管理员补充确认。'
              : '薪酬与审批链已随单提交，待主审批人确认。'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="m-0 text-sm font-semibold text-ink-800">入职流程状态</h3>
        <ol className="mt-3 mb-0 flex list-none flex-col p-0">
          {result.process.map((node, i) => (
            <li key={node.id} className="flex gap-3">
              <span className="flex flex-col items-center">
                <span className={dotClass(node.state)}>{node.state === 'done' ? <CheckIcon /> : i + 1}</span>
                {i < result.process.length - 1 && (
                  <span aria-hidden="true" className="w-px flex-1 bg-ink-200" />
                )}
              </span>
              <div className="pb-6">
                <p
                  className={`m-0 text-sm font-medium ${
                    node.state === 'current'
                      ? 'text-brand-700'
                      : node.state === 'done'
                        ? 'text-ink-800'
                        : 'text-ink-500'
                  }`}
                >
                  {node.title}
                  {node.state === 'current' && '（当前节点）'}
                </p>
                {node.note && <p className="m-0 mt-1 text-xs leading-5 text-ink-500">{node.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 border-t border-ink-200 pt-4">
        <button type="button" onClick={onReset} className={btnPrimary}>
          再录入一位新员工
        </button>
        <button type="button" onClick={copyTicket} className={btnSecondary} aria-live="polite">
          {copied ? '申请编号已复制' : '复制申请编号'}
        </button>
      </div>
    </section>
  );
}

export function FailurePanel({ failure, filledCount, onRetry, onBack, busy }) {
  return (
    <section
      role="alert"
      aria-labelledby="fail-title"
      className="rounded-lg border border-danger-600 bg-danger-50 p-4"
    >
      <h2 id="fail-title" className="m-0 text-sm font-semibold text-danger-700">
        提交失败：入职单未创建
      </h2>
      <p className="mt-1 mb-0 text-sm leading-6 text-ink-800">
        {failure.message}（错误码 {failure.code}）。下方向导中已填写的 {filledCount}
        项信息全部保留，可直接重试，无需重新录入。
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onRetry} disabled={busy} className={btnPrimary}>
          {busy ? '提交中…' : '重试提交'}
        </button>
        <button type="button" onClick={onBack} className={btnSecondary}>
          返回第 1 步检查信息
        </button>
      </div>
    </section>
  );
}
