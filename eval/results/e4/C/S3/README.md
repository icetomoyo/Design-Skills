# S3 · Concord 落地页（实验组 C · impeccable skill）

SQLite 同步引擎（虚构示例产品 "Concord"）的产品落地页。按 impeccable skill v4.9.1 工作流产出：`impeccable context` → init（PRODUCT.md）→ `concept-seed --scope direction --mode persuade` 掷向 → surface brief（方向契约）→ code-led 构建 → `impeccable detect` + 静态契约检查 → finish reviewer（独立子代理）→ documenter（DESIGN.md）。

## 文件清单
| 文件 | 说明 |
|---|---|
| `index.html` | 落地页（hero + 三段功能论点 + 信任区 + 定价 + 安装 + 页脚；纯静态，无 JS 依赖） |
| `styles.css` | 全部样式；颜色/字体 token 与 contract.json 零偏离 |
| `contract.json` | 品牌契约：ink 中性 ramp（10 阶）+ 钴蓝 accent + Inter；invariants（顶部导航、CTA、80–128 节奏、对比度） |
| `check.mjs` | 零依赖静态检查器（CHK-01…08，等价于 harness 的 contract.mjs 校验） |
| `PRODUCT.md` | 产品事实（subagent 推断，假设已标注） |
| `DESIGN.md` | 构建后由 documenter 记录的设计系统 |
| `.impeccable/surfaces/index-html.md` | surface brief + 方向契约（THESIS/OWN-WORLD/STORY/FIRST VIEWPORT/FORM/FINISH） |
| `detect.json` | impeccable detect 输出（构建后最终轮） |

## 运行
- 打开 `index.html`（或 `npx serve` 等任意静态服务器；无构建步骤）。
- 检查：`node check.mjs`（当前 14/14 通过，exit 0）。

## 设计要点
- **方向**：三角测量测绘图（survey triangulation sheet）——多观测站收敛为一张图，CRDT 收敛被"画出来"而非口号化。七候选按共鸣排序，concept-seed 指定第 4 候选构建（seed:0a405f8593d29305）；竞标挑战者按双轴裁决（suminagashi 墨盆、剪辑台 select rail 判 competitive，其余 declined），并吸收三条 named raises（镜像双像、verdict-box、mark-not-hue）。
- **首屏机制演示**：两个"观测站"各选一条离线写入选（CSS `:has()` + radio，无 JS），钴蓝三角网收敛到 verdict box——两个基线都选定后才开箱（verdict-box 纪律）；四种组合给出诚实的 CRDT 合并语义（同列 LWW / 异列并存）。
- **hero 具体性**："Concord merges two offline SQLite writes into one row — inside the file itself." 换名即假（他产品并不在文件内部合并）。
- **CTA**：唯一主动作 "Install the extension"（导航+hero 同组件重复呈现）；hero 恰好一个次级文本动作。
- **信任区**：仅可验证形态要素（仓库链接、Apache-2.0、文献引用）；无头像点阵、无五星。
- **节奏**：section 统一 `clamp(80px,9vw,120px)`；布局非全居中（非对称双栏/全幅图带交替）。

## 降级声明（本环境约束：禁 npm install / 网络 / 浏览器）
1. **contract.mjs 不可用**：其位于禁读的 `vismith/` 目录 → 以 `contract.json` + `check.mjs` 静态等价建立 invariants 与 CHK 校验。
2. **无浏览器/截图**：skill 的视觉检查与 finish review 截图证据链不可执行 → 以 `impeccable detect`（51→2 项）+ 静态对比度计算（14 对全过，最差裕度 ×1.05）+ 独立 reviewer 代码级审查替代；像素级判断标记 unverifiable-static。
3. **Inter 无网络加载**：使用本地字体栈 `"Inter","Segoe UI",system-ui`；未装 Inter 的机器降级到 Segoe UI/system-ui（detect 的 overused-font 提示被 brief 钉死的 Inter 契约覆盖）。
4. **无图像生成**：按 skill 规则走 code-led 路径，无 decision comp；QUALITY BAR 图片（webp 远程）不可获取。
5. **决策页/用户问询不可用**（subagent 无用户）：按 skill 的 unattended 降级路径，采用掷向的 assigned 方向并自行完成挑战者裁决；替换声明见本文件与最终报告。
6. **保留的 advisory**：36px 细线坐标纸底纹（repeating-gradient）为测绘图世界的材料本身，刻意保留。
7. **虚构内容**：产品、定价（页内已注明 illustrative）、仓库链接均为占位；无编造客户/评分。

## 验收对照
- hero 具体性 ✓（换名即不成立）· 主 CTA 唯一 +1 次级 ✓ · 定价表首屏下方 + 对比度达标 ✓ · contract tokens 零偏离（CHK-01/02）✓ · 信任区仅可验证要素 ✓ · 章节间距 80–128 ✓ · 无 hype 词 / pill+blob / 全居中 ✓

（finish review 与 DESIGN.md 结果见下节。）

## Finish review（独立子代理，代码级）
- 判定：**fix** → 5 项材料修复已全部应用并复验：① 补绘 deferred 状态的 drawn mark（superseded 叉号 + 历史行）；② 图表名称标签改为 tabular Inter caps（mono 仅限代码/测量/哈希）；③ 消除 .tier-flag 眉标违规（改为价格下方的 flagged 行）；④ .station-demo 加 role="group"；⑤ 增加 `@supports not (:has)` 静态降级（不支持 :has 的浏览器静态展示示例解算 + 说明）。
- 修复后复验：check.mjs 14/14 通过；detect 余 2 项均为声明性覆盖（Inter 被 brief 钉死；坐标纸底纹为世界材料，advisory）；检查器另捕获并修复 ink-5-on-ink-1 对比度 4.39→7.06（legend/ts/history-line/no-has-note 提级 ink-6）。
- reviewer 保留意见：像素级视觉判断（渲染几何、地面色温）在无浏览器环境下标记 unverifiable-static；建议后续有浏览器时补拍 desktop/mobile 截图终验。
- 关键 keep（勿稀释）：0.028-α 坐标纸底纹、纯 CSS :has() verdict 门、测绘标注词汇（Δ ops、HLC、state hash、sheet-no）。

## DESIGN.md（documenter 子代理，构建后记录）
- 已写入 `DESIGN.md` + `.impeccable/design.json`（schemaVersion 2 sidecar）：14 个 token 元数据、10 个 ds- 组件、9 条命名规则（One Ink / Ruled Ground / Mark-Not-Hue / Pinned Face / Mono Scope / Tabular Figure / Rhythm / Persistent Sheet / Subordinate Shadow）；写入后 check.mjs 复跑 14/14。
- 记录在案未修复（诚实披露）：<760px 导航链接隐藏无替代菜单（invariant 仅要求导航+CTA 持久，仍满足）；Inter 750/800 字重在降级字体栈上会折损。 
