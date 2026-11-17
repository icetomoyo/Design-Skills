---
id: hm-fake-send-ban
title: 假成功反馈禁令：未接线的表单不得显示"已发送"
category: ux-pattern
product_types: [marketing-site, consumer-app, saas-dashboard, admin-console]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 任何含提交/预订/订阅/保存动作的表单与控件；状态呈现细节见 forms-ux
---

表单在没有后端请求的情况下打印成功（"已发送""已预订""你已在名单上"），是编造结果，与编造指标同样不诚实（上游不可豁免底线）。确认了需求从未承诺的事同样违规。

**落地要点**

- 未接线的表单：前端校验可用、提交不产生成功态，明示"表单尚未连接，未实际发送"
- 不虚构范围外结果：按钮写"预订"就只确认预订相关的真实响应
- 成功反馈只在真实请求返回后出现；进行中/失败态可以先实现
- 效果对用户可见时不弹庆祝性 toast；toast 只用于失败与不可见的效果（上游：silent success）
- 交付说明列出每个待接 endpoint：表单名、字段、目标地址

**验证**：断网或拦截请求的状态下操作全部提交控件，任何"成功"文案都不允许出现。

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
