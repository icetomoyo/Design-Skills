import { AlertIcon } from './Icons.jsx';
import { SecondaryButton } from './Button.jsx';

/** 字典载入态：与成功态同形的骨架，非全屏 spinner */
export function WizardSkeleton() {
  const bar = (cls) => (
    <div className={`animate-pulse rounded bg-ink-200 motion-reduce:animate-none ${cls}`} aria-hidden="true" />
  );
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">正在加载部门与岗位字典…</span>
      <div className="flex items-center" aria-hidden="true">
        {bar('h-7 w-7 rounded-full')}
        {bar('ml-2 h-4 w-24')}
        <div className="mx-2 h-px w-6 bg-ink-200" />
        {bar('h-7 w-7 rounded-full')}
        {bar('ml-2 h-4 w-24')}
        <div className="mx-2 h-px w-6 bg-ink-200" />
        {bar('h-7 w-7 rounded-full')}
      </div>
      <div className="mt-8 space-y-6" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            {bar('h-3 w-20')}
            {bar('h-9 w-full rounded-md')}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 字典错误态：人话说明 + 下一步 + 重试出口 */
export function LoadError({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-md border border-danger-600 bg-danger-50 p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-danger-700">
        <AlertIcon className="h-4 w-4 shrink-0" />
        字典加载失败
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-700">
        发生了什么：{message}，部门与岗位数据未能获取，向导暂不可用。
      </p>
      <p className="mt-1 text-sm leading-6 text-ink-700">
        下一步：点击“重新加载”重试；若持续失败，请联系系统管理员（内线 8012）。
      </p>
      <p className="mt-1 text-xs leading-5 text-ink-500">演示提示：当前为 ?mock=error 模拟分支。</p>
      <div className="mt-3">
        <SecondaryButton onClick={onRetry}>重新加载</SecondaryButton>
      </div>
    </div>
  );
}

/** 字典真空空态：说明 + 出口（重载 / 找管理员） */
export function DictEmpty({ onRetry }) {
  return (
    <div className="rounded-md border border-ink-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-ink-900">暂无可选字典</h2>
      <p className="mt-2 text-sm leading-6 text-ink-700">
        部门与岗位字典为空，暂时无法办理入职。可能原因：组织架构尚未同步完成，或当前账号缺少字典查看权限。
      </p>
      <p className="mt-1 text-sm leading-6 text-ink-700">
        下一步：点击“重新加载”；确认无果后请联系系统管理员核对组织架构数据源。
      </p>
      <p className="mt-1 text-xs leading-5 text-ink-500">演示提示：当前为 ?mock=empty 模拟分支。</p>
      <div className="mt-3">
        <SecondaryButton onClick={onRetry}>重新加载</SecondaryButton>
      </div>
    </div>
  );
}
