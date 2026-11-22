// 单元格 / 详情抽屉共用的值格式化：数字纪律（tabular-nums 由列对齐类提供）与单位一致性。
export function formatCellValue(row, col) {
  const v = row[col.key];
  if (v === '' || v === null || v === undefined) return '—';
  switch (col.key) {
    case 'cpu':
      return `${v} vCPU`;
    case 'mem':
      return `${v} GB`;
    case 'disk':
      return `${v} GB`;
    case 'bandwidth':
      return v > 0 ? `${v} Mbps` : '—';
    case 'monthlyCost':
      return `¥ ${Number(v).toLocaleString('zh-CN')}`;
    case 'uptime':
      return `${v} 天`;
    case 'ports':
      return `${v} 个`;
    case 'cpuUsg':
    case 'memUsg':
    case 'diskUsg':
      return `${v}%`;
    default:
      return String(v);
  }
}

export function usageTone(pct) {
  if (pct >= 85) return 'bg-danger-500';
  if (pct >= 60) return 'bg-warning-500';
  return 'bg-success-500';
}
