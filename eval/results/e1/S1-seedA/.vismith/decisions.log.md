# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-17 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-17 | 路由：mode=generate category=saas-dashboard intent=operate | 工单平台“运营总览”新建页面，线索来自任务书 | - |
| 2026-11-17 | 五行方向：Product=主管 30 秒看清负载并分派最久等待工单；Character=冷静/高效/可信；World=日单量 200-900 且周末回落的 mock；Moments=首屏扫 KPI→趋势定位峰值→分配；Signature=线端直接标签的蓝实线/灰虚线双系列趋势图 | generate 协议“方向先行”，防通用 AI 风 | 营销式 hero |
| 2026-11-17 | neutrals 收敛为 4 档文本色（#0F172A/#334155/#475569/#64748B，白面对比 17.85/10.35/7.58/4.76:1），#E2E8F0/#F8FAFC 移入 border/surface_muted 档 | 模板浅色中性档作文本时 CHK-01 报 1.23/1.05:1（checks-before.json） | 加深浅灰作文本 |
| 2026-11-17 | 语义色定文本级：success=#15803D(5.02)、danger=#B91C1B(6.47)、warn=#92400E(7.09)，白面全部 >=4.5:1；徽章底 #FEF2F2/#FFFBEB 亦验证 | 语义色需兼任文本色 | green-600/red-600（白面 3.3/3.9:1 不达标） |
| 2026-11-17 | subtle #64748B 仅用于白色/浅灰表面；canvas(#F1F5F9) 上文本一律 muted 及更深 | subtle/canvas=4.34:1 不达标（已实测） | 全局允许 subtle |
| 2026-11-17 | 主图双系列：新建=primary 实线+15% 面积，已解决=body 虚线+线端直接标签；附一句话结论与开放数据表 | uu-charts-a11y（表为事实源、线型区分、禁纯色相） | 仅靠图例与颜色 |
| 2026-11-17 | 14 点趋势用原生 SVG，不引图表库 | 项目约束：零图表依赖、静态可检 | Recharts |
| 2026-11-17 | 未分配列表空态分两类：筛选无结果（清除筛选入口）/真空（刷新队列入口）；分配操作可真实触达空态 | empty-states + tables-density 知识 | 只写死空态分支 |
| 2026-11-17 | 骨架：侧栏 256px(夜色) + 顶栏 64px，间距全走 Tailwind 4px 刻度 | tokens-starting-values 应用布局档位 | 自定义任意值间距 |
