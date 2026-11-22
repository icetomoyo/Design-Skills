import {
  IconGrid,
  IconTicket,
  IconUsers,
  IconBarChart,
  IconShieldCheck,
  IconSwap,
  IconGear,
  IconHeadset,
} from './icons.jsx';

const sections = [
  {
    title: '运营',
    items: [
      { label: '概览', icon: IconGrid, active: true },
      { label: '工单', icon: IconTicket, badge: 23 },
      { label: '客户', icon: IconUsers },
      { label: '报表', icon: IconBarChart },
    ],
  },
  {
    title: '配置',
    items: [
      { label: 'SLA 策略', icon: IconShieldCheck },
      { label: '自动分配', icon: IconSwap },
      { label: '团队与坐席', icon: IconUsers },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-slate-900">
      {/* 品牌 */}
      <div className="flex h-16 items-center gap-3 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <IconHeadset className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">Deskline</span>
          <span className="block text-xs text-slate-400">客服运营平台</span>
        </span>
      </div>

      {/* 导航 */}
      <nav className="flex flex-1 flex-col gap-4 px-4 py-4">
        {sections.map((section, si) => (
          <div key={section.title}>
            <p className={`px-3 pb-2 text-xs font-medium text-slate-400 ${si === 0 ? '' : 'pt-2'}`}>
              {section.title}
            </p>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    aria-current={item.active ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                      item.active
                        ? 'bg-slate-800 font-medium text-white'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    {item.badge != null && (
                      <span className="ml-auto rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-100">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-2">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
          >
            <IconGear className="h-5 w-5" />
            设置
          </a>
        </div>
      </nav>

      {/* 当前用户 */}
      <div className="flex items-center gap-3 border-t border-slate-800 p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
          LK
        </span>
        <span>
          <span className="block text-sm text-white">李凯</span>
          <span className="block text-xs text-slate-400">运营管理员</span>
        </span>
      </div>
    </aside>
  );
}
