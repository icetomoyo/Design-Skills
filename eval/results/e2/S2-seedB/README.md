# S2-seedB · 新员工入职 3 步向导（React + Tailwind）

B2B 员工入职流程系统「启程 HR」管理后台的「新员工入职」分步向导页。由 vismith skill 生成（mode=generate，category=admin-console，intent=operate）。

## 运行

```bash
npm install        # 若本机 npm 配置了 omit=dev，请用 npm install --include=dev
npm run dev        # 开发服务器
npm run build      # 生产构建（已验证：45 模块，构建通过）
```

- 提交失败演示：`http://localhost:5173/?mock=submit-error`（mock 服务确定性返回 MOCK-503）
- 权限对比：顶栏「演示视角」切换 `HR 专员`（默认，3 步）↔ `系统管理员`（4 步）

## 权限差异（条件渲染，非 CSS 隐藏）

| 能力 | HR 专员（默认登录） | 系统管理员 |
| --- | --- | --- |
| 步骤数 | 3：基本信息 / 岗位与权限 / 复核提交 | 4：+「审批人指定」（岗位与权限之后） |
| 财务字段（试用期月薪 / 转正月薪 / 成本中心） | **不渲染**（DOM 中无该字段组与薪酬数据，仅展示说明文案） | 渲染并必填校验 |
| 审批人指定 | **整步不进入 steps 列表**，组件不挂载 | 渲染（主审批人 ≠ 直属上级校验） |

实现位置：`src/lib/validate.js`（STEP_DEFS/FIELD_DEFS 按 roles 过滤）、`src/components/steps/StepPosition.jsx`（`role === 'admin'` 分支）。

## 验收 checklist 对照

- [x] 步骤指示标出当前步（`aria-current="step"`）/已完成（对勾+可点击返回）；向导状态全部提升到 `useOnboardingWizard`，切步/切视角数据不丢
- [x] 失焦校验（`onBlur` → 单字段），错误固定渲染在字段正下方（预留高度不挤压布局）；「下一步」校验整步并聚焦首错；提交前汇总阻断（`role="alert"`、聚焦摘要标题、逐条链接跳回对应步骤字段、定位第一个错误）
- [x] 权限差异条件渲染（见上表；SSR 冒烟已断言 HR 默认 DOM 无 `salaryProbation`/「主审批人」字段）
- [x] 焦点序=视觉序：无 `order-*`/正 `tabIndex`，DOM 顺序即布局顺序；所有交互元素有 `focus-visible` 焦点环 + 全局 `:focus-visible` 兜底；错误字段均为原生控件可键盘触达
- [x] 提交成功：流程状态时间线（当前节点高亮）+ 出口（再录入一位 / 复制申请编号）；失败：错误面板（人话+错误码 MOCK-503）+ 重试/返回出口，表单数据完整保留（失败不清空任何 state）
- [x] 密度：4px 基线（Tailwind 整数单位）、输入高 32px、正文 14px、侧栏 240px + 顶栏 56px、单列表单 + 分组标题、每屏唯一主按钮

拒绝正例自查：真正分步（非一步长表单）；下一步必校验且错误内联（无 toast/alert 弹窗）；权限非 CSS 隐藏（条件渲染 + SSR 断言）。

## 诚实性说明（hm-fake-send-ban / mock 服务）

- 提交走 `src/data/mockService.js` 异步服务（约 0.6s 延迟），成功/失败反馈只来自其真实返回；页面页脚明示「演示环境，未连接真实后端」
- 侧栏导航为静态演示结构（非当前项不可交互，`title` 注明未实现）
- 身份证示例 `11010519491231002X` 为算法合法的演示数据

## 文件地图

```
index.html / package.json / vite.config.js / tailwind.config.js（token 唯一定义点）/ postcss.config.js
src/
  App.jsx                      页面组装：骨架 + 向导 + 结果面板
  index.css                    Tailwind 指令 + :focus-visible 兜底 + reduced-motion
  data/dict.js                 固定字典 mock（12 部门 / 14 岗位 / 10 人名 / 6 成本中心等）
  data/mockService.js          提交 mock 服务（?mock=submit-error 失败开关）
  lib/validate.js              步骤/字段登记表 + 纯函数校验（含身份证校验位）
  lib/format.js                金额/时间格式化
  hooks/useOnboardingWizard.js 向导状态机（数据保留/分步校验/汇总阻断/提交状态机/视角切换）
  components/
    AppShell.jsx  Stepper.jsx  fields.jsx  buttons.js  SubmitOutcome.jsx
    steps/StepBasic.jsx  steps/StepPosition.jsx  steps/StepApprover.jsx  steps/StepReview.jsx
.vismith/                      contract.json（已 validate）+ decisions.log.md + exceptions.md + rules.json
```

## 质量验证记录

- `node vismith/scripts/checks.mjs eval/results/e2/S2-seedB --contract …/.vismith/contract.json` → **error 0 | warning 0 | info 1**（CHK-01 五组颜色配对全部 ≥ 4.5:1）
- `vite build` 通过（45 模块）
- SSR 冒烟（react-dom/server，默认 HR 视角）12 项断言全部通过（含「HR DOM 无财务字段/无主审批人字段」「共 3 步」）
- 未做浏览器内人工视觉验证（本任务环境无浏览器）；静态规则与构建/SSR 均通过
