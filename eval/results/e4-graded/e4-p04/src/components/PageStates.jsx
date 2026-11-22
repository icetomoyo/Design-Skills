import { IconAlert } from './icons.jsx';
import { CARD, BTN_PRIMARY, BTN_SECONDARY } from './ui.jsx';

// 载入态：与成功态同形的区域骨架（非全屏转圈），容器 role=status + aria-busy
export function OverviewSkeleton() {
  const bar = 'rounded bg-ink-100 animate-pulse motion-reduce:animate-none';
  return (
    <div role="status" aria-busy="true">
      <p className="sr-only">正在加载运营数据，请稍候。</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={CARD + ' h-32 p-4'}>
            <div className={bar + ' h-4 w-24'} />
            <div className={bar + ' mt-4 h-8 w-20'} />
            <div className={bar + ' mt-6 h-4 w-28'} />
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className={CARD + ' h-80 p-4 xl:col-span-3'}>
          <div className={bar + ' h-4 w-40'} />
          <div className={bar + ' mt-6 h-56 w-full'} />
        </div>
        <div className={CARD + ' h-80 p-4'}>
          <div className={bar + ' h-4 w-32'} />
          <div className={bar + ' mt-4 h-52 w-full'} />
        </div>
      </div>
    </div>
  );
}

// 错误态：人话说明 + 错误码 + 重试出口（role=alert）
export function OverviewError({ error, onRetry }) {
  return (
    <div role="alert" className={CARD + ' p-6'}>
      <div className="flex items-start gap-3">
        <IconAlert className="mt-1 h-5 w-5 shrink-0 text-danger-700" />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-ink-900">运营数据加载失败</h2>
          <p className="mt-2 text-sm leading-6 text-ink-700">
            {error && error.message ? error.message : '服务暂时不可用'}（错误码{' '}
            <span className="font-medium tabular-nums">{error && error.code ? error.code : 'UNKNOWN'}</span>
            ）。数据口径与昨日一致，可稍后重试；若持续失败，请查看服务状态或联系值班工程师。
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={onRetry} className={BTN_PRIMARY}>
              重试
            </button>
            <a href="#" className={BTN_SECONDARY}>
              查看服务状态
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
