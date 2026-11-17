import React from 'react';

// 坐席设置页
export default function Settings({ agent }) {
  return (
    <main className="max-w-2xl mx-auto p-24 font-sans bg-ink-50">
      <h1 className="text-xl font-semibold text-ink-900">坐席设置</h1>
      <form className="mt-16 space-y-16">
        <div>
          <label htmlFor="display-name" className="block text-sm text-ink-600 mb-4">显示名称</label>
          <input id="display-name" defaultValue={agent.name} className="w-full rounded-md border border-ink-100 px-12 py-8" />
        </div>
        <div>
          <label htmlFor="signature" className="block text-sm text-ink-600 mb-4">回复签名</label>
          <textarea id="signature" rows={3} defaultValue={agent.signature} className="w-full rounded-md border border-ink-100 px-12 py-8" />
        </div>
        <button type="submit" className="rounded-md bg-accent-500 text-white px-24 py-8 focus-visible:ring-2 focus-visible:ring-accent-600">保存</button>
      </form>
    </main>
  );
}
