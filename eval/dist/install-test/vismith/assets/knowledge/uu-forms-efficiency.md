---
id: uu-forms-efficiency
title: 表单效率深化：输入类型、自动填充与错误摘要
category: ux-pattern
product_types: [admin-console, saas-dashboard, consumer-app, marketing-site]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 录入效率与输入法层；表单布局与校验时机基础见 forms-ux
---

- 输入类型用对：email/tel/url 触发正确键盘与原生校验；纯数字输入配 inputmode（decimal 等）并慎用 type=number（长数字步进/前导零陷阱）
- autocomplete 配全（name、email、postal-code、one-time-code 等）且 name/id 稳定：浏览器自动填充是最强的效率功能，别挡它
- 密码框默认遮蔽 + 显式"显示/隐藏"切换；不拦截粘贴与密码管理器（WCAG 2.2 认证要求）
- 同一流程不重复要数据：已录入的信息自动带入或让用户确认复用，而不是再输一遍
- 提交失败给顶部错误摘要：置于表单顶部、聚焦摘要标题、每条错误链接跳到对应字段、行内错误保留；字段 <=3 个时只用行内错误即可
- 中日韩 IME：组词期间的 Enter 是确认候选不是提交——keydown 里检查 isComposing（旧浏览器 keyCode 229）再决定是否提交；保留 Shift+Enter 行为与显式提交按钮兜底

**验证**：用浏览器自动填充和中文输入法各走一遍表单，观察误提交与键盘切换。
