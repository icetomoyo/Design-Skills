---
id: forms-ux
title: 表单布局与校验呈现
category: ux-pattern
product_types: [admin-console, saas-dashboard, consumer-app]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 业务表单与流程页；搜索框等单字段不在此列
---

- 布局：单列优先；相关字段分组（标题或间距），不用多列迷宫；移动端永远单列
- 标签：顶部对齐最稳；左对齐只用于极简短字段集；placeholder 不是标签
- 校验时机：失焦校验 + 提交兜底；错误消息在字段正下方、aria-live 播报、首错聚焦
- 错误文案说怎么修："请输入 11 位手机号"优于"格式错误"
- 必填与选填：统一一种标识并在表单开头声明；长表单分步+进度指示
- 提交：按钮状态表达进行中/成功/失败；防重复提交；离开确认只在有未保存数据时
