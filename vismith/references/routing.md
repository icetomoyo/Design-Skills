# 路由：模式 x 类别 x 访客意图

## 1. 模式判定
| 用户意图示例 | 模式 |
|---|---|
| 新建页面/界面/模块，从零开始 | generate |
| 改善现有界面但不改产品特征（更好看/更顺/更一致） | refine |
| 重新设计（改风格/改布局/改信息架构），有明确授权 | redesign |
| 审查/体检/找问题/可访问性检查 | review（走 critique.md） |
| 建立/更新设计契约 | contract |
| 只查设计知识 | recall |

## 2. 产品类别判定（优先从代码与目录特征推断；不确定时问一次）
| 类别 | 线索 |
|---|---|
| saas-dashboard | charts/指标卡/漏斗/订阅态，路由含 dashboard/overview |
| admin-console | CRUD 表格+表单+权限菜单，路由含 admin/user/role |
| marketing-site | hero/定价/见证/CTA，单页或少页，含 pricing |
| consumer-app | 面向个人消费者的移动优先界面、信息流 |
| creative | 作品集/活动页/强视觉表达 |
| data-intensive | 大表格/编辑器/监控列表，行密度高 |

## 3. 访客意图轴（影响密度与语气，取自 impeccable Modes 思想，作默认值而非硬规则）
- persuade（说服：营销页默认）：强调层次与情绪
- operate（操作：后台/仪表盘默认）：强调效率、密度、反馈
- read（阅读：文档/内容站默认）：强调可读性与排版
- experience（体验：创意/活动页默认）：允许更强视觉表达
类别给默认轴，用户 brief 可覆盖。

## 4. 路由表（模式 x 类别 -> 首选知识检索词）
| 类别 | generate 首选检索 | refine 重点 | review 重点 |
|---|---|---|---|
| saas-dashboard | dashboard 布局 密度 | tables-density, tokens 偏离 | CHK-01/02, 一致性 |
| admin-console | 表单 表格 后台 | forms-ux, 最小 diff | CHK-06, 表单可用性 |
| marketing-site | 方向 营销 hero | 层次/文案 | CHK-01, 反模板化 |
| consumer-app | 移动优先 导航 | 动效克制 | CHK-05/06 |
| creative | 方向 signature | 一屏一亮点 | 少静态规则，重契约一致 |
| data-intensive | 表格 密度 性能 | 行内编辑 | CHK-03/07, 溢出 |

路由结论示例（写入回复开头）：[vismith] mode=refine category=admin-console intent=operate

## 5. 无 Node 指导模式
触发：`node -v` 拿不到 ≥18，且用户选择不安装。五步照常走，依赖脚本的步骤换成等价的人工做法：
- **Contract**：对照 assets/contract.schema.json 与 assets/templates/contract.template.json 手写 .vismith/contract.json，provenance.note 写明"手写，未经脚本校验"。
- **Recall**：按文件名与各条目 frontmatter 的 category / product_types 挑选 assets/knowledge/ 相关条目直接读取；§4 路由表的检索词就是文件名线索，scope_note 仍要核对。
- **Verify**：按 references/critique.md 的清单逐项走查改动文件。对比度等需要数值的项，用宿主可用的其他工具实算；算不了的标"未验证"，留给装好 Node 后重跑 checks.mjs。
- **Remember**：照常写 .vismith/decisions.log.md 与 reviews/（纯文件写入）。
完成判据：交付说明按 SKILL.md 铁律 5 逐项列明未执行的脚本步骤；用户不装 Node 的决定已记入 decisions.log.md。
