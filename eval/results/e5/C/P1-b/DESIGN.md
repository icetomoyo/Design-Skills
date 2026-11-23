---
name: 概率观测年鉴（马尔可夫链讲解页）
description: 气象台观测年册 × 朱丝栏账簿的中文数学科普单页设计系统
colors:
  paper: "#edf0ee"
  paper-2: "#e4eae6"
  paper-3: "#dae2dd"
  ink: "#20313e"
  ink-2: "#48596a"
  rule: "#b6c2ba"
  rule-strong: "#8fa198"
  vermilion: "#b23a26"
  vermilion-deep: "#93301f"
  prussian: "#27548d"
  ochre: "#8a5a1c"
  paper-print: "#f6f1ea"
typography:
  display:
    fontFamily: "Georgia, 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "1.62rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
  title:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.03em"
  body:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.92
  label:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.92rem"
    fontWeight: 400
    letterSpacing: "0.06em"
  motto:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "1.22rem"
    fontWeight: 400
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.88rem"
  note:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.86rem"
  micro:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.8rem"
  seal-text:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.98rem"
    fontWeight: 700
  panel-title:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "1rem"
    fontWeight: 700
  foot-title:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "1.3rem"
    fontWeight: 700
  cell-label:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.68rem"
  seal-mini:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.72rem"
  stamp-glyph:
    fontFamily: "Georgia, 'Noto Serif SC', 'Songti SC', 'SimSun', serif"
    fontSize: "0.62rem"
  svg-plate-text:
    fontSize: "20px"
  svg-plate-note:
    fontSize: "15px"
rounded:
  xs: "2px"
  sm: "3px"
  md: "6px"
  seal-tilt: "-2deg"
spacing:
  xs: "6px"
  sm: "0.7rem"
  md: "1.2rem"
  lg: "1.4rem"
  xl: "3.4rem"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "#f6f1ea"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.05rem 0.5rem 1.15rem"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.05rem 0.5rem 1.15rem"
  seal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.vermilion}"
    rounded: "{rounded.sm}"
    padding: "0.28rem 0.6rem 0.28rem 0.78rem"
  plate:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    rounded: "0"
    padding: "1.4rem"
---

# Design System: 概率观测年鉴（马尔可夫链讲解页）

## Overview

**Creative North Star: "概率观测年鉴"（一座把随机过程当天气来记录的观测台）**

整个系统是一本正在填写的观测年册：世界（刊头、章印、朱丝栏表格、图版框、印章）只出现在文档的"框架"上，阅读栏本身是一栏安静的宋体正文。冷调蓝灰观测纸打底，铁胆青墨书写，朱砂红专司"记录"——印章、格线、π 参考线都是"此处已观测"的语义，而非装饰。状态靠字形与位置说话（日轮=晴、雨云=雨），颜色只是第三通道。

**Key Characteristics:**
- 框架浓、栏体淡：世界表达集中在刊头/章头/表格/图版框，正文栏 40em 无表演
- 朱砂=记录语义，出现即意味着一个真实计算结果或一次真实观测
- 全部图形手绘 SVG（图标、图版一、记录格字形），零外链资源
- 数字全部页内实时计算，衬线 tabular-nums 排版

## Colors

一册冷调观测纸：蓝灰纸面承托青墨正文，朱砂与普鲁士蓝、赭金三色各司其职，互不越界。

### Primary
- **朱砂** (#b23a26)：印章、朱丝栏表格格线、π 参考线、主按钮、"记"章。只承担"记录/观测"语义。
- **朱砂·深** (#93301f)：朱砂文字的深阶（motto、hover、图版编号），保证小字对比。

### Secondary
- **普鲁士蓝** (#27548d)："雨"态通道色（字形、底边色条、频数条）。
- **赭金** (#8a5a1c)："晴"态通道色，同上。

### Neutral
- **观测纸** (#edf0ee)：页面底色。冷调，非暖 cream。
- **纸·二** (#e4eae6)：图版、表格头、注记框面。
- **纸·三** (#dae2dd)：滚动条、频数轨等次级面。
- **青墨** (#20313e)：正文与标题墨色（蓝倾近黑，非纯灰黑）。
- **青墨·淡** (#48596a)：注释、图注、次级文字（自墨色 tint，不引入灰色）。
- **栏线** (#b6c2ba) / **栏线·重** (#8fa198)：hairline 分隔与刊头双细线。

### Named Rules
**朱砂记录律。** 朱砂红只用于"记录"：印章、朱丝栏格线、π 参考线、主行动。它永不作大面积底色，也永不作纯装饰点缀。
**墨形律。** 状态编码 = 字形 + 文字标签 + 位置；色相只是辅助通道，绝不单独承载数据含义（无障碍与打印安全）。
**图版框律。** 图/表内容一律装入 hairline 细框图版（编号 + 图注），正文栏内不出现无框浮动图。

## Typography

**Display Font:** Georgia + 宋体衬线栈（"Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif；禁外链字体，系统栈为既定降级）
**Body Font:** 同一栈（Latin 数字走 Georgia，中文落宋体系）
**Label/Mono Font:** 无等宽；数字一律衬线 tabular-nums

**Character:** 一册铅印年鉴的排版声线：特排厚重但不嘶吼，正文行长 40em（约 40 汉字）、行高 1.92 的舒缓呼吸。

### Hierarchy
- **Display** (700, clamp(2.5rem→4rem), 1.28, +0.03em)：仅卷首「马尔可夫链」。
- **Headline** (700, 1.62rem, 1.4, +0.05em)：章标题，与章印同行。
- **Title** (700, 1.12rem, 1.7)：节标题与面板题。
- **Body** (400, 17px, 1.92)：正文，max-width 40em。
- **Label** (400, 0.92rem, +0.06em)：注释、图注、目次、读数。

### Named Rules
**数字即观测律。** 所有数值以 tabular-nums 衬线呈现且必须由页内脚本实时计算得出；禁止硬编码死值冒充观测。
**小字阶梯律。** 注记字号阶梯固定为 0.92 / 0.88 / 0.86 / 0.8 / 0.72 / 0.68 / 0.62rem 七档；20px/15px 两档仅存在于 ≤640px 的 SVG 图版文字媒体查询内，不用于 HTML 文字。

## Layout

单栏文档骨架：内容页 max-width 1040px 居中，阅读栏 40em 居中，图版/表格可 breakout 至 860px。章与章之间 border-top hairline + 3.4rem 上距（上方空间永远大于下方）。刊头 sticky 顶部、双细线压底。断点：520px（滑杆控制行换行）、640px（SVG 文字放大）、780px（观测台两栏→单栏）、1460px（边注浮入右 margin）。

## Elevation & Depth

纸面系统：几乎没有阴影。仅有的三处都是"印刷物落在桌面"的物理暗示（offset + 柔和 blur，无彩色光晕）：章印 1px 2px 4px rgba(32,49,62,.16)、图版 2px 3px 10px rgba(32,49,62,.08)、"记"章 1px 1px 3px rgba(32,49,62,.35)。深度主要靠纸面分层（paper / paper-2）与 hairline，而非投影。

### Shadow Vocabulary
- **印章压痕** (`1px 2px 4px rgba(32,49,62,.16)`)：章印/记录章等"盖下去"的元素。
- **图版搁置** (`2px 3px 10px rgba(32,49,62,.08)`)：图版容器独有的安静衬垫。

## Shapes

直角为骨：图版 0 圆角、按钮/章印/输入 3px、聚焦环 2px offset 3px。章印固定 rotate(-2deg)、记录小章 rotate(±8deg)——轻微歪斜是手工盖印的痕迹，不是随机装饰。表格线为 1px 朱砂淡线（朱丝栏），双细线只属于刊头与尾注。

## Components

### Buttons（stampbtn）
- **Shape:** 3px 圆角，letter-spacing 0.12em 加 text-indent 配平
- **Primary:** 朱砂底 #f6f1ea 字（掷一步）；hover 加深至 #93301f
- **Ghost:** 纸底 hairline 边；hover 朱砂边 + 朱砂淡底
- **Active:** translateY(1px)；focus-visible 2px 朱砂外环 offset 3px

### 章印（seal）
- 2px 朱砂边框字框，rotate(-2deg)，压痕阴影；仅用于章头与尾注，不散布。

### 朱丝栏表格（led）
- 全 1px rgba(178,58,38,.30) 格线；表头/行头纸·二底；数字右对齐 tabular-nums；行 hover 朱砂淡底。

### 图版（plate）
- 纸·二底 + 1px 重栏线框 + 搁置阴影；图注在框内底部 hairline 之上；编号「图版一」朱砂深色。

### 观测记录格（cell）
- 40×52px 纸底细框格：字形 SVG + 状态名双通道，底边 3px 态色条；最新一格 2px 朱砂边 + 圆形"记"章 + stampin 动画（0.3s cubic-bezier(.2,.9,.3,1)，reduced-motion 关闭）。

### 滑杆（range）
- 2px 朱砂淡轨道；16px 朱砂方印拇指 rotate(-4deg) 压痕阴影；output 右侧朱砂深色读数。

## Do's and Don'ts

### Do:
- **Do** 让朱砂只出现在"记录"语义上（印章/格线/π 线/主按钮），一屏内朱砂占比保持小。
- **Do** 用字形+文字+位置编码状态，色相仅作辅助通道。
- **Do** 数字衬线 tabular-nums 且页内实时计算；图版必带编号与图注。
- **Do** 章节编号（第壹章…伍章）作为被正文交叉引用的编目装置保留。

### Don't:
- **Don't** 引入外链字体/脚本/图片：本系统离线自包含是硬约束。
- **Don't** 用黑底霓虹节点图或白卡片阵列承载内容——这是本世界明确拒绝的品类默认。
- **Don't** 等宽字体作装饰、渐变文字、硬偏移无模糊阴影、眉题/kicker——craft-floor 禁项一律不进入本系统。
- **Don't** 朱砂作大面积底色或纯装饰色块。
