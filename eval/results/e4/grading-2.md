# E4 双盲评审 · grader-2

- 评审对象：`eval/results/e4-graded/e4-p01..p16`（16 份脱敏产出）
- 场景归属：p01=S5, p02=S3, p03=S1, p04=S1, p05=S7, p06=S5, p07=S1, p08=S3, p09=S5, p10=S7, p11=S1, p12=S5, p13=S7, p14=S7, p15=S3, p16=S3
- rubric：`eval/rubric.md` 六维 0-4；协议：`eval/grader-protocol.md`
- 确定性仪器：`node vismith/scripts/checks.mjs <标签目录> --json`（全部 16 份统一、无契约模式，cwd 无 `.vismith/rules.json` 豁免，`NO_ROOT_VISMITH` 已验证）
- S5/S7 diff 基线：`git diff --no-index eval/fixtures/{s5,s7}-project <标签>/project`
- **口径声明（E4 特有）**：`.vismith/`、contract.json、decisions.log、自检器均被脱敏剥离，属刻意设计，一律不因缺失扣分。"契约一致性"维度改按**任务书 checklist 与 invariants 的偏离度**评定。评分只针对产品代码质量。
- 幸存过程物（不计分，仅记录）：p09/validate.mjs、p15/check.mjs（两者均引用已被剥离的 contract.json，当前不可运行）；p10/audit-report.md。
- 未验证项：未做浏览器渲染/键盘实测（静态代码审查 + checks + WCAG 公式实算）；S1 视觉层次按代码结构推断（置信中）。
- 对比度数字均为 WCAG 相对亮度公式实算输出（命令：node 内联 lum/contrast 函数）。

## 汇总表

| 标签 | 场景 | 契约 | 视觉 | 可达 | 反模板 | 状态 | 文案 | 总分 | checks E/W/I | diff 规模 |
|---|---|---|---|---|---|---|---|---|---|---|
| e4-p01 | S5 | 4 | 4 | 1 | 4 | 2 | 3 | **18** | 1/0/2 | 3 文件 +11/−9 |
| e4-p02 | S3 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/3/2 | — |
| e4-p03 | S1 | 4 | 4 | 3 | 4 | 3 | 4 | **22** | 0/4/2 | — |
| e4-p04 | S1 | 4 | 4 | 4 | 4 | 4 | 4 | **24** | 0/0/2 | — |
| e4-p05 | S7 | 4 | 4 | 4 | 4 | 3 | 3 | **22** | 0/0/2 | 1 文件 +54/−12 |
| e4-p06 | S5 | 4 | 4 | 1 | 4 | 2 | 3 | **18** | 1/0/2 | 3 文件 +12/−9 |
| e4-p07 | S1 | 3 | 4 | 3 | 4 | 3 | 4 | **21** | 0/7/4 | — |
| e4-p08 | S3 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/3/2 | — |
| e4-p09 | S5 | 3 | 4 | 1 | 4 | 2 | 3 | **17** | 1/1/2 | 3 文件 +9/−8 |
| e4-p10 | S7 | 4 | 4 | 4 | 4 | 3 | 3 | **22** | 0/0/2 | 1 文件 +53/−12 |
| e4-p11 | S1 | 4 | 3 | 2 | 3 | 3 | 4 | **19** | 0/4/5 | — |
| e4-p12 | S5 | 3 | 3 | 4 | 4 | 2 | 2 | **18** | 0/0/2 | 2 文件 +11/−11 |
| e4-p13 | S7 | 4 | 4 | 4 | 4 | 3 | 3 | **22** | 0/0/2 | 1 文件 +62/−13 |
| e4-p14 | S7 | 4 | 4 | 3 | 4 | 3 | 3 | **21** | 0/0/2 | 1 文件 +55/−13 |
| e4-p15 | S3 | 4 | 4 | 3 | 4 | 3 | 4 | **22** | 0/4/2 | — |
| e4-p16 | S3 | 4 | 4 | 4 | 4 | 2 | 4 | **22** | 0/0/2 | — |

checks 误报备注（记录用，不扣分）：CHK-02 对 token 定义文件内 hex（p08/p15/p16 的 `:root`）与 SVG 属性色（p02/p03/p11 图表）天然命中；p03 `src/data/mock.js:71` 起的 8 处"硬编码色"实为工单号字符串 `'#24817'`（HEX_RE 误报）；CHK-03 在 S3 组件级内边距（10/14px 等）上触发，S3 checklist 只约束章节节奏 80–128px，不约束 4px 基线。

---

## S5 · 已有设计系统局部精修（p01 / p06 / p09 / p12）

基线缺陷（`eval/fixtures/s5-defect-map.md`，8 项）：3 处对比度（#94A3B8×2、#FF6B35）、2 处硬编码色、img 缺 alt、13/17px 魔法间距、冗余 spacing token。实算基线对比度：#94A3B8 on #FFF = 2.56、#FF6B35 on #FFF = 2.84（均不达标）；#7C3AED on #FFF = 5.70（达标，仅需入库）。

### e4-p01（S5）— 18 = C4 V4 A1 R4 S2 T3

- **契约一致性 4**：缺陷地图逐项命中——对比度 ×3 修复（`Dashboard.jsx:16` #94A3B8→text-ink-600(#475569, 7.58:1)；`Dashboard.jsx:24` #FF6B35→highlight-700(#C2410C, 5.18:1，橙色相保留)；`Settings.jsx:15` 同）；硬编码 ×2 入库（`tailwind.config.js:8-9` 新增 highlight-700/link-600，link-600=#7C3AED 原值原相）；`Dashboard.jsx:44` alt="Q3 活动横幅"；13/17px→mb-16/mt-12（`Dashboard.jsx:8,13`）归 4px 基线。diff 最小（3 文件 +11/−9），未重构未换库。CHK-05 error 为 fixture 前置（基线亦有），非新引入。
- **视觉层次 4**：布局结构零改动；唯一附带视觉变化是 KPI 卡 1 的内联 boxShadow 被移除（diff hunk @@ -6,12），客观上消除了"仅一张卡有阴影"的不一致。
- **可访问性 1**：CHK-05 error（checks 输出 `Dashboard.jsx:38 存在交互元素但未见 :focus-visible 方案`）留存未处理；对比度与 alt 已修复但键盘焦点可见性无改进。
- **反模板化 4**：全库 slop grep 零命中；色相保真（紫链接/橙强调仅调档不加彩）；无越权重设计。
- **状态完整性 2**：基线页面无数据流状态机，产出未破坏亦未新增（正确的不越权）；按场景中性计。
- **文案具体性 3**：页面文案未动（最小 diff 正确）；新增文案仅 alt"Q3 活动横幅"，具体但略简。
- 拒绝正例：顺手重设计=否；未提取契约=不判（剥离）；引入新 CHK=否（E1 为前置）。

### e4-p06（S5）— 18 = C4 V4 A1 R4 S2 T3

- **契约一致性 4**：与 p01 同构修复（`Dashboard.jsx:8,13,24,44`、`Settings.jsx:15`、mt-12 归位），且 `tailwind.config.js:8-11` 的 token 入库带决策注释（"原行内 #FF6B35，加深至 AA 对比度，橙色特征保留"）。
- **视觉层次 4**：同 p01（boxShadow 移除）。
- **可访问性 1**：CHK-05 error 留存（checks 输出同上）；对比度/alt 已修。
- **反模板化 4**：零 slop；色相保真。
- **状态完整性 2**：同口径。
- **文案具体性 3**：alt="第三季度服务台运营横幅"（`Dashboard.jsx:44`），比 p01 更具体。
- 拒绝正例：同 p01，全部未命中。

### e4-p09（S5）— 17 = C3 V4 A1 R4 S2 T3

- **契约一致性 3**：对比度 ×3、alt、间距均修复（`Dashboard.jsx:16,24,44`、`Settings.jsx:15`）；但 **链接 #7C3AED（紫）→ text-accent-600(#1D4ED8 蓝)**（`Dashboard.jsx:38`）改变了该元素色相——产品特征轻度偏移 1 处。status-warn token 入库（`tailwind.config.js:8`）。CHK-02 W1 的 rgba boxShadow 为 fixture 前置（基线同款），非新引入。
- **视觉层次 4**：布局零改动；boxShadow 内联保留（视觉最保真的一档处理）。
- **可访问性 1**：CHK-05 error 留存；W1（rgba 残留，前置）。
- **反模板化 4**：零 slop，无越权。
- **状态完整性 2**：同口径。
- **文案具体性 3**：alt 具体描述。
- 附加记录：标签根有 validate.mjs 自检器（引用已剥离的 contract.json/decisions.log，不可运行），按脱敏设计不计分。

### e4-p12（S5）— 18 = C3 V3 A4 R4 S2 T2

- **契约一致性 3**：对比度 ×3 修复（ink-600；SLA→accent-600 #1D4ED8 = 6.70:1）；间距归位；但 **两处色相重映射**：SLA 数字 橙#FF6B35→蓝（`Dashboard.jsx:24`）、链接 紫#7C3AED→蓝（`Dashboard.jsx:38`）——页面唯一暖色强调消失，接近"顺手重设计（改配色）"拒绝正例边缘（未换库、未改结构，判近命中不判死，置信中）。alt="" 判装饰性（可辩护但较 p01/p06/p09 弱）。
- **视觉层次 3**：布局零改动，但双色相偏移使 KPI 行失去原有的暖色焦点（原设计 SLA 橙色是数字层唯一的非中性强调）。
- **可访问性 4**：**唯一 E0/W0 的 S5 产出**；且超出场景要求补齐了 focus-visible 焦点环（`Dashboard.jsx:38`、`Settings.jsx:12,16,18`：ring-2 + offset + outline-none 替代方案）；boxShadow rgba→`shadow` 类（token 化）。
- **反模板化 4**：零 slop；未动 tailwind.config（复用既有 token，克制）。
- **状态完整性 2**：同口径。
- **文案具体性 2**：alt=""（空）丢失横幅信息，其余文案未动。

---

## S7 · 可访问性专项（p05 / p10 / p13 / p14）

基线缺陷（`eval/fixtures/s7-defect-map.md`，8 项）：div onclick ×2、span 关闭不可达、h1→h4 跳级、#94A3B8 对比、模态焦点管理缺失、全页无 :focus-visible、`<i>` 斜体可点击。四份产出均实现：h4→h2、三处 div/span→语义 button、#94A3B8→text-ink-600（7.24:1 on #F8FAFC）、全交互元素 focus-visible 焦点环、role=dialog + aria-modal + aria-labelledby、Esc 关闭、Tab 圈定、焦点归还触发器、aria-live polite 计数、ul/form aria-label。checks 全部 E0/W0/I2。

### e4-p05（S7）— 22 = C4 V4 A4 R4 S3 T3

- **契约一致性 4**：8 项缺陷全修；diff +54/−12 全部用于焦点管理逻辑，布局/文案零改动；无正数 tabindex（仅 `TicketFilter.jsx:72` tabIndex={-1} 于 dialog 容器，规范用法）；未用 outline:none（默认轮廓+ring 叠加，可见）。
- **视觉层次 4**：结构未动；`<i>清空</i>` 斜体随语义化移除（缺陷#8 的正解）。
- **可访问性 4**：`TicketFilter.jsx:12-23`（打开即聚焦 + Esc + 卸载归还焦点）、`27-44`（Tab 圈定）、`50-51`（input/清空按钮 ring）、`54`（aria-live）、`68-72`（dialog 语义 + tabIndex=-1）、`78,79,84`（关闭/导出/触发器 ring）。键盘路径完整（静态审查，置信高）。
- **反模板化 4**：零 slop，克制修复。
- **状态完整性 3**：aria-live="polite" 使筛选计数成为可感知状态更新（超出基线的改进）；无载/错态（页面无异步流，N/A）。
- **文案具体性 3**：aria-label"关闭"简明；页面文案未动。

### e4-p10（S7）— 22 = C4 V4 A4 R4 S3 T3

- **契约一致性 4**：8 项全修；+53/−12；无正数 tabindex；`outline-none` 均与 `focus-visible:ring-2` 成对出现（`TicketFilter.jsx:57,58,77,78,83`，替代方案成立，拒绝正例不命中）。
- **视觉层次 4**：结构未动；`TicketFilter.jsx:83` 对"导出结果…"button 做 bg-transparent/border-0/p-0/font-sans 复位，视觉与原 div 保持一致（最细致的视觉保真）。
- **可访问性 4**：`14-45`（focus 进圈 + Esc preventDefault + 立即归还焦点 + Tab 圈定）、`55`（form role="search"）、`61`（aria-live）、`74`（dialog 语义）、`77`（aria-label 关闭）。
- **反模板化 4**：零 slop。
- **状态完整性 3**：aria-live polite（`TicketFilter.jsx:61`）。
- **文案具体性 3**：aria-label"关闭"。
- 附加记录：audit-report.md 为过程文档，不计分。

### e4-p13（S7）— 22 = C4 V4 A4 R4 S3 T3

- **契约一致性 4**：8 项全修；+62/−13（最大 diff，增量来自注释与多行属性排版，逻辑密度与 p10 相当）；`TicketFilter.jsx:4` focusRing 常量统一焦点方案并注明"未移除原生焦点样式"。
- **视觉层次 4**：**唯一保留 `<i>清空</i>` 斜体视觉的产出**（`TicketFilter.jsx:59`，语义已由 button 修复，视觉方向不变——对"不改视觉方向"的最严格执行）；其余零改动。
- **可访问性 4**：`15-52`（焦点管理：Tab 圈定含 activeElement 兜底 `:35`，为四份中最稳健的圈定实现）、`76-80`（**唯一带 aria-describedby 的 dialog**，`:80,84`）、`62`（aria-live）、`56`（form aria-label）。
- **反模板化 4**：零 slop。
- **状态完整性 3**：aria-live polite（`:62`）。
- **文案具体性 3**：aria-label"关闭"。

### e4-p14（S7）— 21 = C4 V4 A3 R4 S3 T3

- **契约一致性 4**：8 项全修；+55/−13；无正数 tabindex；未用 outline:none。
- **视觉层次 4**：结构未动；页头注释明确"视觉方向、布局结构与产品特征不变"（`TicketFilter.jsx:3`）。
- **可访问性 3**：`13-52` 焦点管理完整且含 **focusin 兜底**（`:40-43`，四份中唯一防焦点经第三方途径逃逸）；`78` aria-label="关闭弹层" + `<span aria-hidden>`（无障碍命名质量最高）；但关闭按钮焦点环 `ring-2` 无 `ring-offset`（`:78`），与其余元素的 ring-offset-2 方案不完全一致（checklist"焦点可见且全站一致"打小折）；无 aria-describedby。
- **反模板化 4**：零 slop。
- **状态完整性 3**：aria-live polite（`:62`）。
- **文案具体性 3**：aria-label"关闭弹层"四份中最具体。

S7 拒绝正例（四份一致）：正数 tabindex=否（node 扫描仅 −1/0）；outline:none 无替代=否；只清静态项键盘走不通=否（Esc/圈定/归还均有实现，静态审查置信高，未浏览器实测）。

---

## S1 · SaaS 运营总览生成（p03 / p04 / p07 / p11）

checklist：KPI 三要素同高、主图 ≥2/3 宽 + 次块为列表、对比度 ≥4.5、侧栏+顶栏 4px 基线、空态有说明与入口、无 slop、mock 200–900 数量级。

### e4-p03（S1）— 22 = C4 V4 A3 R4 S3 T4

- **契约一致性 4**：`App.jsx:18-22` KPI grid（h-full 同高，`KpiCard.jsx:12-19` flex h-full + 固定 36px 数字档）；`App.jsx:26-31` 主图 lg:col-span-8/12（≥2/3）+ 列表 4/12；tailwind 原生 4px 刻度；空态 `UnassignedQueue.jsx:47-75`（说明 + 双入口）；全 token 色板且档位注明白底对比度（`tailwind.config.js:10-41`，实算 xiaoxue #2E7E9E = 4.57 ✓、ink-muted = 5.58 ✓）。
- **视觉层次 4**：KPI → 8/12 主图（节气分界签名：`TrendChart.jsx:105-123` 立冬→小雪分界虚线 + 物候双色柱）→ 4/12 列表，眯眼三级清晰；侧轨"时令签"竖排节气（`SideRail.jsx:57-74`）为品牌签名。
- **可访问性 3**：全局 `:focus-visible`（`index.css:19-23`）、SVG 柱 `tabIndex + <title>` 键盘可读（`TrendChart.jsx:90-94`）、aria-current（`SideRail.jsx:37`）、sr-only 搜索标签（`TopBar.jsx:23`）；**缺 skip-link**；标题序 h1(TopBar:8)→h3(KpiCard:21) 跳级。
- **反模板化 4**：零 slop；换名测试通过（云翎客服台 + 节气叙事强绑定）。
- **状态完整性 3**：空态齐且有出路（两按钮 + 说明 + `mock.js:136` 导出 UNASSIGNED_EMPTY 演示开关）；无载/错态（静态 mock 场景）。
- **文案具体性 4**：`mock.js:15-48` 全带基准（"周日量级回落（截至 14:00）""目标 ≥ 95% · 昨日 97.4%""值班 8 人 · 在线 22 人"）；`App.jsx:35-39` 页脚"演示数据"披露；`TrendChart.jsx:60` SVG aria-label 含峰值/今日读数。
- checks W4 备注：`mock.js:71` 起为工单号 '#24817' 误报；TrendChart/UnassignedQueue 的 SVG/arbitrary 色为合理使用。

### e4-p04（S1）— 24 = C4 V4 A4 R4 S4 T4

- **契约一致性 4**：`App.jsx:56-60` KPI grid；`App.jsx:63-75` 主图 xl:col-span-3/4（75% ≥2/3）+ 列表；E0/W0；`mockOverview.js:1-3` 明示数量级约束与四态开关。
- **视觉层次 4**：骨架屏与成功态同形（`PageStates.jsx:10-28` 区域级非全屏转圈）；图表/数据表双视图（`TrendChart.jsx:148-193` aria-pressed 切换）。
- **可访问性 4**：skip-link（`App.jsx:32-37`）；全部交互元素 focus-visible ring（`ui.jsx:4-13`、`UnassignedList.jsx:32`）；role=status/alert（`PageStates.jsx:8,36`）；sr-only 区块标题（`App.jsx:53-55`）；分配动作 aria-label 含工单号与坐席名（`UnassignedList.jsx:31`）；图表 aria-label 完整读数（`TrendChart.jsx:153`）；标题序 h1→sr-only h2→h2/h3 无跳级。
- **反模板化 4**：零 slop；DeskPilot 内容具体（换名测试过）；INV 编号注释自证 checklist 映射。
- **状态完整性 4**：**四态齐且有出路**：loading（骨架 + AbortController 可重入 `useOverview.js:9-22`）、error（人话 + 错误码 + 重试 + 查看服务状态 `PageStates.jsx:34-57`）、empty（说明 + 双入口 `UnassignedList.jsx:62-77`）、success；URL `?mock=` 真实可切换（`mockOverview.js:7-16,116-141`）。
- **文案具体性 4**：`mockOverview.js:57-94`（"+41（+12.4%）较昨日""目标 90%""按当前班次"）；趋势摘要计算值（"近 7 天日均 N 单，较上一周期 +x%"`mockOverview.js:47-55`）。

### e4-p07（S1）— 21 = C3 V4 A3 R4 S3 T4

- **契约一致性 3**：React 应用本身 checklist 全过（`App.jsx:32` KPI grid、`:39-44` col-span-2/3 主图 + 列表、空态 `UnassignedList.jsx:14-41`）；但交付物 **preview.html 自带结构缺陷**：CHK-09 首标题 h2（preview:286）与 h1→h3 跳级（preview:392）、CHK-03 间距非 4px 基线 ×7、CHK-07 固定宽 ×2——辅助快照未与主实现同构校验。
- **视觉层次 4**：`App.jsx` 结构清晰；图表周末底纹 + 今日直接标注（`TrendChart.jsx:113-142`）。
- **可访问性 3**：skip-link（`App.jsx:12-17`）、全局 :focus-visible（`index.css:44-49`）、图表点键盘焦点 + title（`TrendChart.jsx:144-165`）、数据表兜底（`TrendChart.jsx:179-202` details 展开）；但 App 内 KPI h3 紧随 h1 跳级（`KpiCard.jsx:17`，preview CHK-09 佐证）。
- **反模板化 4**：零 slop；goodWhen 方向语义由文字承载 + sr-only 结论（`KpiCard.jsx:25-32`）是四份中最细致的色盲友好处理。
- **状态完整性 3**：空态完整（说明 + 双入口，preview ?empty=1 可切换）；无载/错态。
- **文案具体性 4**：`mock.js:1-6` 数量级依据文档化（"工作日 600~760，周末 240~300，14 天合计约 7,230"）；KPI note 全带基准（"今日已解决 437 张 · 转入明日 41 张"）。

### e4-p11（S1）— 19 = C4 V3 A2 R3 S3 T4

- **契约一致性 4**：checklist 全过（`App.jsx:51-55` KPI grid、`:58-63` col-span-2/3、`UnassignedList.jsx:31-54` 空态 + "预览空态"切换按钮）；E0。
- **视觉层次 3**：结构正确但呈现为通用 slate+indigo 后台模板质感（`tailwind.config.js:5-7` extend 为空，全用原生调色板），主次虽清、签名弱。
- **可访问性 2**：**无 skip-link**（App.jsx 全文无）；React 侧无全局 :focus-visible（依赖浏览器默认轮廓，未禁用，勉强可见）；搜索框 focus:ring-indigo-200（`Topbar.jsx:11`）指示器对比度弱；preview.h1→h3 跳级（preview:242）+ preview:131 装饰图标 #94a3b8 on #f1f5f9 = 2.34:1（CHK-01 warning）。
- **反模板化 3**：无 slop 症状（grep 零命中），但"原生调色板直用 + 零品牌 token"属 1 类轻微模板化症状；有诚实的"示例数据"徽章（`Topbar.jsx:16-18`）与 mock 声明（`App.jsx:65-67`）。
- **状态完整性 3**：空态 + 出路齐（按钮级切换演示，交互上四份中最易触达）；无载/错态。
- **文案具体性 4**：`mock.js:19-47` caption 全带基准（"昨日 618 单 · 14 天均值 466 单""目标 ≤30 分钟""当前排班缺口 8 人"）。

S1 拒绝正例（四份均未命中）：编造 Trusted by=否（全库 grep 零命中；p03/p04/p07/p11 均有演示数据/mock 披露）；99999/123456=否（四份序列 243–755 区间内）；contract 缺失=不判（脱敏剥离）。

---

## S3 · Landing Page 品牌一致性（p02 / p08 / p15 / p16）

checklist：hero 换名测试、主 CTA 唯一 + 至多一次级、定价首屏以下对比达标、token 零偏离、信任区仅可验证要素、章节间距 80–128。

### e4-p02（S3）— 22 = C4 V4 A4 R4 S2 T4

- **契约一致性 4**：导航+CTA 保留并标注 invariant（`index.html:14`）；hero 唯一主 CTA + 一次级（`:42-43`，nav CTA 同动作双入口，contract 要求 nav 带 CTA，判合规）；信任区仅 MIT/GitHub/Releases 链接（`:45-49`）；章节节奏 96/112px、移动端 80/88/96（`styles.css:35-37,181,294,550-552` 全落 80–128）；token ramp 文档化（`styles.css:6-31` ink + 钴蓝 #1D4ED8 + Inter）。
- **视觉层次 4**：hero 7fr/6fr 非对称（`styles.css:185-190`）；深色代码面板/浅色面板交替；推荐档深色反转（`styles.css:455-464`）形成定价区唯一强调。
- **可访问性 4**：skip-link（`index.html:12`）、:focus-visible（`styles.css:95-99`）、reduced-motion（`:47-49`）、lang=zh-CN、标题序 h1→h2→h3→h4 无跳级（CHK-09 零命中）；实算最紧对 ink-400 #6E7680 on white = **4.60** ✓（figcaption/plan-desc 用途），深色面板内 #9AA2AB on #12161C = 7.03 ✓。
- **反模板化 4**：零 slop（hype 词/blob/pill/全居中 grep 零命中）；三段论点各配代码/SQL/架构图实证。
- **状态完整性 2**：静态落地页无状态机需求，中性。
- **文案具体性 4**：hero 具体（"断网照常写，多端自动合并"）；定价带承诺参数（"$12/开发者·月""工单 48 小时响应""99.9% SLA"）；页脚 SQLite 公有域免责声明（`:247`）诚实。

### e4-p08（S3）— 22 = C4 V4 A4 R4 S2 T4

- **契约一致性 4**：导航保留（nav CTA 为 secondary，`index.html:33`）；**主 CTA 唯一执行最严格**——全页唯一填充按钮即 hero 主 CTA（`styles.css:166,179-187` 注明 invariant #2，nav/定价按钮均 outline）；节奏 clamp(80px,9vw,128px)（`styles.css:41` 精确命中区间）；token 语义别名层（`:20-31`）；组件层零裸 hex（CSS 头注声明，W3 均为 token 定义与 SVG 属性）。
- **视觉层次 4**：hero 7fr/5fr 左对齐（`:203-208`）；终端演示卡为深色签名；三段论点交替布局（feature.reverse）。
- **可访问性 4**：skip-link、:focus-visible、reduced-motion、**44px 最小触达**（nav/按钮 min-height，`:146,159,185,194`）；实算 ink-500 #667085 on white = 4.97 ✓、终端注释 #98A2B3 on #101828 = 6.89 ✓、白字 on #0047AB = 8.44 ✓。
- **反模板化 4**：零 slop；"不开源残缺版""不锁定（sync log 是标准表）"等反营销话术具有品牌人格。
- **状态完整性 2**：静态页中性。
- **文案具体性 4**："$12 / 开发者 · 月""2 个工作日内响应""欧盟 / 美国区域可选""付费档到期自动回落"。

### e4-p15（S3）— 22 = C4 V4 A3 R4 S3 T4

- **契约一致性 4**：导航+CTA 保留（sticky，`index.html:12-33`）；主 CTA 同一动作双入口 + 唯一次级（`:44-45`）；节奏 clamp(80px,9vw,120px)（`styles.css:33`）；信任带仅 Apache-2.0/仓库/研究引用（`index.html:280-295`，无头像无五星）；token 零偏离（ink ramp + 唯一饱和色钴蓝 #0047AB，`styles.css:8-25`）；**定价下方明示"Illustrative pricing for a fictional product"**（`:342,410`）为最诚实的处理。
- **视觉层次 4**：三角测量图纸世界观（制图纸横纹底 `styles.css:52-54`、细规则线、钴蓝绘图墨）为四份 S3 中最强签名；hero 交互合并演示 + 收敛矩阵表 + 网络图三重视觉论据。
- **可访问性 3**：:focus-visible（`styles.css:83-87`）、fieldset/legend 语义化演示（`index.html:70-92`）、:has() 无支持时静态兜底（`styles.css:546-551` + `index.html:96`）、reduced-motion；**无 skip-link**；CHK-09 h2→h4 跳级（footer h4 紧随 install h2，`index.html:389`）。实算最紧 ink-5 #676F80 on #F6F7F9 = 4.71 ✓、#7FA6F0 on #171C26 = 7.00 ✓。
- **反模板化 4**：零 slop（自带 check.mjs 的禁词/pill/blob/居中扫描设计，虽不可运行但 HTML/CSS 实测全过）；虚构声明避免编造。
- **状态完整性 3**：交互演示有 awaiting→resolved（4 变体）状态机 + 无 JS 兜底，超出静态页基线。
- **文案具体性 4**：全具体带基准（"O(columns touched)""720/720 converge""$18/developer/month""relay sees ciphertext only"）。

### e4-p16（S3）— 22 = C4 V4 A4 R4 S2 T4

- **契约一致性 4**：导航+CTA 保留（nav outline CTA，`index.html:24`）；主 CTA 唯一（hero 唯一实心按钮 `styles.css:90` 注明"实心主 CTA 全页唯一；其余描边"）；节奏文档化（`styles.css:51-52` "band 内衬 48，相邻 48+48=96；定价交界 112–128"）；**独立 tokens.css 单一 token 源**（`tokens.css:1-4` "裸色值/裸字号/裸间距只允许出现在这里"）→ checks E0/W0/I2 全清（四份 S3 中唯一）。
- **视觉层次 4**：hero 7fr/5fr + 终端卡签名；论点三配数据路径盒图/合并日志/118MB vs 0.4MB 基准条形对比（`index.html:125-137`）。
- **可访问性 4**：skip-link（`index.html:12` + `styles.css:30-49` clip-path 方案）、:focus-visible（`:24-28`）、reduced-motion（`:438-440`）、标题序无跳级；token 注释自证对比度（`tokens.css:4`）且实算吻合：ink-500 #51607A on #FFF = 6.36 / on canvas = 5.93、白字 on #1A56DB = 6.18 ✓。
- **反模板化 4**：零 slop；WALSmith + WAL 帧叙事强绑定。
- **状态完整性 2**：静态页中性。
- **文案具体性 4**：基准条形带实验条件（"同一张 12 万行的 orders 表修改 300 行后同步一次"，`index.html:136`）——四份 S3 中唯一给数字配方法论的。

S3 拒绝正例（四份均未命中）：hype 词=否（grep 零命中）；pill 徽章+blob=否（零命中）；全部居中堆叠=否（四份 hero 均为非对称双栏 grid，出处见上）。

---

## 横向观察（供仲裁参考）

1. **S5 组内分歧风险点**：p12 的"双色相重映射"是否触发"顺手重设计"拒绝正例——我判近命中（C=3/V=3）而非判死；若 grader-1 判死或判无碍，将出现 ≥2 分歧。
2. **S1 组内**：p04 全维度满分（四态+skip-link+E0W0 是硬证据）；p11 与 p03/p07 的差距主要在可达（无 skip-link、弱焦点环）与模板质感，非 checklist 硬伤。
3. **S3 组内同分 22**：差异在风格取向（p02 编辑排版 / p08 工程纪律+触达 / p15 世界观签名 / p16 token 纪律+零警告），checklist 层面四份全过；p15 的缺 skip-link 与 CHK-09 已在可达维度扣分。
4. **checks 仪器局限**：无契约模式下 CHK-01 行级配对几乎全盲（仅 p11 preview 命中 1 处），CHK-09 只扫 .html 不扫 .jsx（p03/p07/p11 的 h1→h3 跳级均由人工读码发现）——S1 可达维度的人工证据权重应高于仪器计数。

grader-2 · 总置信度：S5/S7 高（diff 逐行 + 实算对比度）；S3 高；S1 中高（视觉层次未渲染验证）。
