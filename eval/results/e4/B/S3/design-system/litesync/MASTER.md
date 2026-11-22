# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** LiteSync
**Generated:** 2026-11-22 17:58:02
**Category:** Developer Tool / IDE
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 2/10 (Subtle) | Density 3/10 (Spacious)

---

## Global Rules

### Binding Project Contract (overrides generated palette)

> 来源：任务书前置 contract（先于生成存在，优先级高于检索生成的建议色板）。
> 低饱和 ink 中性 ramp + accent 钴蓝（cobalt）+ 正文 Inter。**页面实现零偏离：组件层只允许引用下列 CSS 变量，禁止裸 hex。**

#### Ink 中性 ramp（低饱和，色相 ≈220°）

| Token | Hex | 用途 |
|-------|-----|------|
| `--ink-900` | `#101828` | 标题、价格、代码块背景 |
| `--ink-700` | `#344054` | 正文 |
| `--ink-500` | `#667085` | 次要文字（白底 4.97:1，仅用于白底/近白底） |
| `--ink-300` | `#98A2B3` | 仅禁用态/占位（白底不达标，不做正文） |
| `--ink-200` | `#D0D5DD` | 边框 |
| `--ink-100` | `#EAECF0` | 分隔线；ink-900 上的代码文字（6.9:1） |
| `--ink-50` | `#F9FAFB` | 弱化底色 |

#### Accent 钴蓝

| Token | Hex | 用途 |
|-------|-----|------|
| `--accent-600` | `#0047AB` | 主 CTA 背景、链接、强调文字（白底 8.4:1） |
| `--accent-700` | `#003C8F` | hover / focus ring |
| `--accent-50` | `#EEF4FC` | 强调淡底 |

#### 语义别名（组件只允许用别名或 ramp 变量）

| Role | Value | CSS Variable |
|------|-------|--------------|
| Primary text | `var(--ink-900)` | `--color-primary` |
| Body text | `var(--ink-700)` | `--color-text` |
| Muted text | `var(--ink-500)` | `--color-text-muted` |
| Accent/CTA | `var(--accent-600)` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#FFFFFF` | `--color-background` |
| Surface | `#FFFFFF` | `--color-surface` |
| Muted surface | `var(--ink-50)` | `--color-surface-muted` |
| Border | `var(--ink-200)` | `--color-border` |
| Divider | `var(--ink-100)` | `--color-divider` |
| Ring | `var(--accent-700)` | `--color-ring` |

**Color Notes:** Light-first（ink 文字于白底）；钴蓝只用于 CTA/链接/强调，不做大面积背景。

### Contract Invariants（不可违反）

1. **顶部导航必须保留**：sticky header + 品牌区 + 锚点导航 + GitHub 链接。
2. **CTA 层级固定**：全页唯一的 accent 填充主 CTA 在 hero；hero 内至多一个次级动作；导航与定价卡动作均为 secondary（描边/文本），不得出现第二个填充主按钮。
3. **信任区只含可验证要素**：开源仓库链接、MIT 许可证、公开更新日志；禁止头像点阵、五星评分、虚构客户 logo。
4. **章节间距节奏 80–128px**（`--space-section: clamp(80px, 9vw, 128px)`）。
5. **拒绝项**：hype 词（赋能/无缝/革命性/seamless/revolutionary/empower）、hero 上方 pill 徽章、悬浮 blob 背景、全页居中堆叠布局。
6. 正文 ≥16px / 行高 ≥1.5；对比度 ≥4.5:1；键盘可达 + 可见 focus ring；`prefers-reduced-motion` 生效；无横向滚动。
### Typography

- **Heading Font:** Inter（contract 指定；库内已验证匹配：typography「Modern Dark Cinema (Inter System)」）
- **Body Font:** Inter
- **Mood:** technical, precise, functional, developer
- **字阶（依已验证匹配的 notes）**：Display 700 / -1.5% tracking；H1–H2 600 / -0.5%；正文 400 / 16px / 行高 1.65；标签 500 大写 +1.2% tracking
- **代码字体**：`ui-monospace` 栈（本机若有 JetBrains Mono 则优先）
**CSS Import（离线交付不采用）：** 本仓为纯静态、零网络请求交付 → 不使用 `@import` 网络字体，采用本地优先字体栈：
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); /* 仅示意；本仓禁网，实际用下方字体栈 */
--font-sans: Inter, "Inter var", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |
| `--space-section` | `clamp(80px, 9vw, 128px)` | 落地页章节节奏（contract invariant #4） |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button（全页唯一，仅 hero 主 CTA） */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 200ms ease;
  cursor: pointer;
}

.btn-primary:hover { background: var(--accent-700); }

/* Secondary Button / 动作（导航、定价卡、次级动作） */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: border-color 200ms ease, color 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover { border-color: var(--accent-600); color: var(--accent-600); }
```
### Cards

```css
.card {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  border-color: var(--ink-300);
  box-shadow: var(--shadow-md);
}
/* 注：卡片为信息容器，非点击目标 → 不加 cursor:pointer、不做位移 hover（避免布局抖动） */
```
### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-50);
}```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** FAQ/Documentation Landing

- **Conversion Strategy:** Reduce support tickets. Track search analytics. Show related articles. Contact escalation path.
- **CTA Placement:** Search bar prominent + Contact CTA for unresolved questions
- **Section Order:** Hero with search bar > Popular categories > FAQ accordion > Contact/support CTA

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Hype 文案：赋能 / 无缝 / 革命性 / seamless / revolutionary / empower（contract invariant #5）
- ❌ Hero 上方 pill 徽章、悬浮 blob/渐变光斑背景（contract invariant #5）
- ❌ 全页居中堆叠布局（hero 与功能段用左右分栏/交替布局）
- ❌ 第二个 accent 填充主按钮（contract invariant #2）
- ❌ 不可验证信任要素：头像点阵、五星评分、虚构客户 logo（contract invariant #3）
- ❌ 组件层裸 hex（必须走 contract token 变量）
- ❌ Dark-mode-only（contract 为 light-first ink 方案）
- ❌ Slow performance
### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
