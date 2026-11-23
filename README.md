# Design-Skills / Vismith

**Vismith** 是一个面向 Coding Agent（Claude Code / Codex / KodaX 等兼容 Agent Skills 规范的宿主）的
前端 UI 设计技能：Design-aware, self-verifying。

## 它做什么

- **Design Contract**：机器可读的项目设计契约（.vismith/contract.json），含 tokens、invariants（红线）、
  约束与固定优先级；可从既有 tailwind/CSS 变量提取草稿，跨会话持久化
- **任务路由**：generate / refine / redesign / review / contract / recall 六模式 × 六产品类别 × 访客意图轴
- **知识检索**：45 条带 scope 元数据的设计知识（16 原创 + 29 改编自 unslop/ui-ux-pro-max/hallmark：类别 playbook、a11y、反模板化、RTL、tokens 数值体系、图表选型、性能、文案纪律），
  词法评分 + 双层弃权阈值（min-score/min-margin，宁缺勿滥），每条标注来源与适用范围（SOURCES.md 全量登记）
- **确定性检查**：10 条规则（对比度 WCAG、硬编码色与 off-token 类、间距基线、字号阶与 text-* 类、焦点可见、语义、固定宽、reduced-motion、标题层级、html-lang），
  结构化 JSON 输出（heuristic/certain 分级），**Floor/Reflex 分级豁免**：确定性 error 不可豁免，其余须 >=12 有效字符理由 + 证据留痕方可降级（机器验证）
- **项目设计记忆**：.vismith/ 内契约、决策日志、例外、审查报告，git 可追踪

## 安装

### 方式一：本地 .skill 包（已实测）

用 KodaX skill-creator 脚本打包并安装（`<dest>` 换成宿主 skills 目录；打包前先确保输出目录存在，脚本不会自动创建）：

    node <kodax>/dist/builtin/skill-creator/scripts/package-skill.js vismith --output eval/dist/vismith.skill
    node <kodax>/dist/builtin/skill-creator/scripts/install-skill.js eval/dist/vismith.skill --dest <宿主 skills 目录>

实测记录（含隔离安装核对清单与已知问题）见 `eval/dist/install-test-report.md`。

### 方式二：远程 npx skills add（已实测）

    npx skills add icetomoyo/Design-Skills --agent claude-code -y

仓库已在 GitHub（icetomoyo/Design-Skills）；CLI 自动发现子目录中的 vismith。`--agent` 从其 79 个目标中选（claude-code/codex/cursor/opencode/windsurf/universal…；非交互必带 `-y`）。实测：克隆→发现→安装 68 文件，SKILL.md 与源逐字节一致（仅 LF→CRLF 规范化）。详见 `eval/dist/remote-install-test.md`。

或直接复制 vismith/ 目录到宿主的 skills 目录。零 npm 运行时依赖，Node >= 18。

## 快速使用（宿主内）

    # 检索设计知识
    node vismith/scripts/search.mjs "表单 校验" --product-type admin-console
    # 初始化契约
    node vismith/scripts/contract.mjs init --dir <你的项目>
    # 从既有 tailwind/CSS 提取契约草稿
    node vismith/scripts/contract.mjs extract --dir <你的项目> --out .vismith/contract.draft.json
    # 静态检查
    node vismith/scripts/checks.mjs src/ --contract .vismith/contract.json

## 开发

    npm test          # node --test tests/（单元 + CLI 集成）
    npm run budget    # 校验 LLM 面向文件的 token 预算

## 文档

- 产品需求：docs/PRD.md（v1.1）
- 技术设计：docs/HLD.md
- 三上游调研（ui-ux-pro-max / impeccable / unslop）：docs/research/

## 许可与致谢

本仓库 Apache-2.0。知识库包含来自以下项目的改写内容（详见 vismith/assets/knowledge/SOURCES.md）：

- [unslop](https://github.com/heydamir/unslop)（Damir Sokolovsky，CC BY 4.0）——症状清单/数值体系/RTL 规则
- ui-ux-pro-max / impeccable 的机制研究（Phase 1 报告见 docs/research/；其文本未复制）

## 状态（v0.1）

已实现：路由、契约（init/extract/validate/show）、检索、10 条检查（含 Floor/Reflex 分级豁免）、记忆协议、token 预算、测试套件。
未实现（路线图见 PRD §9）：ui-ux-pro-max 知识库改编扩容、视觉审查闭环（v0.3）、有界自动修复（v0.3）、
跨页一致性（v0.4）。**本地 .skill 打包/隔离安装与远程 `npx skills add` 两条链路均已实测通过；两轮四臂对照评测已执行：E4 完备任务书（eval/results/E4-2026-11-22.md，Vismith 21.75 居首、唯一确定性全零）与 E5 极简提示（eval/results/E5-2026-11-23.md，impeccable 23.75 微胜 Vismith 22.88——两轮合并结论见 E5 报告 §3）。**
