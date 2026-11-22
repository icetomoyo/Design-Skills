# 设计决策日志（.vismith/decisions.log.md）

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 路由：mode=refine × category=saas-dashboard × intent=operate；brief="改善可访问性与一致性，不改变产品特征" | 两页为指标卡+列表+表单的运营后台，refine 协议适用 | admin-console（弃：Dashboard 指标卡为主导特征） |
| 2026-11-22 | extract 草稿人工确认后转正 contract.json，invariants 固化为 INV-001~004（信息架构/技术栈/数据口径与交互/品牌色系不变） | refine 红线来源；brief 明示不改变产品特征 | 空置 invariants（弃：refine 失去不可动边界） |
| 2026-11-22 | 保留 tailwind.config 数字间距键现状（4=4px…32=32px），不重构刻度 | extract 已给语义漂移警告，但值全在 4px 基线上；refine 最小 diff 红线，改语义键需重写全部类名 | 改语义键/标准 rem 公式（弃：diff 过大，属 redesign） |
| 2026-11-22 | #94A3B8 标签色×2（Dashboard:15 今日新增工单、Settings:14 回复签名）→ text-ink-600（对白 7.6:1） | 原对白 2.6:1 < 4.5（CHK-01 硬规则）；与其余 ink-600 标签一致 | 自定义更深灰（弃：引入新硬编码色） |
| 2026-11-22 | SLA 数值 #FF6B35（Dashboard:24）→ text-accent-600（对白 6.7:1） | 原 2.84:1，text-3xl 大字阈值 3.0 也未达；保留"强调值"语义走品牌 accent | 换 ink-900（弃：丢失强调层级）；橙色加深入契约（弃：非品牌色系，INV-004） |
| 2026-11-22 | "处理"链接 #7C3AED（Dashboard:38）→ text-accent-600 | off-token 硬编码色（CHK-02），紫色无契约来源；链接语义统一 accent，对比 6.7:1 | 紫色登记为 link token（弃：与 INV-004 品牌系冲突） |
| 2026-11-22 | 间距 17px→mb-16、13px→mt-12（Dashboard:8/13，就近档位 ±1px） | 4px 基线归位（CHK-02/03）；本仓 spacing 键 n=n px | 舍入到 20px（弃：视觉偏移更大） |
| 2026-11-22 | 卡片 boxShadow rgba(0,0,0,.08) → Tailwind 原生 `shadow` 工具类（Dashboard:14） | 行内 rgba 计入 CHK-02 硬编码色；原生阴影档即 token | 契约登记自定义 shadow 值（弃：单处使用，不值新增 token） |
| 2026-11-22 | 底部横幅 img 补 alt=""（Dashboard:44） | CHK-06 确定性 error；运营横幅为装饰性图像 | 描述性 alt（弃：无内容证据，避免臆测文案） |
| 2026-11-22 | 全部交互元素（链接/2 输入/按钮）统一 focus-visible:ring-2 ring-accent-500 | 契约 a11y.focus_visible=required（CHK-05）；heuristic 提示经上下文确认（brief 即"改善可访问性"） | 只修一处消除检查（弃：焦点覆盖不全） |

复验：checks 前 error 2 / warning 4 → L1 后 0/3 → L2 后 **error 0 / warning 0**（info 1 为契约配对全过提示）。invariants 逐条复核：布局结构、技术栈、/tickets/:id 链接、ink+accent 色系均未变。
