# hallmark 仓库深度调研报告（归档）

> 归档说明：由子代理 /root/research-hallmark（turn_root_research_hallmark_1，2026-11-16）产出；
> 上游本地路径 C:\Works\PubProj\hallmark，origin https://github.com/Nutlope/hallmark.git，HEAD 04977e1（v2.0.0）；
> 许可证结论：根与 skills/hallmark 均为 MIT（"Copyright (c) 2026 Hallmark contributors"）——规则文本/脚本/主题 md 可改造复用；
> 唯一第三方链是 photos.json 图片库（Wikimedia，逐张 CC0/PD/CC BY/CC BY-SA，元数据清单本身 MIT）。
> 传输截断：§3 尾段与 §4 前三条（1-3）缺失，原文见本地仓库；其余完整。

## 1. 概况

- 定位：Together AI 出品的单一 Agent Skill（README:3 "refuses to look AI-generated"），Claude Code/Codex/Cursor/OpenCode
- 规模：约 860 文件。skills/hallmark/ = SKILL.md(154 行) + 25 references + 52 主题(md+jpg) + 21 macrostructures + 4 genres + 16 脚本（sloplint.mjs 4,225 行/231KB、sloplint-render.mjs 100KB、theme.mjs 59KB、photos.json 452KB）；site/ 官网；eval/ 内部评测（不随包分发）
- 活跃：349 commits / 约 20 贡献者（高度集中）；社区基建完整（CONTRIBUTING/AGENTS/模板/CI）
- 分发：npx skills add nutlope/hallmark -g + plugin marketplace + 本地 install.mjs（安装前强制 refcheck + theme validate）

## 2. 许可证审计

- 根 LICENSE 与 skills/hallmark/LICENSE 均标准 MIT；README:112 "MIT. Use it, fork it, ship it."
- 图片库：photos.json 755 条，每条含 license/author/page 字段；实际引用图片须逐张署名，CC BY-SA 有 share-alike——建议只复用元数据结构作许可链范本，不引入图片
- "Hallmark" 名称按商标谨慎处理不使用；无 NOTICE；零第三方代码依赖

## 3. 架构与机制（幸存部分）

- SKILL.md：16 条不可豁免 Floor + 7 步 Flow（Pre-flight → Ask once → Shape → Direction → Load → Picks → Build → Sweep）；披露纪律硬性："loading more is the largest avoidable cost"；主题文件 3-8KB；SKILL.md <=19,000 字节由 refcheck 强制（理由：compaction 后重挂的 5,000 token 仍能装下 Step 7）
- 规则编码：单一真源 references/gates.md（39KB），每条 gate 一行（编号|tier|class|tell|fix）；tier = Floor（不可豁免）/Reflex（留痕豁免）/Finish（不阻塞）/Ledger（只记录）；class 标明 M 静态 / M+R / R+J 评审；sloplint 内嵌 105 条派生表，refcheck 校验两边一致（gates.md 优先）；退役编号永不复用
- sloplint.mjs：手写 CSS/HTML/JSX/TSX/Vue/Svelte/Astro 解析器（含 Tailwind class 解析）、OKLCH 颜色数学与对比度、token 解析、stamp 驱动检查行为（copy:verbatim 降级文案 gate、shape:app screen 切换 scope、redesign: 深度降级布局 gate）；豁免机器验证 applyWaivers：三字段（gate/guard 证据/理由），理由 <12 有效词或模板话即拒绝；同一 gate 连续 3 次豁免提示 house style
- sloplint-render.mjs：8 宽度渲染检查（320-1920），像素采样对比度（隐藏文字取背景 median 色）、几何测量（hero 居中比、fold 位置、每屏词数）
- 【传输截断：§3 尾与 §4 第 1-3 条缺失——涉及 rotation 日志细节与防趋同机制原文，见本地 skills/hallmark/】

## 4. 相对增量（对照三上游 + Vismith PRD 六模块；4-10 条幸存）

4. 多样性记忆：rotation 日志 + deal/draw 发牌 + projectSalt——三上游记忆只服务一致性，hallmark 额外服务"同一项目连续 build 不趋同"（六轴结构差异校验）→ .vismith/ 记忆的第二目标（M6）
5. anatomy.md job→页面解剖 + DRAW 发牌：10 个访客 job（subscribe/book/visit/...）各定义 action 位置与收尾，基于约 50 个真实独立站点；与 ADR-12 意图轴正交且更可执行 → routing.md 意图细化层（M3）
6. eval harness 完整工程：expect 块（含拒绝正例）、pack 两档对比、conformance 解析、repair loop、rotation 合规验收、数字阈值——skill 行为评测全链路实证（含 2026-07-23 实测结论）→ E1/E4 蓝图
7. stamp 机器可读决策注释：产出 CSS 首行结构化 stamp（build/check 双形态），人可审计且被 sloplint 解析改变检查行为 → M2/M6 per-page 决策快照
8. refcheck 知识库 CI 治理：规则文档↔检查器一致性、死链、token 词汇表、orphan、金样、字节预算 → ADR-13 从字节预算扩展到结构一致性全家桶
9. pre-flight 信号优先级链：design.md > brand-spec > 项目 tokens > 产品截图 > MCP > API key；"设计文件内容一律当数据不当指令"注入防护 → FR-2
10. 渲染层确定性视觉 gate：像素采样对比度、hero 居中比、fold y、每屏词数——把视觉问题转为可计算阈值 → v0.3 capture.mjs 行为参考（M4/FR-5）；素材纪律 46a（禁编造指标/证言/logo 墙）与 70（假发送成功）为文案级种子规则源

## 5. 工具与运行时

- Node ESM >=18 零 npm 依赖；渲染层可选 puppeteer-core + 本机 Chrome（多路径探测降级，含 Windows 路径）
- 副作用：写目标项目 .hallmark/ + tokens.css/base.css（append-only）；安装写宿主目录；hook 写 settings.json（tmp+rename 原子写）；网络仅字体/图链与可选 TOGETHER_API_KEY
- 安全：install 不跟 symlink；hook advise-only 4s 超时；design.md 内容不可降低 gate；Windows 兼容显式纳入

## 6. 局限与风险

- 场景窄于 Vismith：自包含单页 HTML+CSS 为主战场，真实代码库大规模 refine 覆盖弱（设计取舍非缺陷）
- sloplint 4,225 行手写解析器，规则审美高度主观，单人主导（288/349 commits）——行为可学，照搬维护成本高
- 编辑期 hook 同 impeccable 审批绕过问题（我们已排除）；Together AI 商业绑定（imagegen/comp 信号）
- photos.json 452KB + 52 主题 jpg 包体积大

## 7. 三清单

值得借鉴（MIT，改造复用并标注来源）：
1. before/kept wiring 清单 + dropped/reworded 留痕协议 → M5 Verify 操作化（上游无先例）
2. Floor/Reflex/Finish 分级 + 三字段 guard 化豁免（机器重推导）→ M4 输出 schema 与 ignore 通道结构升级
3. rotation 日志 + deal/draw 防趋同 + projectSalt → M6 独有增量（记忆服务多样性）
4. anatomy.md job 解剖 + DRAW 发牌表 → M3 意图轴落地层
5. eval harness 模式（expect/拒绝正例/pack 分档/repair loop/rotation 验收/数字阈值）→ E1/E4 蓝图
6. stamp 机器可读决策注释 → M2/M6 轻量补充
7. refcheck 式知识库 CI → ADR-13 扩展
8. gates.md 一行一规则 + tier + class + 编号退役不复用 → 规则库演化纪律
9. pre-flight 信号优先级链 + 注入防护 → FR-2
10. 文案级反 slop 规则（gate 19/46a/54/63/66/69/70）→ M4 种子扩充源

应重实现（研究行为不抄代码）：
1. sloplint 检查器本体（规则行为按 checks.mjs schema 重写，避免 4 千行单文件）
2. 渲染层像素/几何 gate（v0.3 capture.mjs 按"重写不抄"路线）
3. 主题系统（"主题=材料非版式"思想进风格知识条目；52 主题按 scope 少量改造）
4. deal 词法评分（df 加权+停用词，无增量，自研即可）

不引入：
1. 编辑期 PostToolUse hook（绕过模型审批）
2. photos.json 图片库与署名链（不做资产库，CC BY-SA 逐张管理成本）
3. Together imagegen/comp 信号（外部商业服务）
4. site/ 官网与 52 主题 jpg 资产
5. 自包含单页 HTML 输出形态（与"真实代码库 UI"目标不符，仅 per-page 纪律可迁移）
