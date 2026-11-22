/**
 * 顶部错误摘要（uu-forms-efficiency）：置于当前步内容顶部，聚焦摘要本身，
 * 每条错误链接跳到对应字段；行内错误同时保留在字段下方。
 */
export default function ErrorSummary({ errors, labels, onJump, actionText, panelRef }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="alert"
      className="mt-4 rounded-md border border-danger-600 bg-danger-50 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-600 focus-visible:ring-offset-1"
    >
      <h3 className="text-sm font-semibold text-danger-700">
        有 {entries.length} 项需要修改后才能{actionText}
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {entries.map(([fieldId, msg]) => (
          <li key={fieldId} className="text-sm leading-6 text-danger-700">
            <a
              href={`#${fieldId}`}
              onClick={(e) => {
                e.preventDefault();
                onJump(fieldId);
              }}
              className="rounded font-medium underline underline-offset-2 transition-colors hover:text-danger-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-600 focus-visible:ring-offset-1"
            >
              {labels[fieldId] || fieldId}
            </a>
            ：{msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
