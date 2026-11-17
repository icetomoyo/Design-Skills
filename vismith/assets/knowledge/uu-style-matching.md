---
id: uu-style-matching
title: 风格选型：产品类型与品牌共同决策
category: style-direction
product_types: [marketing-site, saas-dashboard, consumer-app, creative, admin-console]
tech_stacks: [html, tailwind, react]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 新项目/重设计起步的风格方向；具体数值体系见 tokens-starting-values
---

风格是约束集不是皮肤：先取产品类型的安全默认，再按 brand.personality 有意识地推移。

- 企业 SaaS/工具：Minimalism/Swiss + Flat 起步；玻璃拟态只做浮层点缀，不做信息承载面
- 数据密集/BI：Data-Dense Dashboard + 高对比中性色；忌 Aurora 大渐变与重动效背景抢数据
- 金融/交易：Dark OLED 或 Swiss + 信任色系；对比度与实时可读性优先于氛围
- 电商/消费增长：Vibrant & Block-based，视觉层级强、CTA 对比直接
- 政务/医疗/无障碍优先：Accessible & Ethical——达标本身就是风格的一部分
- 创意机构/作品集：Neubrutalism/Brutalism 允许强个性，但仍要过换名测试与可读性底线
- 选型必查禁用面：Neumorphism 禁用于数据密集与高对比要求场景；3D/视差成本高（动画+大图），低端机与动效敏感用户场景禁用
- 每个风格带三项决策属性：性能成本（low/moderate/high）、RTL 支持级别（full/partial/caveats）、明暗模式支持——进契约 constraints 记录
- 落地纪律：主风格 1 个 + 点缀风格 1 个；三种以上混用等于没有风格
