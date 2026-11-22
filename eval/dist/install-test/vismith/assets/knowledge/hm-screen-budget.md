---
id: hm-screen-budget
title: 首屏预算：一屏一词量上限与 hero 最小集
category: layout
product_types: [marketing-site, consumer-app, creative]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 营销页/落地页的首屏与整页词量纪律；应用工作屏密度另论
---

没人逐字读落地页：访客每屏带走一个想法，否则离开。信息密度上限是硬预算，不是审美留白（上游列为主线规则）。

**落地要点**

- hero 最小集：不超过 7 词的标题 + 不超过 12 词的一句话 + 1-2 个动作；动作之前不得塞两个以上文本块
- 1280×800 不滚动：标题、一句话、主操作、视觉焦点全部可见
- 任一约 900px 高的视口内可见词数（含标签与表格单元格）约 80 为上限；整页 6-9 个区块、可见词 450 封顶
- hero 内容与折叠线之间出现 160px 以上空洞时，加大视觉或标题字号，绝不补文案
- 区块的"满"靠尺度、图片与排版质量，不靠加字；只剩一行文字的窄区块并入相邻区块
- hero 是且只是第一屏：占满第一个屏幕即止，不整页铺开
- 分节标题字号与体量匹配：hero 下的区块标题中位数不宜低于 40px（1440 宽）

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
