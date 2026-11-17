---
id: uu-charts-selection
title: 图表选型决策表
category: visualization
product_types: [saas-dashboard, data-intensive, admin-console]
tech_stacks: [react, vue, html]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 图表类型选择；可访问性与渲染阈值见 uu-charts-a11y
---

按数据问题选型，不按好看选型。

- 趋势（时间轴）→ 折线；<4 个点改统计卡；>6 条系列即噪声，拆图或聚合
- 类别比较 → 条形图，按值降序；类名长用横条；>50 类别改分页表格
- 部分占整体 → 饼/环 <=6 片，最大片从 12 点钟起、每片直接标百分比；更多类别改 100% 堆叠条
- 分布/相关 → 散点；>=500 点用 0.6-0.8 透明度显密度；第三维用气泡大小
- 目标达成 → 单指标仪表盘/子弹图；3-10 个 KPI 用子弹图网格，不排一排仪表盘
- 预测 → 实际值实线 + 预测虚线 + 置信带（同色 15% 填充）；预测区间 <= 可视 x 轴范围 30%
- 层级占比 → treemap/sunburst；<200 节点直接画，更多先取 top N
- 漏斗/流程 → 3-8 阶段；桑基 <50 流用 SVG；小步骤聚成"其他"
- 累计变化 → 瀑布 4-12 根柱；超出 12 根合并小项为"其他"
- 多维对比 → 雷达限 2-3 组数据、5-8 轴；更多轴改平行坐标
- 关系网络 → <=100 节点 SVG；更多先聚类再画
- K 线/实时流 → Canvas 渲染；可见 <=500 根；流式缓冲 60-300 秒

选错的信号：用户要反复 hover 才能比较、图例超一屏、看图的人截图去 Excel 重算。
