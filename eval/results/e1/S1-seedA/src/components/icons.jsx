// 统一线性图标集（stroke = currentColor）。不使用 emoji 作图标。
function Icon({ size = 16, children, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconOverview = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
  </Icon>
);

export const IconTickets = (props) => (
  <Icon {...props}>
    <path d="M6.5 3.5h8l4 4v13h-12z" />
    <path d="M14.5 3.5v4h4" />
    <path d="M9.5 12h6M9.5 15.5h4" />
  </Icon>
);

export const IconReports = (props) => (
  <Icon {...props}>
    <path d="M3.5 20.5h17" />
    <path d="M6.5 20.5v-7M12 20.5V6M17.5 20.5v-10" />
  </Icon>
);

export const IconTeam = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3.5 20c0-3 2.7-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16 4.8a3.2 3.2 0 0 1 0 6.4" />
    <path d="M17.5 15.2c2.2.6 3.5 2.2 3.5 4.8" />
  </Icon>
);

export const IconSettings = (props) => (
  <Icon {...props}>
    <path d="M5 4.5v15M12 4.5v15M19 4.5v15" />
    <circle cx="5" cy="9.5" r="2" />
    <circle cx="12" cy="15" r="2" />
    <circle cx="19" cy="7.5" r="2" />
  </Icon>
);

export const IconSearch = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Icon>
);

export const IconInbox = (props) => (
  <Icon {...props}>
    <path d="M4 13.5 6.3 5h11.4L20 13.5v5.5H4z" />
    <path d="M4 13.5h4.5l1.5 2.5h4l1.5-2.5H20" />
  </Icon>
);

// 变化方向三角（填充）。配合 +/- 符号与文本使用，方向信息不单靠颜色传达。
export const IconTrendUp = ({ size = 10, className = '' }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path d="M6 2.5 10 9H2z" fill="currentColor" />
  </svg>
);

export const IconTrendDown = ({ size = 10, className = '' }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <path d="M6 9.5 2 3h8z" fill="currentColor" />
  </svg>
);
