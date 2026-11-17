# ui-ux-pro-max-skill 深度源码调研报告（归档）

> 归档说明：由子代理 /root/research-uiuxpromax（turn_root_research_uiuxpromax_1，2026-11-15）产出；
> 上游本地路径 C:\Works\PubProj\ui-ux-pro-max-skill，origin https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git，commit d643997；
> 许可证结论：根 MIT（知识库 data/*.csv 可改造复用）；ui-styling 子目录 Apache-2.0 授权链不清，排除复用。
> 传输截断：§3 尾段与 §4 知识库主体（条目格式细节与抽样摘录）在传输中截断，原文见本地仓库；
> 归档时行内代码标记规范化为「」，代码块改缩进，文字内容未改动。

## 1. 仓库概况

目录树（两层）【源码证实】：

    ui-ux-pro-max-skill/
    ├── .claude/skills/        # 7 个子 skill（Claude Code 用运行副本）
    │   ├── ui-ux-pro-max/     # 主 skill：data/*.csv + scripts/*.py + references/
    │   ├── ui-styling  design  design-system  brand  slides  banner-design
    ├── src/ui-ux-pro-max/     # 唯一真相源（data/scripts/templates），发布时同步到上面两处
    ├── cli/                   # npm 包 ui-ux-pro-max-cli（bin: uipro）+ assets/ 打包镜像 + src TS 源码
    ├── scripts/               # 仓库级验证/评测脚本（validate-csv.py、evaluate-relevance.py 等）
    ├── stack/                 # 独立"开箱即用 Claude 项目"：知识+品味+视觉反馈三层（.mcp.json 定义 playwright/chrome-devtools/shadcn 三个 MCP）
    ├── gallery/（Next.js demo 站）  preview/  screenshots/  projects/
    ├── docs/  .github/  README.md + 8 个语言版  CLAUDE.md
    ├── skill.json  .claude-plugin/{plugin,marketplace}.json  .releaserc.json  LICENSE(MIT)

- git：origin = https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git；最后 commit d643997 2026-11-15
- 三目录同步关系（docs/三个 data-scripts-templates 的区别.md:7-14）：src/ui-ux-pro-max/ 是唯一源码，.claude/skills/ 是同步副本，cli/assets/ 给 npm 打包，靠 cli/scripts/sync-assets.mjs 同步
- 分发机制【源码证实】：skill.json:42 跨 21 平台安装清单 "npx ui-ux-pro-max-cli init --ai {{platform}}"；.claude-plugin/plugin.json:20 Claude 插件清单；.releaserc.json 只发布 cli/ 子目录为 npm 包

## 2. 许可证审计（最重要）

- 根 LICENSE = 标准 MIT，21 行，LICENSE:3 "Copyright (c) 2024 Next Level Builder"；:8-9 授予 use/copy/modify/merge/publish/distribute/sublicense/sell；:12-13 唯一条件是保留版权与许可声明【源码证实】
- ui-styling 双许可证异常【源码证实】：.claude/skills/ui-styling/LICENSE.txt 与 cli/assets/skills/ui-styling/LICENSE.txt 逐字节比对完全相同，均为 Apache-2.0 全文（202 行，占位符未填写版权人）。该目录随 commit 1c2cb32（2026-03-10）从第三方 claudekit 导入（SKILL.md frontmatter metadata.author: claudekit）。矛盾：ui-styling/SKILL.md:5 自报 MIT。目录级 LICENSE.txt 常规解释是约束整目录（references 是 shadcn/Radix/Tailwind 文档改写），frontmatter 自述不能覆盖【前者源码证实，法律解释属推断】
- 结论（D2 判定）：
  - 主知识库 .claude/skills/ui-ux-pro-max/data/*.csv 目录内无独立 LICENSE → 落入根 MIT → 允许改造复用其知识文本，条件：保留 "Copyright (c) 2024 Next Level Builder" + MIT 声明，记 SOURCES.md（URL+commit+license）
  - 不要复制 ui-styling 子目录任何文本（Apache-2.0 且授权链不清，本就不是目标资产）
  - 字体文件另有 OFL，与知识文本无关
  - data-provenance.json 的 type: "official" URL 语义是"验证依据"而非"复制来源"【字段语义源码证实；CSV 措辞是否原创改写属推测，保守按 MIT 复用+来源标注处理】

## 3. Skill 架构（7 个子 skill）

均位于 .claude/skills/，frontmatter 仅 name/description（部分有 argument-hint/license/metadata.author）【源码证实】：

| Skill | SKILL.md 行数 | 触发 description 要点 |
|---|---|---|
| ui-ux-pro-max（主） | 217 | "should be used when designing, building, reviewing, or fixing interfaces…Searchable local data: 80 styles (51 active), 192 product palettes…" |
| ui-styling | 336 | shadcn/ui + Tailwind + canvas 设计 |
| design | 333 | logo/CIP/banner/icon/social photos |
| design-system | 248 | 三层 token 架构 + slide 生成 |
| brand | 108 | 品牌语音/视觉/一致性 |
| slides | 44 | HTML 演示文稿 |
| banner-design | 145 | 多平台 banner |

- 渐进披露三层【源码证实】：① SKILL.md 顶部 10 级优先级速查表（SKILL.md:20-31）+ 明示 full rule text lives in references；② references 分支细节；③ data CSV 按需检索
- 【传输截断：§3 尾段与 §4 知识库主体（分类清单、CSV 列结构、抽样摘录与质量评价）缺失，原文见本地仓库 data/ 与 references/】

## 4/5. 检索机制（截断后幸存部分）

- 之上叠加工程化层：域名自动检测与 query 改写（detect_domain:645、_rewrite_query_for_domain:612）、弃权阈值（_passes_threshold:490：min_score/min_margin/min_coverage，宁空勿错）、空结果时建议最接近词（_suggest_terms:500）、索引缓存（:364）、RTL 行过滤（:790）
- --design-system 聚合器在 design_system.py（1668 行）：跨 CSV 聚合 + ui-reasoning 决策规则 + 三档 taste dials（--variance/--motion/--density）+ MASTER.md 持久化
- 输出：token 优化的 Markdown（每字段 300 字符截断），--json 机器可读
- 检索质量有回归评测：scripts/evaluate-relevance.py（"Deterministic, stdlib-only relevance evaluator"）+ relevance_metrics.py（ndcg@k/precision@k/reciprocal_rank）+ fixtures + 单测 16 个文件——直接反驳"上游没有检索评测"的默认假设

## 6. CLI 与运行时

- 可执行物：npm 包 ui-ux-pro-max-cli（bin uipro，ESM TypeScript→dist）；命令 init/uninstall/update/versions。运行依赖仅 4 个：chalk/commander/ora/prompts。skill 脚本侧是 Python 3 stdlib-only（SKILL.md:45）
- init 行为：优先用包内 bundled assets 复制到目标平台目录（按 25 个 platform json 模板渲染 SKILL.md）；--legacy 才走 GitHub API 下载。有 --dry-run/--offline/--force。网络副作用有限且显式；文件写入仅限安装目标目录
- 安全边界声明：主 SKILL.md:65 "It does not install packages, modify the operating system…do not include private project data in queries"；--persist 警告必须传 --output-dir 防 cwd 污染；已存在 MASTER.md 默认跳过
- 例外：stack/.mcp.json 用 npx -y @playwright/mcp@latest 在线拉包——属 stack 演示项目，不在 skill 本体。stack/ 是完整方案：官方 frontend-design（taste）+ playwright MCP（visual feedback）+ design-review 子代理 7 阶段审计

## 7. 设计偏见与局限

- 有可调审美倾向而非单一强制【源码证实】：默认 fallback 是 Minimalism（design_system.py:397/557/1314），但 dials 把倾向变成显式参数（SKILL.md:123 "Low --variance biases toward Minimalism…High biases toward Brutalism, Bento Grids"），机制源自 taste-skill（design_system.py:68）。E-5"万物极简化"部分成立，但被 dials/Do-Not-Use-For 对冲
- 产品类别适应性证据充分：192 产品类型、每条 style 有 Do Not Use For、products 有 Dashboard 专项列、--density 高档即 "Dense/dashboard (8-32px)"
- 明显缺口：① 无视觉验证闭环（截图评审外置、依赖宿主装 MCP）；② 无结构化 design contract/项目记忆 schema（MASTER.md 是自由文本，无 invariants/优先级）；③ 无确定性检查器（无对比度计算、无 CSS 静态审查脚本）；④ typography 74 配对无 CJK 思路；⑤ 单条 UX 规则偏"一句话"，缺 evidence/fix_hint/verify 结构

## 8. 三清单

值得继承（行为与机制，非文本）：
1. provenance/freshness 体系（data-provenance.json 的 official-URL+verifiedAt+SLA+confidence）——Vismith SOURCES.md 直接升格为此结构
2. 弃权式检索（阈值+margin+coverage，空结果时明说而非编造）——与 FR-3"无高置信条目"完全同构
3. 检索回归评测（ndcg@k fixtures+baseline）——E1 可借鉴形态
4. Do Not Use For / Best For / rtl_level 的 scope 列设计——ADR-6 实证样板
5. description 触发写法（能力+数据规模+Skip 条件）

应重新实现：
1. 知识载体：CSV → 带 scope frontmatter 的 markdown 条目（CSV 30 列难维护，无 per-entry source 行内标注）
2. BM25 引擎：按 ADR-1 用 plain Node ESM 重写（Python 实现不可移植）
3. design dials（variance/motion/density）思想可吸收，映射表应绑定 Vismith 六类别
4. MASTER.md 持久化 → .vismith/contract.yml 结构化契约

不值得引入：
1. ui-styling 子 skill 全部内容（Apache-2.0 授权链不清+claudekit 二手来源）
2. CLI 安装器/21 平台模板（Vismith 走 npx skills add 即可）
3. slides/banner/logo/brand 等子 skill（与边界外的一次性创作任务重叠）
4. 1934 条 Google Fonts 全量目录与 1512 Phosphor 上游 JSON（体积大、与决策检索弱相关）

## 9. PRD 待验证项核验

| 项 | 结论 |
|---|---|
| E-2 星数/活跃度 | 【源码证实-GitHub API 2026-11-15】stars 149,551、forks 15,815、open issues 84、pushed_at 2026-11-14、创建 2025-11-30。"社区广泛使用"成立；star/项目年龄比异常高（一年 15 万星），量级可存疑【推测】 |
| 检索是否 BM25 | 是。core.py:291-352 标准 BM25Okapi（k1=1.5,b=0.75）+ 弃权阈值 + 域名路由。ADR-2"不引入 BM25 库"仍成立（上游也是手写 60 行 stdlib BM25，非库依赖），但 A-2 假设"上游=简单词法"需修正：小语料 BM25+阈值的效果可度量（有 ndcg 评测） |
| 知识库可否按 D2 复用 | 可以（限主 skill data/）：根 MIT 覆盖，保留版权+MIT 声明并记 SOURCES.md 即合规；ui-styling 目录排除。建议复用对象：ux-guidelines(120)、charts(25)、styles 的结构化字段、stacks 中 web 系条目——改造为带 scope 元数据的条目而非照搬 CSV |
