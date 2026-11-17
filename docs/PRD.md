# Vismith PRD
**Design-aware, self-verifying frontend skill for coding agents**

- 版本：v1.2（2026-11-16，增补 hallmark 调研与 ADR-14）
- 状态：Phase 1 三仓库源码调研完成（docs/research/ 三份报告 + phase1-synthesis.md），知识/机制类 [待验证] 项已全部核验落定；安装链路类待验证项（skills CLI 子路径、名字查重）保留至 W5/W3
- 仓库：Design-Skills（Apache-2.0，已核实）；Skill 将置于 vismith/ 子目录
- 上游输入：用户提供的 GPT 研发 brief（本文档是其工程化修订，非复述）

## 1. 问题与证据

**问题**：Coding Agent 生成/修改前端 UI 时缺乏稳定设计约束——每次重新发明风格、无法系统检查视觉质量、精修易破坏既有产品特征与功能、跨页面跨会话不一致。

**证据**：
- E-1（用户陈述，直接需求）：希望在 Claude Code / Codex / KodaX 上提升 UI 设计、生成、审查、重构与持续优化能力
- E-2（已验证，2026-11-15 源码+GitHub API）：ui-ux-pro-max 149,551 stars / 15,815 forks（创建 2025-11-30，活跃；star/年龄比异常高，量级存疑【推测】）；impeccable PR 编号已到 #1473，极活跃。前者核心是 CSV 知识库 + Python stdlib BM25 检索；后者是 24 命令 + Rust 引擎 + 62 条确定性检测器
- E-3（已核实）：三个上游仓库许可证与知识库授权状态未知，直接决定 D2 复用边界（见 §8）
- E-4（已核实，skill-creator 规范）：Skill 附带脚本必须是可直接执行的 plain Node ESM，不能假定 TypeScript 可直接复制执行
- E-5（已验证）：ui-ux-pro-max 默认 fallback Minimalism（有 dials/Do-Not-Use-For 对冲）；impeccable 强审美编码（62 规则 + craft-floor 禁令），第一原则 "brief wins / defaults, not bans"，但检测器层无此缓冲。按产品类别路由对冲成立，且与 impeccable Modes 轴（访客成功定义）正交——合并为二维路由（ADR-12）

**假设（非事实，验证办法附后）**：
- A-1 宿主多模态能力可用于截图评审（主流宿主逐步具备；v0.3 才依赖，届时实测）
- A-2（部分修正，已被上游实证取代）：ui-ux-pro-max 证明小语料手写 BM25（stdlib 60 行）+ 弃权阈值 + ndcg 回归评测效果可度量；Vismith 维持零依赖词法评分但必须吸收弃权阈值与检索回归评测（ADR-2 修订）

## 2. 决策记录（用户已拍板）

| # | 决策 | 内容 |
|---|---|---|
| D1 | 范围 | 六大模块最终全部实现，分阶段交付；v0.1 只做核心闭环 |
| D2 | 知识库 | 审计后尽量复用：许可证允许则改造复用并标注来源与改写范围；无许可证则研究行为后原创 |
| D3 | 评测 | 完整 A/B/C/D 对照实验为最终目标，分阶段建设（E1 内部小评测 → E4 完整对照） |
| D4 | 流程 | 先定稿本 PRD，随即启动三仓库深度源码调研 |

## 3. 目标与非目标

**目标（一句话）**：让 Coding Agent 在真实前端代码库上"懂设计约束、能生成、能检查、能修复、能防退化"。

**目标用户**：使用兼容 Agent Skills 规范宿主（Claude Code / Codex / KodaX 等）的开发者；工作对象是真实代码库的 UI。

**非目标**：
- Figma/设计稿 → 代码导入
- 组件库代码生成器
- 通用 LLM 评测平台（评测工具只服务本 skill）
- 替换宿主权限模型、安装隐式高权限后台 hook
- 开发新视觉基础模型
- 一次性 HTML 原型/幻灯片类任务（与 huashu-design 等既有技能的边界，见 ADR-7）

## 4. 方案取舍（ADR）

| ADR | 决策 | 依据 |
|---|---|---|
| ADR-1 | 脚本为零运行时依赖 plain Node ESM（Node >= 18）；开发期依赖只进 devDependencies | E-4；跨宿主可移植 |
| ADR-2 | 检索为自包含词法评分（frontmatter 过滤 + 关键词/同义词加权 + 弃权阈值 min_score/min_margin），不引入外部检索库；配套 ndcg@k 检索回归 fixtures | 上游实证（ui-ux-pro-max：stdlib BM25+阈值+ndcg 评测有效）；零依赖立场维持 |
| ADR-3 | 项目记忆 = 目标项目内版本化文件 .vismith/，不依赖宿主内置 Memory | 跨会话、跨宿主、git 可追踪 |
| ADR-4 | 视觉审查为可选能力：宿主多模态优先、Playwright 可选；静态检查永远可用 | 无浏览器/无多模态时降级可用是硬要求 |
| ADR-5 | 自动修复有界：迭代上限（默认 3）、文件白名单、diff 审计、每次修改后回归重查 | 防失控修改 |
| ADR-6 | 知识条目强制 scope 元数据（product_types / tech_stacks / principle-trend / source） | 反泛化；检索可按场景过滤 |
| ADR-7 | description 写清触发边界：真实代码库 UI 工作，与一次性原型类技能区分 | 与既有 skill 共存，避免误触发 |
| ADR-8 | 脚本跨平台（Windows/Unix；避免 bash-only 语法，只用跨平台 Node API） | 宿主环境含 Windows |
| ADR-9 | 评测诚实原则：未跑即标注未跑；对照实验锁定上游版本号；公开对比结论需多 grader + 不确定性声明 | 可信度 |
| ADR-10 | 仓库布局：skill 置于 vismith/ 子目录，评测资产独立 eval/ | 支持 npx skills add <owner>/Design-Skills/vismith [待验证：skills CLI 子路径安装行为，W5 实测] |
| ADR-11 | 知识策略=四源精选改造：ui-ux-pro-max data/（MIT）+ unslop 全库（CC BY 4.0）+ impeccable 规则行为研究（Apache-2.0）+ hallmark 规则/模式研究（MIT）；ui-styling 子目录（授权链不清）排除；hallmark 图片库不引入 | Phase 1 审计 + hallmark 审计（docs/research/{phase1-synthesis,hallmark}-report.md §2） |
| ADR-14 | hallmark 精选借鉴（分期落地）：v0.2 检查豁免通道升级为 tier 分级（Floor/Reflex 式）+ 意图轴细化 job 解剖层；v0.3 渲染层确定性几何阈值；v0.4 记忆防趋同（rotation 思想）；E1 评测采用其 harness 模式（expect 块/拒绝正例/repair loop）；budget.mjs 扩展为知识库一致性校验（refcheck 思想） | docs/research/hallmark-report.md §4/§7（MIT，行为借鉴为主） |
| ADR-12 | 路由二维化：产品类别（六类）x 访客意图（persuade/operate/read/experience，吸收 impeccable Modes） | impeccable 报告 §9：两轴正交互补 |
| ADR-13 | LLM 面向文件的字节预算清单由校验脚本强制 | impeccable token-budget.json 实证：渐进披露唯一可执行做法 |

### 4.1 对上游 brief 的主要修订（评审结论落地）

1. "优先 TypeScript" 修订为 ADR-1（plain Node ESM，或 TS 开发+提交构建产物 JS）
2. 平台级承诺拆解为 per-skill（知识与工具）与 per-project（.vismith/ 状态与 E2E 回归基建）两层；模块 5 的运行时回归属后者，skill 只提供可选脚本与协议
3. 四对照组评测从"首版配套"移至 E4 分阶段建设（D3）
4. brief 十大"关键创新问题"改写为"已知局限 + 缓解措施"（§10），不作交付标准
5. 新增缺失项：脚本跨平台、触发边界共存、名字查重、UI 任务"功能正确性"的操作化定义（§7）

## 5. 总体架构：六模块 → Skill 形态映射

| 模块 | 形态载体 | v0.1 | v0.2 | v0.3 | v0.4 |
|---|---|---|---|---|---|
| M1 Design Intelligence | assets/knowledge/ + scripts/search.mjs | 种子集：30–60 条原创 + ui-ux-pro-max（MIT）/unslop（CC BY）精选改造 | ux-guidelines 120 / charts 25 渐进改造扩容 | — | 类别风格全覆盖 |
| M2 Design Contract | assets/contract.schema.json + references/contract.md + scripts/contract.mjs | 定义/读写/校验 | 提取器增强 | — | 跨页面一致性校验 |
| M3 Generate/Refine/Redesign | SKILL.md 路由 + references/{routing,generate,refine,redesign}.md | 三模式 x 六类别 x 访客意图 | 意图轴细化：job 解剖层（hallmark anatomy 思想） | 微操作（bolder/quieter 类）吸收语义（研究行为后重写，Apache-2.0） | — |
| M4 Visual-Code Critic | scripts/checks.mjs（确定性）+ references/critique.md（视觉协议） | 7 条种子规则 | 完整规则集 + 规则配置 | 视觉层（截图 + DOM 关联） | — |
| M5 Auto-Fix & Regression | references/autofix.md + 可选 scripts/capture.mjs | 接口预留 | — | 有界闭环 | 回归基线 |
| M6 Project Design Memory | 目标项目 .vismith/ | 基础版 | — | — | 增量 diff + 决策记忆 + 防趋同（rotation 思想，hallmark） |

**原则**：Skill 包只含"知识与工具"；一切项目状态写入目标项目 .vismith/，由 git 追踪。

## 6. 核心需求与验收（FR）

每条含：触发 / 行为 / 失败与空状态 / 可观察验收。

### FR-1 任务路由（P0，v0.1）
- 触发：用户请求 UI 生成/精修/重设计/审查/契约管理，或自然语言等价表达
- 行为：二维路由——模式（generate / refine / redesign / review / contract / recall）x 产品类别（saas-dashboard / admin-console / marketing-site / consumer-app / creative / data-intensive），辅以访客意图轴（persuade / operate / read / experience，借鉴 impeccable Modes）；路由表在 references/routing.md
- 失败/空：类别无法判断时询问一次，或从代码特征推断并声明置信度
- 验收：6 类别 x 主要模式路由表全覆盖；trigger-eval 正例 >= 8、相邻反例（一次性原型、纯后端任务）>= 4 [基线待测]

### FR-2 Design Contract（P0，v0.1）
- 触发：进入 generate/refine/redesign 且项目无 .vismith/contract.json
- 行为：generate 引导创建；refine/redesign 由提取器生成草稿（tailwind.config / CSS 变量 / theme 文件 → tokens），用户确认后落盘
- 契约内容（附录 A）：meta / brand / style / tokens / components / layout / a11y / invariants / constraints / precedence / provenance
- 优先级固定：invariants > a11y 硬规则 > 项目约束 > tokens > 风格偏好
- 失败/空：无法提取时引导式问答创建最小契约（meta + style + a11y）
- 验收：scripts/contract.mjs validate 对合法/非法样例各 >= 3 通过；tailwind 项目提取 demo 可运行 [demo 待建]

### FR-3 设计知识检索（P0，v0.1）
- 触发：路由命中后按需调用 scripts/search.mjs "<query>" [--product-type X] [--tech Y]
- 行为：frontmatter 过滤（类别/技术栈/principle-trend）+ 词法评分 + 弃权阈值（低于 min_score 或与次优差距小于 min_margin 时宁空勿错，并建议最接近词），输出 top-k（默认 <= 5）：路径 + 摘要 + scope 说明 + source；单次输出 token 有硬上限；配套 ndcg@k 检索回归 fixtures
- 失败/空：无命中时返回"无高置信条目"而非强行输出；内置同义词扩展表
- 验收：>= 20 条种子知识的检索测试覆盖命中与空态 [基线待测]

### FR-4 确定性检查（P0，v0.1；v0.2 扩容）
- 触发：review 模式，或修复后验证
- 行为：scripts/checks.mjs <paths> 输出结构化 JSON（附录 B）+ 人读摘要；每条 finding 含 id / severity / evidence(file:line) / confidence(certain-heuristic) / fix_hint / verify，并提供 ignore 豁免通道（.vismith/rules.config）；v0.2+ 扩容来源：unslop signs.md ~90 条症状（CC BY，改造）+ impeccable antipatterns 62 条（研究行为后按 contract tokens 框架重写）
- 种子规则：CHK-01 对比度（contract tokens 计算 WCAG 比值，error/certain）；CHK-02 硬编码色与魔法间距（warning/certain）；CHK-03 间距基线一致性（warning/heuristic）；CHK-04 字号阶跃一致性（warning/heuristic）；CHK-05 focus-visible 存在性（error/heuristic）；CHK-06 基础语义（img alt、可点击 div、label 关联，error/certain）；CHK-07 固定宽溢出风险（info/heuristic）
- 失败/空：无 contract 时 CHK-01 降级为通用阈值并显式标注
- 验收：每条规则有正/反例 fixture；误报率口径 v0.2 定义 [待测]；v0.2 支持 .vismith/rules.config 开关与严重度覆写

### FR-5 视觉审查（P1，v0.3，可选能力）
- 触发：review 且宿主具备多模态或可启动浏览器
- 行为：critique 协议（截图 → 分层评估 → 结构化发现，与 CHK 同 schema，附 DOM/源码定位线索）；无浏览器时明确降级声明并只出静态结果
- 验收：同一 fixture 有/无浏览器两条路径均可完成 review

### FR-6 有界修复闭环（P1，v0.3）
- 流程：Inspect → Diagnose → Plan → Modify → Verify → Report；迭代 <= 3；文件白名单；每次修改后重跑确定性检查 + invariants 校验；diff 审计落 .vismith/reviews/
- 失败：超限或白名单外立即停止并报告，不越权
- 验收：3 个 seeded bug 场景的修复成功率与 invariants 保持率有数据 [基线待测]

### FR-7 项目设计记忆（P0，v0.1）
- .vismith/ 内容：contract.json（JSON 格式，HLD H1：Node 零依赖无 YAML）、decisions.log.md（简式 ADR：日期/决策/理由/替代方案）、exceptions.md、rules.json、reviews/
- 行为：会话开始只加载 contract + 未决 exceptions；变更增量更新；不存会话闲聊
- 验收：同一项目跨两个会话，第二次不重建契约且风格一致（场景 S5 人工验收）

## 7. 评测计划（对应 D3：做全、分阶段）

| 阶段 | 内容 | 通过标准 |
|---|---|---|
| E1（随 v0.1） | 内部小评测：S1–S7 选 3–5 场景；rubric；独立 grader 子代理（生成者不等于评审者，借鉴 critique 双子代理隔离）；检索质量用 ndcg@k fixtures；评测形态采用 hallmark harness 模式（expect 块含拒绝正例 / 修复回路 / 数字阈值）；复用 skill-creator 工具链（quick-validate → trigger-eval → run-eval） | 报告含局限声明 |
| E2（v0.2） | 场景扩至全部 7 类；增加修改稳定性指标 | 同上 |
| E3（v0.3） | 视觉闭环指标：修复收敛率、回归率、grader 一致性 | 同上 |
| E4（v0.4） | 完整 A/B/C/D 对照（无 skill / ui-ux-pro-max / impeccable / Vismith）：锁定模型、预算、上游版本；多 grader + 盲评；含不确定性声明 | 内部基准报告；对外公开结论需另行评审 |

**指标口径**（无基线则标待测，不承诺数值）：
- 功能正确性 = 任务 checklist 完成率（checklist 由任务描述预生成）
- 视觉质量 = rubric 均分 + grader 一致率
- 设计一致性 = 与 contract tokens 的偏离度（可计算）
- 修改稳定性 = 修复后 invariants 通过率
- 成本 = token 与耗时遥测

**评测场景种子**：S1 SaaS Dashboard 生成；S2 企业后台表单与流程页精修；S3 Landing Page 与品牌一致性；S4 数据密集型表格界面优化；S5 已有设计系统的局部精修（不改 token）；S6 跨页面一致性审查；S7 可访问性专项。

## 8. 依赖、安全与许可证（D2 执行细则）

- 运行时：Node >= 18；零 npm 运行时依赖；可选 Playwright（探测式，失败即降级，不阻塞）
- 复用决策规则：
  - 上游 MIT / Apache 等宽松许可证：可改造复用，保留版权与来源标注（URL + commit + license 记入 assets/knowledge/SOURCES.md）
  - 上游 CC BY 4.0：可改造复用；义务=署名（作者+仓库链接）+ 标注修改；无 share-alike 义务，与 Apache-2.0 代码树无传染
  - 上游无 LICENSE 文件：不复制任何文本与数据，只研究行为后原创表达
  - GPL / AGPL：内容不引入
- Phase 1 审计结论（2026-11-15，详见 docs/research/phase1-synthesis.md §2）：
  - ui-ux-pro-max：根 MIT（Copyright 2024 Next Level Builder）覆盖 data/*.csv 知识库 → 可改造复用；ui-styling 子目录（claudekit 导入的 Apache-2.0，授权链不清）→ 排除
  - impeccable：根 Apache-2.0（Paul Bakaus）→ skill 文本/62 条检测规则可改造复用，须履行 §4 义务（含 NOTICE 携带；ios/android 连带 ehmo MIT 链；商标不可用）
  - unslop：CC BY 4.0（Damir Sokolovsky）→ 全库规则可改造复用，逐文件署名
  - hallmark（2026-11-16 增补，commit 04977e1）：根与 skills/hallmark 均 MIT（Hallmark contributors）→ 规则文本/脚本/主题可改造复用；photos.json 图片库（Wikimedia 逐张 CC 授权）不引入，仅元数据结构作许可链范本；"Hallmark" 名称不使用
- 安全：无后台 hook；无隐式网络上报；所有脚本副作用显式列于 SKILL.md；不上传用户代码、业务数据与截图
- 本仓库 Apache-2.0：可含 MIT 内容；Apache-2.0 内容需 NOTICE

## 9. 实施顺序与阶段验收

**Workflow**：W1 本 PRD 定稿 ✅ → W2 三仓库深度源码调研 ✅（docs/research/）→ W3 HLD + 选型定稿（[待验证] 项已清零，本文档已升 v1.1；HLD 待产出）→ W4 v0.1 实现 → W5 E1 评测 + 安装验证（隔离目录 install 测试 + npx skills add 链路 [待验证]）→ W6 发布 v0.1 进入 v0.2

**阶段验收与砍需求标准**（超期时按序砍，砍前记录进 decisions.log）：
- v0.1：FR-1/2/7 完整 + FR-3 小而精 + FR-4 七条种子。砍序：知识库条目减半 → CHK-07/04（heuristic 类）→ 提取器只支持 tailwind
- v0.2：规则集完整 + rules.config + E2。砍序：规则配置文件 → 低频规则
- v0.3：视觉层 + 有界修复 + E3。砍序：DOM 定位线索精度 → 多浏览器矩阵
- v0.4：跨页一致性 + 决策记忆 + E4 完整对照。砍序：对照 arm 先减为 A/D，盲评降级为双 grader

## 10. 风险、已知局限与待决事项

| 项 | 类型 | 触发条件 | 处理 |
|---|---|---|---|
| 上游知识库许可证 | 已解除 | Phase 1 审计：三上游均为宽松许可（MIT / Apache-2.0 / CC BY 4.0） | 按各源义务复用（§8 + ADR-11）；ui-styling 授权链不清已排除 |
| skills CLI 子路径安装行为不明 | 待决 | W5 验证 | 临时仓库实测；必要时 skill 独立成仓 |
| 名字查重（GitHub / skills.sh / npm 的 vismith） | 待决 | W3 | 查重后定名；备选名预登记 |
| 视觉问题到代码的映射可靠性 | 已知局限 | v0.3 | DOM 线索 + data 属性约定；所有视觉 finding 标注置信度，不作确定性错误 |
| LLM 审美评分不稳定 | 已知局限 | E1 起 | rubric 锚点样例、双 grader、确定性指标优先 |
| 词法检索召回不足 | 已知局限 | v0.2 扩容后 | 同义词表维护；预留嵌入接口（默认关闭） |
| Windows 兼容 | 风险 | 全程 | 只用跨平台 Node API；CI 双平台 [CI 待建] |
| 知识库内容腐烂 | 风险 | v0.2 起 | 条目标注 principle/trend，trend 类定期复审 |
| 评审遗留债务（v0.2） | 债务 | 双轴评审 2026-11-17（ Standards/Spec 报告 + 修复验证） | 未清项：lib/cli.mjs 抽取与 makeFinding 工厂（结构性重构）、扩展名过滤统一、检索 ndcg@k fixtures、trigger-eval 正反例、示例项目目录、E1 评测执行（eval/ 仍为占位） |

## 附录 A：contract 草案（下为 YAML 示意；v0.1 落地为 .vismith/contract.json，字段一致，见 HLD §3.2）

    version: 1
    meta:
      product_type: saas-dashboard          # 六类别枚举之一
      audience: 运营人员
      scenarios: [日常报表, 异常处理]
    brand:
      personality: [专业, 克制, 高效]
      references: ["Linear", "Stripe Dashboard"]
    style:
      direction: 简洁数据密集型；低饱和主色 + 高对比数据色
      do_not: [玻璃拟态, 大面积渐变]
    tokens:
      colors:
        primary: "#2563EB"
        success: "#16A34A"
        danger: "#DC2626"
        neutrals: ["#0F172A", "#334155", "#64748B", "#E2E8F0", "#F8FAFC"]
        surface: "#FFFFFF"
        text_on_primary: "#FFFFFF"
      typography:
        body: "Inter, system-ui, sans-serif"
        display: "Inter, system-ui, sans-serif"
        scale: [12, 14, 16, 20, 24, 32]
      spacing: { base: 4, scale: [4, 8, 12, 16, 24, 32, 48] }
      radius: { sm: 4, md: 8, lg: 12 }
      shadow: { card: "0 1px 2px rgba(15,23,42,.08)" }
    components:
      button: { height: 32, radius: md, rules: ["主操作唯一", "危险操作需二次确认"] }
      table: { density: compact, rules: ["数字右对齐", "禁用斑马纹"] }
    layout:
      breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 }
      density: compact
    a11y:
      min_contrast_normal_text: 4.5
      focus_visible: required
      keyboard: required
    invariants:                              # refine/redesign 的红线
      - id: INV-001
        type: functional                     # functional | behavior | visual
        description: 顶部全局搜索必须保留且可键盘访问
    constraints:
      project: ["不改技术栈", "不引入新字体文件"]
      pages:
        "/pricing": ["价格表必须首屏可见"]
    precedence: [invariants, a11y_hard, project_constraints, tokens, style_preferences]
    provenance:
      created: 2026-11-15
      updated: 2026-11-15
      decisions: .vismith/decisions.log.md

## 附录 B：checks 输出 schema 草案

    {
      "tool": "vismith-checks",
      "version": 1,
      "generated_at": "2026-11-15T11:00:00Z",
      "target": ["src/"],
      "contract_present": true,
      "summary": { "error": 2, "warning": 5, "info": 1 },
      "findings": [
        {
          "id": "CHK-01",
          "severity": "error",
          "confidence": "certain",
          "rule": "contrast",
          "evidence": { "file": "src/theme.ts", "line": 12, "detail": "#94A3B8 on #F8FAFC = 2.45:1 < 4.5:1" },
          "fix_hint": "正文灰阶提升至 #475569 或加深底色",
          "verify": "重跑 checks.mjs，CHK-01 通过"
        }
      ]
    }

## 附录 C：仓库布局（目标态）

    Design-Skills/
      LICENSE
      README.md
      docs/
        PRD.md
      vismith/                        # Skill 根目录
        SKILL.md
        references/                   # routing.md contract.md generate.md refine.md redesign.md critique.md autofix.md
        scripts/                      # search.mjs contract.mjs checks.mjs capture.mjs(v0.3)
        assets/                       # contract.schema.json knowledge/ templates/
      eval/                           # scenarios/ rubrics/ graders/ results/
