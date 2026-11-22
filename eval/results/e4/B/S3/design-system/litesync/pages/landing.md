# Landing Page Overrides

> **PROJECT:** LiteSync
> **Generated:** 2026-11-22 17:59:57
> **Page Type:** Landing / Marketing

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1120px 内容容器，两侧 24px 内边距（移动端 16px）
- **Grid:** hero 与三段功能论点采用左右分栏（交替左右），禁止全页居中堆叠
- **章节结构（任务书固定）**：顶部导航 → hero（一句话价值 + 唯一主 CTA + ≤1 次级动作 + 终端演示）→ 信任条（仅可验证要素）→ 三段功能论点（交替布局）→ 定价表（3 档，位于首屏以下）→ 页脚
- **结构依据声明**：landing 库检索「hero features cta」与「developer tool saas hero pricing」均 0 结果（已按协议重试一次）；本页结构采用任务书规定 + landing 库已验证匹配 `trust-authority-conversion` 的信任区指导（透明定价、可验证证明、CTA 路径），非虚构库匹配

### Spacing Overrides

- **Content Density:** Spacious（Dial 3/10）——落地页营销密度
- **章节节奏（binding）**：所有 `<section>` 使用 `padding-block: var(--space-section)` = `clamp(80px, 9vw, 128px)`，给足留白但严守 80–128px 区间，不叠加额外 section margin

### Typography Overrides

- 全部沿用 Master：Inter 单族（标题 600/-0.5%、正文 400/16px/1.65）；代码块用 `--font-mono`
- Hero H1：`clamp(2rem, 4vw + 1rem, 3rem)`，行高 1.15，左对齐

### Color Overrides

- 沿用 Master 契约 token（ink ramp + 钴蓝）；本页新增背景交替：`--color-background`（白）与 `--color-surface-muted`（`--ink-50`）逐节交替，区分章节而不引入新色相
- hero 终端卡片：背景 `--ink-900`，文字 `--ink-100`，路径/注释 `--ink-300`（6.9:1）
- 定价表：推荐档用 `--accent-600` 2px 边框 + 「推荐」标签（accent 文字于白底 8.4:1）；**所有定价卡按钮均为 secondary 描边样式**，全页唯一填充主按钮只在 hero

### Component Overrides

- **Nav（invariant #1）**：sticky header、白底、`--color-divider` 底边框；品牌 SVG 标记 + 文字标；链接：功能 / 定价 / 文档（→ GitHub 仓库 README 锚点）；右侧次级描边小按钮「开始使用」→ `#get-started`
- **Hero 主 CTA（invariant #2）**：`.btn-primary`「免费上手（MIT 开源）」→ GitHub 快速上手；次级动作仅一条：文本链接「查看定价 →」→ `#pricing`
- **信任条（invariant #3）**：MIT 许可证（→ LICENSE）、GitHub 仓库（→ 源码）、公开更新日志（→ CHANGELOG）三个可验证链接；无头像、无评分、无客户 logo
- **三段功能论点**（交替布局 + 每段配代码/图示卡）：
  1. 断网写入按操作合并（CRDT 行级操作，非 last-write-wins）
  2. 接入现有 .db 不改 schema（一张 meta 表 + 两张触发器）
  3. 同步日志可审计可重放（确定性合并顺序）
- **定价表**：3 档（开源 $0 / 团队 $12 每开发者·月 / 自托管 企业联系）；价格用 `--ink-900`；首屏以下，滚动可达，锚点 `#pricing`
- **页脚**：产品 / 资源 / 开源 三列链接 + 版权行；纯文本链接色 `--color-text`，hover 变 accent 并下划线

### 图标与媒体

- 图标一律内联 SVG（stroke 风格，`aria-hidden="true" focusable="false"`）；无位图、无外链资源 → 零网络请求、CLS=0
---

## Recommendations

- Effects: Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading
