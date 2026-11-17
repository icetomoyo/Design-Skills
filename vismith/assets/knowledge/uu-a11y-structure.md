---
id: uu-a11y-structure
title: 语义结构无障碍：标题、命名与播报
category: a11y
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 结构与读屏层；对比度见 contrast-principle、键盘焦点见 focus-and-keyboard
---

- 标题层级不跳级：每视图一个 h1，h2-h6 按序嵌套；读屏用户靠标题列表跳转页面，标题是导航不是装饰
- 图标按钮必须有可访问名称（aria-label 或视觉隐藏文本）；纯装饰图标 aria-hidden
- 信息不靠颜色单通道：状态点配文本、图表系列配线型/直接标签、必填标记除星号外加文字说明
- img：信息图 alt 描述内容与结论；装饰图 alt 空；复杂图表配长描述或数据表
- 语义元素优先：button/a/nav/main/header 承载行为与地标；div+onclick 是缺陷，先找原生元素
- 动态更新播报：错误用 role=alert（assertive），后台变化用 aria-live polite；播上下文短语（"购物车共 3 件"）不播裸数字、不移动焦点
- 跳过链接（skip to content）放 DOM 首位、聚焦才显形，指向 main 的 id

**验证**：只用读屏（或暂时关显示器）完成一次核心任务；标题列表能还原页面结构。
