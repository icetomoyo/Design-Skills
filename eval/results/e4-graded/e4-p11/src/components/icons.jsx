// 手写线性 stroke 图标（无 emoji、无外部图标库）
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const svg = (className, children) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    {children}
  </svg>
);

export const IconGrid = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  );

export const IconTicket = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M7 3.5h10A1.5 1.5 0 0 1 18.5 5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M9 8.5h6" />
      <path d="M9 12h6" />
      <path d="M9 15.5h3.5" />
    </>
  );

export const IconUsers = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.2 19.5c.5-3.4 2.9-5.3 5.8-5.3s5.3 1.9 5.8 5.3" />
      <circle cx="16.8" cy="9" r="2.4" />
      <path d="M16.4 14.6c2.3.3 3.9 1.8 4.3 4.4" />
    </>
  );

export const IconClock = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.5V12l3 2.2" />
    </>
  );

export const IconShieldCheck = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M12 3.2l6.8 2.6v5.4c0 4.3-2.8 7.2-6.8 8.6-4-1.4-6.8-4.3-6.8-8.6V5.8Z" />
      <path d="M9 12.2l2.1 2.1 4.1-4.3" />
    </>
  );

export const IconBarChart = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M5.5 20V12" />
      <path d="M10.5 20V6" />
      <path d="M15.5 20V10" />
      <path d="M20.5 20V14" />
    </>
  );

export const IconSwap = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M8 4 4 8l4 4" />
      <path d="M4 8h16" />
      <path d="M16 20l4-4-4-4" />
      <path d="M20 16H4" />
    </>
  );

export const IconGear = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v3" />
      <path d="M12 18.2v3" />
      <path d="M2.8 12h3" />
      <path d="M18.2 12h3" />
      <path d="M5.5 5.5l2.1 2.1" />
      <path d="M16.4 16.4l2.1 2.1" />
      <path d="M18.5 5.5l-2.1 2.1" />
      <path d="M7.6 16.4l-2.1 2.1" />
    </>
  );

export const IconSearch = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20.5 20.5" />
    </>
  );

export const IconBell = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M6.2 9.8a5.8 5.8 0 0 1 11.6 0c0 4.6 1.9 5.9 1.9 5.9H4.3s1.9-1.3 1.9-5.9Z" />
      <path d="M10.2 19a2 2 0 0 0 3.6 0" />
    </>
  );

export const IconChevronDown = ({ className = 'h-4 w-4' }) =>
  svg(className, <path d="M6 9.5l6 6 6-6" />);

export const IconInbox = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M4.3 13.2 6.4 5.9a1.5 1.5 0 0 1 1.45-1.1h8.3a1.5 1.5 0 0 1 1.45 1.1l2.1 7.3" />
      <path d="M4.3 13.2v4.3a2 2 0 0 0 2 2h11.4a2 2 0 0 0 2-2v-4.3" />
      <path d="M4.3 13.2h4l1.7 2.6h4l1.7-2.6h4" />
    </>
  );

export const IconTrendUp = ({ className = 'h-3.5 w-3.5' }) =>
  svg(
    className,
    <>
      <path d="M4 16.5l5-5 3 3 6.5-6.5" />
      <path d="M13.5 8h5v5" />
    </>
  );

export const IconTrendDown = ({ className = 'h-3.5 w-3.5' }) =>
  svg(
    className,
    <>
      <path d="M4 8l5 5 3-3 6.5 6.5" />
      <path d="M13.5 16h5v-5" />
    </>
  );

export const IconHeadset = ({ className = 'h-5 w-5' }) =>
  svg(
    className,
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3" y="13.5" width="4" height="6" rx="1.6" />
      <rect x="17" y="13.5" width="4" height="6" rx="1.6" />
      <path d="M19 19.5v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  );

export const IconPlus = ({ className = 'h-4 w-4' }) =>
  svg(
    className,
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  );
