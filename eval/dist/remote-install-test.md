# 远程安装链路实测（npx skills add，2026-11-22）

## 命令与结果
```
npx -y skills add icetomoyo/Design-Skills --agent claude-code -y
```
- 克隆 github.com/icetomoyo/Design-Skills（main @ 4815d0e）→ **Found 1 skill: vismith**（子目录布局自动发现，ADR-10 假设成立）
- 安装：`.claude/skills/vismith`（claude-code）+ `.agents/skills/vismith`（universal）+ `skills-lock.json`，共 68 文件
- **内容完整性**：SKILL.md 与源逐字节一致（唯一差异 LF→CRLF 行尾规范化，3728-3684=44 字节=44 个 CR；git autocrlf 视同相等）

## 要点
- 交互式选择 agent 需 TTY；非交互配方 `--agent <name> -y`。合法 agent 共 79 个（claude-code/codex/cursor/opencode/windsurf/universal…），**KodaX 不在 CLI 名单**——KodaX 用户经 Agent Skills 兼容层消费 universal 布局或本地安装（eval/dist/install-test-report.md 已验证 .skill 本地链路）
- 隔离验证目录：.agent/tmp/sessions/.../add-test/（不入库）

## 结论
README 安装节与 PRD ADR-10 的 [待验证] 项全部清账：远程 npx 安装链路 **已实测通过**。
