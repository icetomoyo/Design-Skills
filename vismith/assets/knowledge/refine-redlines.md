---
id: refine-redlines
title: Refine 模式的红线纪律
category: ux-pattern
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 所有精修任务；redesign 不受最小 diff 约束但仍受 invariants 约束
---

精修的第一目标是"不造成伤害"。

- 最小 diff：只改达成目标的行；不顺手重构、不换库、不改命名、不调格式
- invariants 是红线：契约中的 functional/behavior 红线（如全局搜索必须保留）优先于任何美学收益
- 有意变化 vs 回归：视觉变化要能说出理由；功能行为变化默认是回归
- 修复顺序：确定性 error -> 契约偏离 -> 层次密度 -> 状态完整性；一层做完重跑 checks
- 报告里区分"已修复/已确认不改（例外）/建议但未动"
