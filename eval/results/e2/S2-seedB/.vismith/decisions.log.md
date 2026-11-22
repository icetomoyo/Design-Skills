# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-22 | 方向（五行）：Product=HR 3 步建档+管理员补录；Character=高效/克制/可信；World=中文真实字典（12 部门/14 岗位/10 人名）；Moments=失焦即校验、提交汇总聚焦首错、失败不丢数据；Signature=「编号圆点+连接线」的步骤条↔流程时间线同构 | playbook-admin-console + forms-ux 检索命中 | 营销化 hero、庆祝动效 |
| 2026-11-22 | tokens：brand #2563EB 单主色；ink 灰阶；状态色 success #15803D / danger #B91C1C / warning #B45309（均对白底 ≥4.5:1）；neutrals 仅收录文本级深色（#0F172A–#64748B），浅色分隔/背景色不进 neutrals | CHK-01 会校验 neutrals×surface 全配对，浅色入列必然报 floor 级 error | 使用模板原 neutrals（含 #E2E8F0，会触发对比度 error） |
| 2026-11-22 | 权限差异实现：steps/fields 登记表按 roles 过滤 + 组件内 role 分支条件渲染；HR 不渲染财务字段与「审批人指定」步（INV-001），并在文案中说明去向 | S2 验收红线：非 CSS 隐藏；brief 可推断故未反问 | CSS 隐藏 / 仅禁用输入 |
| 2026-11-22 | 提交走本地 mock 异步服务（?mock=submit-error 失败开关），页脚明示演示环境未接后端 | hm-fake-send-ban：成功反馈只来自真实返回 | 同步 import mock 充当成功态 |
| 2026-11-22 | 校验协议：失焦单字段 → 下一步整步 → 提交全量汇总（role=alert+聚焦摘要标题+逐条跳转字段，首条即 DOM 序首错） | forms-ux + uu-forms-efficiency 检索命中 | 仅 toast / 仅行内错误 |
| 2026-11-22 | 颜色全部走 tailwind.config 语义 token（brand/ink/danger/success/warning/surface/canvas/on-brand），组件零硬编码色值；字号限 12/14/16/18/20；间距仅整数 Tailwind 单位（4px 基线） | contract.md §6 刻度纪律 + CHK-02/04 v0.2 类名扫描 | 原生调色板类（bg-emerald-600 等） |
| 2026-11-22 | 侧栏导航为静态演示结构（非当前项 span + title 注明未实现），不做假链接 | 诚实性纪律 | href="#" 假导航 |
| 2026-11-22 | 验证：vite build 通过（45 模块）；SSR 冒烟 12 断言全过（HR 默认 DOM 无财务/主审批人字段、共 3 步）；checks 最终 error 0 / warning 0 / info 1 | generate.md §5 自检循环 | 只跑静态检查不构建 |
