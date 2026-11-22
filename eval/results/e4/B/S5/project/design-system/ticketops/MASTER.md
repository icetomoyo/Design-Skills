# 坐席工单系统 · 设计契约（MASTER，提取版）

> **LOGIC:** 构建具体页面前先查 `design-system/ticketops/pages/[page-name].md`，存在则其规则**覆盖**本文件；否则严格遵循下述规则。
>
> **契约性质（S5 refine 模式）：** 本文件由 ui-ux-pro-max skill `--design-system --persist` 生成骨架后，**以既有 `tailwind.config.js` 的实际值改写为提取契约**——不是新方向。任务边界："改善可访问性与一致性，不改变产品特征"。skill 检索佐证（internal ticketing operations console → Minimalism & Swiss Style，Best For: Enterprise apps/dashboards）：其推荐 Muted Foreground `#475569`、Primary `#2563EB` 与既有系统 ink-600/accent-500 完全一致，证明既有方向无需改动，仅修缺陷点。

**Project:** TicketOps（坐席工单系统：运营总览 Dashboard + 坐席设置 Settings）
**Generated:** 2026-11-22 · **Mode:** extract-and-refine（不重设计）

---

## 色板（提取自 tailwind.config.js，全部语义 token，组件内禁止裸 hex/rgba）

| Token | Hex | 用途 | 白底对比度 |
|-------|-----|------|-----------|
| `ink-50` | `#F8FAFC` | 页面底色 | — |
| `ink-100` | `#F1F5F9` | 边框 / 分隔线 | — |
| `ink-600` | `#475569` | 次要文本 / 表单与统计标签 | 7.58:1 ✓AA |
| `ink-900` | `#0F172A` | 标题 / 主文本 | 16.1:1 ✓AAA |
| `accent-500` | `#2563EB` | 主按钮底（配白字 5.17:1 ✓） | — |
| `accent-600` | `#1D4ED8` | accent hover 态（预留） | — |
| `warm-600` | `#C2410C` | 指标强调（SLA 值）**S5 新增**，原行内 `#FF6B35`(2.71:1) 加深至 AA，橙色特征保留 | 5.18:1 ✓AA |
| `link` | `#7C3AED` | 列表行操作链接 **S5 新增入库**，原行内同值，色相不变 | 5.45:1 ✓AA |

规则：次要/标签文本一律 `ink-600`（禁 slate-400 级浅灰 `#94A3B8`，白底仅 2.45:1）；卡片表面 `bg-white`，页面表面 `bg-ink-50`，文本对比度按两者取较差值须 ≥4.5:1（大字 ≥3:1）。

## 字体（维持现状）

`font-sans: Inter, system-ui, sans-serif` —— **不采纳** skill 检索推荐的 Outfit/Work Sans（换字体会改变产品特征）。

## 间距（4px 基线，提取自 spacing token）

`4 / 8 / 12 / 16 / 24 / 32 px`。规则：页面间距只用上述 token；**禁止 13px、17px 等非基线值**（S5 修复：17px→`mb-16`，13px→`mt-12`）。

## 圆角与阴影（维持现状）

`rounded-sm 4 / md 8 / lg 12px`。统计卡为**平面风格（无阴影）**——S5 移除了首卡的孤立 boxShadow 以对齐四张同级卡片；如未来引入阴影须经 token 统一应用于全部同级卡片。

---

## Invariants（不变量 · 本次精修不得触碰）

1. 页面结构不变：Dashboard（header + 4 列统计卡 grid-cols-4 + 未分配工单列表 + banner）/ Settings（单列表单）；容器 `max-w-6xl` / `max-w-2xl` 不变。
2. 组件集不变：不新增组件库、不换 UI 库、不加依赖（package.json 保持 0 依赖）。
3. 品牌方向不变：蓝色 accent、Inter 字体、ink 灰阶、浅色主题。
4. 交互面不变：不新增/删除交互元素；链接仍为文本链接，按钮仍为 accent-500 实底白字。
5. 中文文案与信息架构（标题、标签、指标口径）不变。

## Refine 三档判定（缺陷 → 处置）

| 档位 | 缺陷 | 处置 |
|------|------|------|
| 必修 | 3 处对比度不足（#94A3B8×2、#FF6B35×1） | → `text-ink-600` / `text-warm-600` |
| 必修 | 3 处组件内裸 hex（#94A3B8×2、#FF6B35、#7C3AED） | 全部入库为语义 token |
| 必修 | img 缺 alt（Dashboard banner） | 补描述性 alt |
| 必修 | 间距 13px/17px 脱离 4px 基线 | → `mt-12` / `mb-16` |
| 应修 | 首卡孤立 boxShadow（同级不一致） | 移除（最小 diff 方案） |
| 暂缓 | 44px 触控目标（桌面坐席台场景，无触控需求）；img width/height 防 CLS（素材尺寸未知）；暗色模式（产品无此特征） | 记录不实施，避免越界重设计 |

## 验证

```bash
node eval/results/e4/B/S5/checks.mjs   # CHK-01 对比度 / CHK-02 裸色值 / CHK-04 alt / CHK-06 间距基线 → 必须 PASS 0 错误
```

修复过程与依据见 `eval/results/e4/B/S5/decisions.log`（≥2 条决策）。
