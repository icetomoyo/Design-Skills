---
id: playbook-data-intensive
title: 数据密集型界面生成要点
category: product-playbook
product_types: [data-intensive, saas-dashboard]
tech_stacks: [react, vue]
kind: principle
source: original
scope_note: 大表格、监控列表、编辑器类高密度操作界面
---

- 密度是功能：行高 32 起步；斑马纹默认不用，用 hairline 分行；列宽可调且记忆
- 数字纪律：统一格式与精度；tabular-nums；单位与千分位一致；变化列带基准
- 溢出防御：长文本 ellipsis + 悬停完整值；表格容器可横向滚动但关键列冻结
- 虚拟滚动：>100 行考虑虚拟化；先测再上
- 操作就近：行内快捷操作放悬浮或固定列；批量操作选中后出现在表格上方
- 空态与错误态是常态路径，不是边界情况
