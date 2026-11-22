# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Tailwind（任务书指定）。细节由本次执行选择并在 README 声明：Vite 开发脚手架、mock 数据内置于模块、静态交付（本次会话禁 npm install / 网络 / 浏览器，未做安装与渲染验证）。(inferred)

## Users

订阅制客户支持工单平台的运营/客服团队负责人（on-duty support lead）。场景：每个工作日开始或值班中，快速判断今日工单压力、响应与 SLA 健康度、坐席在岗情况，并把未分配的工单派出去。(inferred from brief)

## Product Purpose

「运营总览」页：让负责人在一屏内完成三件事——看今日关键指标（今日新增工单、平均首次响应、SLA 达标率、活跃坐席）、看近 14 天工单量趋势、处理未分配工单队列（Top 8）。成功 = 30 秒内判断"今天是否正常"，并能立即派单。

## Positioning

任务书未提供商业定位；本页不做任何无来源宣称（禁止 "Trusted by 10,000+" 类内容）。

## Operating Context

- 桌面优先的内部工作台（Operate 模式）：侧栏 + 顶栏骨架，长时间注视、密集读数。
- 数据量级真实：日工单 200–900 单，首次响应以分钟计，SLA 以百分比计；禁止 12345/99999 式假数据特征。
- 页面语言：中文（任务书原文）。

## Capabilities and Constraints

- 3–4 张 KPI 卡：同高，数字 + 标签 + 变化（vs 昨日）三要素齐全。
- 主图：近 14 天工单量趋势，占内容宽 ≥2/3；第二数据块是列表（未分配工单 Top 8），不是第二张同权图。
- 空态：待办列表为空时有说明与入口。
- 对比度 ≥4.5:1；间距 4px 基线；无渐变文字/彩色 glow/emoji 图标/问候标题。
- 全部数据为合成 mock，须可辨识为演示数据，不得编造商业声明。(inferred)

## Brand Commitments

无（任务书未提供）。

## Evidence on Hand

无真实数据、截图或文案素材。全部演示数据为合成，须标注 synthetic；不得虚构客户、评价、规模声明。

## Product Principles

1. 先回答"今天正常吗"：KPI 与异常态优先于装饰。
2. 可派发：未分配队列是工作入口，不是展示品。
3. 数量级真实：每个数字都经得起运营人员一眼审视。
4. 克制而精确：内部工具，熟悉模式 + 精确细节取胜。(inferred)
