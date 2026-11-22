# 决策日志（只追加）

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 契约由 extract 草稿转正：product_type=saas-dashboard，colors 映射 ink/accent 为语义 token（surface/neutrals/primary/text_on_primary） | refine 无契约时 CHK-01 行级降级；转正后可精确校验对比配对 | 不建契约仅行级检查（精度不足，弃） |
| 2026-11-22 | 保留 tailwind.config.js 既有数字间距键（4=4px…24=24px），不消除语义漂移 | 消除漂移=改视觉节奏，违反 invariant"视觉方向不变"；refine 红线 | 改语义键/标准 rem（属 redesign 范围，不做） |
| 2026-11-22 | 3 处点击元素换原生语义控件：`清空` div→button[type=button]（TicketFilter.jsx:57）、弹层关闭 `×` span→button[aria-label=关闭]（:77）、`导出结果…` div→button（:92） | div/span onclick 键盘不可达且无语义（CHK-06 error；键盘流程断点）；换原生元素零成本获得 Tab/Enter/Space | role="button"+tabindex+键盘事件（仍不如原生语义，弃） |
| 2026-11-22 | 弹层补对话框语义与焦点管理：role=dialog + aria-modal + aria-labelledby；打开时焦点移入容器(tabIndex=-1)、Esc 关闭、Tab 在弹层内循环圈定、关闭后焦点归还"导出结果"触发器 | 验收要求"弹层焦点圈定 + Esc 关闭"；否则键盘流程逃逸/卡死 | 仅加 role 不做焦点管理（静态过但键盘仍走不通，拒绝正例，弃） |
| 2026-11-22 | 计数文本 #94A3B8(对比 2.45:1) → text-ink-600(7.24:1) | CHK-01 要求正文 >=4.5:1；ink-600 为契约 neutrals 既有 token，消除硬编码色（CHK-02） | #64748B(≈4.7:1，余量不足) 或登记例外（豁免被拒：a11y 硬规则不可豁免，均弃） |
| 2026-11-22 | 副题 h4→h2（保留 text-sm mt-4 类名）；form/ul 补 aria-label；计数 p 补 aria-live=polite | h1→h4 跳级违反标题层级；区块需可感知名称；筛选结果变化需读屏播报 | 仅改样式不改标签（语义缺陷仍在，弃） |
| 2026-11-22 | 统一焦点样式 FOCUS 常量（focus-visible:outline 2px accent-600 + offset 2px），应用于 input 与全部 4 个 button；不使用 outline:none | 验收"焦点可见且全站一致（CHK-05）"；ring 方案需 ring-offset 白底、outline 方案更贴近原生 | outline:none+ring 替代（含拒绝正例字样，弃）；默认 UA 焦点（不一致，弃） |
| 2026-11-22 | `<i>清空</i>` 斜体标签改为普通 button 文本 | i 为误用语义；按钮文案无需斜体强调，非视觉方向要素 | 保留 i 包裹（语义错误，弃） |
