---
id: uu-content-formatting
title: 数字、日期与长内容的格式化纪律
category: copy
product_types: [saas-dashboard, admin-console, data-intensive, consumer-app]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 数据呈现层微文案；文案语气见 copy-tone
---

- 数字：千分位分隔；大数统一缩写规则（12.4k、1.2M），同屏不混两套；金额带币种与固定小数位；表格数字右对齐 + tabular-nums 防抖动
- 日期：近期用相对时间（3 分钟前/昨天），跨周用本地化绝对格式；相对时间必须能取到完整时间戳（悬停或详情页）；跨时区协作界面显式标注时区
- 截断：超长文本用省略号 + 完整查看路径（展开/悬停/详情页）；截断处保留可发现的视觉线索，不静默裁切
- 禁止截断的内容：标题、动作按钮、错误信息、安全与法律文案——换行或让容器生长，不裁
- 标签语义分层：badge 表状态（生效/过期），chip/tag 表值或动作；语义决定静态标记还是可交互控件，别混用
- pill/徽章标签尽量单行完整显示；确实放不下时截断对象只限不可预测的用户值，且给出完整查看路径
- 开发占位数据用真实形态（真实姓名、价格、日期），不留"测试测试 test"
