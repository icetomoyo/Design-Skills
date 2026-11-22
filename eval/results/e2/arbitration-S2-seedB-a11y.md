# E2 仲裁裁决 · S2-seedB 可访问性维度

- 仲裁人：第三人 grader（只依据双方证据引用与被引产出源码事实，不重新生成）
- 分歧：grader-1 评 **4** / grader-2 评 **2**（差 ≥2，按 rubric 一致性口径进入仲裁）
- 核验手段：通读被引源码；`node` 动态导入 `vismith/scripts/lib/colors.mjs` 的 `parseColor/contrastRatio`（WCAG 2.x 公式）实算；背景按各引用点实际容器类名判定——`bg-surface`=#FFFFFF（tailwind.config.js:46）、`bg-canvas`=#F1F5F9（:47）、表单卡 `bg-surface`（App.jsx:62）。

## 一、争议事实核验表（grader-2 的引述逐条）

| # | 引述 | 结论 | 实测/源码事实 |
|---|---|---|---|
| 1 | `text-ink-400` = #94A3B8 | **属实** | `tailwind.config.js:22` `400: '#94A3B8'` |
| 2 | Stepper.jsx:55 未开始步标题为真实文本 | **属实** | :55 `text-sm text-ink-400` 包裹 `{s.title}`（:59），非 aria-hidden/sr-only；位于 main 内容区，背景承 `bg-canvas`（AppShell.jsx:9,99）→ **2.34:1** |
| 3 | App.jsx:122 页脚 | **属实** | :122 `text-ink-400` 多句真实说明文本，canvas 底 → **2.34:1** |
| 4 | AppShell.jsx:26「入职流程」 | **属实**（小误：在侧栏头部 aside 而非顶栏，文本与 token 无误） | :26 `text-ink-400`，aside `bg-surface`（:17）白底 → **2.56:1** |
| 5 | AppShell.jsx:96「用于验证权限差异」 | **属实** | :96 `text-ink-400`，header `bg-surface`（:68）白底 → **2.56:1** |
| 6 | StepReview.jsx:12 复核 muted 值 | **属实** | :12 `muted ? 'text-ink-400'`，:98 HR 视角「薪酬与成本」说明为真实文本；表单卡 `bg-surface` 白底 → **2.56:1** |
| 7 | 「≥5 处真实文本」 | **属实且偏保守** | grep 全 src 共 7 处 ink-400：上述 5 处实体文本 + `fields.jsx:9,150` 两处 `placeholder:text-ink-400`（输入框白底占位文本，2.56:1） |
| 8 | 实算 2.34–2.56:1 | **属实** | colors.mjs 实算：#94A3B8 on #FFFFFF=**2.56:1**、on #F1F5F9=**2.34:1**，均为 4.5 线的约一半 |
| 9 | 契约 neutrals 只收深色档致 CHK-01 不覆盖 | **属实** | `contract.json:29` `neutrals:[#0F172A,#334155,#475569,#64748B]` 不含 #94A3B8；而契约自设 `min_contrast_normal_text: 4.5`（:90），且 precedence 含 `a11y_hard`（:139）高于 tokens |
| 10 | 与 S7 注入缺陷同类（#94A3B8 2.45:1） | **属实** | 同色值同缺陷类，eval 体系内已被认定为需修复缺陷 |

补充实测（双方均未计入，进一步佐证）：App.jsx:47 副题、Stepper.jsx:66 步数提示为 ink-500(#64748B) 落 canvas 底 = **4.34:1 < 4.5**——文本对比 heuristic 整体未经背景校验。

grader-1 的正向证据逐条核验**均属实**：skip link（AppShell.jsx:10-15）、`aria-current="step"`+已完成步 aria-label（Stepper.jsx:41,25）、错误汇总 `role="alert"`+可聚焦标题+逐条跳转（StepReview.jsx:41-61）、sr-only aria-live（App.jsx:118-120）、`:focus-visible` 兜底（index.css:15-18）、组件级 ring 与 describedby（fields.jsx:9,43-45）——键盘/ARIA 层确属优秀，但其 4 分所需的「全清」前提不成立。

## 二、最终评分

**S2-seedB 可访问性：2 / 4**（grader-2 的 2 成立；grader-1 的 4 被推翻）

## 三、理由（≤150 字）

引述全部属实：ink-400 实测 2.34–2.56:1，5 处实体文本（另 2 处占位符）仅约契约 4.5 硬线之半，含常显步骤标题；CHK 零 error 只因 neutrals 未登记该档。键盘/ARIA 优秀但「全清」不成立，正落「error 清零但 heuristic 未处理」锚点，同 S7 缺陷类，判 2。
