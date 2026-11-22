# E2 独立评审报告 · Grader #2（盲评）

- 评审人：grader #2（与生成者隔离；未读 grading-1.md 与 eval/results/e1/）
- 评审对象：`eval/results/e2/{S2-seedA, S2-seedB, S4-seedA, S4-seedB, S7-seedA, S7-seedB}/`
- 依据：`eval/rubric.md`（六维 0-4 锚点）、`eval/grader-protocol.md`、`eval/scenarios/{S2,S4,S7}.md`；S7 另对照 `eval/fixtures/s7-defect-map.md` 与 `eval/fixtures/s7-project/`
- 方法：全量静态代码审读（6 份产出的 src、.vismith、README、checks JSON）；只读复跑 `node vismith/scripts/checks.mjs <target> --contract <contract>`（S7 另跑 `--strict`）；用 node 实际导入 mock/columns 数据校验真实性与数量；用 `git diff --no-index` 核对 S7 diff；对比度用 WCAG 公式实算。**未做浏览器渲染 / 键盘走查 / 读屏验证**（环境无浏览器），所有交互与视觉判断均为代码级推演。

---

## 1. S2-seedA（新员工入职向导）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 契约完整（5 条 invariant 对齐任务书，`.vismith/contract.json:112-137`）；复跑 checks：error 0 / warning 0 / info 1，与 `checks-after.json` 一致；未发现代码与契约偏离（token 仅在 `tailwind.config.js:7-52` 定义，业务代码全用语义类名）。`decisions.log.md` 11 条，含 neutrals 收敛与 IME 处理记录 |
| 视觉层次 | **4** | 单列 896px 卡片（`AppShell.jsx:112` max-w-4xl）；主按钮每屏唯一（`OnboardingWizard.jsx:345-358`）；当前步 primary-600 圆点 + 已完成 success 对勾（`WizardSteps.jsx:19-28`）；文本三级 ink-900/700/500（`tailwind.config.js:19-26`）。静态推演层级清晰（未做视觉走查） |
| 可访问性 | **3** | 键盘路径完整：skip-link（`AppShell.jsx:20-25`）、aria-current=step（`WizardSteps.jsx:61`）、错误摘要 role=alert 可聚焦 + 逐条锚点（`ErrorSummary.jsx:9-13`）、步骤切换聚焦标题（`OnboardingWizard.jsx:110-121`）、IME 组词 Enter 拦截（`OnboardingWizard.jsx:211-213`）、aria-invalid/describedby 联动（`Field.jsx:58-59`）。**扣分**：ink-500(#64748B) 落在非白底——副标题（`OnboardingWizard.jsx:50`）、视角提示（:57，primary-50 底）、页脚（:369，canvas 底），实算 4.2–4.34:1 < 4.5，与其自设规则「ink-500 仅白底」（`tailwind.config.js:4` 注释）矛盾；属 error 清零但 heuristic 未处理完 |
| 反模板化 | **4** | 无渐变/玻璃/glow/全大写标签；侧栏非当前项为非交互 span 并注明「未接线」（`AppShell.jsx:62`）；签名元素=流程时间线（`FlowResult.jsx:13-56`）与步骤条同构；换名测试通过（信息密度与流程文案均为入职域专属） |
| 状态完整性 | **4** | 四态齐且全可触达（`README.md:23-30` ?mock=slow/error/empty/submit-fail；`OnboardingWizard.jsx:241-269` 分支）：骨架同形（`StatePanels.jsx:5-31`）、错误态人话+内线电话+重试（:34-53）、真空空态+出口（:56-71）、提交失败驻留面板非 toast 且明示数据保留（`FlowResult.jsx:156-175`）；submitting 禁用防重复（`OnboardingWizard.jsx:346`） |
| 文案具体性 | **4** | 全具体带数字基准：「全流程平均 3 个工作日」（`OnboardingWizard.jsx:51`）、「1 个工作日内」（`FlowResult.jsx:92`）、「内线 8012」（`StatePanels.jsx:45`）、月薪区间 3,000–300,000（`validation.js:100`）、试用期 80%（`StepPosition.jsx:99`）；中文人名陈慧/张明远（`permissions.js:8,17`） |

**均分：3.83**

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 位置/证据 |
|---|---|---|
| 一步长表单塞全部字段，未真正分步 | **否** | `permissions.js:28-55` 四步定义 + `visibleSteps()` 过滤；`OnboardingWizard.jsx:302-334` 每步独立组件挂载 |
| 「下一步」不做校验，或错误只弹 toast/alert | **否** | `handleNext` 整步校验（`OnboardingWizard.jsx:188-208`）；错误在字段旁（`Field.jsx:29-34` 消息槽）+ 顶部摘要（`ErrorSummary.jsx`），全库无 toast 组件 |
| 权限差异仅 CSS 隐藏（DOM 仍可见财务数据） | **否** | 渲染层过滤：审批步 `roles:['admin']`（`permissions.js:46`）；财务字段组条件渲染（`StepPosition.jsx:80-124`），HR 视角组件不挂载，DOM 无 salaryGrade/monthlySalary/budgetCenterId |

---

## 2. S2-seedB（新员工入职向导）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 契约 5 invariant（`contract.json:94-119`）；复跑 checks：error 0 / warning 0 / info 1，与 README:63 声明一致；代码零偏离（颜色全语义 token，`tailwind.config.js` 唯一定义点）。**注**：交付物无 checks-before/after.json 快照（README 声明结果已由我复跑证实，但过程不可复核）；README 声明的 vite build(45 模块)/SSR 冒烟 12 断言无产物可查 |
| 视觉层次 | **4** | 单列 720px（`App.jsx:30`）；当前步 brand 高亮块 + 已完成对勾（`Stepper.jsx:37-51`）；主按钮唯一（`App.jsx:99-112`）；复核步分组 dl 只读 + 编辑回跳（`StepReview.jsx:67-146`）。静态推演清晰（未做视觉走查） |
| 可访问性 | **2** | 语义/键盘面优秀：全局 :focus-visible 兜底（`index.css:15-18`）、aria-live 播报向导状态（`App.jsx:118-120` + `useOnboardingWizard.js:43`）、错误汇总 role=alert 聚焦+跨步跳转（`StepReview.jsx:40-64` + `useOnboardingWizard.js:137-154`）、无正 tabindex。**扣分（锚点档）**：text-ink-400(#94A3B8) 用于真实文本 ≥5 处，实算白底 2.56:1 / canvas 底 2.34:1（严重低于 4.5）——未开始步骤标题（`Stepper.jsx:55`）、页脚（`App.jsx:122`）、顶栏「入职流程」「用于验证权限差异」（`AppShell.jsx:26,96`）、复核 muted 值（`StepReview.jsx:12`）；契约 neutrals 只收深色文本档（`contract.json:29`）致 CHK-01 不覆盖，典型「error 清零但 heuristic 未处理」，且与 S7 注入的同类缺陷（#94A3B8 2.45:1）性质相同 |
| 反模板化 | **4** | 无 slop 症状；侧栏假链接以 span+title 明示「演示页未实现」（`AppShell.jsx:42`）；签名=步骤条与成功态时间线同构（`SubmitOutcome.jsx:2,60-87`）；页脚诚实声明 mock 演示环境（`App.jsx:122-126`） |
| 状态完整性 | **4** | 提交链路四态齐：idle/submitting（禁用+aria-busy，`App.jsx:100-107`）/success（时间线+复制编号+再录入出口，`SubmitOutcome.jsx:23-98`）/error（MOCK-503 错误码+重试+返回出口+已填 N 项保留提示，:101-124）；失败不清空任何 state（`useOnboardingWizard.js:217-222`）。字典为同步 mock、无载入态——属合理简化且明示（README:39） |
| 文案具体性 | **4** | 数字带基准：月薪区间 3000–200000（`validate.js:119-121`）、试用期「最长不超过 6 个月」（`StepPosition.jsx:67`）、主审批人≠直属上级校验文案（`validate.js:135`）、mock 延迟 0.6s 明示（`App.jsx:123`）；字典实名实岗（dict.js：陈景明·技术部负责人等，12 部门/6 成本中心） |

**均分：3.67**

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 位置/证据 |
|---|---|---|
| 一步长表单塞全部字段，未真正分步 | **否** | `validate.js:26-31` STEP_DEFS 按 roles 过滤（`stepsForRole`）；`App.jsx:75-88` 每步独立组件 |
| 「下一步」不做校验，或错误只弹 toast/alert | **否** | `goNext` 整步校验+首错聚焦（`useOnboardingWizard.js:102-117`）；错误固定渲染字段正下方（`fields.jsx:35-41` FieldError）；全库无 alert/toast 错误通道 |
| 权限差异仅 CSS 隐藏（DOM 仍可见财务数据） | **否** | 条件渲染（`StepPosition.jsx:75-118` role==='admin' 分支）+ steps/fields 登记表 roles 过滤（`validate.js:49-51`）；README:30 声称 SSR 断言「HR DOM 无 salaryProbation/主审批人」（该断言本身无产物可复核，但代码路径明确不渲染） |

---

## 3. S4-seedA（主机清单）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 契约 invariants 覆盖虚拟化/冻结/批量确认/密度/截断展开（`contract.json:78-80+`）；**真实前后基线**：checks-before 1 error（CHK-05，`checks-before.json:17-29`）→ after 0/0/1，我复跑与 after 一致；代码零偏离。小瑕疵：README:28 称「60 列」而 columns.js 实为 61 列（node 导入实测；超额满足「50+」，仅文档数字不符） |
| 视觉层次 | **4** | 顶栏→工具栏→（选中态批量条）→表格→页脚状态条的分区清晰（`App.jsx:187-374`）；单一 primary 只用于操作/当前态；状态点+文本双通道（`VirtualTable.jsx:191-201`）；批量条仅选中时出现不常驻（`App.jsx:303`）。静态推演清晰（未做视觉走查） |
| 可访问性 | **4** | role=grid/row/gridcell + aria-rowcount/aria-rowindex（`VirtualTable.jsx:111-113,159`）；alertdialog 焦点圈定（Tab 循环 `ConfirmDialog.jsx:41-53`）+ Esc（:36-39）+ 焦点归还（:24-33）；行选择原生 checkbox + aria-label 逐行（`VirtualTable.jsx:170-176`）；toast aria-live polite（`App.jsx:446`）；ink-400 仅用于 aria-hidden 装饰分隔符（`App.jsx:199`，grep 全库仅此一处）；colgroup 列宽与 th title。焦点环经 before/after 修复闭环 |
| 反模板化 | **4** | 无斑马纹/hairline 分行（`index.css:82-84`）；页脚实时统计「共 N 台·筛选后 M 台·已选 K 台·显示 x/61 列」（`App.jsx:365-374`）具信息签名；空态分真空/筛选两种且出口不同（`StateViews.jsx:53-88`）；无 slop |
| 状态完整性 | **4** | 骨架（同形 `StateViews.jsx:3-27`）/错误（错误码 HOSTS_SVC_503+重试+值班指引 :29-51）/真空空态（接入云账号/导入模板出口 :72-80）/筛选空态（清除筛选 :82-85）/成功+busy+完成播报（`App.jsx:143-172`）；`?mock=error|empty`、搜索无匹配、刷新均真实可触达（README:15-22） |
| 文案具体性 | **4** | 「重启期间服务将中断约 1–2 分钟；生产环境建议避开业务高峰」（`App.jsx:402-404`）、「预计 1–2 分钟内恢复」（:152）、「已为 N 台添加标签（同名片标签已跳过）」（:168）；月费实测 ¥246–¥32,850 数量级真实（node 实测 monthly_cost min/max；README:50 写 ¥267–¥30,417 与实测轻微不符）；hostname 规范、内网 IP 0 违例、主机名 0 重复（node 实测） |

**均分：4.00**

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 位置/证据 |
|---|---|---|
| 一次性渲染全部 1 万行 DOM，无虚拟化 | **否** | 固定行高+绝对定位窗口渲染：`VirtualTable.jsx:94-99`（start/end 切片）+ overscan 6 + rAF 节流（:66-73）；实测 mock 生成 10,000 行 |
| 用 overflow:hidden 藏溢出，或关键列被截断且无展开途径 | **否** | 溢出收敛在表格容器 `overflow-auto`（`index.css:68-70` .dt-scroll），页面壳 min-w-0（`App.jsx:188`）；截断单元格带 title 完整值（`VirtualTable.jsx:189`），冻结主机名/内网 IP 不截断（contract table rules）；无 overflow:hidden 滥用 |
| 批量操作无确认直接执行，或选中行不可键盘触达 | **否** | 重启/打标签必经 ConfirmDialog（`App.jsx:377-443` dialog 渲染 + :312-325 按钮均 openDialog）；行选择为原生 input checkbox（键盘 Tab/Space 可达，`VirtualTable.jsx:170-176`） |

---

## 4. S4-seedB（主机清单）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 契约 6 invariant（`contract.json:90-120`）；59 列与代码实测一致（node 导入 COLUMNS.length=59）；复跑 checks：error 0 / warning 0 / info 1，与 README:69 一致；零偏离（组件代码零硬编码色，`ui.jsx` 全语义常量）。**注**：无 checks-before/after.json 快照（仅 README 记录最终值，已由我复跑证实）；字体约束「不引入新字体文件」与 fontFamily 首位 'Inter'（`tailwind.config.js:20`）存在轻微张力（未引入文件、仅依赖本机回退，判非偏离） |
| 视觉层次 | **4** | 统计头（总数/运行中/告警/月费用合计 ¥1,874.5 万，`App.jsx:245-250`，node 实测 sum=1874.5 万与 decisions.log:13 标定 1875 一致）→工具栏→批量条→表格→窗口信息条（`HostTable.jsx:254-262` 实时渲染行数）五级清晰；单一靛蓝 accent。静态推演清晰（未做视觉走查） |
| 可访问性 | **3** | 优点：skip-link（`App.jsx:232-237`）、table caption+th scope+aria-rowcount/rowindex（`HostTable.jsx:154-216`）、全局 focus-visible 兜底（`index.css:21-23`）、Esc+焦点归还（ConfirmDialog/DetailDrawer/ColumnSettingsPanel 三处均有）、live region toast 可手动关闭（`Toast.jsx:7`）、状态点+文本双通道（`ui.jsx:45-52`）、对比全过（ink-500 on canvas 实算 4.55、ink-600 7.24）。**扣分**：三个 `role="dialog" aria-modal="true"` 弹层（ConfirmDialog.jsx:41-44、DetailDrawer.jsx:28-31）与列设置面板均**无 Tab 焦点圈定**——键盘 Tab 会从弹层逃逸到底层页面（各组件只处理 Esc：ConfirmDialog.jsx:26-29、DetailDrawer.jsx:15-18、ColumnSettingsPanel.jsx:13-15），与 aria-modal 语义不符，属「heuristic 未处理」 |
| 反模板化 | **4** | 无斑马纹（contract do_not + hairline 实装）；虚拟窗口信息条「第 X–Y 行·渲染 N/10,000 行」为诚实签名（`HostTable.jsx:256-257`）；hostname 点击开全字段抽屉（`HostTable.jsx:34-46`）非装饰链接；partial-failure toast 点名失败主机与原因（`App.jsx:193-203`） |
| 状态完整性 | **4** | 四态+页面内「演示状态」下拉直接切换（`App.jsx:251-267`，比 URL 开关更可达）：骨架（行高同刻度防跳动 `PageStates.jsx:4-28`）/错误（OPS-504+重试+「不影响已保存列设置」）/真空/筛选空态（含清除出口）；busy 内联进度+双按钮禁用（`ConfirmDialog.jsx:48-65`）；toast 成功/失败计数。月费标定（2C4G≈¥120–200 至裸金属 ¥22k+）经实测 min 119/max 147,824 吻合（README:60） |
| 文案具体性 | **4** | 「失败：xxx（SSH 连接超时，已跳过）。可在工单中心对该主机单独重试」（`App.jsx:201`）、「重启会中断业务进程；生产环境请确认已进入变更窗口」（:349）、标签 key=value 格式提示（:388-389）；hostname 全规范 `{dc}-{env}-{app}-{role}-{seq}.ops.example.cn`、内网 IP 全部 10.1–10.4 合法段（实测 0 违例、0 重复） |

**均分：3.83**

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 位置/证据 |
|---|---|---|
| 一次性渲染全部 1 万行 DOM，无虚拟化 | **否** | 窗口 ±8 行 + 上下 spacer 占位（`HostTable.jsx:116-118,205-209,245-249`）；rAF 节流（:100-106）；实测 fetchHosts('ok') 返回 10,000 行 |
| 用 overflow:hidden 藏溢出，或关键列被截断且无展开途径 | **否** | 横滚收敛在表格容器（`HostTable.jsx:149` overflow-auto），页面 min-h-screen 无页面级横滚容器；单元格 ellipsis+title（TD_BASE + title={text}）+ 主机名点击全字段抽屉（`DetailDrawer.jsx`，59 列全展开）；grep 无 overflow-hidden 藏溢出用法 |
| 批量操作无确认直接执行，或选中行不可键盘触达 | **否** | 重启/打标签均先弹确认（`App.jsx:304-305` setDialog → ConfirmDialog :340-391）；行选择原生 checkbox + 逐行 aria-label（`HostTable.jsx:224-230`），表头全选含 indeterminate（:175-177） |

---

## 5. S7-seedA（可访问性精修）

### 六维评分（refine 任务；视觉层次/反模板化/状态完整性/文案具体性按 E1-S5 口径记中性 2 并注明不适用）

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 真实基线：checks-before 3 error/1 warning/2 info（`checks-before.json`，CHK-06×2+CHK-05）→ after 0/0/1，我复跑（含 --strict）一致；契约 extract 转正且 neutrals 只收文本色避免伪 error（`contract.json:20,83`）；INV-003「不改视觉方向」保持（见 diff 核对）；Tailwind 数字间距键漂移按最小 diff 保留并记录（`contract.json:68` + decisions.log:8） |
| 视觉层次 | **2（不适用）** | refine 任务不改视觉方向：布局/间距/字号类名与 fixture 完全一致（diff 核对），无新增视觉层级诉求 |
| 可访问性 | **4** | 缺陷地图 8/8 全命中（见下表）；键盘全流程：Tab 序=视觉序（无 order/正 tabindex）、弹层打开即聚焦 ×（`TicketFilter.jsx:20`）、Tab 圈定循环（:23-33）、Esc（:22）、关闭归还触发器（:13-16）；outline-none 全部配 ring 替代（grep :46,47,66,67,72 五处均成对）；额外补 aria-live 播报计数（:50）、form/ul aria-label（:44,52）。小瑕疵：输入框焦点环无 ring-offset 而按钮有（:46 vs :47），「全站一致」打极小折扣 |
| 反模板化 | **2（不适用）** | 未引入任何新模板化视觉元素；修复清单与决策记录具体无套话 |
| 状态完整性 | **2（不适用）** | fixture 页无数据载入/空/错态，diff 最小性红线禁止新增（decisions.log 亦未越界） |
| 文案具体性 | **2（不适用）** | 文案按 INV-002「行为与文案不变」保持 fixture 原文（导出确认文案逐字保留，diff 核对） |

**全六维均分：2.67｜仅适用维度（契约一致性+可访问性）均分：4.00**

### 缺陷地图命中核对（8/8）

| # | 注入缺陷 | 命中? | 修复位置 |
|---|---|---|---|
| 1 | 清空 div onclick | **是** | `TicketFilter.jsx:47` → `<button type="button">`，同时消除 #8 的 `<i>` |
| 2 | 导出结果… div onclick | **是** | :72 → button + ref 供焦点归还 |
| 3 | 模态关闭 × span onclick | **是** | :66 → `<button aria-label="关闭弹层">`（静态检查盲区，修复清单:12 自认人工发现） |
| 4 | h1→h4 跳级 | **是** | :42 h4→h2（CHK-09 只扫 html，人工复核发现，修复清单:14） |
| 5 | 计数 #94A3B8 对比 2.45:1 | **是** | :50 → text-ink-600（#475569，实算 7.24:1），同步消除 CHK-02 硬编码色 |
| 6 | 弹层无焦点管理 | **是** | :18-37 role=dialog+aria-modal+labelledby+聚焦+圈定+Esc+归还 |
| 7 | 全页无 :focus-visible | **是** | :46,47,66,67,72 五个可聚焦元素全部有环 |
| 8 | `<i>清空</i>` 斜体误用 | **是** | :47 纯 button 文本 |

预期修复面（CHK-01 建契约/CHK-02 硬编码色/CHK-05/CHK-06）全部覆盖。

### diff 最小性核对

- `git diff --no-index`：TicketFilter.jsx **+42/−12**；tailwind.config.js 与 package.json **零改动**（diff 为空）；仅新增 project/.vismith/{contract,contract.draft,decisions} 与目录级 修复清单.md/checks 快照
- 改动全部为语义控件替换、ARIA 属性、焦点样式、必要对比色替换（#94A3B8→ink-600 属 CHK-01 硬规则允许的必要视觉变化）；间距/布局类名（p-24/mt-16/px-16 等）与 fixture 完全一致
- decisions.log **11 条** ≥ 2 ✓，含「为何不做语义键重命名」的最小 diff 论证（decisions.log:8）

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 证据 |
|---|---|---|
| 用正数 tabindex 强改焦点序 | **否** | grep 全文件 tabindex 仅出现在焦点圈定选择器字符串内（:26 `[tabindex]:not([tabindex="-1"])`），无任何元素设正数 tabindex |
| outline:none 后无任何替代焦点样式 | **否** | 五处 outline-none 全部紧跟 focus-visible:ring-2 ring-accent-500（:46,47,66,67,72） |
| 只清静态检查项，键盘流程仍走不通（弹层无 Esc/焦点逃逸） | **否** | Esc（:22）、Tab 圈定不逃逸（:23-33）、关闭归还焦点（:13-16）、打开即入圈（:20）——静态推演全流程可走通 |

---

## 6. S7-seedB（可访问性精修）

### 六维评分（不适用口径同上）

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | **4** | 我复跑 checks（含 --strict）：error 0 / warning 0 / info 1，与 review 记录一致；契约含 a11y.dialog 显式条款（`contract.json:50`）与双 invariant（视觉冻结+行为不变，:52-63）；间距键漂移保留并记录（notes:89 + decisions:6）。**注**：无 checks-before/after.json 快照，基线 3/1/2 仅以文字记录于 `reviews/2026-11-22-a11y-refine.md:8-14`（数字合理且我复跑终态吻合，但前态不可机读复核） |
| 视觉层次 | **2（不适用）** | 布局/间距类名与 fixture 一致（diff 核对），未改视觉方向 |
| 可访问性 | **4** | 缺陷地图 8/8 全命中（见下表）；弹层：打开聚焦容器 tabIndex=-1（`TicketFilter.jsx:15-17,78`）、Esc（:27-30）、Tab 圈定（:32-46）、关闭归还（:20-23）；**焦点样式全站严格一致**——单一 FOCUS 常量 outline 2px+offset 应用于 input+全部 4 按钮（:5,56,57,84,85,90），显式规避 outline:none（:4 注释），一致性优于 seedA；额外补 aria-live（:60）、form/ul aria-label（:54,62） |
| 反模板化 | **2（不适用）** | 未引入新视觉元素 |
| 状态完整性 | **2（不适用）** | fixture 无数据态，红线禁止新增 |
| 文案具体性 | **2（不适用）** | 文案保持 fixture 原文 |

**全六维均分：2.67｜仅适用维度（契约一致性+可访问性）均分：4.00**

### 缺陷地图命中核对（8/8）

| # | 注入缺陷 | 命中? | 修复位置 |
|---|---|---|---|
| 1 | 清空 div onclick | **是** | `TicketFilter.jsx:57` → button[type=button] |
| 2 | 导出结果… div onclick | **是** | :90 → button + ref |
| 3 | 模态关闭 × span onclick | **是** | :84 → button[aria-label=关闭] |
| 4 | h1→h4 跳级 | **是** | :52 h4→h2（保留 text-sm mt-4 类名） |
| 5 | 计数对比 2.45:1 | **是** | :60 → text-ink-600（7.24:1）；decisions:9 记录了为何不用 #64748B（余量不足）与为何不豁免（a11y 硬规则不可豁免） |
| 6 | 弹层无焦点管理 | **是** | :15-47 完整（容器聚焦/Esc/圈定/归还）+ :73-81 role/aria-modal/labelledby/tabIndex |
| 7 | 全页无 :focus-visible | **是** | FOCUS 常量覆盖全部 5 个可聚焦元素 |
| 8 | `<i>清空</i>` | **是** | :57 纯文本（decisions:12 专门记录） |

预期修复面（CHK-01/02/05/06）全部覆盖。

### diff 最小性核对

- `git diff --no-index`：TicketFilter.jsx **+61/−13**；tailwind.config.js 与 package.json **零改动**；新增 project/.vismith/{contract,contract.draft,decisions,reviews}
- +61 行中约 12 行为文件头注释与 FOCUS 常量定义（:3-5），其余均为必要 a11y 改动；间距/布局类名与 fixture 完全一致；改动面与 seedA 等价，仅因常量化与注释略大——仍属最小 diff
- decisions.log **8 条** ≥ 2 ✓

### 拒绝正例核对（逐条）

| 拒绝正例 | 命中? | 证据 |
|---|---|---|
| 用正数 tabindex 强改焦点序 | **否** | 全文件唯一 tabIndex 为弹层容器 `tabIndex={-1}`（:78） |
| outline:none 后无任何替代焦点样式 | **否** | 未使用 outline:none；FOCUS 用正向 outline-2 + offset-2（:5），且应用于所有交互元素 |
| 只清静态检查项，键盘流程仍走不通 | **否** | Esc（:27-30）、Tab 圈定（:32-46）、焦点归还（:20-23）、打开入圈（:15-17）齐备；review:20-23 另附键盘流程人工推演记录 |

---

## 总结

### 均分一览

| 产出 | 契约 | 视觉 | 可访问 | 反模板 | 状态 | 文案 | 全六维均分 | 仅适用维度均分 |
|---|---|---|---|---|---|---|---|---|
| S2-seedA | 4 | 4 | 3 | 4 | 4 | 4 | **3.83** | 3.83 |
| S2-seedB | 4 | 4 | 2 | 4 | 4 | 4 | **3.67** | 3.67 |
| S4-seedA | 4 | 4 | 4 | 4 | 4 | 4 | **4.00** | 4.00 |
| S4-seedB | 4 | 4 | 3 | 4 | 4 | 4 | **3.83** | 3.83 |
| S7-seedA | 4 | 2* | 4 | 2* | 2* | 2* | **2.67** | **4.00**（契约+可访问） |
| S7-seedB | 4 | 2* | 4 | 2* | 2* | 2* | **2.67** | **4.00**（契约+可访问） |

\* 为结构性不适用维度（refine 任务按 INV 不改视觉/文案/状态），沿用 E1-S5 中性 2 口径。

- 总均分（全六维）：**3.45**；总均分（仅适用维度）：**3.89**
- **最低维度**：可访问性——S2-seedB 得 2（ink-400 #94A3B8 文本对比 2.34–2.56:1 用于 ≥5 处真实文本：Stepper.jsx:55、App.jsx:122、AppShell.jsx:26/96、StepReview.jsx:12，恰落在「error 清零但 heuristic 未处理」锚点，且与 S7 注入缺陷同类）；次低为 S2-seedA/S4-seedB 可访问性 3（前者 ink-500 落浅底 4.2–4.34:1 ×3 处；后者三个 aria-modal 弹层无 Tab 焦点圈定）

### 确定性指标（复跑实测）

| 产出 | checks（我复跑） | 契约偏离处数 | 交付快照 |
|---|---|---|---|
| S2-seedA | 0/0/1（与 after 一致） | 0 | before+after 齐 |
| S2-seedB | 0/0/1 | 0 | **无** |
| S4-seedA | 0/0/1（before 1 err→after 0） | 0 | before+after 齐 |
| S4-seedB | 0/0/1 | 0 | **无** |
| S7-seedA | 0/0/1（--strict 同；before 3/1/2） | 0 | before+after 齐 |
| S7-seedB | 0/0/1（--strict 同；before 3/1/2 仅文字记录） | 0 | **无** |

token/耗时指标：grader 不可见生成过程，无法记录。

### 未验证项声明

1. **全部 6 份产出均未做浏览器渲染、键盘走查、读屏验证**——环境无浏览器；所有「键盘流程可走通」「视觉层次清晰」「滚动流畅」均为静态代码推演。S2/S4 的运行时行为（虚拟滚动实际帧率、sticky 列实际不错位、密度切换实际不跳动）未实测。
2. S2-seedB README 声明的 **vite build（45 模块）与 SSR 冒烟 12 断言**：交付目录无构建产物/脚本，无法复核（其 checks 声明已由我复跑证实）。
3. S2-seedB/S4-seedB/S7-seedB **缺 checks-before/after JSON 快照**：最终 checks 数已由我独立复跑证实，但「先跑 checks 建基线」的过程仅存在于文档叙述（S7-seedB 基线数字与 fixture 实际缺陷吻合，判可信）。
4. 对比度结论基于 token 配对实算（WCAG 相对亮度公式），未做取色器实测；S2-seedA 的 4.34:1 等临界值对渲染环境（字体平滑/色彩管理）不敏感，判定稳定。
5. S4 两份的「首屏流畅、滚动中行高稳定」按实现结构判定（固定行高+窗口渲染+rAF 节流），未做性能剖析。

### 总置信度

**高**（六维中五维完全基于可复核的代码/数据/checks 证据；可访问性与视觉两维含静态推演成分，单项置信中-高；S7 两份经 diff 级逐行核对，置信最高）。分歧风险点：S2-seedB 可访问性 2 分若另一 grader 将「次要文本对比失败」视为轻微项可能给 3-4，差距 ≥2 时按协议进入仲裁。
