# Deskflow · 运营总览（S1 演示页）

订阅制客服工单平台的"运营总览"页。React 18 + Tailwind 3 + Vite，无图表库。

页面结构（自上而下）：

1. **KPI 行** —— 4 张同高指标卡（今日新增工单 / 平均首次响应 / SLA 达标率 / 活跃坐席），每张含数字 + 标签 + 变化（带方向符号与 vs 昨日基准）
2. **主图** —— 近 14 天工单量趋势（原生 SVG 折线，占满内容宽度 >=2/3）：新建 = 蓝实线 + 15% 面积，已解决 = 灰虚线，线端直接标签；附一句话结论与开放数据表
3. **第二数据块** —— 未分配工单 Top 8 列表（按等待时长降序，非第二张图表）

## 运行

```
npm install
npm run dev
```

## 设计契约（Vismith）

`.vismith/contract.json` 为本项目设计契约；`tailwind.config.js` 的语义色与其 `tokens.colors` 一一对应，组件内不写裸色值。静态检查（仓库根运行）：

```
node vismith/scripts/checks.mjs eval/results/e1/S1-seedA --contract eval/results/e1/S1-seedA/.vismith/contract.json
```

`checks-before.json` / `checks-after.json` 分别为契约 token 修订前（模板草案，2 个 CHK-01 对比度 error）与最终代码的检查结果。

## 交互与状态

- 顶栏搜索实时过滤未分配列表；无匹配 -> "筛选无结果"空态（含清除筛选入口）
- 行内"分配"移除该行（带 aria-live 轻反馈）；全部分配后 -> "队列为空"空态（含刷新队列入口）
- 两类空态均真实可触达，非静态截图式代码

## 无障碍要点

- 所有文本/背景组合 >= 4.5:1（逐对比对记录见 `.vismith/decisions.log.md`）
- 统一 `focus-visible` 焦点环；首屏"跳到主内容"链接
- 图表带 `title`/`desc` 与可见数据表；变化值带方向符号，不只靠颜色

## Mock 数据口径

日新建工单 200-900 区间、周末回落（11/07-11/08、11/14-11/15）；页面中所有汇总（日均/峰值/解决率/环比）均由 `src/data/mock.js` 原始数据计算得出。
