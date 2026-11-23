---
name: 马尔可夫链 · 随机换乘指南
description: 轨交印刷品世界的单文件科普文档系统：藏青油墨、四条线路色、编号图版与等宽数据。
colors:
  paper: "#FBFAF7"
  panel: "#FFFFFF"
  tint: "#F2EEE2"
  ink: "#1E2A44"
  ink-soft: "#4C5770"
  rule: "#DAD4C6"
  rule-strong: "#C6BFAE"
  band-text-dim: "#B9C2D6"
  endboard-text-dim: "#C9D1E4"
  line-1-home: "#B44A18"
  line-2-library: "#0F6E6E"
  line-3-cafe: "#A62E5C"
  line-4-office: "#5B4B8A"
typography:
  display:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", \"Source Han Sans SC\", \"Noto Sans SC\", -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "46px"
    fontWeight: 800
    lineHeight: 1.22
    letterSpacing: "0.04em"
  headline:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "27px"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0.03em"
  body:
    fontFamily: "Georgia, \"Noto Serif SC\", \"Source Han Serif SC\", \"Songti SC\", \"SimSun\", serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.95
  label:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
  data-mono:
    fontFamily: "Consolas, \"SFMono-Regular\", Menlo, \"Courier New\", monospace"
    fontSize: "15px"
    fontWeight: 400
rounded:
  cell: "2px"
  control: "3px"
  badge: "50%"
  plate: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "22px"
  section-top: "74px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
  button-primary-hover:
    backgroundColor: "#33456E"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  row-toggle:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  row-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  plate:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.plate}"
    padding: "22px 22px 18px"
  callout:
    backgroundColor: "{colors.tint}"
    rounded: "{rounded.plate}"
    padding: "22px 20px 16px"
  masthead-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "13px 22px"
---

# Design System: 马尔可夫链 · 随机换乘指南

## Overview

**Creative North Star: "The Random Transfer Guide"（随机换乘指南）**

一座城市轨道交通系统的印刷品语言，被整个页面继承：报头是深藏青的站牌色带，目录画成一条带站点的线路，正文是纸白地面上的宋体系文档栏，图版像期刊的编号图版（图 1、表 1），数据全部用等宽字排成时刻表。四个状态各持一条线路色（橙/青/玫红/紫），颜色即语义：它标示"下一站是谁"，从不作装饰。系统是平面印刷的：发丝线、方角图版、一处克制的软阴影，无玻璃、无渐变文字、无硬投影。运动只有一套：换乘箭头的描边生长、乘客圆点的滑行、柱条的增高，全部带 reduced-motion 降级。

**Key Characteristics:**
- 藏青油墨 + 纸白地面 + 四条语义线路色，构成全部色彩世界
- 站牌式导航（编号站点圆 + 连线）承担目录与滚动定位
- 正文宋体系衬线 41em 栏宽，标题与站名用无衬线黑体（标识牌声部）
- 数据即等宽：时刻表、百分比、π 值一律 tabular-nums
- 图版编号体系（图 1…表 2）与"下一站"页脚标牌构成文档仪器

## Colors

地面是纸白，墨是藏青；四条线路色各绑定一个状态，永远承载"去向"语义。

### Primary
- **Transfer Ink 藏青** (#1E2A44)：正文、标题、报头色带、主按钮。它是油墨，不是"品牌蓝"。

### Secondary
- **Line 1 站橙** (#B44A18)：家站线路色；焦点环、到访旗标沿用它。
- **Line 2 馆青** (#0F6E6E)：图书馆线路色。
- **Line 3 馆玫红** (#A62E5C)：咖啡馆线路色。
- **Line 4 站紫** (#5B4B8A)：公司线路色。

### Neutral
- **Timetable Paper 纸白** (#FBFAF7)：全页地面。
- **Plate White 图版白** (#FFFFFF)：图版/表格面板。
- **Tint Ground 浅褐** (#F2EEE2)：定义框、选中行的底色。
- **Ink Soft 次墨** (#4C5770)：次要文字；自油墨提色，不用灰。
- **Rule 发丝线** (#DAD4C6) / **Rule Strong** (#C6BFAE)：分隔线与地图网格。
- **Band Text Dim** (#B9C2D6) / **Endboard Text Dim** (#C9D1E4)：深色带上的次要文字，自藏青提色。

### Named Rules
**The Line-Color Rule.** 线路色只标状态身份与去向，一处颜色必能回答"这是哪一站/下一站是谁"；不得挪作情绪或点缀。四色可同屏（四条线并行），这是本世界对"少即是多"的豁免。

**The Ink-Tint Rule.** 次要文字一律从所在面的色相提色（纸面上为 #4C5770，藏青带上为 #B9C2D6/#C9D1E4），永不使用无相灰。

## Typography

**Display Font:** PingFang SC / Microsoft YaHei（系统标识牌无衬线，重至 800）
**Body Font:** Georgia + Noto Serif SC / Source Han Serif SC / SimSun（文档衬线）
**Label/Mono Font:** Consolas 等宽（数据、时刻表、图版标签）

**Character:** 标识牌无衬线承担"站"的声部（刊名、站名、按钮），衬线宋体承担"读"的声部（正文、公式）；等宽只属于数字。三声部互不越界。

### Hierarchy
- **Display** (800, 46px, 1.22)：文章标题，仅报头下一处。
- **Headline** (800, 27px, 1.35)：站名 H2，与站点编号圆徽同行。
- **Title** (700, 19px, 1.5)：正文内小节。
- **Body** (400, 17px, 1.95, 衬线)：正文栏宽 41em（约 40 汉字）。
- **Label** (400, 13px, 1.75)：图注、提示、页脚标牌。
- **Data** (400, 15px mono, tabular-nums)：表格数字；状态行 13px。

### Named Rules
**The Mono-Is-Data Rule.** 等宽字只排可计算物：概率、百分比、步数、期号。正文与标题永不穿等宽。

## Layout

单栏文档流：正文栏 41em 居中；图版/表格以 47em 宽板"出血"出栏，仍居中。报头色带全幅横贯，其下四色条带各占 1/4。线路导航（编号站点圆 + 连线）sticky 置顶，横向滚动于窄屏。每个车站章节以"下一站"页脚收束（站到站标牌，兼作运行头）。节奏：节顶 74px，标题上方空间大于下方；图版内边距 22px。断点：640px（字号与图版收紧）、560px（状态行换行）。

## Elevation & Depth

印刷是平的：层次靠发丝线、底色变化与留白表达。唯一阴影是图版的一处软投影（`3px 4px 14px rgba(30,42,68,.08)`），模拟纸板落在纸面上；无硬偏移阴影、无发光、无玻璃模糊。深色终点站牌以整块藏青色面构成"进站"的体量变化，而非阴影。

### Named Rules
**The Print-Flat Rule.** 不新增阴影层级；需要强调时，用底色（tint）、发丝线或色面，不用投影。

## Shapes

图版方角（0px）贴印刷品性格；控件微圆（3px）；状态徽章与站点圆是正圆（50%）；轨迹格 2px。箭头与旗标均为矢量绘制，无字符图标。

## Components

### Buttons
- **Shape:** 微圆角（3px），重 700 无衬线，字距 0.05em。
- **Primary:** 藏青底纸白字（padding 11px 18px；大号 13px 22px）；hover 加深至 #33456E 并上浮 1px；active 归位。
- **Ghost:** 透明底 + 1.5px 藏青内描线；hover 铺 tint。
- **Row toggle（出发点选择）:** 白底 + rule 描线；`aria-pressed=true` 时藏青底反白。
- **Focus:** 2px 站橙外环，offset 2px，全站统一。

### Tables（时刻表）
行=当前站，列=下一站；行头带线路色方片；数字等宽右对齐；行 hover 浅褐，选中行 tint 加粗；每行以 Σ=1.0 收束。窄屏横向滚动。

### Cards / Containers（图版）
方角白板 + 1px 发丝边 + 单一软投影；左上角藏青图版标签（图 1 · 互动）。定义/记号框为 tint 底 + 通栏 1px 边 + 悬挂式角标。

### Navigation（线路导航）
sticky 横条：编号站点圆（26px）+ 连线段；当前站实心藏青；终点站为方角徽记。滚动定位由 IntersectionObserver 驱动。

### 线路图模拟器（Signature）
SVG 线路图：站点为白芯线路色环圆（r=23），边宽 ∝ 转移概率、色 = 去向线路色；乘客为空心圆点沿站间滑行；到访旗标（橙）标记已访站；当前站的出边亮起并标注百分比。轨迹条以 15×24px 色格记录最近 30 站，旗标指向当前格。全部数值由内嵌转移矩阵实时计算。

### 柱状分布图
四柱分列，柱=实测到访比例，虚线=理论 π（同一 .plot 盒内共享基线）；柱高钳制 100%；柱下等宽计数。

## Do's and Don'ts

### Do:
- **Do** 让每个颜色回答一个状态问题；四色同屏是本世界的常态。
- **Do** 把一切可计算数字交给等宽字与 tabular-nums。
- **Do** 保持"标识牌无衬线 + 文档衬线"的声部分工。
- **Do** 用编号图版（图/表）与站到站页脚维持文档仪器感。
- **Do** 为所有动效提供 prefers-reduced-motion 降级。

### Don't:
- **Don't** 引入第五条线路色或无语义强调色。
- **Don't** 使用阴影、发光、玻璃或渐变文字制造层级（The Print-Flat Rule）。
- **Don't** 把等宽字当"科技感"服装穿在正文上。
- **Don't** 展示任何不来自内嵌转移矩阵的"装饰性"数字。
- **Don't** 在标题上方加眉题/导语标签；标题自己说话。
