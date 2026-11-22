---
id: layout-hierarchy
title: 视觉层次与密度权衡
category: layout
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 所有界面；密度目标由产品类别与访客意图轴给定
---

层次三通道：尺寸、重量、颜色——每通道最多 3 档，且不要三通道同时全开。

- 每屏一个主焦点：先问"这屏最重要的东西是什么"，其余元素在尺寸/颜色上让位
- 分组靠间距不靠线：组内间距 < 组间间距（约 1:2 以上）；hairline 只在间距不够时用
- 密度匹配任务：operate 类界面紧凑是尊重用户时间；read/persuade 类留白是引导
- 网格：12 列起步，但允许主内容打破（hero 图跨列）；对齐是纪律，对称不是
- 视觉重量审计：眯眼测试——模糊后还能分出 1-2-3 级即合格
