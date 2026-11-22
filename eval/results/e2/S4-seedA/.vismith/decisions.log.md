# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-22 | 路由 mode=generate category=data-intensive intent=operate | S4 任务书：主机清单大数据表 | admin-console（缺冻结列/虚拟滚动诉求） |
| 2026-11-22 | 契约定稿：语义色板 ink/primary/success/danger/warn/info，行高 32/40，字号阶 12/14/16/20/24/32 | CHK-01 零 error；tables-density 知识（密度是功能） | 默认 slate 类直用（off-token，CHK-02 拦截） |
| 2026-11-22 | 虚拟化自实现（固定行高+绝对定位+overscan 6+rAF 节流），不引入 react-window | 契约约束不新增库；1 万行只需窗口渲染 | @tanstack/react-virtual（额外依赖） |
| 2026-11-22 | 冻结列 = 选择列+主机名+内网 IP（sticky left，不透明底色+hairline 右边框）；行高与滚动容器同源变量，密度切换不错位 | INV-002 | 双表容器滚动同步（易错行） |
| 2026-11-22 | 批量操作三段反馈：选中计数条→alertdialog 确认（Esc/焦点圈/焦点归还）→aria-live 完成播报；行选择用原生 checkbox（键盘可达）+Shift 范围选 | INV-003/004 | 行 div 可点选择（div onclick 是 CHK-06 缺陷） |
| 2026-11-22 | 四态默认：同形骨架 role=status、错误 role=alert+错误码+重试、空态分真空/筛选无结果；mock 开关 ?mock=ok|error|empty | generate.md §4 硬规则 | 同步 import mock 直当成功态 |
| 2026-11-22 | 列宽用 inline 数值宽度 + min-w-0 布局，仅表格容器横滚，页面级不溢出 | CHK-07 窄视口防御；拒绝例禁 overflow:hidden 藏溢出 | 页面级横向滚动 |
