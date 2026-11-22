# S1 · 运营总览（实验组 C · impeccable · 重跑）

订阅制客服工单平台「云翎客服台」的运营总览页。React + Tailwind（Vite）源码交付；数据为合成 mock（数量级校准：日 200–900 单）。

## 文件清单

```
PRODUCT.md                      # 产品事实（子代理推断，推断项已逐条标注）
DESIGN.md                       # 世界系统记录（documenter 产出，见下）
.impeccable/
  surfaces/src-app-jsx.md       # surface brief + direction contract（seed:1ff59101fdb9df68）
  design.json                   # DESIGN.md 的 token 侧车
index.html
package.json / vite.config.js / tailwind.config.js / postcss.config.js
src/
  main.jsx / App.jsx / index.css
  data/mock.js                  # 合成数据（KPI / 14 天趋势 / 未分配 Top 8 / 空态数组）
  components/
    icons.jsx                   # 手绘 SVG 图标集（1.75px 单一描边语言）
    SideRail.jsx                # 绀青侧轨 + 竖排节气时令签
    TopBar.jsx                  # 顶栏 + 常驻实时读出行
    KpiCard.jsx                 # KPI 卡（数字+标签+vs 昨日，同高共基线）
    TrendChart.jsx              # 14 天趋势主图（手绘 SVG，节气分界签名动作）
    UnassignedQueue.jsx         # 未分配 Top 8 列表 + 空态（说明+双入口）
```

## 运行（本会话未执行）

```
npm install && npm run dev
```

本会话禁 npm install / 网络 / 浏览器，以上命令未运行，构建产物未验证；交付为静态源码。

## impeccable 工作流记录

1. `impeccable context`（engine 二进制在位，v4.9.1）：报告 NO_PRODUCT_MD / 无 DESIGN.md / 无 hook → 走 init → new-work。
2. **init**：子代理无结构化提问工具、无决策页（浏览器禁用）→ 按 AUTONOMY_DIRECTIVE 从任务书推断产品事实，PRODUCT.md 推断项全部逐条标注；栈为任务书指定（React + Tailwind）。
3. **concept-seed --scope direction --mode operate**：掷得 `seed:1ff59101fdb9df68`，指派构建自有 grounded 清单第 7 候选 **「节气物候历」（二十四节气 · 七十二候）**。清单（按共鸣度排序）：1 气象预警信号分级 / 2 快递物流追踪单 / 3 铁路到发时刻屏 / 4 航班信息显示系统 / 5 报刊财经行情版 / 6 医院分诊叫号 / 7 节气物候历 ←被指派。六个目录挑战者融合后按两轴（受众识别 × 产品清晰度）裁决：
   - `notation-diagram-systems-star-atlas` → **competitive**（点径量级编码，备选全场）
   - `editorial-sequence-montage-botanical-folio` → **competitive**（等高共基线板式，备选全场）
   - `emigre-bitmap-specimen` → declined，捐 raise：固定字号阶梯的数字复用
   - `aww2-zoo-gardens-guide-map` → declined，捐 raise：无渐变纯色分区
   - `pop-culture-shelf-vertical-video-feed-surface` → declined，捐 raise：整块就绪、无半加载中间态
   - `variable-font-specimen` → declined，捐 raise：常驻实时读出行
4. **surface-brief write src/App.jsx**：direction contract 六块（THESIS/OWN-WORLD/STORY/FIRST VIEWPORT/FORM/FINISH）落档并复验。
5. **构建（code-led）**：Operate 模式按规则 code-led（无图像生成）。世界只借四物 —— type（系统 CJK + 表格数字）、palette（月白纸地 #F5F7F6 / 绀青轨 #153841 / 立冬青黛 #3F6672 → 小雪冰蓝 #2E7E9E）、density（紧凑数表）、签名动作「节气分界」（快照日 2026-11-22 恰为小雪首日：末柱变冰蓝 + 分界虚线 + 竖排标签）；导航/控件全部为标准 web 形态。
6. **detect --json src index.html tailwind.config.js** → `[]`（零机械告警，一次运行）；`concept-seed --check-seed seed:1ff59101fdb9df68` → `SEED KNOWN`（FORM 行种子参考已佐证）。
7. **finish review**：specialist（impeccable-finish-reviewer）不在本运行时目录（spawn 失败）→ 按 `reference/degraded/finish-reviewer.md` 线程内替代执行。检查 0（证据）判定：`.impeccable/review/` 无 desktop.png / mobile.png，且本会话禁浏览器无法补拍 → **disposition: recapture**，证据门保持开启并如实申报；其余检查（persistence/contract/floor 的代码可核部分）无材料级发现。
8. **documenter**：同样按 `reference/degraded/documenter.md` 线程内替代执行：`DESIGN.md`（规范八节 + token frontmatter）与 `.impeccable/design.json`（schemaVersion 2 侧车）已从建成代码写入。

## 降级声明（如实）

- **引擎二进制在位，非二进制缺席降级**：`impeccable` launcher、`concept-seed`、`surface-brief`、`detect` 均实际运行成功。
- 本会话约束（禁浏览器/npm/网络）造成以下降级，均已如实执行：
  1. **无渲染验证**：未截图、无 `.impeccable/review/` 证据，finish review 以代码审读 + 检测器输出为证据面。
  2. **决策轮未送达用户**：无决策页/结构化工具，方向轮按掷得指派执行，未提供 re-roll；PRODUCT.md 推断项已标注。
  3. **finish review 与 documenter**：shipped specialist 子代理不在本运行时目录，按 `reference/degraded/` 对应手册线程内替代执行（替代事实在此声明）；finish review 因无截图证据判 recapture 且本会话无法补拍 → 评审门开启状态交付，像素级验证未完成；documenter 无需截图，已完整执行（DESIGN.md + design.json）。
  4. 遥测禁用（`IMPECCABLE_NO_TELEMETRY=1`），concept-seed 选择回执未发送。

## 设计与验收对照

- KPI 卡：同高共基线（grid 拉伸 + mt-auto），数字（36px 表格数字）+ 标签 + 变化（vs 昨日，方向语义色）三要素齐全。
- 主图 8/12 栅格（内容宽 2/3）；次数据块为 Top 8 **列表**（优先级 chip / 标题 / 工单号·渠道·SLA 剩余 / 已等时长 / 行内派单）。
- 对比度（tailwind.config.js 内逐条注释比值）：正文 13.7:1、次级 ≥5.6:1、文字级冰蓝 ≥6.1:1、状态色 ≥4.9:1。
- 间距全部 4px 倍数（无 x.5 步进残留）；侧栏 + 顶栏骨架。
- 空态：`UnassignedQueue` 空数组分支 —— 说明文案 + 「查看全部工单」「配置自动分配规则」双入口；演示方式：`App.jsx` 中 `tickets={UNASSIGNED}` 换 `UNASSIGNED_EMPTY`。
- 无渐变文字、无彩色 glow（阴影为偏移+柔焦双段）、无 emoji/Unicode 图标（全手绘 SVG）、无问候式标题；无任何无来源商业宣称；页脚标注「演示数据 · 合成生成」。

## 演示口径

快照日固定 2026-11-22（周日，小雪首日）；窗口 11-09 – 11-22 跨立冬→小雪，是签名动作「节气分界」的成立条件。
