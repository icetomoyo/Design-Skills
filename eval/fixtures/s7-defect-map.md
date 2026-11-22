# S7 缺陷地图（仅评审与修复验证用；生成代理不可见）

| # | 类型 | 位置（TicketFilter.jsx） | 细节 |
|---|---|---|---|
| 1 | 键盘不可达 + div onclick | "清空"触发器 | div onClick，无 tabindex/role/键盘事件 |
| 2 | 键盘不可达 + div onclick | "导出结果…"触发器 | div onClick，同上 |
| 3 | 键盘不可达 | 模态关闭 × | span onClick，无 tabindex |
| 4 | 跳级标题 | h1 → h4 | 页面 h1 后直接 h4（CHK-09 思想，工具只查 html） |
| 5 | 对比不足 | 匹配计数 | #94A3B8 on #F8FAFC ≈ 2.45:1（CHK-01 无契约时行级可能漏，须建契约） |
| 6 | 焦点管理缺失 | 模态 | 无焦点圈定、无 Esc、无返回焦点（checklist 项） |
| 7 | 焦点样式缺失 | 全页 | 无任何 :focus-visible 方案（CHK-05） |
| 8 | 语义控件缺失 | 斜体 <i>清空</i> | 装饰性斜体标签用于可点击文本 |

预期修复面：CHK-01（建契约后）/CHK-02 硬编码色/CHK-05/CHK-06 clickable-div；invariants=布局结构与功能行为不变。
