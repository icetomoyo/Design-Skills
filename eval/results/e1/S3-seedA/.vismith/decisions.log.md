# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-17 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-17 | 方向定为“文档式落地页”：非对称两栏 + 交替论点，签名元素仅“写/同步路径分离图”一个 | playbook-marketing-site 与 slop-signs-copy-hero 检索命中 | 居中堆叠模板布局 |
| 2026-11-17 | tokens 定稿：ink 冷四档文本 ramp（全部 ≥ 4.5:1 on surface）+ 钴蓝 #0047AB 唯一 accent + Inter 系统栈；新增 surface_alt/border/on_dark 派生档与 primary_strong hover 档 | S3 brief 前提 + tokens-starting-values 起步体系 | 沿用模板默认蓝 #2563EB |
| 2026-11-17 | invariants 按 brief 写入：INV-001 顶部导航保留 / INV-002 hero 唯一主 CTA + 至多一个次级动作 / INV-003 章节 80-128 节奏 | S3 任务书前提（contract init 先行） | 无 |
| 2026-11-17 | 修复初稿检查发现：补 :focus-visible（含深底变体）、去 index.html 内联色值、72px→80px、15px→14px | checks-before error 1/warning 3 → after 0/0，全部真问题不记例外 | 豁免到 rules.json |
