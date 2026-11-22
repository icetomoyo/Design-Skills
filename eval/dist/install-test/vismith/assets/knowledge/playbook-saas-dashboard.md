---
id: playbook-saas-dashboard
title: SaaS Dashboard 生成要点
category: product-playbook
product_types: [saas-dashboard]
tech_stacks: [react, vue, html]
kind: principle
source: original
scope_note: 订阅制 SaaS 的指标总览/概览页；不含管理后台 CRUD
---

首屏三问：现在怎么样（核心指标）、哪里要我看（异常/待办）、我能做什么（快捷操作）。

- 信息架构：KPI 行（3-4 张同高指标卡，只放数字+标签+变化）-> 主图（占内容宽 2/3 以上，280-360 高）-> 明细列表/表格。第二数据块用列表或表格，不再放第二张同权重图
- 密度：operate 意图默认紧凑（行高 32-36）；留白服务于扫读，不服务于呼吸感
- 颜色：一个中性 ramp 承载全部表面；accent 只给主操作、选中态和唯一关键数字，占屏面积极小
- 状态：所有指标必须有对比基准（vs 上期），无基准的数字是装饰
- 变化值永远带方向与基准：+12% vs last month
