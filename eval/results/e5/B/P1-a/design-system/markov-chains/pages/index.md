# Page Override — index.html（马尔可夫链科普页）

覆盖 `MASTER.md` 中与本页交付约束冲突或需适配的条目；未提及项仍以 MASTER.md 为准。

## 受众与语气（Step 1 分析结论）
- 一句话任务「做一个网页，讲马尔可夫链」→ 自行推断：面向中文普通学习者（大学生/技术爱好者）的单页科普 + 交互演示。
- 产品类型：教育/内容讲解页（content-first），非儿童应用。

## 覆盖项

### 1. Typography（MASTER: Baloo 2 / Comic Neue，kids/children's apps）
- **拒绝理由**：该配对的 Best For 是儿童应用/教育游戏；本页受众为一般成人学习者，且交付要求零外部请求，Google Fonts 不可用。
- **替代**：系统字体栈，语义与层级保留（基准 16px、行高 1.6、清晰标题尺度）：
  - UI/正文：`system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`
  - 矩阵/数字/代码：`ui-monospace, "Cascadia Mono", Consolas, "Courier New", monospace`
- 遵循 quick-reference §6：正文 ≥16px，不出现 <12px 文本。

### 2. Pattern（MASTER: Trust & Authority + Conversion / SaaS 转化）
- **适配**：转化语义映射为「从读到动手」：Hero 定义 → 概念卡 → 图示 → 矩阵 → 模拟器（主 CTA）→ 性质 → 应用 → 小测。
- 自动运行内容规则照搬：自动模拟默认关闭，提供暂停/停止，`prefers-reduced-motion` 时不自动运行。

### 3. Typography/Motion 落地（零依赖）
- 不引 GSAP：用 CSS transition/animation + IntersectionObserver 实现 Stagger List（300–450ms、back.out 近似的 cubic-bezier(0.34,1.56,0.64,1)），`prefers-reduced-motion` 下直接呈现终态。
- 悬停 150–300ms、按压 soft-press 200ms、多层阴影，与 MASTER 的 Key Effects 一致。

### 4. 图表（chart 域搜索结论）
- 转移矩阵以「数值 + 强度底色」呈现（单元格内打印数值，不单靠颜色）；分布对比条形图直接标注数值；箭头概率以文字标注。
- 图表均为内联 SVG/DOM，键盘可达、屏幕阅读器有数据表兜底（矩阵本身即 table）。

### 5. 无障碍硬性项（ux 域搜索 + pro-rules 清单）
- 全部交互控件用原生 `<button>`，焦点环可见（`:focus-visible`，ring #2563EB），触控目标 ≥44px。
- 图标一律内联 SVG（Lucide 风格 24px、stroke 2），装饰性图标 `aria-hidden="true"`；无 emoji 图标。
- 状态播报用 `aria-live="polite"`；切换按钮用 `aria-pressed`。
- 对比度：正文 #0F172A/#475569 on #FFFFFF≥4.5:1；#F59E0B/#EC4899 仅作大面积强调色或底色配深字，不作浅底小字。

### 6. 响应式（html-tailwind 域搜索结论的等价落地）
- 移动优先：375px 起，内边距随断点递增（px 16→24→32），无横向滚动；矩阵表格窄屏限宽内横滚并保留行头；SVG viewBox 自适应。
