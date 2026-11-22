// 展示格式化工具

export function formatCNY(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return String(n);
  return new Intl.NumberFormat('zh-CN').format(num);
}

export function formatDateTime(d) {
  const date = d instanceof Date ? d : new Date(d);
  const pad = (x) => String(x).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}
