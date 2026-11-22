---
id: slop-signs-visual
title: AI 模板化视觉症状清单（可静态检测）
category: anti-slop
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:unslop#620163e (CC-BY-4.0)
scope_note: review/refine 终检用；逐条对应可检测代码特征，v0.2 起进入 checks 规则
---

症状 -> 修复（成对使用，命中症状才开方）：

- 紫蓝/紫粉渐变用于背景/卡片/按钮 -> 单一中性表面，accent 只给有语义处
- 渐变文字标题 -> 纯色主文本
- 彩色 glow（大 blur 彩影/emoji 投影/发光 pill）-> 删除，深度用表面阶梯+hairline
- 内容后模糊光斑/径向色洗 -> 删除
- 高饱和彩边 -> 6-10% 透明度 hairline
- 同色系五六个近似 tint 做文字 -> 一个中性 ramp 的三个文字角色
- 全都在强调=无强调 -> 每屏 accent 用 1-2 次
- 玻璃卡（白内高光+彩影）-> 普通浮起面+hairline
- 标题 weight 800-900 -> 400-500 靠字号分层
- 全大写+宽字距标签 -> 句首大写+正常字距
- 数字格式混乱/前导零 -> 统一格式+tabular figures
- 小字负字距 -> 归零或微正
- emoji 作图标/状态 -> 单一线性图标集或不用
- 任意值间距 mt-[13px] -> 4px 阶梯
- animate-pulse/ping 用于非实时内容 -> 静态；transition-all/hover:scale -> 色彩或表面变化

> 改写自 unslop（https://github.com/heydamir/unslop），Damir Sokolovsky（@heydamir），CC BY 4.0，有修改。