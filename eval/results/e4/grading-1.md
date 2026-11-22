# E4 双盲评审 · grader-1

- 评审范围：`eval/results/e4-graded/e4-p01..p16`（脱敏标签；过程文档/契约/自检器按设计剥离，缺失不扣分）
- 评分依据：`eval/rubric.md` 六维（各 0-4）+ 证据引用；S5/S7 基线为 `eval/fixtures/{s5,s7}-project`（`git diff --no-index`）
- 确定性仪器：`node vismith/scripts/checks.mjs <标签目录> --json`（统一无契约模式，E/W/I = error/warning/info）
- 盲评声明：未读取 MAP.json 与 grading-*.md；不推测任何标签的实验组归属
- 未验证项（全局声明）：① 未做浏览器渲染/截图，视觉层次与眯眼测试为静态代码推断（置信度：中）；② 未做真实键盘走查，键盘流程结论来自代码语义（S7 各标签置信度：中高）；③ 对比度除仪器报告外为手算/注释声明复核。无契约模式下 CHK-01 仅行级降级检查，绿田（S1/S3）文本对比以色值推算为准。
- 额外残留文件（按约定不参与评分，仅记录）：`e4-p09/validate.mjs`、`e4-p10/audit-report.md`、`e4-p15/check.mjs`

---

## e4-p01（S5 · 精修）

**checks**：E/W/I = 1/0/2（error 为 CHK-05 focus-visible 遗留，`project/src/pages/Dashboard.jsx:38`）。**diff**：+11/-9，3 文件（Dashboard.jsx / Settings.jsx / tailwind.config.js）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | 缺陷面全覆盖：13px/17px 归位（diff：`style={{marginTop:'13px'}}`→`mt-12`、`17px`→`mb-16`）；#94A3B8→`text-ink-600`×2；#FF6B35→`text-highlight-700`（#C2410C，橙色特征保留）；#7C3AED→`text-link-600` 入档 `tailwind.config.js:10`；img alt 补齐。扣分：KPI 卡1 内联 boxShadow 被删除且无替代（diff @@ -11,12），卡片视觉特征微变（invariant「不改产品特征」边缘） |
| 视觉层次 | 4 | 布局结构/栅格/字号未动，仅换语义类；diff 中无布局类改动 |
| 可访问性 | 3 | 对比度 3 处全修（上）；alt="Q3 活动横幅"（diff @@ -42,5）。扣分：CHK-05 error 遗留（S5 清单未强制 CHK-05，但 rubric a11y 4 档要求全清） |
| 反模板化 | 4 | 无新增 slop；修复零装饰化 |
| 状态完整性 | 2 | 精修任务不含状态面，基线原样（维度对此场景弱适用，全 S5/S7 统一口径） |
| 文案具体性 | 3 | alt="Q3 活动横幅" 达标但简短（对比 p06/p09 的「第三季度服务台运营横幅」） |

**总分 19**（置信度：高）。拒绝正例：无顺手重设计/无契约直改痕迹/未引入新 CHK 发现（CHK-05 为基线遗留，已核对 fixture 同样存在）。

## e4-p02（S3 · Landing）

**checks**：E/W/I = 0/3/2（CHK-02 硬编码色 32+38 处＝CSS token 定义与 SVG 填充，属自然形态；CHK-03 10px/7px/13px 等按钮内衬微间距，S3 清单只约束章节节奏，不计违规）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | ink 低饱和 ramp + 钴蓝唯一 accent + Inter（`styles.css:6-31`）与任务书 contract 描述一致；章节节奏 96/112px、移动端 80/88/96（`styles.css:36-37,550-552`）落在 80-128；主 CTA 唯一（hero「快速开始」`index.html:42`，顶栏 CTA 为 invariant 保留 `:29`）；信任区仅可验证要素（MIT/仓库/发布日志 `:45-49`），无头像点阵/五星；定价首屏以下 `:180-232` |
| 视觉层次 | 4 | hero 双栏（文案+代码面板 `:37-69`）、功能段交替（feature--flip `:100`）、推荐档深色强调（`styles.css:455-464`）；1-2-3 级清晰（静态推断，未渲染） |
| 可访问性 | 3 | skip 链接 `index.html:12`；全局 :focus-visible `styles.css:95`；reduced-motion `:47`；aria-labelledby 全覆盖。扣分：≤720px 隐藏 `.nav-links` 且无汉堡替代（`styles.css:547`），主导航在窄屏不可达 |
| 反模板化 | 4 | 无 hype 词/无 pill+blob/非居中堆叠；kicker+代码面板+架构 SVG 的技术编辑风（`index.html:76,113-143`）；换名测试通过（标题绑定 SQLite 行级同步语义 `:39`） |
| 状态完整性 | 2 | 静态落地页无数据态面（S3 统一口径） |
| 文案具体性 | 4 | 「约 180 KB 静态库」「工单 48 小时响应」「99.9% SLA」「$12/开发者·月」「1 行合并 · 0 条进隔离表 · 11 ms」（`index.html:105,211,222,206,92`） |

**总分 21**（置信度：高）。拒绝正例：全未命中。

## e4-p03（S1 · Dashboard）

**checks**：E/W/I = 0/4/2（CHK-02 中 `mock.js:71` 8 处实为 `#24817` 工单号误报；TrendChart SVG 填充 hex、`UnassignedQueue.jsx:6,34` 任意值类 `bg-[#E4EFF3]` 未入 token 档）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | checklist 全过：KPI 同高（grid+h-full `KpiCard.jsx:19`）三要素+vs 昨日（`:21-36`）；主图 8/12=`App.jsx:26`；第二块为列表 `:29-31`；侧栏+顶栏骨架（`SideRail.jsx:15`、`TopBar.jsx:6`）；空态有说明+双入口（`UnassignedQueue.jsx:47-75`）；间距走 Tailwind 4px 刻度；数据 302-743 单在 200-900 量级（`mock.js:51-66`） |
| 视觉层次 | 4 | 深色侧轨 vs 月白内容区（`tailwind.config.js:15-21`）主次分明；KPI 36px 表格数字（`KpiCard.jsx:24`）；节气分界签名动作（`TrendChart.jsx:105-123`）。未渲染验证 |
| 可访问性 | 3 | 全局 :focus-visible（`index.css:19-23`）、reduced-motion（`:55`）、图表柱可键盘聚焦+title（`TrendChart.jsx:90-93`）、sr-only 搜索标签（`TopBar.jsx:23`）、lang=zh-CN（`index.html:2`）、对比度入档注释（`tailwind.config.js:25-27`）。扣分：文档序 h1（`TopBar.jsx:8`）→KPI h3（`KpiCard.jsx:21`）跳级（CHK-09 不扫 jsx，人工发现） |
| 反模板化 | 4 | 零 slop：无渐变文字/glow/emoji 图标（手绘 SVG 图标集 `icons.jsx`）/问候标题；节气物候主题+「云翎客服台」品牌（`SideRail.jsx:25`）换名测试通过；页脚明示「演示数据」（`App.jsx:36`）反编造 |
| 状态完整性 | 2 | 空态优秀但仅组件级（`mock.js:136` 注释切换，非运行时可触达）；无载/错态 |
| 文案具体性 | 4 | 「峰值 743 单（11-20），今日 316 单」「工作日稳定在 500–750 单，周末回落至 300 单档」（`TrendChart.jsx:60,143`）；KPI note 带昨日基准（`mock.js:30,38`） |

**总分 21**（置信度：高）。拒绝正例：无假量级数字、无无来源声明。

## e4-p04（S1 · Dashboard）

**checks**：E/W/I = 0/0/2（16 份中唯一零 warning 的 S1）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | checklist 全过：KPI 三要素+基准（`KpiCard.jsx:15-26`，`mockOverview.js:65` 「+41（+12.4%）/较昨日」）；主图 col-span-3/4≥2/3（`App.jsx:64`）；第二块列表（`:68`）；空态说明+双出口（`UnassignedList.jsx:62-77`）；ink-500 #64748B on #FFF=4.76:1 全档达标（`tailwind.config.js:8-45`） |
| 视觉层次 | 4 | KPI→图/表切换→列表层级明确；sr-only 区块标题不制造视觉噪音（`App.jsx:52-55`）。未渲染验证 |
| 可访问性 | 4 | skip 链接（`App.jsx:32-37`）；focus-visible 全组件（`ui.jsx`、`Topbar.jsx:27`）；图表双通道：aria-label 带实数（`TrendChart.jsx:153`）+ 可切换数据表（`:165-184` aria-pressed）；role=status/alert（`PageStates.jsx:8,36`）；motion-reduce（`PageStates.jsx:6`）；标题序 h1→sr-only h2→h2/h3 无跳级（KPI 标签用 p，`KpiCard.jsx:12`） |
| 反模板化 | 4 | 零 slop；手绘线性图标（`icons.jsx:1-2` 注明不用 emoji/图标库）；标题「运营总览」非问候式（`Topbar.jsx:12`）；换名测试通过（文案绑定派单/SLA 语义） |
| 状态完整性 | 4 | 四态齐且有出路且运行时可触达：?mock=loading|error|empty|success（`mockOverview.js:5-16,116-141`）；骨架屏同形（`PageStates.jsx:5-31`）；错误态人话+错误码+重试/服务状态双出口（`:34-58`）；AbortController 防竞态（`useOverview.js:10-19`） |
| 文案具体性 | 4 | 「近 7 天日均 X 单，较上一周期 +Y%」由数据实算（`mockOverview.js:47-55`）；「数据截至 2026-11-22 14:32（UTC+8）· 示例数据」（`Topbar.jsx:14`）；「按等待时长降序 · 优先处理 SLA 风险单」（`UnassignedList.jsx:52`） |

**总分 24**（置信度：高）。拒绝正例：全未命中。

## e4-p05（S7 · 可访问性精修）

**checks**：E/W/I = 0/0/2。**diff**：+54/-12，1 文件（TicketFilter.jsx）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 缺陷面 8 项全修：div onclick 清空/导出→button（diff @@ -11,13）；span ×→button+aria-label 关闭（@@ -32,7）；#94A3B8→text-ink-600（@@ -19,2）；h4→h2（@@ -11,2）；弹层 role=dialog+aria-modal+aria-labelledby+tabIndex=-1（@@ -32,7）；无正数 tabindex；diff 仅此一文件且无布局类改动 |
| 视觉层次 | 4 | 零视觉方向变更：类名仅追加 focus ring，无颜色/间距/结构改动（diff 全文核对） |
| 可访问性 | 4 | 弹层打开聚焦容器、Esc 关闭（window keydown）、卸载/关闭归还触发器焦点（diff useEffect 块）；Tab 圈定首尾循环（trapTab）；全交互元素 focus-visible:ring（input/button/×/触发器）；aria-live polite 匹配计数（@@ -19,2）；aria-label 于 form/ul。键盘流程静态推演完整（未实测） |
| 反模板化 | 4 | 无新增装饰/slop |
| 状态完整性 | 2 | 任务不含状态面，基线原样（口径同上） |
| 文案具体性 | 4 | aria-label「关闭」+ form「工单筛选」+ ul「工单列表」语义准确（diff @@ -11,13） |

**总分 22**（置信度：高）。拒绝正例：无正数 tabindex / 无裸 outline:none / 非只清静态项（Esc+圈定+归还焦点齐备）。

## e4-p06（S5 · 精修）

**checks**：E/W/I = 1/0/2（CHK-05 遗留 `Dashboard.jsx:38`，同 p01）。**diff**：+12/-9，3 文件。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | 修复面同 p01 且 token 入档带意图注释（`tailwind.config.js` diff：warm.600=#C2410C「加深至 AA 对比度，橙色特征保留」、link=#7C3AED「色相不变仅入库」）；扣分点同 p01：KPI 卡1 boxShadow 删除无替代 |
| 视觉层次 | 4 | 结构零改动 |
| 可访问性 | 3 | 对比度 3 处全修 + alt；CHK-05 error 遗留（同 p01 口径） |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同 p01 |
| 文案具体性 | 4 | alt=「第三季度服务台运营横幅」（diff @@ -42,5）信息完整；token 注释明示修复依据 |

**总分 20**（置信度：高）。

## e4-p07（S1 · Dashboard）

**checks**：E/W/I = 0/7/4（CHK-09×2 均在 `preview.html:286`（首个标题 h2）与 `:392`（h1→h3）；CHK-02/03 集中于 preview.html 内联样式；CHK-07 固定宽 240/256 为侧栏宽，info 级）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | checklist 主体过：KPI 三要素+color-not-only（`KpiCard.jsx:25-32`）；主图 2/3（`App.jsx:40`）；空态说明+双入口（`UnassignedList.jsx:14-41`）；数据 243-755 带量级依据注释（`mock.js:2-6`）。扣分：间距半档频用（`UnassignedList.jsx:56` px-1.5/py-0.5=6px/2px、`TrendChart.jsx:102` h-3.5），4px 基线打八折；preview.html 标题序缺陷（上） |
| 视觉层次 | 4 | 周末底纹+direct labeling（`TrendChart.jsx:113-142`）；KPI 大数字+底部注释分层（`KpiCard.jsx:20-34`）。未渲染验证 |
| 可访问性 | 3 | skip 链接（`App.jsx:12-17`）、全局 :focus-visible（`index.css:45-49`）、reduced-motion（`:55`）、图表点键盘可聚焦+aria-label（`TrendChart.jsx:145-165`）、数据表兜底（`:179-202`）。扣分：React 应用同样 h1（`App.jsx:27`）→KPI h3（`KpiCard.jsx:17`）跳级 |
| 反模板化 | 4 | 零 slop；「云枢Desk」品牌+mock 注释声明依据；色点仅辅助、语义由文字承载（`UnassignedList.jsx:4-11`） |
| 状态完整性 | 2 | 列表空态（`UnassignedList.jsx:14`）+图表空态（`TrendChart.jsx:24-31`）双空态有出路，但无载/错态 |
| 文案具体性 | 4 | 「今日已解决 437 张 · 转入明日 41 张」「目标 5 分钟内 · 连续 6 天达标」「共 23 张未分配 · 按等待时长降序」（`mock.js:47,56`、`UnassignedList.jsx:103`） |

**总分 20**（置信度：高）。

## e4-p08（S3 · Landing）

**checks**：E/W/I = 0/3/2（CHK-02 为 token 定义/SVG；CHK-03 10px/1px/6px 微间距，不影响章节节奏项）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | ink ramp + 钴蓝 #0047AB + Inter（`styles.css:8-33`）；章节节奏 clamp(80px,9vw,128px) 显式对齐 invariant（`styles.css:41,97`）；hero 唯一主 CTA+唯一次级（`index.html:47-48`）；信任区仅可验证（`:72-85`）；定价首屏以下（`:151-197`）；muted 文本 #667085 on #FFF≈4.95:1 达标（`styles.css:11`，手算） |
| 视觉层次 | 4 | hero 左对齐双栏+终端面板（`styles.css:202-208`）；功能段交替（`.reverse` `styles.css:314`）；推荐档描边强调（`:387`）。未渲染验证 |
| 可访问性 | 4 | skip 链接（`index.html:12`）；:focus-visible（`styles.css:72`）；reduced-motion（`:489-496`）；导航在所有断点保留（`styles.css:474-486` 无隐藏规则，优于 p02/p15）；ink-300 仅用于深色页脚（`:444-471`，on #101828≈6.7:1）；标题序无跳级（h1→h2→h3） |
| 反模板化 | 4 | 零 slop；终端会话语气（`index.html:58-67` 离线写→合并输出）自成一格；换名测试通过 |
| 状态完整性 | 2 | S3 统一口径 |
| 文案具体性 | 4 | 「schema drift: none」「2 个工作日内响应」「sync log 是标准 SQLite 表……付费到期自动回落」（`index.html:126,177,195`） |

**总分 22**（置信度：高）。

## e4-p09（S5 · 精修）

**checks**：E/W/I = 1/1/2（CHK-05 遗留 + CHK-02 硬编码色 1 处 `Dashboard.jsx:14`＝保留的内联 boxShadow rgba）。**diff**：+9/-8，3 文件（最小 diff）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | 13px→mt-16、17px→mb-16 归位；#94A3B8→ink-600×2；#FF6B35→status.warn=#C2410C（橙色保留）；img alt 补齐。扣分：处理链接 #7C3AED→`text-accent-600`（#1D4ED8，紫→蓝色相改变，产品特征微变）；保留 rgba 阴影致 CHK-02 遗留 1 处 |
| 视觉层次 | 4 | 结构零改动；boxShadow 原样保留（视觉保真反而最好的一处） |
| 可访问性 | 3 | 对比度 3 处全修 + alt=「第三季度服务台运营横幅」；CHK-05 error 遗留 + 1 处硬编码色残留 |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同上 |
| 文案具体性 | 4 | alt 信息完整；status token 语义命名（diff tailwind.config.js：`status: { warn: '#C2410C' }`） |

**总分 20**（置信度：高）。

## e4-p10（S7 · 可访问性精修）

**checks**：E/W/I = 0/0/2。**diff**：+53/-12，1 文件。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 8 项缺陷全修（同 p05 面）；额外 form role="search"（diff @@ -11,13）；链接式按钮补 bg-transparent/border-0/p-0 重置（@@ -41,3）防 UA 默认样式破坏视觉；无布局改动 |
| 视觉层次 | 4 | 仅追加 ring 与按钮重置类，零视觉方向变更 |
| 可访问性 | 4 | 打开即聚焦 × 关闭钮；Esc 关闭且归还触发器焦点（diff onKeyDown）；closeModal 双路径（×/Esc）均归还焦点；Tab 圈定 document 级监听；全部交互元素 focus-visible:outline-none+ring 单一指示器；aria-live polite |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同上 |
| 文案具体性 | 4 | aria-label「关闭」/「筛选工单」/「工单列表」准确；role=search 语义加分 |

**总分 22**（置信度：高）。残留 `audit-report.md` 为过程文档，按约定不计分。

## e4-p11（S1 · Dashboard）

**checks**：E/W/I = 0/4/5（CHK-01 行级 2.34:1 `preview.html:131`＝空态图标色，装饰性场景但仪器计 warning；CHK-09 h1→h3 `preview.html:242`；CHK-08 无 reduced-motion；CHK-02 132+11 处硬编码色）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | KPI 三要素+caption 基准（`KpiCard.jsx:21-38`、`mock.js:20` 「昨日 618 单 · 14 天均值 466 单」）；主图 2/3（`App.jsx:59`）；空态运行时可切换（`UnassignedList.jsx:11,31`）；数据 243-647 合理（`mock.js:52-67`）。扣分：h1（`App.jsx:28`）→KPI h3（`KpiCard.jsx:12`）跳级（React 与 preview 双处）；默认 Tailwind 调色板直用（indigo/slate/emerald），无自有 token 层（greenfield 允许，但与同类产出相比一致性弱） |
| 视觉层次 | 3 | 层级成立（大数字→趋势图→列表，均值参考线 `TrendChart.jsx:104-115`）但表现语言最接近通用模板（默认蓝+rounded-lg 卡片）；未渲染验证 |
| 可访问性 | 2 | 有 aria-pressed（`TrendChart.jsx:59`）、bell aria-label（`Topbar.jsx:22`）。扣分：无 skip 链接；无全局 :focus-visible 方案（`index.css` 仅字体设置）；搜索框 focus:outline-none 后仅 ring-indigo-200≈1.5:1 弱指示（`Topbar.jsx:11`）；图表数据点不可键盘聚焦且无表格兜底（`TrendChart.jsx:122-128` circles 无 tabIndex，对照 p03/p07/p04）；无 reduced-motion（CHK-08） |
| 反模板化 | 3 | 无 slop 症状四类（无渐变文字/glow/emoji/问候），换名测试勉强通过（caption 具体但视觉语汇模板化）；「预览空态」演示开关留在产品 UI（`UnassignedList.jsx:22-28`）属过程痕迹 |
| 状态完整性 | 3 | 空态运行时可触达且双出口（`UnassignedList.jsx:31-54`）；无载/错态 |
| 文案具体性 | 4 | captions 全带昨日基准与目标（`mock.js:20,29,38,47`）；「示例数据」徽章诚实（`Topbar.jsx:16-18`） |

**总分 18**（置信度：高）。

## e4-p12（S5 · 精修）

**checks**：E/W/I = 0/0/2（四份 S5 中唯一全清）。**diff**：+11/-11，2 文件（未动 tailwind.config）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | 13px/17px 归位、#94A3B8→ink-600×2、阴影内联样式→`shadow` 类（视觉近似保留，处理最妥）；扣分：SLA 数字 #FF6B35→`text-accent-600` 与处理链接 #7C3AED→`text-accent-600` 两处色相变（橙→蓝、紫→蓝），产品特征改动面大于 p01/p06/p09 |
| 视觉层次 | 4 | 结构零改动；shadow 类保真 |
| 可访问性 | 4 | 唯一补齐键盘焦点：链接/输入/文本域/按钮全加 focus-visible:ring（diff `Settings.jsx:12,14,16`、`Dashboard.jsx` 处理链接）；CHK-05 清零；对比度 3 处全修 |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同上 |
| 文案具体性 | 3 | alt=""（装饰性判定可辩护，但 banner 信息对读屏完全丢失，弱于其余三份的描述性 alt） |

**总分 20**（置信度：高）。

## e4-p13（S7 · 可访问性精修）

**checks**：E/W/I = 0/0/2。**diff**：+62/-13，1 文件（四份中最大，仍单文件无结构改动）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 8 项缺陷全修；focusRing 共享常量保证全站一致（diff @@ -1,5）；无布局改动；diff 增量全部服务于 a11y 语义 |
| 视觉层次 | 4 | 零视觉方向变更 |
| 可访问性 | 4 | 弹层语义最完整：role=dialog+aria-modal+aria-labelledby+**aria-describedby**（diff @@ -32,7，四份中唯一）；打开聚焦首个可聚焦元素；Esc+卸载归还焦点；Tab 圈定；焦点在弹层外时以首元素兜底（`const active = dialog.contains(...) ? ... : first`） |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同上 |
| 文案具体性 | 4 | aria-label「关闭」/「筛选工单」/「工单列表」；desc 关联正文 |

**总分 22**（置信度：高）。

## e4-p14（S7 · 可访问性精修）

**checks**：E/W/I = 0/0/2。**diff**：+55/-13，1 文件。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 8 项缺陷全修；无布局改动；文件头注释更新为修复说明（diff @@ -1,4，过程性但无害） |
| 视觉层次 | 4 | 零视觉方向变更 |
| 可访问性 | 4 | 焦点管理最稳健：除 Tab 圈定外加 focusin 监听，焦点逃逸弹层即拉回关闭钮（diff onFocusIn）；× 以 span aria-hidden 包裹+aria-label「关闭弹层」（文字最具体）；Esc+卸载归还焦点。小疵：× 钮 ring 无 offset（其余元素有） |
| 反模板化 | 4 | 无新增 slop |
| 状态完整性 | 2 | 口径同上 |
| 文案具体性 | 4 | 「关闭弹层」/「筛选条件」/「工单列表」 |

**总分 22**（置信度：高）。

## e4-p15（S3 · Landing）

**checks**：E/W/I = 0/4/2（CHK-09 h2→h4 `index.html:389` 页脚列标题；CHK-03 10px/14px/9px 微间距；CHK-02 为 token 定义/装饰性 linear-gradient 列表符号，styles.css:464-465 非 slop 渐变文字）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | ink ramp + 钴蓝 #0047AB + Inter（`styles.css:10-28`）；章节节奏 clamp(80px,9vw,120px)（`:33,183`）；主 CTA 唯一+一个次级（`index.html:44-45`）；信任区仅可验证（Apache-2.0/仓库/研究引用 `:47-50,280-294`）；定价首屏以下（`:298-343`）；页脚明示虚构产品与示意定价（`:342,410`），反编造声明最彻底 |
| 视觉层次 | 4 | 「仪器图纸」美学独树一帜：hero 交互合并演示为强焦点（`:53-167`），论点段 prose/art 交替（arg-grid--prose-first/art-first）；measurement 注释线统一弱化三级信息 |
| 可访问性 | 3 | :focus-visible（`styles.css:83`）、reduced-motion（`:554`）、fieldset/legend+原生 radio（`index.html:69-93`）、表格 sr-only caption（`:110`）、:has() 不支持时静态降级+提示（`styles.css:333,545-551`）。扣分：页脚 h2→h4 跳级（CHK-09 实锤）；≤760px 隐藏 .nav-links 无替代（`styles.css:539`） |
| 反模板化 | 4 | 零 slop；纯 CSS :has() 交互演示（`:293-298`）为 16 份中最强反模板证据；换名测试通过 |
| 状态完整性 | 3 | 交互演示含 awaiting/resolved 两态+四种变体+无 :has 降级态（`index.html:95-166`），落地页中唯一做了状态设计的 |
| 文案具体性 | 4 | 「720/720 converge」「state hash 9f3c1d」「O(columns touched) · zero network on write」（`:261,235,178`） |

**总分 22**（置信度：高；视觉层次未渲染验证）。

## e4-p16（S3 · Landing）

**checks**：E/W/I = 0/0/2（四份 S3 中唯一零 warning：裸值全部收敛进 tokens.css）。

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 单一 token 文件纪律：「裸色值/裸字号/裸间距只允许出现在这里」（`tokens.css:2-3`）；对比度实算入注（`tokens.css:4`：ink-900 17.7 / ink-500 6.36 on #FFF）；ink 冷灰 ramp+钴蓝 #1A56DB+Inter；主 CTA 唯一+静默次级（`index.html:37-38`）；信任区仅可验证（`:40`）；定价首屏以下（`:143-182`）。小注：band 内衬 48px，注释以相邻 band 内容间距 96px 解释 80-128 节奏（`styles.css:51-52`），解释可接受但单段内衬低于区间下限 |
| 视觉层次 | 4 | hero 非对称 7/5+终端卡（`styles.css:128-135`）；WAL 增量对比条（118 MB vs 0.4 MB，`index.html:125-137`）以数据可视化承载论点；未渲染验证 |
| 可访问性 | 4 | skip 链接（`index.html:12`）；:focus-visible（`styles.css:25`）；reduced-motion（`:438`）；导航所有断点 flex-wrap 保留不隐藏（`:426-427`）；标题序 h1→h2→h3 无跳级、页脚无标题；图表均有 role=img+aria-label（`index.html:71`） |
| 反模板化 | 4 | 零 slop；WAL 帧级叙事+终端输出语气；换名测试通过 |
| 状态完整性 | 2 | S3 统一口径 |
| 文案具体性 | 4 | 「追平 12 万行的库，不用搬家」「基准：同一张 12 万行 orders 表修改 300 行后同步一次」「61ms/41ms」「1 个工作日响应」（`index.html:117,136,52,165`） |

**总分 22**（置信度：高）。

---

## 汇总表

| 标签 | 场景 | 契约 | 视觉 | a11y | 反模板 | 状态 | 文案 | **总分** | checks E/W/I | diff 规模 |
|---|---|---|---|---|---|---|---|---|---|---|
| e4-p01 | S5 | 3 | 4 | 3 | 4 | 2 | 3 | **19** | 1/0/2 | +11/-9 (3f) |
| e4-p02 | S3 | 4 | 4 | 3 | 4 | 2 | 4 | **21** | 0/3/2 | — |
| e4-p03 | S1 | 4 | 4 | 3 | 4 | 2 | 4 | **21** | 0/4/2 | — |
| e4-p04 | S1 | 4 | 4 | 4 | 4 | 4 | 4 | **24** | 0/0/2 | — |
| e4-p05 | S7 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | +54/-12 (1f) |
| e4-p06 | S5 | 3 | 4 | 3 | 4 | 2 | 4 | **20** | 1/0/2 | +12/-9 (3f) |
| e4-p07 | S1 | 3 | 4 | 3 | 4 | 2 | 4 | **20** | 0/7/4 | — |
| e4-p08 | S3 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/3/2 | — |
| e4-p09 | S5 | 3 | 4 | 3 | 4 | 2 | 4 | **20** | 1/1/2 | +9/-8 (3f) |
| e4-p10 | S7 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | +53/-12 (1f) |
| e4-p11 | S1 | 3 | 3 | 2 | 3 | 3 | 4 | **18** | 0/4/5 | — |
| e4-p12 | S5 | 3 | 4 | 4 | 4 | 2 | 3 | **20** | 0/0/2 | +11/-11 (2f) |
| e4-p13 | S7 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | +62/-13 (1f) |
| e4-p14 | S7 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | +55/-13 (1f) |
| e4-p15 | S3 | 4 | 4 | 3 | 4 | 3 | 4 | **22** | 0/4/2 | — |
| e4-p16 | S3 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | — |

口径备注：
1. 「契约一致性」在 E4 无契约文件下按场景任务书 checklist/精修 invariant 判定（process 文档剥离属刻意设计）。
2. 「状态完整性」对 S3 静态落地页与 S5/S7 精修任务弱适用：S3 统一记 2（p15 因交互演示三态记 3），S5/S7 统一记 2（任务不含状态面，基线原样）。跨场景比较时该维度应慎用。
3. S5 的 CHK-05 遗留 error 为基线既有（fixture 核对），且 S5 清单仅要求 CHK-01/02/06 清零，故只影响 rubric a11y 档位不影响契约维度。
4. p03 的 CHK-02 有 8 处为 `#24817` 工单号被误判 hex 的仪器误报；p11 的 CHK-01 2.34:1 为装饰性图标色（aria-hidden），均已按语义校正解读但不改仪器计数。
