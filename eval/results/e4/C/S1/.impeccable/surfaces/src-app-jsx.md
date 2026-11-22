---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface brief · 运营总览（/overview）

Scope: 工单平台「运营总览」首屏（桌面优先）。Visitor mode: **Operate**。受众：客服运营负责人；任务：判断今日是否正常并派发未分配工单；证明：14 天量级趋势 + 未分配队列；约束：KPI 卡同高三要素、主图 ≥2/3 内容宽、次块为列表、对比度 ≥4.5:1、4px 基线、空态含入口、无渐变文字/glow/emoji/问候标题、mock 数量级真实（日 200–900）。

## Direction contract

**THESIS** 运营总览以「时令刻度」组织：季节转换的物候纪律拒绝 SaaS 后台默认的灰底蓝点缀卡片阵；页面的时间感来自节气分界，不是又一个日期下拉。

**OWN-WORLD** 月白冷纸地面 + 绀青侧轨；数据色取物候色卡（立冬青黛 → 小雪冰蓝）；密集等宽表格数字；侧轨竖排节气名。去掉全部内容仍可辨认：深色轨 + 冰青数据柱 + 节气刻度线。

**STORY** 负责人先读今日四数与「vs 昨日」变化，沿主图看到两周量级与今日跨入小雪的分界标记，最后在未分配队列逐行派单；队列为空时得到说明与入口。

**FIRST VIEWPORT** 顶栏：标题「运营总览」+ 紧凑读出行（窗口/节气/刷新）+ 搜索 + 坐席状态。左轨：导航 + 竖排「小雪 · 一候 虹藏不见」。内容列：KPI 四卡同高共基线（数字+标签+vs 昨日）；主图 14 天柱状占 8/12 栅格（末柱跨节气转冰青 + 分界虚线与竖排标签）；右侧 4/12 未分配工单 Top 8 列表（优先级、等待时长、行内「派单」主操作）。

**FORM** 节气物候历 · 7/7 · seed:1ff59101fdb9df68。 Raises：固定字号阶梯的数字复用（emigre-bitmap-specimen）；无渐变纯色分区（aww2-zoo-gardens-guide-map）；整块就绪无半加载态（pop-culture-shelf-vertical-video-feed-surface）；常驻实时读出行（variable-font-specimen）。备选全场：star-atlas（点径量级编码）、botanical-folio（等高共基线板式）为 competitive。

**FINISH** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

无（演示日期固定 2026-11-22；数据合成并在页内标注）。
