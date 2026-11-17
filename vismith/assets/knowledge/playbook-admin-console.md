---
id: playbook-admin-console
title: 企业管理后台生成要点
category: product-playbook
product_types: [admin-console]
tech_stacks: [react, vue, html]
kind: principle
source: original
scope_note: CRUD 表格+表单+权限体系的中后台；不含数据可视化大屏
---

效率优先：用户每天用 8 小时，每一像素的浪费都被放大。

- 骨架：侧栏（240-280）+ 顶栏（56-64）+ 内容区（padding 24-32，最大宽 1440-1600）
- 表格列：可排序列明确标识；数字右对齐+tabular-nums；操作列固定右侧；行高 32-36 紧凑档
- 表单：单列布局；分组标题代替多列迷宫；必填标识统一；校验错误出现在字段正下方且不改变布局高度（预留）
- 危险操作：二次确认 + 明确后果文案；主按钮每屏唯一
- 键盘：表格行可上下导航、Enter 进入详情；筛选器支持回车提交
- 状态：空表给创建入口；加载用骨架不用转圈挡屏
