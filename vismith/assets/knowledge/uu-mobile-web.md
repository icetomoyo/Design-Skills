---
id: uu-mobile-web
title: 移动端触控与响应式基线
category: ux-pattern
product_types: [consumer-app, marketing-site, saas-dashboard, admin-console]
tech_stacks: [html, css, react, vue, tailwind]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 手机浏览器与 WebView 的触控/视口基线；桌面端不适用
---

- 触控目标：iOS 44pt、Android 48dp 是舒适值；Web 下限是 WCAG 2.2 的 24x24 CSS px，相邻目标间距 >=8px，否则误触
- viewport：width=device-width, initial-scale=1；禁用缩放是缺陷——iOS 输入聚焦会自动放大，正解是字号 >=16px 而不是禁缩放
- 触发延迟：touch-action manipulation 消除约 300ms 点击延迟
- 手势：自定义横滑避开主内容区（与系统返回手势冲突）；下拉刷新只在真正的信息流列表启用；关键确认配触觉反馈
- mobile-first：先写移动样式再叠加断点；必测宽度 320/375/414/768/1024/1440，320px 处不得出现横向滚动条
- 图片 max-width 100% 且带宽高比属性；表格在移动端用横滚容器（露出滚动提示）或转卡片列表，全局二选一
- hover 不可依赖：触屏没有 hover，任何 hover 提示必须有 tap/聚焦等价物；主操作用 click/tap 触发

**验证**：320px 宽度下无横向滚动；所有可点元素 >=24px 且间距 >=8px；单手拇指可及主操作。
