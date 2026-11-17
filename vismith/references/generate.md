# Generate 协议（从零创建界面）

前置：路由完成；contract 已建立（无则先走 contract.md §2）。

## 1. 方向先行（防止"通用 AI 风"）
先用 search.mjs 检索该类别的 playbook 与方向知识（查询词来自 routing.md 路由表）。用五行框架固化方向再写码：
- Product：这个界面帮用户完成什么（一句话）
- Character：性格 3 词（来自 brand.personality 或类别默认）
- World：内容与数据的质感（真实数据示例、图表、空态）
- Moments：关键交互瞬间（首屏、保存、异常）
- Signature：1 个可记忆的签名元素（不超过一个）
把五行方向作为回复的第一段给用户过目（默认继续，重大分歧再返工）。

## 2. Tokens 决策
- 优先用 contract.tokens；缺口（如 shadow、z-index 约定）按类别知识补默认值并写回契约（记 decision）
- 颜色：先验证 neutrals 对 surface 的对比度（CHK-01 必须零 error 再开工）

## 3. 结构与组件
- 布局：先信息架构（区块清单）再网格；密度按类别与访客意图轴
- 组件：用项目已有组件库；无库时按 contract.components 规则实现最小集
- 状态：空/加载/错误/成功四态齐全（检索 empty-states 知识）

## 4. 自检循环
写完即跑：node scripts/checks.mjs <新文件> --contract .vismith/contract.json
- error 全清；heuristic 发现逐条确认（真问题修掉，误报记 exceptions）
- 功能验收清单（从 brief 生成）逐条对照

## 5. 收尾
decisions.log 记录方向选择与新 token；新页面若有页面级约束写入 contract.constraints.pages。
