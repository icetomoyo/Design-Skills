# Vismith 打包与安装链路隔离实测报告

- **日期**：2026-11-22
- **目的**：验证 PRD ADR-10 [待验证] 项——`package-skill.js` 打包 → `install-skill.js` 隔离安装 → 解包内容核对
- **环境**：Windows（PowerShell），Node，仓库 `C:\Works\GitProj\skill_workspace\Design-Skills`，KodaX skill-creator 脚本位于
  `C:/Works/GitProj/KodaX-AI/KodaX-Space/out/win-unpacked/resources/app.asar.unpacked/node_modules/@kodax-ai/kodax/dist/builtin/skill-creator/scripts/`
- **隔离原则**：安装目标仅 `eval/dist/install-test/`，未触碰用户技能库

## 1. 命令与输出摘要

### 1.1 打包

```
node <skill-creator>/package-skill.js vismith --output eval/dist/vismith.skill
```

- 首次运行失败：`ENOENT: no such file or directory, open '...\eval\dist\vismith.skill'`
  （原因：`eval/dist/` 不存在，脚本不自动创建输出父目录）
- `New-Item -ItemType Directory -Force eval/dist` 后重跑成功：
  `Wrote C:\Works\GitProj\skill_workspace\Design-Skills\eval\dist\vismith.skill`
- 产物：`eval/dist/vismith.skill`，88,258 字节，2026-11-22 10:14:03，ZIP 格式（魔数 `50 4B 03 04`）

### 1.2 隔离安装

```
node <skill-creator>/install-skill.js eval/dist/vismith.skill --dest eval/dist/install-test
```

- 输出：`Installed vismith to C:\Works\GitProj\skill_workspace\Design-Skills\eval\dist\install-test\vismith`

## 2. 验证清单（解包核对）

| # | 检查项 | 结果 |
|---|--------|------|
| 1 | SKILL.md 存在 | ✅ `eval/dist/install-test/vismith/SKILL.md`，frontmatter `name: vismith` + `description`（多行中文）完整，与源文件 SHA256 逐字节一致 |
| 2 | references/ 齐全 | ✅ 7 个文件（routing/contract/generate/refine/redesign/critique/memory.md），与 `git ls-files vismith` 完全一致 |
| 3 | scripts/ 齐全 | ✅ 7 个文件（search/contract/checks/budget.mjs + lib/colors、frontmatter、fsutil.mjs），与 git 清单一致 |
| 4 | assets/ 齐全 | ✅ 50 个文件（knowledge/ 46 = 45 条知识 + SOURCES.md；budget.json、contract.schema.json、synonyms.json、templates/contract.template.json），与 git 清单一致 |
| 5 | 文件集对照 git 清单 | ✅ 名称逐一比对（分隔符归一后）：清单 65 == 安装 65，无缺失、无多余 |
| 6 | 内容完整性 | ✅ 源 vismith/ 与安装目录全部文件 SHA256 对比：65/65 一致（唯一差异为源目录后来新增的未跟踪文件，见问题 2） |
| 7 | .vismith 项目态泄漏 | ✅ 无。zip 全条目扫描 `.vismith|node_modules|\.git/` 命中 0；安装目录扫描命中 0（仓库中被跟踪的 .vismith 全部位于 eval/results/，不在 vismith/ 内） |
| 8 | 包内元数据 | ℹ️ zip 含 66 个条目 = 65 个技能文件 + `.kodax-package.json`（打包器元数据）；安装后该文件不落盘，安装目录保持纯技能内容 |

**结论：打包 → 隔离安装链路 PASS。** 安装目录与 git 清单路径集完全一致、内容逐字节一致、无项目态泄漏。

## 3. 问题清单

| # | 严重度 | 问题 | 建议 |
|---|--------|------|------|
| 1 | 低 | `package-skill.js` 不自动创建输出父目录，`eval/dist/` 不存在时直接 ENOENT 失败 | 打包前先建目录（README 已注明）；可向上游反馈让脚本 `mkdir -p` |
| 2 | 中 | 打包基于目录遍历而非 git 清单：复测包 `vismith-retest.skill`（10:17 打包，67 条目，91,358 字节）包含了并行开发中**新建且未提交**的 `vismith/scripts/lib/cli.mjs`。任何未跟踪文件（含误入的 .vismith 状态）都会被打进包 | 正式发布打包应在干净检出（如 `git archive` 后的目录）进行，或打包前确认 `git status` 干净 |
| 3 | 低 | 主包 `vismith.skill`（10:14）内容为打包时刻的工作区快照，包含当时未提交的 `vismith/scripts/checks.mjs`、`vismith/references/generate.md` 修改（并行 Agent 进行中） | 交付/发布用包应在变更提交后重新打包 |
| 4 | 信息 | PowerShell 控制台直接 `type` 安装后的 SKILL.md 会显示 GBK 乱码 | 仅为终端显示编码问题，SHA256 已证明内容无损，无需处理 |

## 4. 备注

- `vismith-retest.skill` 保留在 `eval/dist/` 作为问题 2 的证据（含未跟踪文件的复测包），勿用于分发。
- 远程安装链路 `npx skills add <owner>/Design-Skills/vismith` 依赖仓库推送 GitHub，本次未测，仍为 [待验证]。
