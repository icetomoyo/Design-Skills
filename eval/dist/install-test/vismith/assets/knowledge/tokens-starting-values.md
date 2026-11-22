---
id: tokens-starting-values
title: Tokens 起步数值体系
category: tokens
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:unslop#620163e (CC-BY-4.0)
scope_note: 无既有体系时的起步默认；项目已有良好体系则只修用法不改值
---

起步值不是风格，方向可以移动它们；进入契约后即为本项目值。

- 间距阶梯：4,8,12,16,20,24,32,40,48,64,80,96,128；控件内 4-12；相关项间 2-8；组间 12-24；节间 32-64（落地页节 80-128）；行高 32 紧凑/36 默认/44 触控
- 应用布局：侧栏 240-280；顶栏 56-64；导航行 32-36；内容 padding 24-32，上限 1440-1600
- 中性 ramp：三档气质（graphite 中性/warm 暖/ink 冷），明暗各七角色（最深层/页面底/卡/浮起/hairline=主文 8%/主文/次文/弱文）；弱文仍需接近 4.5:1
- 语义色：正 #16a34a(亮)/#4cc38a(暗)；负 #dc2626(亮)/#e5484d(暗)
- accent：来自品牌或"世界"（暖->琥珀/珊瑚；冷->钴/青；自然->苔绿）；紫蓝渐变不是品牌色；accent 只占屏百分之几
- 字号阶（px）：12 标签/13-14 辅助/14-15 正文/16-18 词标/18-20 副标/28-32 数字/28-36 页题/56-72 hero（移动 36-44）；<16px 字距 0，56px+ 可 -0.03em
- 圆角：键帽/标签 4-6；行/输入/按钮 8-10；卡 12-16；面板 14-20；嵌套公式：内=外-padding，不低于 4
- 动效：单一缓动 cubic-bezier(0.22,1,0.36,1)；hover 120-180ms/浮层 160-220ms/进场 300-500ms；只动 color/bg/border/opacity/transform

> 改写自 unslop（https://github.com/heydamir/unslop），Damir Sokolovsky（@heydamir），CC BY 4.0，有修改。