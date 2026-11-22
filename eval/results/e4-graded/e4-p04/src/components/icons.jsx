// 内联线性图标集（INV-005：不用 emoji、不引入图标库）
// 统一 24 网格 / stroke 1.5 / aria-hidden；尺寸由使用方通过 className 控制。
function Svg({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconTicket(props) {
  return (
    <Svg {...props}>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v1a2.5 2.5 0 0 0 0 5v1a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 15.5v-1a2.5 2.5 0 0 0 0-5v-1Z" />
      <path d="M14 6v12" />
    </Svg>
  );
}

export function IconClock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconGauge(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 18a8.5 8.5 0 1 1 15 0" />
      <path d="M12 14.5 15.5 11" />
      <circle cx="12" cy="15.5" r="1" />
    </Svg>
  );
}

export function IconHeadset(props) {
  return (
    <Svg {...props}>
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="13" width="4" height="6" rx="2" />
      <rect x="17" y="13" width="4" height="6" rx="2" />
      <path d="M20 19a3 3 0 0 1-3 2.5h-2" />
    </Svg>
  );
}

export function IconInbox(props) {
  return (
    <Svg {...props}>
      <path d="M5 5h14l3 8v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4l3-8Z" />
      <path d="M4 13h4l2 3h4l2-3h4" />
    </Svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Svg>
  );
}

export function IconRefresh(props) {
  return (
    <Svg {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
      <path d="M21 3v5h-5" />
    </Svg>
  );
}

export function IconTrendUp(props) {
  return (
    <Svg {...props}>
      <path d="m3.5 17.5 5.5-5.5 3.5 3.5 7.5-7.5" />
      <path d="M14.5 8H20v5.5" />
    </Svg>
  );
}

export function IconTrendDown(props) {
  return (
    <Svg {...props}>
      <path d="m3.5 7.5 5.5 5.5 3.5-3.5 7.5 7.5" />
      <path d="M14.5 17H20v-5.5" />
    </Svg>
  );
}

export function IconAlert(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V13" />
      <path d="M12 16.5h.01" />
    </Svg>
  );
}

export function IconChevronRight(props) {
  return (
    <Svg {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </Svg>
  );
}

export function IconChartLine(props) {
  return (
    <Svg {...props}>
      <path d="M4 4v15.5h16" />
      <path d="m7.5 14.5 3.5-4.5 3 3 4.5-6" />
    </Svg>
  );
}

export function IconTable(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M10 10v9" />
    </Svg>
  );
}

export function IconUsers(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M17.5 15c2 .8 3.5 2.6 3.5 5" />
    </Svg>
  );
}

export function IconSettings(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h8" />
      <circle cx="15" cy="7" r="2" />
      <path d="M19 7h1" />
      <path d="M4 17h4" />
      <circle cx="11" cy="17" r="2" />
      <path d="M15 17h5" />
    </Svg>
  );
}

export const KPI_ICONS = {
  ticket: IconTicket,
  clock: IconClock,
  gauge: IconGauge,
  headset: IconHeadset,
};
