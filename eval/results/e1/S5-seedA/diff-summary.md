# S5 refine · diff 摘要（seed A）

对比基准：`eval/fixtures/s5-project/` → 工作对象 `eval/results/e1/S5-seedA/project/`

## 源码改动（3 文件，+11 / −9 行）

| 文件 | 行 | 改动 | 性质 |
|---|---|---|---|
| project/src/pages/Dashboard.jsx | 8 | `style={{marginBottom:'17px'}}` → `className="mb-16"` | 间距归位 4px 基线（L2 token 偏离） |
| project/src/pages/Dashboard.jsx | 13 | `style={{marginTop:'13px'}}` → `mt-12` | 间距归位（13→12，视觉差 1px） |
| project/src/pages/Dashboard.jsx | 14 | 内联 `boxShadow rgba(0,0,0,.08)` → `shadow-card` | 硬编码色 → token（值不变，渲染不变） |
| project/src/pages/Dashboard.jsx | 15 | `style={{color:'#94A3B8'}}` → `text-ink-600` | 对比度 2.56→7.58:1（L1 a11y 硬规则） |
| project/src/pages/Dashboard.jsx | 24 | `style={{color:'#FF6B35'}}` → `text-accent-600` | 对比度 2.84→6.70:1 + 硬编码消除 |
| project/src/pages/Dashboard.jsx | 38 | `style={{color:'#7C3AED'}}` → `text-accent-500` + `focus-visible:ring-2` | 硬编码消除（5.70→5.17:1 均达标）+ 键盘焦点 |
| project/src/pages/Dashboard.jsx | 44 | `<img>` 补 `alt="第三季度运营横幅"` | CHK-06 img-alt |
| project/src/pages/Settings.jsx | 14 | `style={{color:'#94A3B8'}}` → `text-ink-600` | 对比度 2.56→7.24:1（ink-50 底），与相邻 label 一致 |
| project/src/pages/Settings.jsx | 17 | 补 `focus-visible:ring-2 focus-visible:ring-accent-600` | 键盘焦点（CHK-05，heuristic 经确认） |
| project/tailwind.config.js | 11 | + `boxShadow: { card: '0 1px 3px rgba(0,0,0,.08)' }` | 新增 1 个 shadow token（决策已记 decisions.log） |

## 未改动（invariants 保持）
- 布局结构：4 列指标卡网格、未分配工单列表（前 8 条 + /tickets/<id> 链接逻辑）、banner、表单字段与顺序 —— 全部原样
- 技术栈/依赖：React + Tailwind，package.json 零改动；未换库、未重构
- 配色体系：accent 蓝 + ink 中性原值未动（只修用法，不改值）

## 新增契约产物（.vismith/）
contract.draft.json（extract 草稿）、contract.json（人工转正，validate 通过）、decisions.log.md（7 条决策）、exceptions.md（无未决例外）

## checks 前后
- before（checks-before.json）：error 2 | warning 4 | info 1
- after（checks-after.json）：error 0 | warning 0 | info 1（仅 CHK-01 契约配对全过提示）
