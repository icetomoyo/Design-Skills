---
id: uu-layout-stability
title: 布局稳定性与层叠纪律
category: layout
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app]
tech_stacks: [html, css, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 防 CLS 与 z-index 治理；视觉层次原则见 layout-hierarchy
---

内容跳动是信任杀手：任何后到元素（图片、徽章、校验文本、骨架替换）都必须有预留空间。

- z-index 走阶梯 token（10 内容浮层 / 20 下拉 / 30 抽屉 / 50 模态 / 60 toast），禁 9999 魔法数；阶梯进契约 tokens
- transform/opacity/filter 会开新层叠上下文：嵌套弹层内 z-index 再大也出不了父层，先查父级再调子级
- 移动端视口：100vh 被浏览器工具栏吞掉，用 dvh/svh；固定元素互相避让并计入安全区
- 正文可读性数值：行长 65-75ch 封顶、行高 1.5-1.75（大标题 1.1-1.3）；max-width 限文本不限背景
- 长 token（URL/ID/哈希）用 overflow-wrap anywhere，并允许 flex/grid 文本子项收缩，防整页横向溢出
- overflow hidden 是风险位：裁切前确认内容永不超高；容器高度由内容驱动，不写死
- 图片/iframe 一律 aspect-ratio 或宽高属性占位；异步到达的徽章/计数用 min-width 占位

**验证**：节流网络 + 慢 CPU 下滚动全页，观察是否有元素把后续内容顶下去（CLS）。
