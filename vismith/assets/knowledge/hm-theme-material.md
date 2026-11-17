---
id: hm-theme-material
title: 风格主题是材料不是版式
category: style-direction
product_types: [marketing-site, creative, consumer-app]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 风格方向定义与主题/风格库设计；不涉及图片资产库
---

一套风格只声明页面"由什么构成"——纸面、墨色、字体、规则线、圆角、深度、纹理、控件形态、动效分寸、文案嗓音——从不声明页面装什么、什么顺序、什么形状、各占多大空间。版式与间距是独立纪律，对所有主题一视同仁（上游主题契约）。

**落地要点**

- 材料从内容世界推导：新闻纸=黑白照片+衬线标题；双色油印=两色分离；暖调工作室=自然照片。不从"留白多=高级"这类版式语汇推导
- 主题不携带：组件、签名物件、区块序列、强制导航/页脚/hero、成文文案、虚构品牌名
- 冲突裁决顺序：用户原话 > 全局底线 > 主题材料 > 版式/工艺默认；主题只在材料维度赢
- 主题需回答"没有照片时材料能做什么"：大号排版的数字、规则线拉成的表格、accent 色带承表单——这决定图片稀缺时页面是否还成立
- 校验：把主题材料套到相邻品类，若只有版式在撑场面，说明主题没定义出材料

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
