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
- 状态：空/加载/错误/成功四态齐全（数据展示页见 §4 硬规则；检索 empty-states 知识）
- 弹层焦点三件套（硬规则，E2 发现 #2）：凡 aria-modal/role="dialog" 弹层必须同时具备：Tab 圈定（焦点不逃逸出弹层，首尾循环互跳）、Esc 关闭、关闭后焦点归还触发器；缺一即缺陷。生成时即实现并用键盘走查实际验证，不留"后续补"（E2 实证：S4-seedB 三处 aria-modal 仅实现 Esc+归还仍被判扣分，Tab 圈定缺失即缺陷）

## 4. 数据页四态默认（硬规则，E1 发现 #3/#4）
数据展示页（列表/表格/图表/仪表盘等以数据为主体）默认建四态，不待用户要求：
- 载入：与成功态同形的骨架（非全屏 spinner），容器 role="status" + aria-busy="true"，配 sr-only 说明
- 错误：人话说明（发生了什么+下一步）+ 错误码 + 重试按钮，容器 role="alert"
- 空态：分"筛选无结果"（说明+清除筛选出口）与"真空"（说明+新建/上传等主行动出口）两类，各带出口
- 成功：正常内容即成功态
实现约束：数据获取走异步状态机（loading/success/error + reload），禁止同步 import mock 直接充当成功态；四态须真实可触达——mock 层带开关（如 ?mock=error），能在运行页面实际渲染验证载入/错误态，而非只写代码不触达。
范本（只读引用路径，勿复制代码）：eval/results/e1/S1-seedB/src/hooks/useOverview.js（状态机+reload）、src/components/PageStates.jsx（骨架与错误态形态）。

## 5. 自检循环
写完即跑：node scripts/checks.mjs <新文件> --contract .vismith/contract.json
- error 全清；heuristic 发现逐条确认（真问题修掉，误报记 exceptions）
- 功能验收清单（从 brief 生成）逐条对照

## 6. 收尾
decisions.log 记录方向选择与新 token；新页面若有页面级约束写入 contract.constraints.pages。
