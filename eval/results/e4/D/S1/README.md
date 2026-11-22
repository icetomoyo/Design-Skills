# DeskPilot · 运营总览页（S1，e4/D）

订阅制客服工单平台的"运营总览"页：4 张 KPI 卡（今日新增工单 / 平均首次响应 / SLA 达标率 / 活跃坐席）+ 近 14 天工单量趋势主图 + 未分配工单 Top 8 列表。技术栈 React 18 + Tailwind 3 + Vite。

> 本目录为**静态交付**：生成过程未执行 npm install、未联网、未启动浏览器。视觉层未做像素级验证（见 `.vismith/reviews/`），以确定性静态检查 + 零依赖功能测试为准。

## 目录结构

```
index.html                 入口（lang=zh-CN）
tailwind.config.js         tokens 与 .vismith/contract.json 一一对应
src/App.jsx                页面骨架：侧栏 + 顶栏 + 内容区（跳转链接/四态切换）
src/components/            Sidebar / Topbar / KpiCard / TrendChart / UnassignedList / PageStates / icons / ui
src/hooks/useOverview.js   loading/success/error 状态机 + reload
src/data/mockOverview.js   数量级真实 mock（日工单 200-900）+ 四态开关
src/lib/format.js          等待时长格式化
test/overview-mock.test.mjs  零依赖功能测试（node --test test/）
.vismith/                  Design Contract 与设计记忆
```

## 运行（本地补装依赖后）

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 功能冒烟测试（无需依赖）
npm run checks     # vismith 静态检查
```

## 四态触达（?mock= 参数）

- 成功：`/`（默认）
- 载入骨架：`/?mock=loading`
- 错误 + 重试：`/?mock=error`
- 空态 + 出口：`/?mock=empty`

页面上会出现场景提示条；顶栏"刷新"可重放状态机。

## 设计契约

设计决策、invariants 与 tokens 见 `.vismith/contract.json`；决策日志见 `.vismith/decisions.log.md`。要点：主图占内容宽 3/4（≥2/3）且第二数据块为列表；KPI 卡同高且三要素齐全；间距全部落在 4px 基线；文本对比度全部 ≥4.5:1；无渐变文字/彩色 glow/emoji 图标/问候式标题。

## 验收要点对照（S1 checklist）

- KPI 卡同高、数字+标签+较昨日变化三要素 → `KpiCard.jsx`
- 主图占内容宽 ≥2/3（xl 起 4 列网格占 3 列，≈75%）；第二数据块为列表 → `App.jsx` 主区网格
- 对比度 ≥4.5:1 → contract neutrals 全部达标，checks CHK-01 零 error
- 侧栏 + 顶栏骨架、4px 间距基线 → `Sidebar.jsx` / `Topbar.jsx`（Tailwind 整数刻度）
- 待办列表空态有说明与出口 → `UnassignedList.jsx`
- 无 slop 症状、无假数据特征 → 全局约束（contract INV-005/006）
