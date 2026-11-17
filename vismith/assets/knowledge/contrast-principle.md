---
id: contrast-principle
title: 文本对比度是硬约束不是审美偏好
category: a11y
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: original
scope_note: 所有含正文文本的界面；大字号（>=24px 或 18.66px 粗体）阈值可放宽到 3.0
---

正文与背景的 WCAG 对比度必须 >= 4.5:1，大字号 >= 3.0:1。这不是风格偏好，而是可读性的下限。

**落地要点**

- 在 Design Contract 里固定 neutrals 阶梯时，先用最低两档在 surface 上各算一遍对比度，淘汰不达标的档位，再进入美学调整
- 灰字配灰底是 dashboard 最常见的失效模式：次要文本常用中性色第 3-4 档，若 surface 也是浅灰，两者很容易跌破 4.5:1
- 禁止用 opacity 降低文本对比度；需要"弱化"时换成更浅的中性色并验证比值
- 深色模式单独验证：同一名义色在明暗两个 surface 上的比值不同，tokens 应声明两套 neutrals
- 用 checks.mjs 的 CHK-01 验证，不要靠目测——人眼对 3.5:1 与 4.5:1 的差异几乎无感

**验证**：node scripts/checks.mjs <目标文件> --contract .vismith/contract.json，CHK-01 无 error。
