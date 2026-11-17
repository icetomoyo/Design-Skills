export function LoadingState() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <p className="sr-only">正在加载运营数据</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-lg border border-slate-200 bg-white p-4">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-8 w-16 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-32 rounded bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="h-5 w-44 rounded bg-slate-200" />
        <div className="mt-4 h-56 w-full rounded bg-slate-200" />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-full rounded bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-medium">数据加载失败</h2>
      <p className="mt-2 text-sm text-slate-600">
        演示接口没有返回数据，请重试；若持续失败，请检查本地开发服务是否正常运行。
      </p>
      {error ? (
        <p className="mt-1 text-xs text-slate-600">错误码：{error.message}</p>
      ) : null}
      <div className="mt-4">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          重试
        </button>
      </div>
    </div>
  );
}
