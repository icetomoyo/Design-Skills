---
id: uu-search-bulk
title: 搜索体验与批量操作
category: ux-pattern
product_types: [admin-console, data-intensive, saas-dashboard]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 列表/表格上的检索与多选编辑；表格密度与列纪律见 tables-density
---

- 自动补全：输入即出预测（防抖 200-300ms）；预测首项高亮可感知时 Enter 直达；比让用户打全再搜便宜得多
- 无结果不是死胡同：给拼写建议、热门项、清除筛选入口；文案与"确实没有数据"的空态区分开
- 多选：复选框列 + 表头全选（含跨页全选的显式入口）；选中后出现操作条（已选 N 项 | 批量动作 | 清除），右键菜单不做唯一入口
- 批量动作覆盖管理台高频重复：删除/移动/改状态/导出；动作文案随数量变形（"删除 3 项"）
- 批量执行给汇总反馈：成功 N、失败 M、失败原因清单，失败可重试；部分失败不静默
- 搜索状态进 URL：关键词、筛选、页码可分享可后退；返回列表不丢上下文
