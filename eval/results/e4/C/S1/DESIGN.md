---
name: 云翎客服台 · 节气物候历设计系统
description: 客服工单运营台的视觉系统：绀青侧轨 + 月白纸地 + 立冬青黛→小雪冰蓝的物候色卡，世界只借 type/palette/density/签名动作四物。
colors:
  rail: "#153841"
  rail-hover: "#1D4650"
  rail-line: "#2A545E"
  rail-text: "#E8F0F0"
  rail-muted: "#9FB9BE"
  ground: "#F5F7F6"
  paper: "#FFFFFF"
  ink: "#1B2A2E"
  ink-muted: "#55666B"
  term-lidong: "#3F6672"
  term-xiaoxue: "#2E7E9E"
  term-ice: "#5FAFC7"
  term-ice-text: "#23647D"
  state-danger: "#B3362B"
  state-danger-bg: "#FBEAE8"
  state-warn: "#9A5B00"
  state-warn-bg: "#FBF3E4"
  state-ok: "#2E6B45"
  state-ok-bg: "#EAF3ED"
  line: "#DCE3E2"
  line-strong: "#B9C6C4"
typography:
  display:
    fontFamily: "system-ui, -apple-system, PingFang SC, Microsoft YaHei, Noto Sans SC, Segoe UI, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.02em"
    fontFeature: "tnum 1"
  headline:
    fontFamily: "system-ui, -apple-system, PingFang SC, Microsoft YaHei, Noto Sans SC, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  title:
    fontFamily: "system-ui, -apple-system, PingFang SC, Microsoft YaHei, Noto Sans SC, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  body:
    fontFamily: "system-ui, -apple-system, PingFang SC, Microsoft YaHei, Noto Sans SC, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "system-ui, -apple-system, PingFang SC, Microsoft YaHei, Noto Sans SC, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
rounded:
  sm: "4px"
  md: "6px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.rail}"
    textColor: "{colors.rail-text}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  chip-priority-medium:
    backgroundColor: "#E4EFF3"
    textColor: "{colors.term-ice-text}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "20px"
  nav-item-active:
    backgroundColor: "{colors.rail-hover}"
    textColor: "{colors.rail-text}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: 云翎客服台 · 节气物候历

## Overview

**Creative North Star: "The Phenological Almanac（节气物候历）"**

一个客服工单运营台的内页系统。世界（二十四节气 · 七十二候的历法传统）只向界面出借四样东西：type（系统 CJK 工作马 + 表格数字）、palette（月白冷纸地上的绀青轨与物候色卡）、density（紧凑数表与共基线卡阵）、以及一个具名签名动作「节气分界」。导航、控件、布局全部保持 web 标准形态——历法是气质，不是戏服。

**Key Characteristics:**
- 绀青轨（#153841）承载品牌与导航；内容区月白纸地（#F5F7F6）+ 纯白卡面
- 数据色取物候色卡：当前节气窗口决定主色（立冬青黛 → 小雪冰蓝）
- 全部数字使用 tabular-nums；间距全部为 4px 倍数
- 状态色（红/琥珀/绿）只在携带语义处出现，不作装饰

## Colors

冷调、低饱和、由物候色卡驱动的克制系统。

### Primary
- **小雪冰蓝（Xiaoxue Ice Blue）**（#2E7E9E）：当前节气窗口的数据主色与强调色（趋势末柱、焦点、选中）；4.6:1 on paper，可作文字。
- **立冬青黛（Lidong Slate Teal）**（#3F6672）：上一节气段的数据色，与冰蓝构成跨分界的时间编码。

### Secondary
- **文字级冰蓝（Ice Ink）**（#23647D）：浅底上的文字级冰蓝（6.1:1 on ground），用于 chip 与链接文字。
- **轨上冰（Rail Ice）**（#5FAFC7）：深色轨上的强调（4.8:1 on rail），用于活跃导航图标与印记。

### Neutral
- **绀青（Rail Gan-Qing）**（#153841）：侧轨与主按钮底色；hover 层 #1D4650。
- **月白纸地（Moon-White Ground）**（#F5F7F6）：内容区地色，冷调非奶油。
- **墨（Ink）**（#1B2A2E）：正文 13.7:1；次级 #55666B ≥5.6:1。
- **发丝线（Hairline）**（#DCE3E2 / 强 #B9C6C4）：分隔线与网格，非文字用途。

### Named Rules
**The Four Loans Rule.** 世界只借 type、palette、density、一个签名动作；它永远不供应布局、导航模型或控件形态。
**The Semantic Color Rule.** 状态色（#B3362B / #9A5B00 / #2E6B45）只出现在携带语义的地方（优先级、SLA 危险、改善/恶化）；一处纯装饰即违规。

## Typography

**Body Font:** system CJK stack（system-ui / PingFang SC / Microsoft YaHei / Noto Sans SC）
**Label/Mono Font:** 同族，数据一律 tabular-nums

**Character:** 单族工作马。层级只靠固定字号阶梯与字重（12/14/16/20/36），无显示字体、无等宽戏服。

### Hierarchy
- **Display**（600，36px/40px，-0.02em，tnum）：KPI 数值。
- **Headline**（600，20px/28px）：页面标题。
- **Title**（600，16px/24px）：卡与区块标题。
- **Body**（400，14px/20px）：正文与列表行。
- **Label**（400–500，12px/16px）：标签、读出行、chip。

### Named Rules
**The Fixed Ladder Rule.** 数字复用同一严格字号阶梯（36/14/12），层级只靠尺度对比，不做任意插值。

## Layout

240px 固定绀青侧轨 + 64px sticky 顶栏 + 内容列（max-width 1440px，px-24px）。内容用 12 列栅格：KPI 行 1×4（同高共基线），主区 8+4（主图占内容宽 2/3，次块为列表）。断点 sm 640 / md 768 / lg 1024 / xl 1280；lg 以下主图与列表纵向堆叠。所有间距为 4px 倍数（4/8/12/16/20/24）。

## Elevation & Depth

单一阴影片语：卡片 `0 1px 2px rgba(27,42,46,.06), 0 4px 12px rgba(27,42,46,.05)`（偏移 + 柔焦双段）。悬停用色层（bg-ground）而非新增阴影；无零偏移光晕。

### Named Rules
**The Tonal Hover Rule.** 悬停/悬停列表行以色调层响应；阴影在静止面上保持恒定。

## Shapes

4px（控件/chip）与 6px（卡）两级圆角；1px 发丝边框；无几何遮罩、无斜切。签名几何是图表中的节气分界虚线（1.25px，dash 3 4）与侧轨竖排时令签。

## Components

### Buttons
- **Shape:** 4px 圆角
- **Primary:** 绀青底 #153841 / 轨文字 #E8F0F0，padding 4×12px；hover #1D4650；active 下压 1px；focus-visible 2px #23647D 外环
- **Secondary:** 白底 + 1px #DCE3E2 边，墨字；hover 月白底
- **行内主操作**（派单）：Primary 缩小版（4×8px + 图标），仅用于列表行

### Chips
- **优先级 chip:** 紧急 #FBEAE8/#B3362B、高 #FBF3E4/#9A5B00、中 #E4EFF3/#23647D、低 #EEF1F0/#55666B；4px 圆角，4×8px
- **计数 chip:** #E4EFF3 底 + #23647D 字

### Cards / Containers
- **Corner:** 6px；**Border:** 1px #DCE3E2；**Padding:** 20px；卡片内不嵌卡片；同排卡片同高共基线（grid 拉伸 + 底部对齐注脚）

### Inputs / Fields
- 搜索框：1px #DCE3E2 边 + 月白底，4px 圆角，左内图标；focus 边框转 #2E7E9E

### Navigation
- 侧轨项：4px 圆角行，静止 #9FB9BE 字 / hover #1D4650 底 / 活跃 #1D4650 底 + 500 字重 + 轨上冰图标；无彩色左条纹

### 签名组件 · 节气分界（Term Boundary）
14 天趋势主图中，跨节气日的柱色由上一节气色（青黛）切换为当前节气色（冰蓝），柱左侧立 1.25px 冰蓝虚线 + 竖排「节气 · 日期」标签。它是世界进入数据图的唯一通道。

### 签名组件 · 竖排时令签（Vertical Term Sign）
侧轨底部 writing-mode: vertical-rl 的节气名 + 候名（letter-spacing 0.35em），兼作今日历注。

## Do's and Don'ts

### Do:
- **Do** 让所有数据数字走 tabular-nums 与固定字号阶梯。
- **Do** 让世界只通过 type/palette/density/签名动作四条通道出现。
- **Do** 保持间距 4px 倍数与文字对比度 ≥4.5:1（次级 ≥5.6:1）。

### Don't:
- **Don't** 使用渐变文字、彩色光晕、emoji/Unicode 图标、问候式标题。
- **Don't** 在卡片、列表项、告警上用超过 1px 的彩色左/右边条。
- **Don't** 把系统漂向「奶油纸地 + 衬线显示字」的默认渲染；纸地保持冷调月白。
- **Don't** 让节气世界供应导航或控件形态（黄历边框、宜忌行、刻本装饰皆禁）。
