---
id: tables-density
title: 表格与数据列表的密度控制
category: component-pattern
product_types: [admin-console, data-intensive, saas-dashboard]
tech_stacks: [react, vue, html]
kind: principle
source: original
scope_note: 数据表格与列表视图；不含看板/日历
---

- 列纪律：默认列 < 视觉列宽上限；次要列收进"列设置"；操作列固定
- 对齐：文本左（RTL:start）、数字右+tabular-nums、状态用点+文本不只靠色
- 行态：hover 高亮、选中持久、编辑态行内展开不跳页
- 分页或滚动二选一并保持全局一致；跳页输入框对大表是刚需
- 空表：区分"无数据"与"筛选无结果"，后者给清除筛选入口
- 密度档位进契约（components.table.density），不逐页手调
