---
name: vismith
description: 真实前端代码库的 UI 设计体系技能。建立并维护机器可读的 Design Contract（.vismith/contract.json），按 Generate/Refine/Redesign/Review 模式与产品类别路由来生成、精修、重设计界面，运行确定性静态检查（对比度/间距基线/语义/焦点/固定宽度），跨会话持久化设计决策。适用于代码库内的 UI 设计、生成、审查与重构；不适用于一次性 HTML 原型、幻灯片、海报等非代码库创作，也不处理纯后端工作。
---

# Vismith — Design-aware, self-verifying frontend skill

## 何时使用
- 在真实代码库中生成新界面、精修既有界面、授权范围内重设计、审查 UI 质量
- 建立或维护项目设计体系（Design Contract）
- 修复静态检查发现的确定性问题（对比度、语义、间距）

## 何时不用
- 一次性 HTML 原型/演示页/幻灯片（用相应原型技能）
- 纯后端、非 UI 任务
- 无代码库的纯视觉创作

## 主流程（五步，任何模式都按此顺序）

1. **Route**：判定 模式（generate/refine/redesign/review/contract/recall）x 产品类别（saas-dashboard/admin-console/marketing-site/consumer-app/creative/data-intensive），辅以访客意图轴。判定表与线索：references/routing.md
2. **Contract**：检查项目根 .vismith/contract.json。存在 -> 作为最高优先约束加载（连同 exceptions.md 未决例外）；不存在 -> 按 references/contract.md 建立（generate 引导创建；refine/redesign 先 extract 草稿再确认）
3. **Recall**：用知识检索补充类别专属知识，命令（相对本 skill 目录）：
   node scripts/search.mjs "查询词" --product-type <类别> [--tech <栈>] [--top 3]
   输出 abstain 时不要强行套用知识；命中条目注意 scope_note 适用范围
4. **Work**：按模式协议执行：references/generate.md | refine.md | redesign.md | critique.md
5. **Verify & Remember**：node scripts/checks.mjs <改动路径> --contract .vismith/contract.json；按 references/memory.md 更新 .vismith/（decisions.log.md 记录决策，review 结果落 reviews/）

## 脚本速查
- node scripts/search.mjs "表格 密度" --product-type data-intensive [--json] [--top N] [--min-score S]
- node scripts/contract.mjs init --dir <项目>   |   extract --dir <项目> --out <草稿>   |   validate <契约文件>   |   show <契约文件> --section tokens
- node scripts/checks.mjs src/ --contract .vismith/contract.json [--json] [--rules CHK-01,CHK-06] [--strict]

## 铁律
1. 契约优先级固定：invariants > a11y 硬规则 > 项目约束 > tokens > 风格偏好。已确认的设计决策不重新发明。
2. defaults, not bans：类别默认风格是起点不是禁令；用户明确 brief 可推翻任何默认（invariants 除外），推翻时记入 decisions.log.md。
3. Refine 红线：最小 diff；不动 invariants；不顺手重构、不顺手换库。
4. 检查输出中 confidence=heuristic 的发现是"待确认提示"，先向用户/上下文确认再改；confidence=certain 才是确定性错误。
5. 降级诚实：无 contract -> CHK-01 行级降级并声明；无浏览器/多模态 -> 只做静态检查与知识指导，明确说明未做视觉验证。
6. 本 skill 只读写本地文件（项目 .vismith/ 与知识库），不上传代码与截图，不安装任何后台进程。

## 安全边界
脚本均为零依赖 Node ESM，无网络行为、无安装动作；所有副作用限于用户明确指定的项目目录。

详细协议：references/routing.md、contract.md、generate.md、refine.md、redesign.md、critique.md、memory.md
