---
id: uu-charts-a11y
title: 图表可访问性与大数据渲染阈值
category: visualization
product_types: [data-intensive, saas-dashboard, admin-console]
tech_stacks: [react, html, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 图表的读屏与渲染落地；选型见 uu-charts-selection
---

- 每张图配可见数据表 + 一句话结论摘要：表是可访问的事实源，图是补充视图而非唯一载体
- 键盘等价物：focus 显示与 hover 相同的数值；+/- 按钮缩放替代拖拽 brush；Enter 钻取、Back 返回；实时图提供暂停/继续
- 系列区分禁纯色相：折线用实/虚/点线型 + 直接标签；散点用形状分组；涨跌语义（红绿）必须叠加符号或正负号
- 色板 <=6 色；面积填充 15-20% 透明度；热力图带数值色标图例，单元格可打印数值/符号
- 渲染阈值：<1000 点 SVG；>=1000 点 Canvas + 降采样；>10000 点先按时间/类别聚合再画
- 结构上限：日历热图 365 格/SVG；散点 >5000 改 hexbin；桑基 >200 流并入"其他"节点；treemap >1000 节点先过滤；网络图 >500 节点必须聚类
- 实时流 <=60fps、Canvas，旧数据滚动时降采样；异常用独立数据层（形状 + 文本注释）标记，不只靠红色
- 库基线：通用 Chart.js/Recharts；深度定制 D3；K 线 TradingView Lightweight；>=1000 区域的地图用 Deck.gl/Canvas

**验证**：禁用 hover 只用键盘走一遍取数路径；慢设备上数一数可见节点数。
