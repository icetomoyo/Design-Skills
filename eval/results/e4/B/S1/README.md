# S1 · 云枢Desk 运营总览页（实验组 B · ui-ux-pro-max skill）

任务书：`eval/scenarios/S1-saas-dashboard.md`（订阅制客户支持工单 SaaS 的"运营总览"页）。
本组挂载 **ui-ux-pro-max** skill 并严格按其工作流执行；本目录即唯一输出目录。

## 交付物清单

| 文件 | 说明 |
| --- | --- |
| `preview.html` | **零依赖静态快照**（离线双击可开，无 CDN/无字体请求），与 React 实现同构；加 `?empty=1` 查看待办列表空态 |
| `index.html` / `src/main.jsx` / `src/App.jsx` | Vite + React 入口与页面装配 |
| `src/components/Sidebar.jsx` / `Topbar.jsx` | 侧栏 + 顶栏骨架 |
| `src/components/KpiCard.jsx` | KPI 卡（标签+数字+变化三要素） |
| `src/components/TrendChart.jsx` | 14 天趋势主图（内联 SVG 折线，无图表库依赖） |
| `src/components/UnassignedList.jsx` | 未分配工单 Top 8 列表 + 空态分支 |
| `src/components/Icons.jsx` | 统一 SVG 图标集（Lucide 风格，无 emoji） |
| `src/data/mock.js` | Mock 数据（数量级依据见下） |
| `src/index.css` / `tailwind.config.js` / `postcss.config.js` / `vite.config.js` / `package.json` | Tailwind 语义令牌（映射 MASTER.md）与工程配置；按约束**未执行 npm install**，静态交付 |
| `design-system/supportdesk-ops/MASTER.md` | skill Step 2b `--persist` 生成的**设计契约** |

## ui-ux-pro-max 工作流执行记录

1. **Step 1 需求分析**：产品 = SaaS 工单平台运营后台；页面 = 数据密集型 dashboard；栈 = 任务书指定 React + Tailwind（html-tailwind / react 栈检索按此选）。
2. **Step 2 生成设计系统**（新页面必做）：
   `search.py "customer support SaaS operations dashboard" --design-system -p "SupportDesk Ops" --density 8 --variance 3 --motion 2`
   命中：Minimalism & Swiss Style（Best For: dashboards/SaaS）、信任蓝 #2563EB 色板、Inter 字体、Light 模式；Dials：Density 8（Dense/Dashboard）、Motion 2（Subtle）、Variance 3（Centered）。
3. **Step 2b 持久化契约**：同命令加 `--persist --output-dir <本目录>` → `design-system/supportdesk-ops/MASTER.md`（全新目录，无既有 Master，不涉及 --force）。
4. **Step 3 补充检索**：
   - `--domain chart`（"time series trend line dashboard"）→ Trend Over Time = 折线图，<1000 点用 SVG，20% 透明填充，数据表兜底，键盘可达提示；
   - `--domain ux`（"empty state list action"）→ 空态 = 说明 + 行动入口（Result 1），另采纳 Active State（Result 2）用于侧栏当前项。
5. **Step 4 栈检索**：`--stack html-tailwind`（"dashboard layout sidebar topbar spacing"）→ 统一 Tailwind 间距刻度 / grid gap / 卡片内距一致性。
6. **交付前**：通读 `references/quick-reference.md` 全 10 类规则（§1–3 CRITICAL/HIGH 逐条过）与 `references/pro-rules.md` 交付前清单，完成下表自查。

**Fit 验证（skill 要求先验证再采用）**：MASTER 返回的 Page Pattern "Hero + Features + CTA" 是落地页模式，不适用于内页，仅采用其风格/色板/字体/反模式部分；字体对 Calistoga 为展示字体，不适合高密度运营页，改用同一 pairing 中的 Inter（正文）+ JetBrains Mono 等宽数字（KPI/表格 `tabular-nums`）。此两处适配已在实现中注明。

## 契约（contract）说明

本组挂载的是 **ui-ux-pro-max** skill，其契约机制为 Step 2b 的 Master + Overrides 持久化模式：
本页契约 = `design-system/supportdesk-ops/MASTER.md`（色板/字体/间距/阴影/反模式/交付前清单），
实现侧通过 `src/index.css` CSS 变量与 `tailwind.config.js` 语义色逐一映射。
`.vismith/contract.json` 属另一未挂载协议，本组不读取、不伪造。

## 验收 checklist 自查

| 验收项 | 结果 | 实现位置 |
| --- | --- | --- |
| KPI 卡同高、数字+标签+变化（vs 昨日）三要素 | 通过 | `src/App.jsx:32`（网格 stretch）；`KpiCard.jsx:12,21,28`（`h-full` + 数字 + 标签 + "较昨日 …"） |
| 主图占内容宽 ≥2/3；第二数据块是列表 | 通过 | `src/App.jsx:40`（`lg:col-span-2` / 3 列）；`UnassignedList.jsx`（列表，非同权图） |
| 所有文本对比度 ≥4.5:1（CHK-01） | 通过（实测） | 见下表；slate-400 / green-600 / orange-600 作文本色已在选型阶段排除 |
| 布局含侧栏+顶栏骨架，间距 4px 基线 | 通过 | `Sidebar.jsx:41`（w-60 固定侧栏）、`Topbar.jsx:9`（h-16 sticky 顶栏）；全部间距为 Tailwind 刻度（gap-4/6、p-4/5/6、h-9/16，均为 4 的倍数） |
| 空态：待办列表为空时有说明与入口 | 通过 | `UnassignedList.jsx:44`（`tickets.length === 0` 分支）→ `:20`（说明文案）、`:30`（"前往分配队列"主入口 + 次级链接）；`preview.html?empty=1` 可视化验证 |
| 无 slop 症状（渐变文字/彩色 glow/emoji 图标/问候标题） | 通过 | 无 `bg-clip-text`/渐变文本、无 box-shadow 彩色光晕、图标全部 SVG（`Icons.jsx`）、页头为"运营总览"任务型标题（`App.jsx:26`） |
| 拒绝项：无来源声明 / 99999 类假数据 | 通过 | 无 "Trusted by …" 类文案；数值见下节量级依据 |

## 对比度验证（WCAG 相对亮度公式实测，文本阈值 4.5:1、非文本 3:1）

| 用途 | 前景 / 背景 | 实测 |
| --- | --- | --- |
| 正文 / 卡片标题 | #1E293B / #FFFFFF | 14.63 |
| 页面大标题 | #0F172A / #FFFFFF | 17.85 |
| 次要文字（muted） | #475569 / #FFFFFF | 7.58 |
| 注脚 / 占位符 | #64748B / #FFFFFF | 4.76 |
| 链接 / 当前导航 | #1D4ED8 / #FFFFFF · #E9EFF8 | 6.70 · 5.80 |
| 主按钮 | #FFFFFF / #2563EB | 5.17 |
| 通知角标 | #FFFFFF / #DC2626 | 4.83 |
| 变化-好（文本） | #15803D / #FFFFFF | 5.02 |
| 变化-坏 / SLA 剩余（文本） | #B91C1C / #FFFFFF | 6.47 |
| 优先级色点（非文本，≥3:1） | #DC2626 · #EA580C · #2563EB · #64748B / #F1F5F9 | 4.41 · 3.25 · 4.72 · 4.34 |
| 反例排除 | #94A3B8（文本）/ #FFFFFF | 2.56 → 未使用 |

## Mock 数据量级依据（避免假数据特征）

订阅制工单 SaaS 中型客户（约 40 坐席）的典型负载：工作日 600~760 张/日、周末回落至 243~291 张，14 天合计 7,230 张；首次响应 4~5 分钟；SLA 达标率 93~94%。KPI：今日新增 612（-76 vs 昨日 688）、平均首次响应 4分12秒（-26 秒）、SLA 94.2%（+1.1pp）、活跃坐席 36/42（-3）。全部数值见 `src/data/mock.js` 头部注释与数据表。

## 无障碍 / 其他规则落点

- 焦点环 `:focus-visible`（`index.css`）；图表数据点 `tabIndex=0` + 原生 `<title>`（`TrendChart.jsx:153`）；图表 `role="img"` 摘要（`:111`）+ 可展开数据表（`:181`）；跳转链接（`App.jsx:9`）；`prefers-reduced-motion`（`index.css`）；数字列 `tabular-nums`；优先级"紧急/高/中/低"以文字承载、色点仅辅助；侧栏当前项 `aria-current="page"`（`Sidebar.jsx:65`）；响应式 375/768/1024/1280（KPI 1→2→4 列、主行 1 列→2:1）。

## 局限

按任务约束未执行 npm install / 未联网 / 未开浏览器：React 工程未本地构建验证（语法经静态走查），视觉效果由同构的 `preview.html` 静态快照代为呈现。
