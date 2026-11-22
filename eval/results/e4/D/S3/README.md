# WALSmith — S3 落地页（实验组 D · vismith）

本地优先 SQLite 同步引擎的产品落地页：hero（一句话价值 + 唯一主 CTA + 唯一次级动作）+ 三段功能论点（一节一论点一视觉）+ 定价表 + 页脚。

## 文件

| 文件 | 说明 |
|---|---|
| `index.html` | 页面结构（lang=zh-CN，无图片、无内联样式裸值） |
| `tokens.css` | 唯一 token 定义文件：ink ramp / 钴蓝 accent / Inter 字体栈 / 字号与间距阶梯 |
| `styles.css` | 组件与布局样式，全部经 `var()` 引用 token |
| `checks-before.json` / `checks-after.json` | vismith checks 首检 / 终检结果 |
| `.vismith/` | 设计契约与记忆（contract.json、decisions.log.md、reviews/） |

## 打开方式

直接用浏览器打开 `index.html`（静态交付，无构建链、无网络请求）。Inter 为本机字体栈首选，未安装时回退 Segoe UI / PingFang SC / Microsoft YaHei。

## 设计要点（决策详见 .vismith/decisions.log.md）

- **Tokens**：ink 中性 ramp `#111827 / #374151 / #51607A`（全部实算 >= 4.5:1，非边缘档）+ canvas `#F6F7F9` + hairline `#D9DEE8`；钴蓝 accent `#1A56DB`（文本用法 6.18:1 on #FFF、5.77:1 on canvas）只用于主 CTA、链接与焦点。
- **CTA 层级**：实心钴蓝按钮全页唯一（hero「安装并开始」）；hero 次级动作仅 GitHub 仓库链接；顶栏 CTA 与三档定价按钮一律描边。
- **节奏**：band 内衬 48px，相邻章节内容间距 96px，定价/页脚交界 112-128px。
- **信任要素**：仅 Apache-2.0 许可证、GitHub 仓库/Issues、文档等服务状态类可验证链接；无头像点阵、无五星、无无来源数字。
- **签名元素**（唯一）：深色终端卡（walsmith CLI 同步输出）。

## 检查结果

`node vismith/scripts/checks.mjs eval/results/e4/D/S3 --contract .vismith/contract.json`

- before：error 0 · warning 0 · info 1
- after：error 0 · warning 0 · info 1（info 为 CHK-01「4 组颜色配对全部 >= 4.5:1」正向确认）

未做像素级视觉验证（无浏览器环境）；详见 `.vismith/reviews/2026-11-22-landing.md`。
