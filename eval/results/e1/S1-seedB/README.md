# S1-seedB · 工单平台「运营总览」页（React + Tailwind + Vite）

订阅制客户支持工单平台的运营总览页：4 张 KPI 卡（今日新增工单 / 平均首次响应 / SLA 达标率 / 活跃坐席）+ 近 14 天工单量趋势主图（可切近 30 天）+ 未分配工单 Top 8 列表。

设计契约由 vismith skill 管理：`.vismith/contract.json`（含 invariants / tokens / 组件规则），决策记录见 `.vismith/decisions.log.md`。

## 运行

```
npm install
npm run dev
```

## 状态演示

- 错误态：访问 `/?mock=error`（展示人话错误 + 重试入口 + 错误码）
- 空态：在顶栏搜索框输入不匹配关键词（如 `zz`）→ 未分配列表显示说明与「清除搜索条件」入口；清空数据源时显示「查看分派规则」入口
- 加载态：进入页面后约 240ms 内展示与最终布局同形的静态骨架

## 静态检查（vismith）

```
node vismith/scripts/checks.mjs eval/results/e1/S1-seedB --contract eval/results/e1/S1-seedB/.vismith/contract.json
```

- `checks-before.json`：开工前契约门槛基线（CHK-01 颜色配对校验，尚无 UI 文件）
- `checks-after.json`：生成完成后的全量复验结果

## 数据与验证说明

- 所有数字为演示 mock（日工单 200-900 数量级）；「今日」为进行中数据（截至 14:30），KPI 与「昨日同期」比较，趋势图末点即今日。
- 本次执行了确定性静态检查（对比度 / 间距基线 / 硬编码颜色 / 语义 / 焦点 / 固定宽度）与语义层人工核对；未做浏览器像素级视觉验证。
