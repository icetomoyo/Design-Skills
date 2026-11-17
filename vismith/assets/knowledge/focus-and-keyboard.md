---
id: focus-and-keyboard
title: 焦点可见与键盘操作落地
category: a11y
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: original
scope_note: 所有含交互控件的界面
---

键盘用户看不见 hover；焦点样式是导航系统的一部分。

- :focus-visible 必须全局存在（Tailwind: focus-visible:ring-2 ring-offset-2）；outline: none 而无替代是缺陷
- 焦点样式对比度 >=3:1，且不依赖颜色单一通道（环+偏移）
- Tab 顺序 = 视觉顺序；自定义组件用 roving tabindex 实现方向键导航
- 弹层：焦点圈进（focus trap）、Esc 关闭、关闭后焦点归还触发器
- 跳过链接（skip to content）放在 DOM 首位
- 验证：CHK-05 是启发式存在性检查；真实验证需手动 Tab 一遍
