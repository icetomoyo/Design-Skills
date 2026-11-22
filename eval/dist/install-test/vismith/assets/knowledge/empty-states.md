---
id: empty-states
title: 空/加载/错误状态设计
category: ux-pattern
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 所有含异步数据的界面
---

四态是正常路径，不是异常处理。

- 空态：说明为什么空 + 给一个出路（创建/清除筛选/了解功能）；首次空态可教学但不挡操作
- 加载：区域骨架（形状与最终布局一致）；不用全屏转圈；列表加载不跳动（固定行高占位）
- 错误：人话 + 重试入口 + 错误码折叠；不嘲笑用户不甩锅"未知错误"
- 成功：轻反馈（toast/行内高亮）除非流程终结（结算/提交）才用大反馈
- 所有状态文案与 copy-tone 一致；图标辅助但不替代文字
