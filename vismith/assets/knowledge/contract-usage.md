---
id: contract-usage
title: 何时契约优先于通用建议
category: ux-pattern
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue]
kind: principle
source: original
scope_note: 所有模式；知识库建议与契约冲突时本条裁决
---

已确认的决策不再重新发明。

- 契约（含例外）> 知识库建议 > 类别默认。检索命中的知识若与契约 tokens 冲突，以契约为准并在回复中说明
- 例外是契约的一部分：exceptions.md 里批准过的偏离是合法状态，不算违规
- 新决策落位：一次性的走 exceptions（带复审期）；会成为惯例的改契约并记 decisions.log
- 契约缺失时知识建议生效，但要在回复中标注"当前无契约，以下为类别默认"
- 每次变更契约后跑 contract.mjs validate
