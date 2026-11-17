---
id: hm-gate-tiering
title: 规则分级：底线不可豁免，默认项留痕豁免
category: anti-slop
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 设计规则库与 review 流程的约束模型；各规则的具体值见专项条目
---

规则必须声明"可否被违背"：不可豁免底线（正确性、可访问性、诚实性、禁令清单）任何产出不得违反；模型惯性默认项允许在有真实理由时豁免，但必须留痕；工艺细节只报告、作答、不阻塞（上游 Floor/Reflex/Finish 分级）。

**落地要点**

- 判入底线的标准：没有受尊敬的页面会故意违反它；或它是模型必犯的惯性，需要比业界更严的自律
- 豁免三要素：规则编号、护栏证据（能被独立复核）、针对本页的理由；说不出护栏的豁免通常站不住
- 理由拒绝模板话：与页面无关、过短、在别处逐字复用的理由一律无效
- 同一规则连续三次豁免=团队风格而非例外：固化进设计契约，停止继续豁免
- 结论分层报告：底线失败单列，"零底线失败"必须始终为真；疑似项要么确认修复、要么记录驳回
- 规则编号退役后永不复用，历史报告仍可解读

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
