---
id: uu-wcag22
title: WCAG 2.2 新增标准的落地清单
category: a11y
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, data-intensive]
tech_stacks: [html, css, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 2.2 相对 2.1 的新增/调整项；基础对比度与键盘要求见既有条目
---

- 指针目标 >=24x24 CSS px（2.2 AA 目标尺寸下限）；间距等效可豁免；移动端仍按 44/48 舒适值执行
- 焦点不被遮挡：吸顶/吸底元素不盖住键盘焦点所在元素，配 scroll-padding；增强级要求焦点完全可见
- 焦点指示器 >=2px 周长的等效面积、与相邻色对比 >=3:1；outline none 无替代即违规
- 拖拽操作必须有单击/键盘替代：拖拽排序同时提供上移/下移按钮或菜单
- 帮助入口位置一致：客服/自助/自动帮助在同流程各页同一相对位置，不换位
- 认证不依赖纯认知测试：允许粘贴与密码管理器，提供 passkey/OAuth 等非记忆路径
- 不重复录入：同一流程已提供的信息自动回填或可选复用
- 200% 缩放与用户间距覆盖（行高 1.5 倍、段距 2 倍、字距 0.12 倍、词距 0.16 倍）不丢内容不破版：用流动尺寸、无单位行高、内容驱动高度，禁固定高容器锁死文本

**验证**：浏览器 200% 缩放 + Tab 到被 sticky 遮挡的元素，两处都不应丢内容或焦点。
