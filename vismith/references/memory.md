# 项目设计记忆（M6）

一切状态在目标项目的 .vismith/ 内，git 可追踪，跨会话跨宿主。

## 文件语义
| 文件 | 语义 | 读写时机 |
|---|---|---|
| contract.json | 当前契约（schema 校验必须通过） | 任务开始加载；变更走 contract.md 纪律 |
| decisions.log.md | 决策追加日志（只追加不删除） | 每次契约/方向/例外决策后 append 一行 |
| exceptions.md | 已批准例外与豁免 | 任务开始读未决项；批准新例外时追加 |
| rules.json | 检查规则豁免配置（CHK-* -> files+reason） | checks --config 使用 |
| reviews/ | 审查报告与回归基线 | critique 后写入；redesign 前留基线 |

## 加载策略（省 token）
会话开始只读 contract.json + exceptions.md（未决部分）。不加载 reviews/ 历史与 decisions 全文，除非用户问"为什么这么定"。

## 记录格式
decisions.log.md 追加行：
| 2026-11-15 | 将主色从 #3B82F6 调整为 #2563EB | 品牌指导 v2 | 保持原色+覆盖层 |
exceptions.md 追加块：
- 日期 | 范围（文件/页面）| 原因 | 复审期

## 禁止
- 存会话闲聊、截图二进制、一次性调试信息
- 在未变更契约时重写 contract.json（幂等读取）
- 把知识库内容复制进 .vismith/（知识用检索，不落项目）
