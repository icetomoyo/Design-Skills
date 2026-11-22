# S2 · 新员工入职向导（admin-console · generate）

B2B 管理后台「员工入职流程系统」中的**新员工入职分步向导页**。技术栈 React 18 + Tailwind 3（Vite），无第三方 UI 库。当前用户默认为 **HR 专员**，顶栏提供「演示视角切换」以便核对 HR/管理员的权限差异。

## 运行

```bash
npm install
npm run dev     # http://localhost:5173
```

## 验收 checklist 对照

| 验收项 | 实现位置 |
|---|---|
| 步骤指示标出当前步/已完成；上一步数据保留 | `src/components/WizardSteps.jsx`（aria-current=step、已完成可点击回退）；全部字段存于单一 `values`（`OnboardingWizard.jsx`），回退/编辑不丢数据 |
| 校验失焦触发，错误在字段旁；提交前汇总阻断并定位首个错误 | `src/components/Field.jsx`（字段下方消息槽，预留高度）；`validation.js`；`ErrorSummary.jsx`（role=alert、聚焦摘要、逐条链接跳字段）；`doSubmit()` 跳到首个错误所在步 |
| 权限差异真实生效（HR 不渲染财务字段与审批步，非 CSS 隐藏） | `src/permissions.js`：审批步 `roles:['admin']` 整步过滤；财务字段组仅 admin 追加（`fieldsOfStep`），HR 视角 DOM 不含 `salaryGrade/monthlySalary/budgetCenterId` 与审批步任何内容 |
| 焦点序=视觉序，错误字段可键盘触达（CHK-05） | DOM 顺序即视觉顺序；全局 focus-visible 环；摘要链接聚焦目标字段；步骤切换自动聚焦步骤标题 |
| 提交成功/失败均有反馈与出口，失败不丢已填数据 | `FlowResult.jsx`：成功面板（流程单号+流转时间线+继续办理下一位）；失败为驻留 role=alert 面板（非 toast），表单与数据原地保留，可重试 |
| 密度对齐后台，4px 间距基线，无 slop 症状 | 仅用 Tailwind 默认刻度（=4px 基线）；单列 896px 内容区；accent 只用于主行动/当前步；无渐变/玻璃/彩色 glow/全大写标签 |

## 演示开关（URL query `?mock=`）

| 开关 | 效果 |
|---|---|
| `slow` | 字典加载 4s，观察骨架载入态 |
| `error` | 字典加载失败，观察错误态与重试 |
| `empty` | 字典为空，观察真空空态 |
| `submit-fail` | 提交失败（重试仍失败），观察失败反馈与数据保留 |

## 权限矩阵

| | HR 专员（默认，陈慧） | 管理员（张明远） |
|---|---|---|
| 步骤 | 基本信息 → 岗位与权限 → 复核提交（3 步） | + 审批人指定（4 步） |
| 财务字段（定薪档级/月薪标准/预算中心） | 不渲染（仅业务说明） | 可见且可编辑 |
| 复核页 | 不含财务行与审批人组 | 全量呈现 |

> brief 中「HR 财务字段只读」按验收 checklist「HR 视角不渲染财务字段」实现为**整组不渲染**：不渲染即不可编辑与不可见，强于只读。

## 待接后端 endpoint（hm-fake-send-ban 交付说明）

当前为 mock 层（`src/data/dictionaries.js`），成功反馈仅来自 mock 请求真实返回：

| 表单/功能 | 字段 | 目标 |
|---|---|---|
| 字典加载 | 部门/岗位/上级/权限/审批人/预算中心 | `GET /api/v1/dicts/onboarding` |
| 入职提交 | 全部向导字段 + submittedBy | `POST /api/v1/onboarding/tickets` |
| （未实现）进行中列表 | — | `GET /api/v1/onboarding/tickets?status=processing` |

## 设计契约与静态检查

- 契约：`.vismith/contract.json`（`node vismith/scripts/contract.mjs validate` 通过；颜色/字号/间距 tokens 与 `tailwind.config.js` 一一对应，语义类名如 `bg-primary-600`/`text-ink-700`）
- 检查（仓库根运行）：
  `node vismith/scripts/checks.mjs eval/results/e2/S2-seedA/src eval/results/e2/S2-seedA/index.html --contract eval/results/e2/S2-seedA/.vismith/contract.json`
- 快照：`checks-before.json` / `checks-after.json` —— **error 0 | warning 0 | info 1**（info 为 CHK-01 正向确认：契约颜色配对全部 ≥4.5:1）。v0.2 规则 CHK-08（reduced-motion，见 `src/index.css` 与 `motion-reduce:`）、CHK-09/CHK-10（`index.html` 无标题层级问题、`<html lang="zh-CN">`）均通过。

## 验证边界（诚实声明）

- 已做：vismith 静态检查（前后两轮）、纯逻辑单测（身份证校验位/手机号/薪资区间/权限步骤可见性，见任务过程）、契约 validate。
- 未做：浏览器渲染与键盘走查（本环境无 node_modules 与浏览器，未安装依赖）；建议 `npm run dev` 后按上述开关过一遍四态与 Tab 顺序。
