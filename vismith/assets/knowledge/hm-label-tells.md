---
id: hm-label-tells
title: 标签的机器痕迹：眉题、全大写字距与等宽标签
category: anti-slop
product_types: [marketing-site, saas-dashboard, admin-console, consumer-app, creative]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 标签/caption/表头/导航链接的字体处理；大写宽字距的通用修复另见 slop-signs-visual
---

标题前那行宣告标题的小字（眉题）是最常见的机器痕迹，无论几何形态——堆叠、并置、pill、序号、卡片上的品类标签、"TRUSTED BY"+logo 墙（上游列为主线禁令）。

**落地要点**

- 删除测试：删掉这行，页面若只少了"给下文起的名字"，它就是眉题，删；区段换其他方式开——把平实标签升为标题、用事实句、用数字
- 合法保留的小字必须携带读者本来缺的信息：figcaption、表头、label、导航/标签页名、署名、时间、数字后的单位、真实文件名、实时状态
- 标签统一正文字体小一档、句首大写、零字距；15px 及以下的大写/small-caps/字距超过 0.03em 即命中
- 等宽字体不做标签化妆：display 与正文都不是等宽、内容也不是代码/数据/度量时，标签回归正文字体
- "TRUSTED BY"式眉题同时违反证据纪律（见 hm-evidence-discipline）

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
