---
id: uu-navigation-web
title: Web 导航模式：滚动、固定栏、活动态与深链
category: component-pattern
product_types: [marketing-site, saas-dashboard, admin-console, consumer-app]
tech_stacks: [html, css, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 站点与应用级导航结构；不含标签页与命令面板
---

导航要随时能回答三问：你在这里、你从哪来、你能去哪。

- 锚点滚动平滑：html 上 scroll-behavior smooth；用户偏好减少动效时退回直跳，不做滚轮劫持
- 固定导航不得遮挡目标：锚点定位配 scroll-padding-top = 导航高度；body 等值 padding 兜底；多个固定元素（吸顶+吸底）互不覆盖并计入安全区
- 当前位置必须可见：活动项用颜色 + 下划线/背景双通道标出；侧栏高亮项与页面标题一致，不许靠位置猜
- URL 反映状态：筛选、分页、标签页、视图切换写进 query/hash——链接可分享、刷新可还原、后退不丢状态
- 3 层以上层级用面包屑：首页 / 分类 / 详情，最后一段是当前页且不可点；每段都可点击返回
- 移动端返回键行为可预期：视图切换写入历史，弹层/抽屉不写历史；关闭浮层后回退不应丢用户输入

**验证**：把当前 URL 直接发给别人打开，看到的视图应与点击进入完全一致；Tab 遍历时导航顺序 = 视觉顺序。
