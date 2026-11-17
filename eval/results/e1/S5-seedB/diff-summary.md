# S5-seedB · refine diff 摘要（最小 diff）

对象：eval/results/e1/S5-seedB/project/（复制自 eval/fixtures/s5-project/，原 fixtures 未动）
路线：[vismith] mode=refine category=saas-dashboard intent=operate
判档：heavy（修复前 error 2 / warning 4）→ 分层修复：层1 确定性 a11y error → 层2 契约偏离；层3/4 无发现不动。

## 修复清单（问题 -> 方案 -> 文件:行）

1. img 缺 alt（CHK-06 error）-> 补 alt="第三季度运营横幅" -> src/pages/Dashboard.jsx:44
2. 交互元素无 focus-visible 方案（CHK-05 error）-> 链接与保存按钮加 focus-visible:ring-2 focus-visible:ring-accent-600 -> src/pages/Dashboard.jsx:38、src/pages/Settings.jsx:17
3. 标签色 #94A3B8 对白底 2.57:1 < 4.5:1（a11y 硬规则）-> text-ink-600（7.58:1，与同排标签一致）-> src/pages/Dashboard.jsx:15、src/pages/Settings.jsx:14
4. SLA 值 #FF6B35 对白底 2.84:1，text-3xl(30px) 大字号阈值 3.0 也不达 -> text-accent-600（6.70:1，保留强调）-> src/pages/Dashboard.jsx:24
5. 链接硬编码紫 #7C3AED 脱离调色板 -> text-accent-600 品牌链接色 -> src/pages/Dashboard.jsx:38
6. 间距 17px/13px 违反 4px 基线（CHK-02 magic-spacing + CHK-03）-> 就近归位 mb-16 / mt-12（16/12 均在 scale）-> src/pages/Dashboard.jsx:8,13
7. 内联 boxShadow rgba 计为硬编码色（CHK-02）-> 晋升 token boxShadow.card（值不变）并用 shadow-card 类 -> tailwind.config.js:11、src/pages/Dashboard.jsx:14

## checks 计数（node vismith/scripts/checks.mjs project/src --contract .vismith/contract.json）

| | error | warning | info |
|---|---|---|---|
| 前（checks-before.json） | 2（CHK-05、CHK-06） | 4（CHK-02×3、CHK-03） | 1（CHK-01 配对全过） |
| 后（checks-after.json） | 0 | 0 | 1（CHK-01 配对全过） |

--strict 退出码 0；contract validate 通过。全部 diff：2 个 JSX 共 8 行修改、tailwind.config 新增 1 行 boxShadow token；无新增依赖、无组件库/技术栈变化、无布局结构变化。

## 产出文件

- project/.vismith/contract.json（转正契约，validate 通过）、contract.draft.json（extract 草稿留档）
- project/.vismith/decisions.log.md（9 条决策）、exceptions.md（无例外）、rules.json（{}）
- checks-before.json / checks-after.json / diff-summary.md（本文件）
