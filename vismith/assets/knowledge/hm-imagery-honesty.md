---
id: hm-imagery-honesty
title: 视觉素材真实性：不手绘替代、不留空占位、不造假产品图
category: anti-slop
product_types: [marketing-site, creative, consumer-app, saas-dashboard]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 插图/产品展示/占位纪律；渐变与 glow 类视觉症状见 slop-signs-visual
---

页面展示不出真实东西时，模型会抓三个替代品：手绘的物件（面包、吉祥物、山景线稿）、什么都没显示的色块占位、一排代表数量的记号——每一样一眼生成。真实产品可达却画假界面同罪；手画浏览器窗、系统标题栏是硬禁令。

**落地要点**

- 产品可达（URL、dev server、本机应用、可启动的仓库）：跑起来、放到有信息量的状态、真实截图（主屏/细节/移动端）；假界面只用于尚未构建的产品，且移交注明待补截图
- 手绘物体/人物/场景不做插图：真实照片、产品本体、或纯排版（数字排大）顶位
- 空占位（纯色/渐变色块）只留少量并标记尺寸用途；一页超过五个空槽或一行四个空框读作未完成的线框图——整组改排文字列表（名字/角色/事实）
- 数量不用记号阵表达（24 个小方块=24 家店）：直接把数字排大
- 设备框（手机/笔记本/终端）最多一个，内装真实内容；不手画浏览器地址栏与红绿灯
- hero 以下照片超过页面约三分之一读作图库墙：留最强的放大，其余区块用风格材料做（见 hm-theme-material）
- 假人头像热链、含人物关键词的图库 URL 不用

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
