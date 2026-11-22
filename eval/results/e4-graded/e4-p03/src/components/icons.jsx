// 手绘 SVG 图标集：单一描边语言（1.75px / round cap），24 viewBox。
// 不使用 emoji 或 Unicode 符号充当图标。

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

export function IconGauge(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M12 13l4.2-3.4" />
      <circle cx="12" cy="13" r="1.2" />
      <path d="M3.5 17.5h17" />
    </svg>
  )
}

export function IconTicket(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path d="M4 8.5V6.5h16v2a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4v1.5H4v-1.5a2 2 0 0 0 0-4v-2a2 2 0 0 0 0-4z" />
      <path d="M12 6.5v11" strokeDasharray="2 3" />
    </svg>
  )
}

export function IconChart(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path d="M4.5 4.5v15h15" />
      <path d="M8 16v-4.5" />
      <path d="M12 16V8" />
      <path d="M16 16v-6.5" />
    </svg>
  )
}

export function IconAgents(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S13.9 16 14.5 19" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.8c1.7.6 2.7 1.9 3 4.2" />
    </svg>
  )
}

export function IconRules(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <path d="M5 4.5h14v15H5z" />
      <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4" />
    </svg>
  )
}

export function IconSettings(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="20" height="20" {...props}>
      <circle cx="12" cy="12" r="2.8" />
      <path d="M12 3.5v2.2M12 18.3v2.2M4.9 7.8l1.9 1.1M17.2 15.1l1.9 1.1M4.9 16.2l1.9-1.1M17.2 8.9l1.9-1.1" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="16" height="16" {...props}>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M14.8 14.8L20 20" />
    </svg>
  )
}

export function IconBell(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" />
      <path d="M10 18.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  )
}

export function IconArrowUp(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="14" height="14" strokeWidth={2.25} {...props}>
      <path d="M12 19V5" />
      <path d="M6.5 10.5L12 5l5.5 5.5" />
    </svg>
  )
}

export function IconArrowDown(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="14" height="14" strokeWidth={2.25} {...props}>
      <path d="M12 5v14" />
      <path d="M6.5 13.5L12 19l5.5-5.5" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="14" height="14" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function IconAssign(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" width="14" height="14" {...props}>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4.5 19c.5-3 2.6-4.6 5.5-4.6 1 0 2 .2 2.8.6" />
      <path d="M17.5 13.5v6M14.5 16.5h6" />
    </svg>
  )
}

export function IconTermMark(props) {
  // 节气分界标记：物候历的时令签（非装饰性图标，用于图例）
  return (
    <svg {...base} viewBox="0 0 24 24" width="14" height="14" {...props}>
      <path d="M12 4v16" strokeDasharray="3 3" />
      <path d="M8.5 8L12 4l3.5 4" />
    </svg>
  )
}
