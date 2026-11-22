---
id: rtl-basics
title: RTL（从右到左）界面基础规则
category: rtl
product_types: [saas-dashboard, admin-console, marketing-site, consumer-app, creative, data-intensive]
tech_stacks: [html, react, vue, tailwind]
kind: principle
source: upstream:unslop#620163e (CC-BY-4.0)
scope_note: 阿拉伯/波斯/乌尔都/希伯来语界面，或任何 dir=rtl 屏幕
---

多数 RTL 缺陷不是装饰问题，而是"左到右布局换了词"：先修方向，再跑常规流程。

- 根元素必须 html lang + dir="rtl"；缺失会导致对齐/字体/标点全线错位
- 全用逻辑属性：margin-inline-start / text-align:start / inset-inline-start（Tailwind: ms-*/me-*/ps-*/pe-*/start-*/text-start/rounded-s-*）；硬 left/right、ml-*/mr-* 是 bug
- 整屏镜像：侧栏到右、logo 右上、主操作从右数第一、返回箭头向右、进度条从右填充
- 禁止 transform:scaleX(-1) 翻转整容器（会镜像文字）；只对方向性图标单独翻转（返回/前进/发送），媒体控制/时钟/勾选/下载/带拉丁字母的图标不翻
- 混排：拉丁词/数字/代码/邮箱用 bdi 隔离；带符号数字（+12%）用 bdi dir="ltr"；邮箱/URL/电话输入框保持 dir=ltr + text-align:end
- 数字：全屏统一西文或阿拉伯-印度数字不混用；用 Intl.NumberFormat 格式化
- 阿拉伯文排版：字距恒为 0；无斜体无大写；正文 15-17px；行高正文 1.6-1.8、标题 1.3-1.4；标点用阿拉伯文形式；hype 词同样禁

> 改写自 unslop（https://github.com/heydamir/unslop），Damir Sokolovsky（@heydamir），CC BY 4.0，有修改。