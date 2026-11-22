# Ticket Filter Page Overrides

> **PROJECT:** S7 TicketFilter
> **Generated:** 2026-11-22 18:40:45
> **Page Type:** Search Results

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1400px or full-width
- **Grid:** 12-column grid for data flexibility

### Spacing Overrides

- **Content Density:** High — optimize for information display

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **PRESERVED PRODUCT TOKENS（本次 S7 精修冻结，覆盖 Master 调色板）**：此页为既有内部工单工具，产品特征不得改变 —— 背景 `ink-50 #F8FAFC`、卡片白、前景 `ink-900 #0F172A` / `ink-600 #475569`、主操作 `accent-500 #2563EB`、链接 `accent-600 #1D4ED8`。Master 生成的紫色/暗色 Glassmorphism 调色板与产品类型不匹配，经一次窄化重试仍未命中，按 skill 规则标记为未验证匹配、不予应用（fallback=保留现网 token）。
- 焦点环统一 `accent-600`，对白底 6.7:1（≥3:1，quick-reference `focus-states` / `focus-appearance`）
- 正文字号/间距沿用现状；对比不足的辅助文本统一升至 `ink-600`（≥7.2:1）
### Component Overrides

- Avoid: Force all chips into one clipped row or hide overflow values

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading
- Layout: Wrap the collection or use an operable +n disclosure for hidden overflow values
