# Vismith HLD v1.0（v0.1 实现蓝图）

> 依据：docs/PRD.md v1.1（ADR-1~13）+ docs/research/phase1-synthesis.md
> 状态：定稿 2026-11-15；实现期发现偏差须回写本文档与 PRD

## 1. 目录结构（仓库根）

    Design-Skills/
      docs/                # PRD / HLD / research（非 skill 包内容）
      vismith/             # Skill 包根（npx skills add <owner>/Design-Skills/vismith）
        SKILL.md
        references/
          routing.md       # 二维路由表 + 判定规则
          contract.md      # 契约创建/提取/使用协议
          generate.md      refine.md      redesign.md
          critique.md      # review 协议（v0.1 静态版；视觉层 v0.3 扩写）
          memory.md        # .vismith/ 读写与决策记录协议
        scripts/
          lib/ frontmatter.mjs  colors.mjs  fsutil.mjs
          search.mjs       contract.mjs   checks.mjs
          budget.mjs       # token 预算校验（开发期工具，AGENT 不主动调用）
        assets/
          contract.schema.json
          budget.json      synonyms.json
          templates/contract.template.json
          knowledge/       # 知识条目 + SOURCES.md
      tests/               # node:test + fixtures（不进 skill 包）
      eval/                # 评测场景（v0.1 起建，见 PRD §7）

## 2. 关键技术决策

| # | 决策 | 理由 |
|---|---|---|
| H1 | 契约文件 = .vismith/contract.json（JSON，非 YAML） | ADR-1 零依赖：Node 无内置 YAML。PRD 附录 A 的 YAML 示意仅作字段说明，落地为 JSON，字段一致 |
| H2 | 知识条目 frontmatter = 扁平子集 YAML（手写 ~70 行解析器） | 人类/Agent 友好；仅允许 key: value 与 key: [a, b]（无嵌套），解析失败显式报错 |
| H3 | 检索不做持久索引，每次冷扫描内存建索引 | ≤500 条目冷扫描 <100ms；省去缓存失效问题 |
| H4 | checks.mjs 永不非零退出（--strict 除外），结果只在 JSON/摘要里 | Agent 调用不应因"发现问题"而视为命令失败 |
| H5 | 脚本入口统一 node scripts/x.mjs，无 shebang、无 bin | 跨平台（ADR-8）且零安装 |
| H6 | token 预算：SKILL.md 8KB / 每个 reference 6KB / 每个知识条目 3KB，budget.mjs 校验超限即失败 | ADR-13（impeccable 实证） |

## 3. 模块设计

### 3.1 SKILL.md（入口，≤8KB）
frontmatter：name: vismith；description 覆盖——用于真实前端代码库的 UI 设计体系建立/界面生成/精修/重设计/静态审查；不用于一次性 HTML 原型、幻灯片、纯视觉创作（ADR-7）。
正文骨架：When to use / When NOT to use → 五步主流程（Route → Contract → Recall → Work[mode protocol] → Verify&Remember）→ 脚本速查表（命令行原文）→ 降级说明（无 contract / 无浏览器时的行为）。

### 3.2 Contract（M2，scripts/contract.mjs）
CLI：
- contract.mjs init --dir <project>         # 从模板生成 .vismith/contract.json + decisions.log.md + exceptions.md
- contract.mjs validate <contract.json>     # 按 assets/contract.schema.json 校验（内置迷你 JSON Schema 校验器：type/enum/required/minItems/pattern 足矣）
- contract.mjs extract --dir <project> [--out draft.json]  # v0.1：解析 tailwind.config.{js,ts,cjs,mjs} 的 theme(colors/fontFamily/fontSize/borderRadius) 与 CSS :root 变量 → tokens 草稿（纯文本启发式，不执行用户代码）
- contract.mjs show <contract.json> [--section tokens]
schema 字段与 PRD 附录 A 一一对应（meta/brand/style/tokens/components/layout/a11y/invariants/constraints/precedence/provenance）；precedence 固定顺序，validate 校验其恰好等于规范序。

### 3.3 检索（M1，scripts/search.mjs）
CLI：search.mjs "<query>" [--category C] [--product-type P] [--tech T] [--kind principle|trend] [--top K] [--min-score S] [--json]
流程：扫描 assets/knowledge/*.md → frontmatter 过滤（H2 解析器）→ 分词（小写、连字符拆分）→ synonyms.json 同义扩展 → 评分 = Σ 命中词权重（title×3 / category/product_types×2 / body×1）→ 弃权（双层）：top1 < min-score(默认 2.0)，或 top1-top2 < min-margin(默认 0.5，--min-margin 可调) 时输出"无高置信条目"并给最接近词建议（词表按 title/category 词频）。margin 半边 2026-11-17 评审后补实现（tests/audit.test.mjs 覆盖）。
输出：人读列表（id、title、scope_note、source、score、相对路径）或 --json（含 abstain 标志）。

### 3.4 检查（M4，scripts/checks.mjs）
CLI：checks.mjs <paths...> [--contract <path>] [--json] [--rules id1,id2] [--config <rules.json>] [--strict]
架构：规则注册表 [{id, severity, confidence, applies(files), run(ctx)}]，ctx={files, contract, ignores}；finding 结构 = PRD 附录 B。
七条种子规则的检测面（全部正则/词法级，不解析 AST）：
- CHK-01 contrast（error/certain）：有 contract 时对 tokens 中声明配对（neutrals×surface、primary×text_on_primary 等）算 WCAG 比值；无 contract 时扫描同文件内成对出现的文字色/背景色常量。阈值 4.5（大字 3.0，若可判定）
- CHK-02 hardcoded-token（warning/certain）：css/tsx/vue 中 #hex、rgb()、hsl() 出现在非 token 定义文件；间距属性中非 contract scale 的魔法数
- CHK-03 spacing-baseline（warning/heuristic）：margin/padding/gap 的 px 值非 base(4) 倍数
- CHK-04 type-scale（warning/heuristic）：font-size px 值不在 contract scale
- CHK-05 focus-visible（error/heuristic）：存在交互组件样式但全局无 :focus-visible / focus ring token
- CHK-06 semantics（error/certain）：<img 无 alt、div[onclick]、button 无可访问文本（模式级）
- CHK-07 fixed-width（info/heuristic）：容器 width:NNNpx 且邻近无 min/max-width
ignores：.vismith/rules.json 的 { "CHK-05": { "reason": "...", "files": ["legacy/**"] } }，命中即降级为 info 并附 reason。

### 3.5 记忆（M6，references/memory.md 约定）
.vismith/{contract.json, decisions.log.md, exceptions.md, rules.json, reviews/}；会话开始只加载 contract + exceptions；一切契约变更 append decisions.log.md（日期/决策/理由/替代方案）。

### 3.6 知识库（M1 内容，assets/knowledge/）
条目格式（H2 扁平 frontmatter）：

    ---
    id: dashboards-density
    title: Dashboard 信息密度与节奏
    category: product-playbook      # 见类别枚举
    product_types: [saas-dashboard, admin-console, data-intensive]
    tech_stacks: [react, vue, html]
    kind: principle                 # principle | trend
    source: original                # original | upstream:<repo>#<commit> (<SPDX>)
    scope_note: 数据密集表格与看板适用；营销页不适用
    ---

category 枚举：product-playbook / style-direction / tokens / component-pattern / ux-pattern / a11y / anti-slop / copy / visualization / layout / rtl / tech-stack
v0.1 种子（目标 30–60 条）：
- 原创 ~16 条：六类别各一条 playbook + 二维路由说明 + 契约使用 + tokens 原则 + 对比度原则 + focus 原则 + Refine 红线纪律
- 改造：ui-ux-pro-max ux-guidelines（MIT，逐条改写为条目并标 source）+ charts（MIT）
- 改造：unslop signs/tokens/rtl/direction（CC BY 4.0，逐条署名）
SOURCES.md 行格式：id | url | commit | license | author | adapted-scope | verifiedAt（升格自 ui-ux-pro-max provenance 结构）

### 3.7 Token 预算与校验（ADR-13）
assets/budget.json：{ "SKILL.md": 8192, "references/*.md": 6144, "assets/knowledge/*.md": 3072, "assets/synonyms.json": 4096 }
scripts/budget.mjs 扫描超限即 exit 1（挂入 npm test 流程；Skill 运行时不调用）。

## 4. 测试计划（tests/，node:test）
- frontmatter：合法/非法（嵌套、缺 key、坏数组）用例
- colors：WCAG 计算对照已知值（黑白 21:1 等）
- search：微型语料 6 条 → 命中排序 / 空态弃权 / 过滤组合 / 同义扩展
- contract：validate 合法+3 个非法样例；extract 对 fixture tailwind.config.js 产出预期 tokens
- checks：每条规则正/反例 fixture（tests/fixtures/checks/）
- budget：超限样例失败
E1 检索回归：tests/search.regression.json（query→期望命中 id 集，排序用 nDCG 断言 top1）

## 5. v0.1 实现清单与砍序
P0（必须）：SKILL.md、routing/contract/memory 三 reference、search.mjs+synonyms、contract.mjs(init/validate/extract)、checks.mjs 七规则、schema/template、原创知识 16 条、SOURCES.md、budget、测试全绿、quick-validate 通过
P1（应做）：generate/refine/redesign/critique 四 reference、改造条目（ux-guidelines/charts/unslop）至 30+ 条
P2（可延）：eval/ 场景集、检索回归基线固化
砍序（超期时）：P2 → P1 条目数减半 → CHK-07/04 标记 heuristic 保留但降 info（与 PRD §9 一致）

## 6. 兼容性
- Node >= 18（fs/promises、URL、structuredClone）；Windows/Unix 路径均用 path.join/normalize；无 shebang
- 安装链路：仓库根布局即 skills add 可消费形态（Phase 1 impeccable 实证：tracked 目录零构建可装）；skills CLI 子路径行为 W5 实测

## 7. v0.3 capture.mjs 视觉闭环设计（草案，2026-11-22；行为借鉴 hallmark render 层，重写不抄代码）

**定位**：可选渲染层检查器。无浏览器时全链路优雅降级（exit 0 + 明确声明），不阻塞静态流程。

**技术路径**：puppeteer-core（devDependencies 不入 skill 包）+ 本机 Chrome 多路径探测（Windows 注册表/Program Files/Unix which；探测失败→降级）。启动参数固定 headless+--force-device-scale-factor=1，杜绝环境漂移。

**采集**：对目标页面按 8 档宽度（320/375/480/768/1024/1280/1536/1920）截图 + DOM 度量（元素盒模型/文本节点前景背景），产物写目标项目 `.vismith/captures/<date>-<w>.png`（git 可追踪，供多模态复核）。

**确定性视觉 gate**（把视觉问题转为可计算阈值，hallmark 思想）：
- V-01 渲染对比度：文本节点 fg/bg 取 DOM 计算样式（隐藏文字取有效背景中位数）→ WCAG 实算（与 CHK-01 同数学）
- V-02 hero 占比：首屏主视觉宽高比区间检查
- V-03 fold 内容密度：首屏词数上限（按产品类别分档，marketing 宽/data-intensive 窄）
- V-04 横向溢出：document.scrollWidth > viewport 视为失败（CHK-07 的渲染级版本）

**输出协议**：与 checks.mjs 同构 findings schema（id V-xx/severity/confidence/tier/evidence{viewport+selector}/fix_hint/verify），复用 Floor/Reflex 豁免通道与 rules.json。

**边界**：不开发视觉模型；截图仅供宿主多模态按 critique.md 协议复核；不做像素 diff 判设计好坏（只测可计算阈值）。实现排期 v0.3 波 2。
