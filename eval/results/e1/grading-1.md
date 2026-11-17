# E1 独立评审报告 · Grader #1（盲评）

- 评审人：grader #1（生成者 ≠ 评审者；仅基于产出文件 + 任务书 + rubric + grader-protocol 评分，未参考任何外部评价）
- 评审对象：`eval/results/e1/{S1-seedA,S1-seedB,S3-seedA,S3-seedB,S5-seedA,S5-seedB}/`
- 依据：`eval/rubric.md`（六维 0-4 锚点）、`eval/grader-protocol.md`、`eval/scenarios/{S1-saas-dashboard,S3-landing,S5-refine-existing}.md`
- S5 附加依据：`eval/fixtures/s5-defect-map.md`（缺陷命中核对，见 S5 两节）

**评分约定（透明化）**
1. 每分附证据（文件:行 或可复核观察）；确定性指标（checks 计数、偏离处数）单独记录。
2. 维度在场景中结构性不适用且产物无对应设计面时记中性 2 并注明"不适用"（S3 状态完整性、S5 的视觉层次/反模板化/状态完整性/文案具体性），两 seed 同口径，保证 arm 间可比。
3. 本评审执行的只读复核：`node vismith/scripts/checks.mjs <target> --contract <contract>` 全部六份（结果与各自 checks-after.json 一致）；`node vismith/scripts/contract.mjs validate` 全部六份（全部"contract 有效"）；`git diff --no-index` 对 S5 两份与 `eval/fixtures/s5-project/` 逐文件比对；全库 grep slop 词表与 hex/emoji 扫描；关键色对对比度用 WCAG 公式独立复算（结果与产出 decisions.log 自报值全部吻合）。

---

## 1. S1-seedA（任务书：S1-saas-dashboard）

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `.vismith/contract.json` 存在且 validate 通过（复核）；自跑 checks：error 0 / warning 0 / info 1，与 checks-after.json 一致；checks-before.json 记录 2 个 CHK-01 error（#E2E8F0/#F8FAFC 误作文本色 1.23/1.05:1）→ 修订闭环见 decisions.log:8-10。四条 invariants 全保持：INV-001 KPI 三要素+同高（App.jsx:36-43 grid + KpiCard.jsx:31 `h-full`）；INV-002 主图全宽（App.jsx:46-48 无分栏、TrendChart.jsx:64 `w-full`=100%≥2/3）+ 第二块为表格（UnassignedList.jsx:84-131）；INV-003 两类空态（UnassignedList.jsx:14-41）；INV-004 mock 量级 200-900 周末回落（mock.js:52-66）。约束"组件内不写裸色值"：src 全树 hex 扫描 = 0 处（仅 tailwind.config.js 语义 token）。观察项（不降档）：`py-2.5/gap-1.5/px-2.5`（6/10px，UnassignedList.jsx:88 等 19 处）为 Tailwind 默认刻度半步，不在 contract spacing.scale 数组内，但符合其约束原文"间距 4px 基线（Tailwind 默认刻度）"；checks 工具未覆盖类名间距。 |
| 视觉层次 | 4 | 代码推断（未渲染）：h1 `text-xl`（App.jsx:29）→ KPI 数字 `text-3xl tabular-nums`（KpiCard.jsx:34）→ 全宽双系列图（唯一实线 accent + 15% 面积，TrendChart.jsx:100-117）→ 列表 `text-sm`；深夜色侧栏（Sidebar.jsx:23 `bg-night`）作全页视觉锚；accent 仅用于主线/主按钮/当前导航项（contract 约束 pages.operations-overview 遵守，grep 全树 `bg-primary` 仅 Sidebar 激活项、btn-primary、图表主线）。 |
| 可访问性 | 4 | skip link（App.jsx:14-19）；统一 `focus-ring`（index.css:18-20，focus-visible:ring-2）；表 caption（UnassignedList.jsx:85）；操作 aria-label（:123）；结果 aria-live（:70-72）；图表 title/desc（TrendChart.jsx:66-67）+ 开放数据表（:144-185）；方向信息不单靠颜色（KpiCard.jsx:37-41 图标+符号+文本）；对比度：contract 5 组配对全过（自跑复核），decisions.log:8-10 逐对比对记录（自算复核 #B91C1B=6.47、#15803D=5.02、#64748B=4.76:1 与自报一致）。 |
| 反模板化 | 4 | 全库 grep：无渐变文字/glow/emoji 图标/问候标题/"Trusted by"（S1 目录 0 命中）；emoji 扫描 0 命中；统一手写线性图标集（icons.jsx:1 "不使用 emoji 作图标"，stroke=currentColor）；换名测试：文案全绑定工单域实体（"SLA 达标率""P1""坐席"），无营销 hero。 |
| 状态完整性 | 2 | 空态优秀且有两类出路：筛选无结果→"清除筛选"（UnassignedList.jsx:21-27）、真空→"刷新队列"（:34-39），且分配操作可真实触达空态（:47-57 移除行）；但全项目无载入态、无错误态（静态 mock 页未建模），按"有但不齐"记 2。 |
| 文案具体性 | 4 | 每个 KPI 变化带方向+绝对值+百分比+基准（KpiCard.jsx:11-22，"vs 昨日 452"）；工单主题为具体业务事件（mock.js:70-77 "API 密钥轮换后 Webhook 全部失效"）；图表一句话结论由原始数据计算而非拍脑袋（TrendChart.jsx:24-30）；页脚诚实标注演示口径（App.jsx:55-57）。 |

**小计 22/24 = 3.67**

### 拒绝正例核对（S1）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| 编造 "Trusted by 10,000+" 类无来源声明 | 否 | 全库 grep 无；且 App.jsx:55-57 主动声明"演示页面…不代表任何真实客户" |
| KPI 数字 99999/123456 假数据特征 | 否 | mock.js:12-47 数值为 26-486 / 38/45 坐席 / 92.4%；趋势序列 289-511（mock.js:51-66） |
| 未建立/未沿用 contract | 否 | `.vismith/contract.json` 齐备（4 条 invariants），validate 通过，decisions.log 14 行决策记录修订闭环 |

### 任务书 checklist 逐条
KPI 三要素同高 ✓（KpiCard.jsx:31-41）；主图≥2/3 宽+第二块为列表 ✓；CHK-01 对比度 ✓（0 error）；侧栏 256px+顶栏 64px+4px 基线 ✓（Sidebar.jsx:23 w-64、TopBar.jsx:6 h-16；半步类观察项见上）；空态有说明+入口 ✓；无 slop ✓。

---

## 2. S1-seedB（任务书：S1-saas-dashboard）

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 3 | contract 存在、validate 通过、自跑 checks 0/0/1 与 checks-after.json 一致；五条 invariants 全保持（INV-001 KPI 带基准与方向 KpiCard.jsx:10-16；INV-002 空态两类 UnassignedList.jsx:58-76；INV-003 主图全宽堆叠 App.jsx:53-55 + 决策记录"2fr+1fr 仅 66% 故整宽"decisions.log:9；INV-004 键盘取数+数据表 TrendChart.jsx:142-157/160-189；INV-005 演示数据明示 Topbar.jsx:31）。扣 1 分：3 处 off-token 色（checks 未捕获的人工发现）——`bg-emerald-600`（Sidebar.jsx:48，contract 已定义 success=#047857 应作语义 token，emerald-600=#059669 体系外）；`bg-red-50`/`bg-amber-50`（UnassignedList.jsx:2-3，contract 未定义软底档，直接引入 Tailwind 原生色类；对比 seedA 在 contract 中显式定义 badge_danger_bg/badge_warn_bg）。 |
| 视觉层次 | 4 | KPI `text-3xl`（KpiCard.jsx:7）→ 全宽交互主图（TrendChart.jsx:81-158，hover/键盘焦点线+读出行）→ 列表两级文本（UnassignedList.jsx:22-24）；主操作全页唯一"新建工单"（Topbar.jsx:58-63）；accent 收敛（grep `bg-primary` 仅主按钮/激活导航/主线）。 |
| 可访问性 | 4 | skip link（App.jsx:28-33）；全部交互 focus-visible outline（Topbar/按钮/链接/搜索逐一具备）；图表逐点键盘取数：每点 `tabIndex={0}`+`aria-label`+focus 高亮（TrendChart.jsx:142-157）+ aria-live 读出行（:74-78）+ details 数据表（:160-189）；载入 `role="status" aria-busy`（PageStates.jsx:3）、错误 `role="alert"`（:32）；对比度 decisions.log:12 称 12 组实测 ≥4.5（抽查复算 #047857=5.48、#B45309=5.02、#B91C1B=6.47:1 ✓）。 |
| 反模板化 | 4 | grep 无渐变/glow/emoji/问候/Trusted by（0 命中）；emoji 扫描 0（▲▼ 为几何字符且配文本与 aria-hidden，不作图标用）；换名测试：内容绑定工单域（SLA 剩余分钟、P1、分派规则）。 |
| 状态完整性 | 4 | 四态齐且全有出路：载入（骨架与最终布局同形，PageStates.jsx:1-28，240ms 真实延时 mock.js:179-191）；错误（人话说明+错误码+重试，PageStates.jsx:30-50，`?mock=error` 真实可触发 mock.js:174-181）；空态两类（筛选空→清除搜索、真空→查看分派规则，UnassignedList.jsx:58-76）；成功=正常内容渲染。README:14-18 明示三个状态的触发方式。 |
| 文案具体性 | 4 | delta 全部带符号+幅度+基准（mock.js:49 "+37（+8.2%）"+ "昨日同期 449 张"）；"今日为进行中数据（截至 14:30）"口径诚实（TrendChart.jsx:39、README:31）；页脚运营规则具体（UnassignedList.jsx:85-87 "P1 工单建议 15 分钟内完成首次响应"）；工单主题带客户与渠道（mock.js:87-168）。 |

**小计 23/24 = 3.83**

### 拒绝正例核对（S1）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| Trusted by 类无来源声明 | 否 | grep 0 命中；顶栏明示"演示数据"（Topbar.jsx:31） |
| 99999/123456 假数据 | 否 | mock.js:9-40 日量 242-861（周末回落），KPI 486/16.4/94.2%/37 |
| contract 缺失/未沿用 | 否 | contract.json（5 invariants）validate 通过；decisions.log 12 行 |

### 任务书 checklist 逐条
KPI 三要素同高 ✓；主图 ≥2/3 ✓（整宽，默认近 14 天可切 30，TrendChart.jsx:13,55-57）；第二块列表 ✓；对比度 ✓（0 error + 12 组实测记录）；侧栏+顶栏骨架 ✓（Sidebar.jsx:12、Topbar.jsx:5，4px 基线无半步类）；空态 ✓；无 slop ✓。

---

## 3. S3-seedA（任务书：S3-landing）

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | contract 存在、validate 通过、自跑 checks 0/0/1 与 checks-after.json 一致；checks-before.json 1 error（CHK-05 无 focus-visible）+3 warning（硬编码色/72px 间距/15px 字号）→ 全部真实修复（decisions.log:9"不记例外"）。INV-001 顶部导航任意视口保留（index.html:62 `flex-wrap` 不折叠不隐藏）；INV-002 唯一实心 accent 按钮（grep `btn-primary` 全页仅 hero 一处 index.html:42；定价卡全部描边按钮 :166-189）；INV-003 节奏 80/96/112px（main.css:72,142,243-248）。约束"组件层零硬编码色值"：index.html+main.css hex 扫描 0 处（色值仅在 vars.css token 文件）。 |
| 视觉层次 | 4 | 代码推断：h1 36→48→56px 阶梯（main.css:76,246,250）；kicker mono 编号 01/02/03（index.html:68,97,121）建立三论点次级节奏；非对称 hero（grid 1.1fr/0.9fr，main.css:73）+ 论点左右交替（feature-flip :148）；签名元素唯一（写/同步路径分离图 :78-88，decisions.log:6）。 |
| 可访问性 | 4 | skip link（index.html:12 + main.css:23-30）；全局 :focus-visible 含深底页脚变体（main.css:33-40）；ink 四档文本 ramp 全部 ≥4.5:1（vars.css:5-8 注释；自算 #667085=4.97:1 ✓）；图示带 aria-label/figcaption（index.html:78,107,130）；深底页脚文本用 on_dark 档（11.4:1，自算复核一致）。 |
| 反模板化 | 4 | grep：无 pill 徽章、无 blob/orb、无渐变、无 hype 词（0 命中）；布局非居中堆叠——hero 与三论点全部两栏非对称，移动端单栏仍左对齐（main.css:252-256 注释"不回到全居中堆叠"）；文档式证据排版（spec 清单、代码块、线格式摘录）。 |
| 状态完整性 | 2 | 不适用（静态营销页，无数据交互面；无空/载/错态需求，亦无相应缺陷证据），按约定记中性 2。 |
| 文案具体性 | 4 | hero 标题机制级具体："SQLite 的同步层：本地先写，按列合并"（index.html:39）——不含产品名且绑定列级合并机制，换名测试通过；规格清单每行可验证（:74 "列级 last-writer-wins"；:109-110 "epoch 42 · bytes 0–1367 · rows 3"）；定价带具体条款（:171-177 "$12/开发者/月""14 天试用，无需信用卡"）；信任区全部指向可验证 URL（:143-147）。 |

**小计 22/24 = 3.67**

### 拒绝正例核对（S3）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| 赋能/无缝/革命性 hype 词 | 否 | grep（含 seamless/revolutionary）0 命中 |
| hero 上方 pill 徽章 + 悬浮 blob 背景 | 否 | hero 区无徽章元素（index.html:36-46 直接 h1）；无 blob/glow（grep 0 命中） |
| 全部居中堆叠布局 | 否 | 两栏非对称 + 论点交替左右；单栏断点仍左对齐（main.css:252-256） |

### 任务书 checklist 逐条
hero 换名测试 ✓（机制级标题）；主 CTA 唯一+至多一个次级动作 ✓（index.html:42-43，全页唯一实心按钮）；定价首屏以下+对比度达标 ✓（位于三论点+信任区之后 :152-194，白底 ink 文本全 ≥4.5）；CHK-02 零偏离 ✓（0 warning，零 hex）；信任区仅可验证要素 ✓（仓库/License/版本/披露链接，无头像点阵/五星）；章节 80-128 节奏 ✓（80/96/112）。

---

## 4. S3-seedB（任务书：S3-landing）

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | contract 存在、validate 通过、自跑 checks 0/0/1 与 checks-after.json 一致（checks-before 亦 0/0/1——开工前即把门槛做在 contract 层，decisions.log:6-10）；INV-001 顶部导航保留且含主 CTA（index.html:16-35，nav 内重复主按钮为 contract 明示允许 contract.json:66）；INV-002 hero 主 CTA 唯一+唯一次级（index.html:45-46）；章节固定 96px（styles.css:205,218，移动端 80px :364）；tokens.css 与 contract tokens 一一镜像；约束"HTML/styles 零 hex"：扫描证实（色值仅 tokens.css）。 |
| 视觉层次 | 4 | 代码推断：深色终端面板为首屏焦点（styles.css:171-177 ink-900 底），h1 48→h2 32/24 阶梯（:141-146,208,220）；"weight does hierarchy, not 800/900"（:23）；定价推荐档用表面+边框权重而非色块（:306-310，contract pricing_card 规则遵守）。 |
| 可访问性 | 4 | skip link（styles.css:47-58）；focus-visible（:128-131）；三处图示均 `role="img"`+完整 aria-label 转述+figcaption（index.html:56,94-125,135-181——终端会话的 aria-label 完整转述内容，质量高）；`.vismith/tmp-contrast.mjs:14-37` 用 WCAG 公式实测 17 组候选色对（含 1 组预期失败对照 #5B6E84），自算复核其数值全部吻合（ink-500 on subtle=5.54:1 ✓）。 |
| 反模板化 | 4 | grep：无 pill/blob/渐变/hype（0 命中）；非对称双栏+交替（styles.css:135-140,219）；签名元素="可 SELECT 的同步队列"视觉+终端会话（decisions.log:11）。 |
| 状态完整性 | 2 | 不适用（同 S3-seedA 口径，静态营销页）。 |
| 文案具体性 | 3 | 正文与终端证据高度具体（index.html:69-71 "42 changes…3 overlapping rows resolved by logical clock"；:209 "$12 per developer/month"；:275 "Works with SQLite 3.35 and later"），但 hero H1 为"LiteSync keeps your app's SQLite file in sync on every device — offline writes included"（index.html:42）：**换掉产品名后句子仍成立**（任意 SQLite 同步引擎均可代入），任务书 checklist"hero 标题换掉产品名后不成立"未严格通过——H1 本身仍是"产品名+通用同步声明"结构，扣 1。 |

**小计 21/24 = 3.50**

### 拒绝正例核对（S3）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| hype 词 | 否 | 英文文案 grep（seamless/revolutionary/empower 等）0 命中 |
| pill 徽章 + 悬浮 blob | 否 | hero 直接 h1（index.html:41-43），无徽章无装饰背景 |
| 全部居中堆叠 | 否 | hero 非对称双栏（styles.css:135-140），三论点交替，移动端单栏左对齐 |

### 任务书 checklist 逐条
hero 换名测试 **✗（部分）**（如上）；主 CTA 唯一+至多一个次级 ✓（nav 内重复为 contract 明示允许）；定价首屏以下+对比度 ✓（hero+三论点之后 index.html:188-230；ink-700 on subtle 自算 ~8.9:1）；CHK-02 零偏离 ✓（0 warning、零 hex）；信任区仅可验证要素 ✓（MIT/仓库/无需云账号声明 :48-54，无头像/五星）；章节 96px ✓。

---

## 5. S5-seedA（任务书：S5-refine-existing）

### 缺陷地图命中核对（对照 eval/fixtures/s5-defect-map.md；已用 `git diff --no-index` 对 `eval/fixtures/s5-project/` 独立复核，非仅信 diff-summary.md）

| # | 注入缺陷 | 命中? | 修复证据 |
|---|---|---|---|
| 1 | Dashboard KPI 卡 1 #94A3B8 on #FFF（实测 2.56:1 ✓） | ✓ | Dashboard.jsx:15 → `text-ink-600`（自算 7.58:1） |
| 2 | Settings 签名 label #94A3B8 on #F8FAFC（实测 2.45:1 ✓） | ✓ | Settings.jsx:14 → `text-ink-600`（自算 7.24:1 量级） |
| 3 | SLA 数字 #FF6B35（实测 2.84:1 ✓，大字号阈值 3.0 亦不达） | ✓ | Dashboard.jsx:24 → `text-accent-600`（自算 6.70:1） |
| 4 | 硬编码 #FF6B35 | ✓ | 同上，hex 扫描 final 树 0 处 |
| 5 | 硬编码 #7C3AED（处理链接） | ✓ | Dashboard.jsx:38 → `text-accent-500`（自算 5.17:1 达标） |
| 6 | banner-q3.png 缺 alt | ✓ | Dashboard.jsx:44 补 `alt="第三季度运营横幅"` |
| 7 | 13px/17px 魔法间距 | ✓ | Dashboard.jsx:8 `mb-16`、:13 `mt-12`（git diff 证实原为 style 17px/13px） |
| 8 | tailwind.config spacing 表与默认刻度重复（extract 应清洗） | **✗** | tailwind.config.js:9 原样保留；contract.draft.json:29-38 与 contract.json 均按原样收录 [4,8,12,16,24,32]，decisions.log 未提及冗余清洗 |

**缺陷命中率 7/8。** 附加发现：把内联 boxShadow rgba 晋升为 `boxShadow.card` token（tailwind.config.js:11 新增 1 行，值不变）——超出缺陷地图但属 CHK-02 硬编码消除的合理范围，decisions.log:9 有记录。

### diff 最小性（git diff 独立复核）
Dashboard.jsx 改 6 行、Settings.jsx 改 2 行、tailwind.config.js +1 行、package.json 零改动；未重构、未换库、未改布局结构（4 列卡网格/列表/banner/表单字段与顺序原样）；仅额外加了链接 `rounded-sm`（为焦点环圆角，视觉增量极小）。diff-summary.md 自述"+11/−9 行"与实测一致。

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 正确路径完整执行：contract.draft.json（extract 草稿，含启发式缺陷：颜色键 "600" 语义冲突）→ contract.json（转正，以 tailwind.config 为真值源修正，validate 通过自跑复核）→ decisions.log 7 条决策（含判档 heavy 与分层修复依据）。invariants INV-001..003 与 diff 证据一致（未动结构/逻辑/技术栈）。自跑 checks（--contract 指定）：error 0 / warning 0，与 checks-after.json 一致；before 2 error（CHK-05/06）+4 warning 与缺陷地图位置吻合。 |
| 视觉层次 | 2 | 不适用（refine 任务不含层次目标；判档明确层 3"层次"不动，decisions.log:6；无层次回归证据）。 |
| 可访问性 | 4 | 3 处对比度全修且数值经本评审独立复算吻合（7.58/7.24/6.70:1）；CHK-05 焦点补齐 2 处（Dashboard.jsx:38、Settings.jsx:17，ring-accent 系列）；CHK-06 alt 补齐；修复后 0 error 0 warning（自跑复核）。decisions.log:7-8 记录修复值与替代方案对比（拒绝新增橙/紫深档=顺手重设计）。 |
| 反模板化 | 2 | 不适用（refine 不得引入新风格；grep 无新增 slop，hex/emoji 扫描 0）。 |
| 状态完整性 | 2 | 不适用（原页无状态设计，最小 diff 约束下不添加是正确行为；未添加亦未破坏）。 |
| 文案具体性 | 2 | 不适用（文案未改动，符合"不改变产品特征"）。 |

**小计 16/24 = 2.67**（低分主因四个维度场景不适用按中性 2 记；该场景实际权重在契约一致性与可访问性，均为 4，缺陷命中 7/8、diff 最小性验证通过）

### 拒绝正例核对（S5）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| 顺手重设计（改配色/换组件库） | 否 | git diff 证实仅用法级修复；配色体系原值未动（decisions.log:8 明确拒绝"新增橙紫 token"） |
| 未提取契约直接改样式 | 否 | contract.draft.json + contract.json + 7 条 decisions 齐备，时序合理（draft 留档） |
| 修复引入新 CHK 发现 | 否 | 自跑 checks-after：0 error / 0 warning |

### 任务书 checklist 逐条
contract.json 且 validate 通过 ✓；checks error 清零（CHK-01/02/06，另 CHK-05 亦清零）✓；diff 最小/invariants 保持 ✓（git diff 复核）；decisions ≥2 条 ✓（7 条）；13/17px 归位 4px 基线 ✓。

---

## 6. S5-seedB（任务书：S5-refine-existing）

### 缺陷地图命中核对（同上方法独立复核）

| # | 注入缺陷 | 命中? | 修复证据 |
|---|---|---|---|
| 1 | Dashboard KPI 卡 1 #94A3B8 | ✓ | Dashboard.jsx:15 → `text-ink-600` |
| 2 | Settings label #94A3B8 | ✓ | Settings.jsx:14 → `text-ink-600` |
| 3 | SLA #FF6B35 | ✓ | Dashboard.jsx:24 → `text-accent-600`（6.70:1；decisions.log:7 记录大字号阈值 3.0 亦不达的判定过程） |
| 4 | 硬编码 #FF6B35 | ✓ | hex 扫描 0 处 |
| 5 | 硬编码 #7C3AED | ✓ | Dashboard.jsx:38 → `text-accent-600`（6.70:1，与 SLA 同档品牌链接色；decisions.log:8） |
| 6 | img 缺 alt | ✓ | Dashboard.jsx:44 `alt="第三季度运营横幅"`（decisions.log:9 记录拒绝 alt="" 的理由） |
| 7 | 13px/17px | ✓ | Dashboard.jsx:8 `mb-16`、:13 `mt-12` |
| 8 | spacing 冗余 token 清洗 | **✗** | tailwind.config.js:9 原样保留，contract/draft 均未标注冗余 |

**缺陷命中率 7/8。** 附加发现同 seedA（boxShadow 晋升 token，tailwind.config.js:11）。

### diff 最小性（git diff 独立复核）
Dashboard.jsx 改 6 行、Settings.jsx 改 2 行、tailwind.config.js +1 行、package.json 零改动；无重构/换库/布局变化；且链接修复未附带 `rounded-sm`（比 seedA 更克制一处）。diff-summary.md 自述"2 个 JSX 共 8 行修改"与实测一致。

### 六维分表

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | extract 草稿留档 → 转正契约（neutrals 只收文本色、浅灰归 bg，contract.json:23；note 记录"spacing 补齐 32、radius 补齐 lg 与 config 实际一致"）；validate 通过（自跑复核）；4 条 invariants（技术栈/表单行为/布局结构/数据逻辑）与 diff 一致；自跑 checks 0/0/1 与 checks-after.json 一致；rules.json 存档、exceptions.md 明确"无豁免"。decisions 9 条（含层 3/4 明确不动，log:13）。 |
| 视觉层次 | 2 | 不适用（同 seedA 口径）。 |
| 可访问性 | 4 | 同 seedA 的三项对比度修复（独立复算吻合）；CHK-05 两处焦点补齐（Dashboard.jsx:38、Settings.jsx:17，统一 ring-accent-600）；alt 补齐；0 error/0 warning（自跑复核）。 |
| 反模板化 | 2 | 不适用（同 seedA 口径；无新增 slop）。 |
| 状态完整性 | 2 | 不适用（同 seedA 口径）。 |
| 文案具体性 | 2 | 不适用（文案未动）。 |

**小计 16/24 = 2.67**

### 拒绝正例核对（S5）
| 正例 | 命中? | 位置/证据 |
|---|---|---|
| 顺手重设计 | 否 | git diff 证实最小；do_not"新增调色板档位"写入 contract（contract.json:14）并遵守 |
| 未提取契约直接改样式 | 否 | draft+final+decisions（9 条）齐备 |
| 修复引入新 CHK 发现 | 否 | 自跑 checks-after 0/0；diff-summary.md:24 称 --strict 退出码 0 |

### 任务书 checklist 逐条
contract + validate ✓；error 清零 ✓；diff 最小/invariants ✓（git diff 复核）；decisions ≥2 条 ✓（9 条）；13/17px 归位 ✓。

---

## 总结

### 均分与排序（六维均值，满分 4）

| 产出 | 契约 | 视觉 | a11y | 反模板 | 状态 | 文案 | 均分 |
|---|---|---|---|---|---|---|---|
| S1-seedB | 3 | 4 | 4 | 4 | 4 | 4 | **3.83** |
| S1-seedA | 4 | 4 | 4 | 4 | 2 | 4 | **3.67** |
| S3-seedA | 4 | 4 | 4 | 4 | 2 | 4 | **3.67** |
| S3-seedB | 4 | 4 | 4 | 4 | 2 | 3 | **3.50** |
| S5-seedA | 4 | 2 | 4 | 2 | 2 | 2 | **2.67**（注：四维不适用按中性 2） |
| S5-seedB | 4 | 2 | 4 | 2 | 2 | 2 | **2.67**（同上） |

注：S5 两份的绝对分受"不适用维度记中性 2"约定拉低，不代表质量低于 S1/S3；其场景实际考核面（契约路径、a11y 修复、缺陷命中 7/8、diff 最小性）均满分或接近满分。

### 确定性指标（自跑复核）

| 产出 | checks-before | checks-after | 自跑复核 after | contract validate | 契约偏离处数（人工发现） |
|---|---|---|---|---|---|
| S1-seedA | 2E/0W（contract 阶段） | 0/0/1 | 0/0/1 ✓ | 通过 | 0（半步间距属默认刻度，记观察） |
| S1-seedB | 0/0/1（contract 阶段） | 0/0/1 | 0/0/1 ✓ | 通过 | 3（emerald-600、red-50、amber-50 off-token） |
| S3-seedA | 1E/3W（初稿） | 0/0/1 | 0/0/1 ✓ | 通过 | 0 |
| S3-seedB | 0/0/1 | 0/0/1 | 0/0/1 ✓ | 通过 | 0 |
| S5-seedA | 2E/4W | 0/0/1 | 0/0/1 ✓ | 通过 | 0（缺陷 #8 未命中不计偏离，见下） |
| S5-seedB | 2E/4W | 0/0/1 | 0/0/1 ✓ | 通过 | 0 |

### 最低维度
**状态完整性**（6 份中 5 份 ≤2）：其中 S1-seedA 的 2 分是**真实缺口**（空态优秀但无载入/错误态）；S3 两份与 S5 两份为场景不适用（S5 情形下"不加状态"恰是最小 diff 的正确行为）。
**S5 共性漏项**：缺陷地图 #8（tailwind.config spacing 表与默认刻度重复，extract 应清洗）两 seed 均未命中——二者均把冗余 spacing 原样收录进契约，无冗余标注/清洗动作。
**S1-seedB 唯一扣分点**：3 处 Tailwind 原生色类绕过自家语义 token（Sidebar.jsx:48、UnassignedList.jsx:2-3），属 checks 盲区的轻度 token 漂移。
**S3-seedB 唯一扣分点**：hero H1 含产品名且换名后仍成立，checklist"换名测试"未严格通过（正文与终端证据的具体性很高，故仅扣 1）。

### 未验证项声明
1. **未做浏览器渲染/截图/眯眼测试**：视觉层次维度全部按代码结构（字号阶梯、布局声明、accent 使用范围）推断评分；两份 S3 产出的 decisions.log 亦自述未做浏览器验证（S3-seedB decisions.log:12）。
2. **未实际运行 dev server 走查交互**：空态触发、键盘路径、`?mock=error`、图表键盘取数均按代码逻辑推断（代码路径完整可循）。
3. S5 的"before"状态已用 `git diff --no-index` 对照 `eval/fixtures/s5-project/` 独立复核（注入缺陷 17px/13px/#94A3B8/#FF6B35/#7C3AED/无 alt 在 fixture 中逐一确认存在），非仅采信 diff-summary；但 fixture 与生成时基线是否完全一致无法二次考证。
4. 对比度数值：16 个关键色对已用 WCAG 公式独立复算（与产出自报值全部吻合），未覆盖的次要色对（如 S1-seedA warn #92400E）采信其 decisions.log 自报。
5. 生成 token/耗时：产出目录未包含该数据，无法记录（rubric 附录的确定性指标在此缺席）。

### 总置信度
**中-高**。契约一致性/可访问性/反模板化/文案具体性/S5 命中率与最小 diff 均有可复核的静态证据（自跑 checks + validate + git diff + grep + 对比度复算），置信高；视觉层次与交互行为未渲染验证，按代码推断，该两维置信中。六维无任何一分依赖不可追溯的主观印象；若仲裁需要，全部证据可按文件:行复现。
