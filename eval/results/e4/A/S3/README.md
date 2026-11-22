# S3 · SQLite 同步引擎落地页（对照组 A · 无设计 skill）

静态单页实现。任务书：`eval/scenarios/S3-landing.md`（hero + 三段功能论点 + 定价表 + 页脚；低饱和 ink 中性 ramp + 钴蓝 accent + Inter）。

## 运行说明

无需安装任何依赖、无需网络，两种方式任选：

1. **直接打开**：双击 `index.html` 在浏览器中查看。
2. **本地静态服务（可选）**：
   ```
   python -m http.server 8000
   ```
   然后访问 `http://localhost:8000/eval/results/e4/A/S3/`。

说明：

- 页面零外部请求：Inter 未安装时自动回退系统字体栈（Segoe UI / PingFang SC / Microsoft YaHei 等）；图标全部为内联 SVG。
- 无 JavaScript：窄屏下导航链接收起，仅保留品牌与 CTA，功能不受影响。
- 页面内的 GitHub 链接（`tandem-db/tandem`）为演示用占位地址。

## 文件清单

| 文件 | 内容 |
| --- | --- |
| `index.html` | 页面结构：顶部导航 / hero / 三段功能论点 / 定价表 / 页脚 |
| `styles.css` | 设计 token（ink ramp + 钴蓝）与全部样式、响应式断点 |
| `README.md` | 本说明 |

## 实现要点

- **色板**：低饱和冷灰 ink ramp（`#0C0F13 → #F4F6F8`）+ 钴蓝 `#1D4ED8` 单一 accent，无渐变、无第二种彩色。
- **排版**：正文 Inter（系统回退）；标题紧字距；代码用等宽栈。
- **hero**：左对齐双栏，标题绑定 SQLite 具体能力（“行级同步 / 断网写 / 多端合并”）；唯一主 CTA「快速开始」+ 一个次级「查看定价」；信任区仅 MIT 许可证 / GitHub 仓库 / 发布日志等可验证链接，无评分、无头像点阵。
- **三段功能论点**：交替布局，每段各配一种证据（合并日志、架构示意图、SQL 查询）。
- **节奏**：章节间距 96px、定价区 112px，全部落在 80–128px 区间；窄屏降至 80–96px。
- **对比度**：正文 ≥7:1，弱化文字 ≥4.5:1，深色卡片文字 ≥8:1，按钮白字对钴蓝 ≥6.7:1。
