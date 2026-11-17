---
id: hm-evidence-discipline
title: 证据纪律：无来源的数字、证言与 logo 墙一律不出现
category: copy
product_types: [marketing-site, consumer-app, saas-dashboard, creative]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 营销/落地页文案可信度与指标证言素材；界面内实时数据走数据契约
---

文案可信度的底线是每个事实可溯源：编造一个没人给过的数字、一句没人说过的证言、一面没人授权的 logo 墙，与编造功能同罪，都是对访客说谎（上游列为不可豁免底线）。用户没给的事实就是不存在，不做推断填充。

**落地要点**

- 指标、客户数、评分、案例数：只有用户提供的才出现；没给就留文本槽位并在交付说明中列出，不用"10,000+ 用户"之类占位
- 样本内容只展示形状：示例期刊、菜名、曲目可以造，但不得包含可被当真的价格、日期、人名、数量、评价
- 证言必须带真实署名；logo 墙需要授权清单，缺一即删
- 裸数字不做唯一主标题：数字当标题时必须带单位、口径，并配一句"它意味着什么"
- 产品可达（URL、dev server、仓库、本机应用）时用真实截图，不造假界面；尚不可达时按样本纪律构建并注明待补截图
- 交付时逐项列出占位素材：位置、尺寸、应该放什么

**验证**：抽查页面中每个数字/引语/logo，能指出用户输入或数据来源；指不出的删除或明确标记为样本。

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
