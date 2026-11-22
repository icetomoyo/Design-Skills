// 按钮基元：主操作每屏唯一（契约 components.button）；提交中禁用防重复提交
const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

export const btnPrimaryCls = `${btnBase} h-9 bg-primary-600 px-4 text-white hover:bg-primary-700`;
export const btnSecondaryCls = `${btnBase} h-9 border border-ink-300 bg-white px-4 text-ink-700 hover:bg-ink-50`;

export function PrimaryButton({ type = 'button', className = '', ...rest }) {
  return <button type={type} {...rest} className={`${btnPrimaryCls} ${className}`.trim()} />;
}

export function SecondaryButton({ type = 'button', className = '', ...rest }) {
  return <button type={type} {...rest} className={`${btnSecondaryCls} ${className}`.trim()} />;
}
