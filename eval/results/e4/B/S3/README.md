# S3 · LiteSync 落地页（实验组 B · ui-ux-pro-max skill）

本地优先 SQLite 同步引擎「LiteSync」的产品落地页。纯静态交付：零外链、零网络字体、零 JS、零构建——直接用浏览器打开 `index.html` 即可。

## 文件清单

| 文件 | 说明 |
|------|------|
| `index.html` | 落地页：顶部导航 → hero（唯一主 CTA + 1 个次级动作 + 终端演示）→ 信任条 → 三段功能论点（交替布局）→ 定价表（3 档，首屏以下）→ 页脚 |
| `styles.css` | 全部样式；颜色/字体/间距仅引用 `:root` 契约 token，组件层零裸 hex（已机器审计） |
| `design-system/litesync/MASTER.md` | 全局设计契约（skill 持久化机制承载）：ink 中性 ramp + 钴蓝 accent + Inter + Contract Invariants |
| `design-system/litesync/pages/landing.md` | 页面级 override：章节结构、间距节奏、组件与文案规则 |
| `README.md` | 本文件：流程、验证证据与自评 |

## 执行流程（严格按 ui-ux-pro-max skill 工作流）

1. **Step 1 需求分析**：开发者工具 / 本地优先同步引擎 / 落地页；栈＝纯静态 HTML+CSS（任务书禁网络与安装，故不用任何框架栈）。
2. **Step 2 设计系统**：`search.py "developer tool sync engine minimal technical" --design-system --persist -p "LiteSync" --output-dir <本目录> --variance 3 --motion 2 --density 3` → 生成并持久化 MASTER.md（返回 Minimalism & Swiss Style）。
3. **Step 2b 契约持久化（对应任务书「先建 invariants」前置）**：任务书已有 contract（ink ramp + 钴蓝 + Inter）优先于检索生成的建议色板（skill 明文：检索结果不得覆盖用户/仓库规则）。将契约 token 与 invariants 写入 MASTER.md（顶部导航保留 / 唯一主 CTA / 信任区仅可验证要素 / 80–128px 章节节奏 / 任务书全部拒绝项），并用 `--persist --page "landing"` 生成页面 override（Master 未动，无 `--force`）。
4. **Step 3 补充检索**：
   - `--domain landing "developer tool saas hero pricing"` → 0 结果；按协议用数据库提示词重试 `"hero features cta"` → 仍 0 结果。**声明：landing 结构无库内匹配**；页面结构采用任务书规定 + 已验证匹配 `trust-authority-conversion`（透明定价、可验证证明、CTA 路径）的信任区指导，未虚构匹配。
   - `--domain landing "social proof trust verifiable open source"` → 命中 `trust-authority-conversion`：信任区只放可验证要素、透明定价。
   - `--domain typography "inter developer technical sans"` → 命中「Modern Dark Cinema (Inter System)」：Inter 单族、Display 700/-1.5%、H1–H2 600/-0.5%、正文 400/16px，与本契约一致，字阶照此落地。
5. **Step 4 栈指南**：无匹配纯静态栈（html-tailwind 需 CDN/构建，被任务书禁用）→ 手写 CSS，唯一引用即 token。
6. **交付前**：MASTER.md 内置 Pre-Delivery Checklist 逐项核对（见下）。

隔离声明：全程未读取/运行本仓 `vsmith/` 任何文件；未产出 `.vismith/`；未读取 `eval/rubric.md`、`eval/grader-protocol.md`、`eval/results/` 其他目录；设计契约一律由 skill 自身 `design-system/` 持久化机制承载。

## 验收 checklist 自评

| 验收项 | 结果 | 证据 |
|--------|------|------|
| hero 标题换掉产品名后不成立 | ✅ | H1＝「LiteSync 给现有 SQLite 文件加一层 CRDT 合并：断网继续写，重连自动收敛」——把 LiteSync 换成任意产品名，即变成对该产品的不实断言（该机制声明只对本产品成立）；且标题具体到 SQLite/CRDT/断网合并，非通用口号 |
| 主 CTA 唯一，至多一个次级动作 | ✅ | 全页唯一 accent 填充按钮＝hero「免费上手（MIT 开源）」；hero 次级动作仅 1 个（文本链接「查看定价 →」）；导航与全部定价卡按钮均为 secondary 描边样式（`styles.css` 中 `.btn-primary` 仅 hero 一处使用） |
| 定价表首屏以下可见且对比度达标 | ✅ | `#pricing` 位于 hero + 三段功能之后，必然在首屏以下；价格/档名 ink-900 于白卡 17.75:1，正文 ink-700 10.46:1，单位文字 ink-500 4.97:1，「推荐」accent-600 8.44:1 |
| 与 contract tokens 零偏离 | ✅ | `styles.css` 机器审计：hex 仅存在于 `:root`（第 46 行结束），组件层全部 `var(--…)`；token 值与 MASTER.md 契约表逐一一致 |
| 信任区只有可验证要素 | ✅ | 信任条仅 3 项可点链接：MIT 许可证（LICENSE）、GitHub 源码仓库、公开 CHANGELOG；无头像点阵、无评分、无客户 logo |
| 章节间距 80–128 节奏 | ✅ | 所有 `<section>` `padding-block: var(--space-section)` ＝ `clamp(80px, 9vw, 128px)`，功能行间距同 token，无叠加 margin |
| 拒绝项：hype 词 / hero 上方徽章 / 悬浮光斑背景 / 全居中堆叠 | ✅ | 文案机器扫描 0 命中；hero 无任何标题前徽章、无渐变/光斑装饰；hero 左对齐两栏、功能段交替布局、页脚多列——全页无居中堆叠段落 |

> 扫描备注：对 `index.html` 全文 grep `blob` 的唯一命中是 GitHub 文件链接的 URL 路径段 `/blob/main/…`（代码托管平台的标准路径），与"悬浮 blob 背景装饰"无关；页面无任何渐变/光斑/radial 装饰背景。

## 对比度验证（WCAG 2.x 相对亮度公式，脚本实算）

```
17.75:1 PASS  ink-900 标题/价格 于 白
10.46:1 PASS  ink-700 正文 于 白      10.01:1 PASS  ink-700 正文 于 ink-50
 4.97:1 PASS  ink-500 次要 于 白       4.76:1 PASS  ink-500 次要 于 ink-50
 8.44:1 PASS  accent-600 链接 于 白     8.07:1 PASS  accent-600 kicker 于 ink-50
 8.44:1 PASS  白 于 accent-600 主CTA   10.28:1 PASS  白 于 accent-700 hover
15.00:1 PASS  ink-100 终端文 于 ink-900  6.89:1 PASS  ink-300 注释 于 ink-900
16.04:1 PASS  accent-50 标签 于 ink-900 16.04:1 PASS  ink-900 于 accent-50
 9.45:1 PASS  ink-700 标签 于 accent-50
15.00:1 PASS  ink-100 页脚链接 于 ink-900  6.89:1 PASS  ink-300 页脚小字 于 ink-900
 8.44:1 PASS  accent-600 勾选图标 于 白（UI 组件 ≥3:1）
```

## 其他交付质量项（Pre-Delivery Checklist）

- 无 emoji 图标：全部内联 SVG（stroke 风格，`aria-hidden` + `focusable="false"`）；
- 所有可点元素 `cursor:pointer`（`.btn`），触达目标 ≥44px（导航链接/按钮 min-height）；
- hover 均为 200ms 属性过渡（颜色/边框），无位移/缩放 → 无布局抖动；
- `:focus-visible` 钴蓝描边全局可见；skip-link；`lang="zh-CN"`；语义地标与 `aria-labelledby`；定价卡 `aria-label`；示意图 `role="img"` 带文字替代；
- `prefers-reduced-motion` 生效；无自动播放动画；
- 响应式 375 / 768 / 1024 / 1440（960px 断点折叠分栏，640px 单列），无横向滚动（终端/代码块横向滚动 containment 在卡片内）；
- 零网络请求 → CLS=0，无字体闪烁回退问题（Inter 本地优先栈，离线回退系统字体）。
