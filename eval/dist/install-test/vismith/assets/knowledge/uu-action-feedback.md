---
id: uu-action-feedback
title: 操作反馈：按钮状态、确认与 toast
category: ux-pattern
product_types: [saas-dashboard, admin-console, consumer-app, marketing-site]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 操作级即时反馈；页面级空/加载/错误态见 empty-states
---

每个操作都要有可感知的"收到-处理-结果"链路，反馈强度匹配后果严重度。

- 异步按钮：点击即禁用 + 内联 loading（转圈或进度文案），杜绝双击重复提交；完成给成功反馈，失败给错误 + 重试入口
- toast 只承载非关键瞬时信息：3-5 秒自动消失、可手动关闭；错误和需要用户操作的信息不用 toast（会消失），用驻留面板
- 破坏性/不可逆操作先确认：确认文案点名对象（"删除订单 #1024"）；低风险操作不确认，否则训练用户无脑点"确定"
- 多步过程显式进度：步骤指示器或进度条；可预估时给文案（"约需 30 秒"）；步骤可回退
- pressed/active 态即时可见（按压缩放 0.97-0.98 或变色）；hover 只是增强通道
- 快速连续操作时取消在途过渡动画、直接落到最终语义状态，避免动画与状态打架

**验证**：网络节流 + 断网下走一遍主流程，检查 loading、错误呈现、重复点击三处是否稳。
