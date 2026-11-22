# S1 · 工单平台「运营总览」页（对照组 A）

订阅制客服工单平台 Deskline 的运营总览页：4 张 KPI 卡 + 近 14 天工单量趋势主图 + 未分配工单 Top 8 列表。

## 交付物

| 文件 | 说明 |
| --- | --- |
| `index.html` / `src/**` | React + Tailwind 源码（Vite 工程） |
| `preview.html` | **零依赖静态预览**，直接双击打开即可查看完整视觉（含空态切换，纯 CSS 实现） |
| `package.json` 等 | 构建配置（静态交付，未执行 install/build） |

## 运行（如需本地构建）

```bash
npm install
npm run dev     # http://localhost:5173
```

## 结构

```
src/
  App.jsx                     页面骨架：侧栏 + 顶栏 + 内容区
  data/mock.js                全部 mock（KPI/趋势/队列），数量级刻意真实
  components/
    Sidebar.jsx               240px 深色侧栏（品牌/导航/用户）
    Topbar.jsx                64px 顶栏（搜索/示例数据标记/通知/用户）
    KpiCard.jsx               KPI 卡：标签 + 数值 + 变化(vs昨日) + 基准说明
    TrendChart.jsx            手写 SVG 折线图（无图表库），7/14 天切换
    UnassignedList.jsx        Top 8 待办列表 + 空态（内置"预览空态"开关）
    icons.jsx                 手写线性 SVG 图标（无 emoji、无图标库）
```

## 验收要点对照

- **KPI 卡同高三要素**：`grid-cols-4` 同高；每卡含标签、数值、vs 昨日变化（含涨跌方向与好坏配色——工单升=红、响应降=绿等按业务语义判定）。
- **主图 ≥2/3 宽**：`xl:col-span-2 / 3` = 2/3；第二数据块为列表，非第二张图。
- **对比度**：正文 slate-900/700、次要 slate-500（4.76:1）；变化徽章 emerald-700/red-700 于 50 底色均 >5:1；深色侧栏文字 slate-300（≈10:1）。
- **骨架与 4px 基线**：侧栏 240px + 顶栏 64px；全部间距取 Tailwind 4px 倍数（4/8/12/16/24/32），圆角 8px，卡片 padding 24px。
- **空态**：列表空时显示「队列已清空」说明 + 配置规则/刷新入口；可在标题右侧「预览空态」即时查看。
- **无 slop**：无渐变文字、无彩色 glow、图标全部为手写 SVG（零 emoji）、无问候式标题、无"Trusted by N+"类无来源声明；页面明确标注「示例数据 / mock」。
- **mock 数量级**：日工单 243-647（周末回落），响应 18 分钟，SLA 92.4%，坐席 37/45；今日 vs 昨日、与趋势图末端数值相互一致（647/618）。
