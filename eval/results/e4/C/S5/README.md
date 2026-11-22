# S5 · 既有工单系统两页面精修（实验组 C · impeccable skill）

## 产出
- `project/` —— 修复后的项目副本（自 `eval/fixtures/s5-project/` 原样复制后修改；原 fixture 未动）
- `contract.json` —— extract 阶段产出的契约草稿（tokens + 语义用法 + 规则 + 不变量 + deferred）
- `validate.mjs` —— 静态校验器（被禁用引擎的 validate 降级替代），运行 `node validate.mjs`
- `decisions.log` —— 三档判定与修复决策（10 条，D1–D10）
- `README.md` —— 本文件

## 工作流（impeccable skill）
1. Setup：`impeccable context` 于 project/ 运行成功 → 指令 `SCOPED_EXISTING_ALLOWED`（既有实现为精修权威，须保持）+ `MANUAL_DETECTOR_REQUIRED`
2. 加载 reference：`extract.md` / `audit.md` / `polish.md`；编辑前读 `craft-floor.md`
3. **extract 契约草稿**：从 incumbent 提取 `contract.json`
4. **确认 invariants**：结构/文案/交互/调色板语义不变（contract.json `invariants`）
5. **refine 三档判定**：A 必修（无障碍）/ B 应修（一致性）/ C 保持 → `decisions.log`
6. **分层修复**：仅 3 文件 8 处行内修改；未重构、未换库、未改布局结构
7. 验证：`node validate.mjs` 全过；`impeccable detect` 复扫两改动文件

## 修复清单
| # | 位置 | 缺陷 | 修复 |
|---|------|------|------|
| 1 | Dashboard.jsx:15 | 标签 #94A3B8 ≈2.6:1 对比度不足 | `text-ink-600`（≈7.6:1） |
| 2 | Settings.jsx:14 | 标签 #94A3B8 ≈2.5:1 | `text-ink-600` |
| 3 | Dashboard.jsx:24 | #FF6B35 大文本 ≈2.8:1 | 令牌 `status.warn` #C2410C（≈5.2:1） |
| 4 | Dashboard.jsx:8/13 | 17px/13px 脱离 4px 基线 | `mb-16`/`mt-16` |
| 5 | Dashboard.jsx:38 | 链接 #7C3AED 调色板外 | `text-accent-600` |
| 6 | Dashboard.jsx:44 | `<img>` 缺 alt | 补中文 alt |

## 降级声明
- 硬性约束禁用 vismith 引擎与 `.vismith/`：契约落在 `contract.json`，validate 由自研 `validate.mjs` 静态执行（CHK-01 对比度逐条验算 / CHK-02 令牌 / CHK-06 基线 / IMG alt），非引擎报告
- 禁浏览器：无渲染截图与交互回归；对比度为 WCAG 公式计算值
- 禁 npm install：未装依赖、未构建；JSX 仅属性级最小编辑 + 静态审读
- detect 结果见下节

## 验证记录
- `node validate.mjs` → VALIDATE PASS（30 项检查：CHK-01 对比度 6 组逐条验算 / CHK-02 裸色与令牌 / CHK-06 4px 基线与无内联间距 / IMG alt / decisions≥ 2）
- `impeccable detect --json src/pages/Dashboard.jsx src/pages/Settings.jsx`（于 project/ 运行）→ `[]`，零发现，未引入新 CHK 发现

## 后续建议
- `/impeccable init` 补 PRODUCT.md；输入框边框 WCAG 1.4.11 议题见 decisions.log D9
