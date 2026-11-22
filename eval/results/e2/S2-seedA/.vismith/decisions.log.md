# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-22 | 路由：mode=generate × category=admin-console × intent=operate | 任务书为从零新建后台分步向导页 | marketing/落地页方向 |
| 2026-11-22 | 中性色收敛为三档文本级 #0F172A/#334155/#64748B（CHK-01 4 组全过）；hairline/canvas/fill 另列非文本角色 | 模板草稿把 #E2E8F0/#F8FAFC 放进 neutrals 会在白底跌破 4.5:1（contrast-principle：淘汰不达标档位） | 保留浅色档并降对比阈值 |
| 2026-11-22 | primary #1D4ED8（白字 6.7:1）；success/danger 文本用 #15803D/#B91C1C，#16A34A/#DC2626 仅作图标与边框 | 语义 600 档直接做 14px 文本不达 4.5:1 | 直接沿用 unslop 起步值做文本 |
| 2026-11-22 | 权限差异落在渲染层：审批步整体 roles:['admin']，财务字段组仅 admin 追加渲染；HR 视角 DOM 无财务数据 | brief + 拒绝正例禁止 CSS/禁用隐藏 | disabled/hidden 类隐藏 |
| 2026-11-22 | brief 中“HR 财务字段只读”实现为整组不渲染 + 业务说明（HR 无需填写） | 与验收 checklist“HR 不渲染财务字段与审批步”一致；不渲染即不可编辑，强于只读 | 渲染只读财务字段（会被判权限差异不真实） |
| 2026-11-22 | 字号阶 12/14/16/18/20/24；按钮与输入框 36px 高，卡内 padding 24/32 | admin-console 紧凑密度与表单触达性折中 | 32px 更紧但点击容错差 |
| 2026-11-22 | 字典/提交走异步 mock，带 ?mock=slow\|error\|empty\|submit-fail 四态开关，页面内标注对应演示分支 | generate.md 四态硬规则：状态须真实可触达验证 | 同步 import mock 直接充当成功态 |
| 2026-11-22 | 错误摘要链接文本与字段可见标签一致（permissionIds 用 fieldset legend “系统权限”） | 摘要锚点须与用户所见标签对应，否则跳转对不上 | 摘要用内部字段名 |
| 2026-11-22 | 表单 onKeyDown 检查 isComposing 拦截组词期 Enter | uu-forms-efficiency：CJK 输入法组词期 Enter 是确认候选 | 无兜底依赖浏览器行为 |
