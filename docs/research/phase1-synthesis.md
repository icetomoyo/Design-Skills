# Phase 1 综合结论：能力对比矩阵 + 许可证审计 + 选型决策

> 增补（2026-11-16）：第四仓库 hallmark（Together AI，MIT，docs/research/hallmark-report.md）已审计并纳入 ADR-11/14；其独有增量=gate 分级豁免/防趋同记忆/job 解剖/eval harness/渲染几何阈值/知识库一致性 CI。

> 依据：docs/research/{unslop,uiuxpromax,impeccable}-report.md（三子代理源码级调研，2026-11-15）
> 结论等级：以下除标注【推测】外均为源码证实事实或直接推论。

## 1. 能力对比矩阵

| 能力域 | unslop | ui-ux-pro-max | impeccable | Vismith 选型 |
|---|---|---|---|---|
| 许可证 | CC BY 4.0（全库可改造复用） | 根 MIT；ui-styling 子目录授权链不清 | Apache-2.0 + NOTICE 链 | 三源复用全部可行，按各源义务标注（ADR-11） |
| 知识库形态 | 6 个散文 reference（~90 条症状） | CSV：80 styles/192 palettes/ux-guidelines 120/charts 25 | 47 个 reference + craft-floor 禁令体系 | md 条目 + scope frontmatter（自研格式，取三家之长） |
| 检索机制 | 无 | 手写 stdlib BM25 + 弃权阈值 + 域名路由 + ndcg 评测 | 无（引擎 verb 直出） | 零依赖词法评分 + 弃权阈值 + ndcg fixtures（ADR-2 修订） |
| 确定性检测 | 无（散文规则） | 无 | 62 条 antipatterns（含文案级） | checks.mjs：种子 7 条 → v0.2 吸收 unslop 症状 + impeccable 规则行为，绑定 contract tokens |
| 视觉验证 | Playwright 快照脚本（197 行） | 外置 MCP（stack/ 演示） | Rust 引擎 live + 浏览器扩展 | v0.3 截图协议 + 可选 capture.mjs（重写，不抄代码） |
| 设计契约/记忆 | 无 | MASTER.md 自由文本 | DESIGN.md tokens（自站）+ .impeccable/ 状态目录 | contract.yml 结构化契约 + .vismith/（差异化核心） |
| 修复闭环 | 九 pass 工作流（人执行） | 无 | 命令 verb + 引擎 | 有界闭环（Inspect→…→Report，迭代上限+白名单） |
| 多宿主安装 | .claude-plugin | npm CLI + 21 平台模板 | 单源转换器 + 20+ tracked 目录 + HARNESSES.md | npx skills add 单渠道起步；借鉴"tracked 可消费目录"思想 |
| 审美倾向 | 反 slop（负面清单） | 默认 Minimalism，dials 可调 | 强审美 + brief-wins 对冲（检测器层无对冲） | 二维路由对冲（类别 × 访客意图）+ defaults-not-bans 措辞纪律 |
| Token 治理 | 无 | 输出字段 300 字符截断 | 每文件字节预算 + build 强制 | ADR-13：token 预算清单 + 校验脚本强制 |
| 测试/评测 | 脚本单测（node:test） | 检索 ndcg 回归 + 16 个单测文件 | oracle 字节级 golden + critique 双子代理隔离 | E1 起：检索 fixtures + 规则正反例 + 独立 grader 子代理 |

## 2. 许可证审计总结（D2 落定）

| 仓库 | 许可证 | 可复用范围 | 复用义务 | 排除项 |
|---|---|---|---|---|
| ui-ux-pro-max-skill（commit d643997） | MIT（Copyright 2024 Next Level Builder） | data/*.csv 知识文本（ux-guidelines、charts、styles 结构化字段、stacks web 条目） | substantial portions 保留版权+MIT 声明；SOURCES.md 记 URL+commit+license | ui-styling 整目录（claudekit 导入的 Apache-2.0，占位符未填，链不清）；1934 条字体目录与 1512 图标 JSON（体积大价值低） |
| impeccable（commit 2b86d9c） | Apache-2.0（Copyright 2025 Paul Bakaus） | skill 文本、62 条检测规则、reference 散文（研究行为为主，文本复用须履行义务） | 随附许可证副本、标注修改、保留归属、携带 NOTICE；ios/android 连带 ehmo MIT 链；"Impeccable" 商标不可用 | Rust 引擎二进制链、常驻编辑 hook、在线 catalog/Pro |
| unslop（commit 620163e） | CC BY 4.0（Damir Sokolovsky） | 全库规则文本（signs/tokens/rtl/direction 框架） | 署名（作者+仓库链接）+ 标注修改；无 share-alike | story 视频链、图像生成工具链、.claude-plugin 元数据 |

**结论：D2"审计后尽量复用"路线成立**。三源义务互不冲突，均与 Apache-2.0 本仓库兼容；知识条目采用行内 source 标注 + SOURCES.md 汇总（升格 ui-ux-pro-max 的 provenance 结构：source URL + commit + license + verifiedAt + 改写范围）。

## 3. 选型决策（已写入 PRD v1.1）

1. ADR-11 知识策略：v0.1 = 原创种子 30–60 条 + 三源精选改造（ui-ux-pro-max ux-guidelines/charts、unslop signs/tokens/rtl、impeccable 规则行为研究）；每条带 scope frontmatter
2. ADR-12 路由二维化：产品类别（六类）× 访客意图（persuade/operate/read/experience，吸收 impeccable Modes），防止类别单一轴遗漏"同类别不同意图"
3. ADR-13 Token 治理：LLM 面向文件字节预算清单 + 校验脚本强制（impeccable 实证的唯一可执行渐进披露）
4. ADR-2 修订：词法评分 + 弃权阈值（min_score/min_margin，宁空勿错）+ ndcg@k 回归 fixtures；维持零依赖
5. 检查规则三源汇流：种子 7 条自研 → v0.2 改造 unslop ~90 条症状 → 研究 impeccable 62 条检测器行为后按 contract tokens 框架重写（design-system-* 思路与 contract.yml 同构）
6. 措辞纪律：全库规则采用 "defaults, not bans / brief wins" 语义（impeccable 范本），检测器输出必须带 confidence 与 ignore 豁免通道
7. 不引入（汇总）：常驻 hook（绕过模型审批）、Rust 二进制链、在线服务依赖、20+ 宿主目录全 tracked、story/图像生成、一次性创作类子 skill

## 4. 遗留开放项

- skills CLI 子路径安装行为（W5 实测）
- 名字查重 GitHub/skills.sh/npm（W3）
- ui-ux-pro-max star 数量级异常（一年 15 万星）【推测：营销驱动】——不影响复用决策，仅影响 E4 对照实验的"社区认可度"表述
- 三报告中传输截断的细节段落（§3/§4 部分）已标注归档位置，需要时直接读本地仓库补证
