---
id: motion-restraint
title: 动效克制原则与默认参数
category: ux-pattern
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 所有界面动效；数值参考 unslop 数值体系（见 tokens-starting-values）
---

一个缓动曲线统治全局；时长有档；属性有边界。

- 缓动：cubic-bezier(0.22, 1, 0.36, 1) 全站唯一；不混弹簧与 overshoot（游戏化场景除外）
- 时长档：hover/按压 120-180ms；菜单/浮层 160-220ms；进场/布局 300-500ms；列表 stagger 40-60ms 且最多 6 项
- 只动 color/background/border/opacity/transform；禁动 width/height/top/left
- 进场位移 6-12px；按压缩放 0.97-0.98；hover 缩放默认不用
- 禁用 animate-pulse/ping 于非实时内容；prefers-reduced-motion 全局尊重
