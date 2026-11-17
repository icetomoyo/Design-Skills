---
id: hm-signature-variety
title: 页面签名与连续构建防趋同
category: anti-slop
product_types: [marketing-site, creative, consumer-app]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 多页/多项目连续产出与单页差异度验收；风格材料选择见 hm-theme-material
---

每页需要一个签名——访客事后记得住的那一个东西：素材里最强的真实事物放到最好（那张就是场所的照片、产品做它唯一的工作、因为就是报价而排到巨大的价格），且必须出现在第一屏。连续构建则要防趋同：同一模型反复生成必然收敛到同一副骨架，差异化要靠机制不靠自觉。

**落地要点**

- 签名必须来自需求里的真实素材、出现在第一屏，并写进决定记录，可被复核"为什么是它"
- 镜像测试：同类相邻需求会得到完全相同的结构组合吗？会→换掉一个决定并记录换了哪个
- 结构差异对照指纹（形状、hero 姿态、导航、页脚、首区块、构图取舍六轴）：与最近三次构建重叠超过三轴即重排组合或顺序
- 模板解剖（hero+三特性+CTA+页脚）直接判为不合格
- 差异从结构轴上做，不是换色换图；同一需求同一风格建两次应产出两页
- 记忆服务多样性：保留构建日志（形状/风格/六轴指纹），对照日志判断重复，不凭记忆

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
