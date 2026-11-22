# E2 独立盲评报告 · Grader #1（grading-1.md）

- 评审对象：`eval/results/e2/{S2-seedA, S2-seedB, S4-seedA, S4-seedB, S7-seedA, S7-seedB}/`（盲评，不知道各产出来自哪个 arm，未参考任何外部评价）
- 依据：`eval/rubric.md`（六维 0-4 锚点）、`eval/grader-protocol.md`、`eval/scenarios/{S2-admin-forms, S4-data-table, S7-a11y}.md`、S7 另对照 `eval/fixtures/s7-defect-map.md`
- 复核手段（只读）：通读全部源码与 `.vismith/`；`node vismith/scripts/checks.mjs <产出> --contract <契约> --strict --json` 逐份复跑；`git diff --no-index` 对照 `eval/fixtures/s7-project/` 核 S7 diff 最小性；fixture 基线复跑 checks（结果 3 error / 1 warning / 2 info，与两份 S7 产出自报基线一致）
- 口径：沿用 E1 的 S5 口径——结构性不适用维度记中性 2 并注明"不适用"；总结同时给出"仅适用维度"口径。无浏览器/读屏环境，视觉层次与键盘路径为静态代码推断，不作为已验证事实（见末尾未验证声明）。

---

## 1. S2-seedA（新员工入职向导）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `.vismith/contract.json:112-138` 五条 invariant（真实分步/失焦校验+汇总阻断/渲染层权限/提交反馈不虚构/焦点序）全部落地；我复跑 checks：`error 0 / warning 0 / info 1`（与 `checks-after.json` 一致，files_scanned=21）；`exceptions.md` 空且无需豁免。README:12-21 逐项映射验收 checklist |
| 视觉层次 | 4 | 结构清晰的三级层次：h1 页题+权限说明卡（`OnboardingWizard.jsx:45-62`）→ 步骤指示+步骤 h2+hint（`OnboardingWizard.jsx:272-293`、`WizardSteps.jsx`）→ 步内 h3 分组（`StepPosition.jsx:20,82`）；每屏主按钮唯一（`OnboardingWizard.jsx:345-358`）；侧栏 240px/顶栏 56px 骨架（`AppShell.jsx:27,67`）。注：无渲染验证，按结构推断 |
| 可访问性 | 4 | 跳转链接（`AppShell.jsx:20-25`）；`aria-current="step"`+已完成步 sr-only 说明（`WizardSteps.jsx:44-57`）；错误摘要 `role="alert"`+可聚焦+逐条锚点跳字段（`ErrorSummary.jsx:9-33`）；字段 `aria-invalid/aria-describedby`+预留消息高度（`Field.jsx:29-34,58-59`）；全局 focus-visible 环（`Field.jsx:8`、`Button.jsx`、`WizardSteps.jsx:53`）；IME 组词 Enter 拦截（`OnboardingWizard.jsx:211-213`）；步骤切换自动聚焦标题（:110-121） |
| 反模板化 | 4 | 无渐变/玻璃/glow/全大写；单 accent 只用于主行动与当前步（`contract.json:17-23` do_not 明确禁 slop）；真实中文语境：人名"陈慧/张明远"（`permissions.js:8,17`）、部门 headcount 142/18/23（`dictionaries.js:16,28,39`）、P 级岗位（:18-22）；侧栏"其余模块未接线"诚实说明（`AppShell.jsx:61-63`）。换名测试未执行（静态判断） |
| 状态完整性 | 4 | 四态齐且有出路：载入骨架（`StatePanels.jsx:5-31`）、字典错误+重试（:34-53）、真空空+重试（:56-72）、提交中按钮禁用+Spinner（`OnboardingWizard.jsx:346-355`）、成功面板+时间线+"继续办理下一位"（`FlowResult.jsx:59-153`）、失败驻留面板+数据保留说明+重试（:155-175）；`?mock=slow|error|empty|submit-fail` 全部真实可触达（`dictionaries.js:1-8`） |
| 文案具体性 | 4 | 数字带基准："全流程平均 3 个工作日"（`OnboardingWizard.jsx:51`）、"在职 308/进行中 5"（`AppShell.jsx:5-7`）、"月薪 3,000 至 300,000 元"（`validation.js:100`）、"内线 8012"（`StatePanels.jsx:45`）、"试用期按 80% 执行"（`StepPosition.jsx:99`）；错误文案说"怎么修"（如 `validation.js:64` 入职日期指引） |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 一步长表单塞全部字段 | 否 | 真分步：`permissions.js:28-55` 四个步骤定义，`OnboardingWizard.jsx:302-334` 每步只渲染一个 Step 组件；HR 3 步/管理员 4 步 |
| "下一步"不校验或错误只弹 toast/alert | 否 | `OnboardingWizard.jsx:188-208` 下一步先 `validateFields` 整步，失败聚焦错误摘要；错误驻留在字段旁（`Field.jsx:29-34`）+摘要面板（`ErrorSummary.jsx`），无 toast 用于校验 |
| 权限差异仅 CSS 隐藏 | 否 | `permissions.js:46` 审批步 `roles:['admin']` 整步过滤；`permissions.js:62-66`+`StepPosition.jsx:80-124` 财务字段组仅 admin 渲染，HR 视角整组不进 DOM；复核页同样条件渲染（`StepReview.jsx:86-111`） |

确定性指标：checks（我复跑）error 0 / warning 0 / info 1；contract 偏离 0 处。

---

## 2. S2-seedB（新员工入职向导）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `.vismith/contract.json` INV-001~005（条件渲染权限/状态提升不丢数据/三级校验协议/mock 真实返回/4px 紧凑密度）均有对应实现；我复跑 checks：`error 0 / warning 0 / info 1`（README:63 自报一致，files_scanned=18）。README 自报 `vite build` 与 SSR 冒烟 12 断言通过——本 grader 未复核（见未验证项） |
| 视觉层次 | 4 | h1+副题（`App.jsx:45-54`）→ 步骤条（`Stepper.jsx`）→ 表单卡内 h2 步题+分组 fieldset（`App.jsx:64`、`StepPosition.jsx:19-21`）；成功面板"编号圆点+连接线"时间线与步骤条同构（`SubmitOutcome.jsx:60-87`），签名元素统一；每屏主按钮唯一（`App.jsx:99-112`） |
| 可访问性 | 4 | 跳转链接（`AppShell.jsx:10-15`）；`aria-current="step"`+已完成步 aria-label（`Stepper.jsx:25,41`）；错误汇总 `role="alert"`+聚焦标题+逐条 button 跳字段并切回所在步骤（`StepReview.jsx:40-64`、`useOnboardingWizard.js:137-154`）；sr-only aria-live 全程播报（`App.jsx:118-120`）；全局 `:focus-visible` CSS 兜底（`index.css:15-18`）+组件级 ring（`fields.jsx:9`）；aria-invalid/describedby 联动 hint/err id（`fields.jsx:43-45`）。轻微保留：IME 组词 Enter 仅依赖浏览器默认不触发隐式提交的注释（`App.jsx:20`），无 seedA 式显式拦截 |
| 反模板化 | 4 | 全部语义 token 无原生调色板（`decisions.log.md:11`）；真实语境：12 部门/14 岗位（`dict.js`）、身份证校验位（`validate.js:9-16`）、品牌"启程 HR"（`AppShell.jsx:25`）；无假导航（侧栏 span+title 注明未实现，`AppShell.jsx:42-44`）。人名字典（张伟/李娜等高频名）略通用但真实。换名测试未执行 |
| 状态完整性 | 3 | 提交生命周期完整且有出路：submitting（按钮禁用+aria-busy，`App.jsx:100-107`）、成功（时间线+再录入/复制编号，`SubmitOutcome.jsx:89-96`）、失败（错误码 MOCK-503+已填 N 项保留+重试/返回，:101-124）。但字典为同步 import（`data/dict.js`），数据侧无载入/错误/空态路径，四态演示面窄于任务书"mock 真实可触达"的通常预期（对比 seedA 的 ?mock=slow/error/empty） |
| 文案具体性 | 4 | 数字带基准："约 0.6 秒延迟"（`App.jsx:123`）、"3000–200000 之间的整数（元/月）"（`validate.js:119-121`）、"失败 N 项…已填写的 N 项信息全部保留"（`SubmitOutcome.jsx:112-113`）、"薪酬已随单提交，待主审批人确认"（:53）；页脚明示演示环境未接后端（`App.jsx:122-126`） |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 一步长表单塞全部字段 | 否 | `validate.js:26-31` STEP_DEFS 四步，`App.jsx:75-88` 单步渲染；HR 3 步（approver 步 `roles:['admin']` 过滤） |
| "下一步"不校验或错误只弹 toast/alert | 否 | `useOnboardingWizard.js:102-117` 下一步 `validateStep` 整步+聚焦首错；错误内联字段下方（`fields.jsx:35-41`）；提交前全量汇总阻断（:180-205） |
| 权限差异仅 CSS 隐藏 | 否 | `validate.js:48-56` 财务/审批字段 roles 登记；`StepPosition.jsx:75-118` admin 条件渲染整组；复核页条件渲染（`StepReview.jsx:91-125`）；README:30 自称 SSR 断言 HR DOM 无 salaryProbation/主审批人（未复核，但代码路径成立） |

确定性指标：checks（我复跑）error 0 / warning 0 / info 1；contract 偏离 0 处。

---

## 3. S4-seedA（主机清单）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `.vismith/contract.json` INV-001~006（虚拟化/冻结列/批量确认/键盘可达/状态双通道/密度即时）逐条落地；checks 前后自报 1 error（CHK-05，中途）→ 0/0/1，我复跑终态 `error 0 / warning 0 / info 1`（files_scanned=14）；README:24-38 验收映射 |
| 视觉层次 | 4 | 顶栏（h12）→ 工具栏 h1"主机清单"+统计行"共 10,000 台 · 60 个资产字段 · 首两列冻结"（`App.jsx:216-222`）→ 选中态批量条 → 表格卡 → 页脚状态条（:365-374）；密度档 32/40px 与 8 组 60 列的台账层次分明；无渲染验证，按结构推断 |
| 可访问性 | 4 | 跳转链接（`App.jsx` skip link）；`role="grid"`+`aria-rowcount/rowindex/selected`（`VirtualTable.jsx:111-113,159-161`）；全选半选态（:76-78）；行复选框原生+aria-label（:170-176）；批量确认 `role="alertdialog"`+aria-modal+Tab 圈定+Esc+焦点归还（`ConfirmDialog.jsx:35-54,63-69`）；列设置弹层 Esc+焦点管理（`ColumnSettings.jsx:9-19,53-58`）；toast aria-live（`App.jsx:446-458`）；焦点环入组件层 CSS（`index.css:26-28,51-53,100-102`） |
| 反模板化 | 4 | 种子化确定性数据（`mockHosts.js:5-14`）；运维真实语境：机型 ecs.c7/gn7i（:19-28）、IP 段合法化函数（:85-96）、费用按规格定价 ¥267–¥30,417（:1-2,128）；品牌"星链运维平台"（`App.jsx:198`）；无斑马纹/hairline 台账质感（`index.css:67-99`）。换名测试未执行 |
| 状态完整性 | 4 | 四态齐：载入骨架（`StateViews.jsx:3-27`）、错误+错误码+重试（:29-51）、真空空+接入云账号/导入模板出口（:53-87）、筛选无结果+清除筛选（:64-69）；busy 态按钮禁用+文案（`App.jsx:385-386`）；完成 aria-live 播报含数量（:152,168）；`?mock=error|empty`、`?rows=1000` 可触达（`useHosts.js:12-22`、`mockHosts.js:208-219`） |
| 文案具体性 | 4 | 数字带基准："预计 1–2 分钟内恢复运行"（`App.jsx:152`）、"重启期间服务中断约 1–2 分钟…避开业务高峰"（:402-404）、错误码 HOSTS_SVC_503（`mockHosts.js:213`）、"仅渲染可视区窗口（固定行高 32px + overscan 6）"（`App.jsx:372`） |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 一次性渲染全部 1 万行 DOM | 否 | `VirtualTable.jsx:94-99` 窗口切片 start..end+overscan 6，绝对定位行（:151-163）；README:30 佐证 |
| overflow:hidden 藏溢出 / 关键列截断无展开 | 否 | 横滚收敛在 `.dt-scroll overflow-auto`（`index.css:68-70`）；单元格 ellipsis+`title` 完整值（`VirtualTable.jsx:189`）；冻结列主机名 260px+内网 IP 150px 恒显（`columns.js` 冻结定义）；页面级无 overflow-hidden 溢出隐藏（骨架面板的 overflow-hidden 仅为圆角裁切） |
| 批量操作无确认直接执行 / 选中行不可键盘触达 | 否 | 重启/打标签必经 ConfirmDialog（`App.jsx:376-443`），执行前有选中计数与对象点名；行选择为原生 checkbox 可 Tab/Space 触达（`VirtualTable.jsx:170-176`），并支持 Shift 范围与表头全选（`App.jsx:92-125`） |

确定性指标：checks（我复跑）error 0 / warning 0 / info 1；contract 偏离 0 处；列数 60（≥50 满足任务书）。

---

## 4. S4-seedB（主机清单）

### 六维评分

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `.vismith/contract.json` INV-001~006（冻结+虚拟化+批量确认+键盘+密度即时+截断展开）落地；我复跑 checks：`error 0 / warning 0 / info 1`（files_scanned=20，与 README:69 自报一致）。缺口：无 checks-before/after JSON 快照（grader-protocol 预期产物），仅 README 记录终态数字 |
| 视觉层次 | 4 | 页头 h1+四格统计（总数/运行中/告警中/月费用合计 ¥xxx.x 万，`App.jsx:242-250`）→ 工具栏 → 批量条 → 表格 → 虚拟窗口信息条（`HostTable.jsx:255-262`），信息分层清晰且把"虚拟化"做成可观测状态；无渲染验证，按结构推断 |
| 可访问性 | 3 | 静态项全清（checks 0 error；focus-visible 常量全覆盖 `ui.jsx:4-24`；状态点+文本双通道 `ui.jsx:45-52`；跳转链接 `App.jsx:232-237`；表格 caption sr-only `HostTable.jsx:155-157`）。缺口：三个弹层（ConfirmDialog/DetailDrawer/ColumnSettingsPanel）均 `aria-modal="true"` 但**无 Tab 焦点圈定**——Esc+焦点归还+初始聚焦都有（`ConfirmDialog.jsx:22-34`、`DetailDrawer.jsx:12-23`、`ColumnSettingsPanel.jsx:11-21`），但 Tab 会逃逸到底层页面，键盘路径不完整（对照 rubric 4 档"键盘路径完整"未达；对照 seedA 的 ConfirmDialog 有圈定） |
| 反模板化 | 4 | 主机名规范 `{机房}-{环境}-{应用}-{用途}-{序号}.ops.example.cn`（`mockHosts.js:3`）；IP 段函数化合法（:85-94）；月费按机型数量级（A100×8 ≈ ¥12 万/月，:51-54）；无 slop 样式，语义 token 全覆盖（`ui.jsx:1-2` 注明）。换名测试未执行 |
| 状态完整性 | 4 | 四态齐：骨架（表头同高防跳动，`PageStates.jsx:4-28`）、错误 OPS-504+重试+列设置不受影响说明（:30-43）、真空空（:46-62）、筛选无结果+清除筛选（:65-83）；busy 内联进度+双按钮禁用（`ConfirmDialog.jsx:48-65`）；完成反馈含**部分失败点名**（成功 N 失败 1 台 SSH 超时可单机重试，`App.jsx:192-210`）——比 seedA 多一层失败细分 |
| 文案具体性 | 4 | 数字带基准："渲染 N / 10,000 行"（`HostTable.jsx:257`）、"横向滚动共 7,900px 宽"量级（README:44）、"重启会中断业务进程…确认已进入变更窗口"（`App.jsx:349`）、"标签正在异步下发，预计 1 分钟内全量生效"（:208-209） |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 一次性渲染全部 1 万行 DOM | 否 | `HostTable.jsx:116-118` 可见窗口±8 行 + 上下 spacer 占位（:205-209,245-249）；窗口信息条实时显示"渲染 N / 10,000 行"（:255-262） |
| overflow:hidden 藏溢出 / 关键列截断无展开 | 否 | 横滚在表格自身 `overflow-auto` 容器（`HostTable.jsx:146-153`）；外层 `section.overflow-hidden`（`App.jsx:272`）仅裁圆角，滚动发生在内部容器，不藏内容；截断有 title + 主机名点击开全字段抽屉（`DetailDrawer.jsx` 全 59 项字段）双重展开途径 |
| 批量操作无确认直接执行 / 选中行不可键盘触达 | 否 | 重启/打标签必经确认框且点名数量+前 6 台样例（`App.jsx:340-391`）；无任何直接执行路径（`runBatch` 仅由对话框 onConfirm 调用）；行选择原生 checkbox+aria-label（`HostTable.jsx:224-230`），表头全选含 indeterminate（:171-180） |

确定性指标：checks（我复跑）error 0 / warning 0 / info 1；contract 偏离 0 处；列数 59（≥50 满足）。

---

## 5. S7-seedA（可访问性精修 · seed A）

### 六维评分（视觉层次/状态完整性/文案具体性按 S5 口径记"不适用 2"）

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | 契约由 extract 草稿转正（`contract.json` + `contract.draft.json`），INV-001~003（筛选行为/导出流程/不改视觉方向）全部保持：过滤逻辑原样（`TicketFilter.jsx:10`）、导出流程文案未动（:65）、布局结构与间距类名零改动（git diff 仅有语义/属性级修改）。diff 最小性：`git diff --no-index` 仅 `src/pages/TicketFilter.jsx`（+42/−12）+ 3 个 `.vismith` 新增文件，`tailwind.config.js`/`package.json` 未动。decisions.log 10 条（≥2）；修复清单行号映射准确（:47/:66/:72/:42/:50 与实际文件逐一对上） |
| 视觉层次 | 2（不适用） | 任务红线"不改视觉方向"；页面层级原样保留，仅 h4→h2 且视觉尺寸类 `text-sm mt-4` 不变（`TicketFilter.jsx:42`） |
| 可访问性 | 4 | 缺陷地图 8 项全修（见下表）；弹层：打开即聚焦 ×（:18-20）、Tab/Shift+Tab 圈定（:23-33）、Esc 关闭（:22）、关闭归还触发器焦点（:13-16）；计数行 text-ink-600 实算 7.24:1（我按 WCAG 公式复核 #475569 on #F8FAFC）；焦点环 ring-accent-500 对表面 4.94:1（复核通过）；aria-label 补区块名（:44,52）、aria-live 播报计数（:50）。无正数 tabindex（全文仅 `tabIndex={-1}` 于种子标题类元素，此处文件内无） |
| 反模板化 | 4 | 零新增装饰；注释头保留"评测样例，非范本"定位（:3）；修复全部为最小属性/元素级改动 |
| 状态完整性 | 2（不适用） | fixture 无状态需求，refine 不新增状态（新增即违反 diff 最小红线） |
| 文案具体性 | 2（不适用） | invariant 要求文案不变；既有文案"匹配 N / M 条"本身带数字基准 |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 正数 tabindex 强改焦点序 | 否 | 全文无 tabindex 正值；grep 全 e2 目录 `tabIndex=` 仅 `-1`（摘要面板/对话框容器类） |
| outline:none 后无替代焦点样式 | 否 | 6 处 `focus-visible:outline-none` 全部同串配对 `focus-visible:ring-2 ring-accent-500`（`TicketFilter.jsx:46,47,66,67,72`） |
| 只清静态检查项，键盘流程走不通 | 否 | 键盘闭环在代码层完整：输入框→清空→导出结果（DOM 序即 Tab 序）；弹层打开自动聚焦、圈定、Esc、归还（:18-37）；checks 0 error 同时人工流程推演记录在案（`修复清单.md:20`） |

### 缺陷地图命中核对（对 `eval/fixtures/s7-defect-map.md`）

| # | 缺陷 | 命中修复 | 证据 |
|---|---|---|---|
| 1 | 清空 div onclick | 是 | `TicketFilter.jsx:47` 改 `<button type="button">`，`<i>` 斜体去除 |
| 2 | 导出结果 div onclick | 是 | `:72` 改原生 button+ref |
| 3 | 模态关闭 × span onclick | 是 | `:66` 改 button+`aria-label="关闭弹层"`+ref |
| 4 | h1→h4 跳级 | 是 | `:42` h4→h2 |
| 5 | 计数 #94A3B8 对比 2.45:1 | 是 | `:50` 改 `text-ink-600`（7.24:1，我实算复核） |
| 6 | 弹层无焦点管理 | 是 | `:7-37,63` role=dialog+aria-modal+圈定+Esc+归还 |
| 7 | 全页无焦点样式 | 是 | `:46,47,66,67,72` 五个可聚焦元素统一 ring |
| 8 | `<i>清空</i>` 语义误用 | 是 | `:47` 纯文本 button |

确定性指标：checks before（无契约）3 error / 1 warning / 2 info（与我对 fixture 复跑完全一致）；after（含契约）0 / 0 / 1（我复跑一致）；diff：+42/−12 单文件。

---

## 6. S7-seedB（可访问性精修 · seed B）

### 六维评分（同上口径）

| 维度 | 分 | 证据 |
|---|---|---|
| 契约一致性 | 4 | `contract.json` 双 invariant（visual-direction-frozen / filter-export-behavior）保持：过滤逻辑与导出文案原样（`TicketFilter.jsx:10,83`）；diff 最小性：仅 `TicketFilter.jsx`（+61/−13）+ `.vismith` 4 个新增文件（含 reviews/），config 未动。decisions.log 8 条（≥2）。缺口：无 checks-before/after JSON 快照，基线/终态数字仅记于 `reviews/2026-11-22-a11y-refine.md:9-18`（数字经我复跑证实为真：fixture 3/1/2、终态 0/0/1）；decisions.log 两处行号漂移（关闭 × 记 :77 实为 :84；导出结果记 :92 实为 :90） |
| 视觉层次 | 2（不适用） | 同 seedA；h4→h2 且保留 `text-sm mt-4`（`TicketFilter.jsx:52`） |
| 可访问性 | 4 | 缺陷地图 8 项全修（见下表）；弹层：容器 tabIndex=-1 打开即聚焦（:14-17）、onKeyDown 内 Esc+Tab 圈定（:26-47）、关闭归还触发器（:19-23）；焦点样式走 `outline` 方案（accent-600，对表面 6.4:1 ≥3:1，复核通过）且明确不使用 outline:none（:4-5 注释+FOCUS 常量）；aria-label/aria-live 同补（:54,60,62） |
| 反模板化 | 4 | 零新增装饰；FOCUS 常量统一复用体现一致性（:5）；review 文档含"未做"诚实声明 |
| 状态完整性 | 2（不适用） | 同 seedA |
| 文案具体性 | 2（不适用） | 同 seedA（文案 invariant 不变） |

### 拒绝正例核对

| 正例 | 命中 | 证据 |
|---|---|---|
| 正数 tabindex 强改焦点序 | 否 | 仅 `tabIndex={-1}`（`TicketFilter.jsx:78` 对话框容器） |
| outline:none 后无替代焦点样式 | 否 | 全文 0 处 outline-none；FOCUS 用 `focus-visible:outline outline-2 offset-2 accent-600`（:5） |
| 只清静态检查项，键盘流程走不通 | 否 | 完整键盘闭环：Esc+Tab 圈定+焦点归还（:26-47,19-23）；review:20-23 记录人工推演；checks 0 error 我复跑证实 |

### 缺陷地图命中核对

| # | 缺陷 | 命中修复 | 证据 |
|---|---|---|---|
| 1 | 清空 div onclick | 是 | `TicketFilter.jsx:57` 原生 button |
| 2 | 导出结果 div onclick | 是 | `:90` 原生 button+ref |
| 3 | 模态关闭 × span onclick | 是 | `:84` button+`aria-label="关闭"` |
| 4 | h1→h4 跳级 | 是 | `:52` h4→h2 |
| 5 | 计数对比不足 | 是 | `:60` text-ink-600（7.24:1） |
| 6 | 弹层无焦点管理 | 是 | `:14-47,71-88` 容器聚焦+圈定+Esc+归还 |
| 7 | 全页无焦点样式 | 是 | `:5,56,57,84,85,90` FOCUS 常量覆盖全部 5 个可聚焦元素 |
| 8 | `<i>清空</i>` 语义误用 | 是 | `:57` 纯文本（decisions.log:12 明确记录去除理由） |

确定性指标：checks 终态（我复跑）0 / 0 / 1；基线数字（自报 3/1/2）经 fixture 复跑证实；diff：+61/−13 单文件。

---

## 总结

### 分数总表

| 产出 | 契约 | 视觉层次 | 可访问性 | 反模板化 | 状态完整性 | 文案具体性 | 全六维均分 | 仅适用维度均分 |
|---|---|---|---|---|---|---|---|---|
| S2-seedA | 4 | 4 | 4 | 4 | 4 | 4 | **4.00** | 4.00 |
| S2-seedB | 4 | 4 | 4 | 4 | 3 | 4 | 3.83 | 3.83 |
| S4-seedA | 4 | 4 | 4 | 4 | 4 | 4 | **4.00** | 4.00 |
| S4-seedB | 4 | 4 | 3 | 4 | 4 | 4 | 3.83 | 3.83 |
| S7-seedA | 4 | 2（不适用） | 4 | 4 | 2（不适用） | 2（不适用） | 3.00 | **4.00** |
| S7-seedB | 4 | 2（不适用） | 4 | 4 | 2（不适用） | 2（不适用） | 3.00 | **4.00** |
| 均值 | 4.00 | 3.33 | 3.83 | 4.00 | 3.17 | 3.33 | 3.61 | **3.94** |

- **均分**：全六维口径 3.61；仅适用维度口径 **3.94**（S7 两份按契约/可访问性/反模板化三适用维计）。分场景仅适用均分：S2 3.92、S4 3.92、S7 4.00。
- **最低维度（跨产出）**：状态完整性 3.17（S2-seedB 3：数据侧无载入/错误/空态路径）；其次可访问性 3.83（S4-seedB 3：三个 aria-modal 弹层无 Tab 焦点圈定，Esc/归还/初始聚焦均有但 Tab 可逃逸到底层）。S7 的 2 分均为口径性"不适用"，非缺陷。
- **逐份要点**：
  - S2：两份均零拒绝正例、零 checks error。seedA 胜在四态演示面（字典 slow/error/empty + submit-fail 全开）与 IME 显式兜底；seedB 胜在状态机纯度（状态全部提升、sr-live 全程播报），弱在数据侧状态缺失。
  - S4：两份均 59/60 列、真虚拟化、批量必确认。seedA 弹层有焦点圈定、Shift 范围选择、重启状态回流（restarting→running）；seedB 有部分失败点名反馈、URL 同步搜索词、详情抽屉，弱在弹层焦点圈定缺失。
  - S7：两份缺陷地图 8/8 全中、diff 均收敛在单文件、无拒绝正例。seedA 证据链更完整（checks JSON 前后快照+行号精确的修复清单，diff +42/−12 更小）；seedB 修复质量等价（outline 方案更显式规避 outline:none 字样），但缺 checks JSON 快照且 decisions.log 有 2 处行号漂移（+61/−13 略大）。
- **共性观察**：六份产出 checks 全部复跑为 0 error / 0 warning / 1 info（CHK-01 正向确认）；均未登记任何 exceptions（S2/S4 四份的 exceptions.md 均为空模板；S7 两份无 exceptions.md，seedA 修复清单明确"无新增例外"、seedB decisions 记录"豁免被拒"）；契约偏离处数均为 0。

### 未验证项声明

1. **未做浏览器渲染/视觉验证**：视觉层次分基于 DOM/类名结构静态推断，未执行眯眼测试；全程未安装依赖、未运行 dev server（协议限制只读 + 仅 checks.mjs）。
2. **未做键盘/读屏实测**：Tab 序、焦点圈定、Esc、焦点归还均按代码路径静态推演（含两份 S7 自报的人工推演记录），无真实键入验证。
3. **未复核的生成者自报声明**：S2-seedB 的 `vite build`（45 模块）与 SSR 冒烟 12 断言；S2-seedA 的"纯逻辑单测"；S4-seedB 的 IP 脚本校验 0 违例——均为产出方自述，本 grader 未运行任何构建/测试命令。
4. **对比度抽查而非全量**：仅实算复核了 S7 的 3 组关键配对（#475569 7.24:1、#2563EB 4.94:1、#1D4ED8 6.4:1）与 fixture 的 2.45:1 基线；其余依赖 checks.mjs 的契约配对结论。
5. **50+ 列数以静态计数证实**（seedA 60、seedB 59），但列显隐交互与冻结不错位未实测。
6. S7-seedB、S4-seedB 缺 checks-before/after JSON 快照，其基线数字以我对 fixture/终态的复跑间接证实。

### 总置信度

**中-高**。确定性部分（checks 复跑、diff 度量、缺陷地图命中、拒绝正例 grep 逐条核对）为高置信；推断性部分（视觉层次、键盘路径、反模板化换名测试）为中置信，已按保守口径打分并全部标注证据位置，可交仲裁第三人仅凭证据引用复核。
