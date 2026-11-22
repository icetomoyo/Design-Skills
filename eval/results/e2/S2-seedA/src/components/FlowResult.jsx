import { useEffect, useRef, useState } from 'react';
import { ROLES } from '../permissions.js';
import { CheckIcon, CopyIcon, AlertIcon } from './Icons.jsx';
import { PrimaryButton } from './Button.jsx';

function fmtDateTime(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** 流程时间线（页面签名元素）：静态、可读，不做动效抢焦点 */
function Timeline({ nodes }) {
  return (
    <ol className="mt-3">
      {nodes.map((n, i) => {
        const dotCls =
          n.state === 'done'
            ? 'bg-success-600 text-white'
            : n.state === 'current'
              ? 'border-2 border-primary-600 bg-white'
              : 'border border-ink-300 bg-white';
        const titleCls =
          n.state === 'done'
            ? 'text-ink-700'
            : n.state === 'current'
              ? 'font-medium text-ink-900'
              : 'text-ink-500';
        return (
          <li key={n.title} className="flex gap-3">
            <span className="flex flex-col items-center">
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${dotCls}`}>
                {n.state === 'done' ? <CheckIcon className="h-3 w-3" /> : null}
                {n.state === 'current' ? <span className="h-2 w-2 rounded-full bg-primary-600" /> : null}
              </span>
              {i < nodes.length - 1 ? (
                <span className="w-px flex-1 bg-ink-200" aria-hidden="true" />
              ) : null}
            </span>
            <div className="min-w-0 pb-4">
              <p className={`text-sm leading-6 ${titleCls}`}>
                {n.title}
                {n.state === 'current' ? (
                  <span className="ml-2 rounded border border-primary-600 bg-primary-50 px-1 text-xs text-primary-700">
                    当前节点
                  </span>
                ) : null}
              </p>
              {n.meta ? <p className="text-xs leading-5 text-ink-500">{n.meta}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** 提交成功反馈：只有 mock 请求真实返回成功后才渲染（hm-fake-send-ban） */
export function SubmitSuccess({ ticket, role, values, dict, onReset }) {
  const r = ROLES[role];
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
    return () => clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ticket.ticketNo);
    } catch {
      /* 剪贴板不可用时保持原样，仅反馈状态 */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const approver =
    (role === 'admin' && dict.approvers.find((a) => a.id === values.deptApproverId)?.name) ||
    dict.managers.find((m) => m.id === values.managerId)?.name ||
    '部门负责人';

  const nodes = [
    {
      state: 'done',
      title: 'HR 提交入职单',
      meta: `${fmtDateTime(ticket.submittedAt)} · ${r.user}（${r.label}）`,
    },
    { state: 'current', title: '待部门负责人确认', meta: `${approver} · 通常当日完成` },
    { state: 'todo', title: 'IT 开通账号与权限', meta: '按所选系统权限开通 · 1 个工作日内' },
    {
      state: 'todo',
      title: '入职当天报到',
      meta: values.hireDate ? `${values.hireDate} · 前台领取工卡与设备` : '',
    },
  ];

  return (
    <div role="status" className="rounded-lg border border-ink-200 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-700">
          <CheckIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="rounded text-lg font-semibold text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-4"
          >
            提交成功，入职流程已启动
          </h2>
          <p className="mt-1 text-sm leading-6 text-ink-700">
            入职单已生成并进入流转。后续节点可在“入职管理 · 进行中”列表跟踪（本原型未实现该列表页）。
          </p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 rounded-md bg-ink-50 p-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-ink-500">流程单号</dt>
          <dd className="mt-1 flex items-center gap-2 text-sm font-medium tabular-nums text-ink-900">
            {ticket.ticketNo}
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded text-xs text-primary-700 underline underline-offset-2 transition-colors hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
            >
              <CopyIcon className="h-3 w-3" />
              {copied ? '已复制' : '复制'}
            </button>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500">提交人</dt>
          <dd className="mt-1 text-sm text-ink-900">
            {r.user}（{r.label}）
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500">提交时间</dt>
          <dd className="mt-1 text-sm tabular-nums text-ink-900">{fmtDateTime(ticket.submittedAt)}</dd>
        </div>
      </dl>
      <h3 className="mt-6 text-sm font-medium text-ink-700">后续流转</h3>
      <Timeline nodes={nodes} />
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-ink-200 pt-4">
        <p className="text-xs text-ink-500">本页信息仅 HR 与相关审批人可见。</p>
        <PrimaryButton onClick={onReset}>继续办理下一位</PrimaryButton>
      </div>
    </div>
  );
}

/** 提交失败反馈：驻留面板（不用 toast），数据保留说明 + 出口在下方按钮区（主操作唯一） */
export function SubmitFailure({ message, panelRef }) {
  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="alert"
      className="mb-6 rounded-md border border-danger-600 bg-danger-50 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-600 focus-visible:ring-offset-1"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-danger-700">
        <AlertIcon className="h-4 w-4 shrink-0" />
        提交失败：{message}
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink-700">
        你填写的信息已全部保留，无需重填。可直接点击下方“提交并启动流程”重试；若持续失败，可先用“上一步”返回检查，稍后再提交。
      </p>
      <p className="mt-1 text-xs leading-5 text-ink-500">
        演示提示：当前为 ?mock=submit-fail 模拟分支，重试仍会失败；移除该参数后即可成功。
      </p>
    </div>
  );
}
