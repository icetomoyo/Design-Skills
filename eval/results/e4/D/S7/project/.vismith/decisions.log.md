# decisions.log

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 契约由 extract 草稿转正：colors 整理为 surface=#F8FAFC / primary=#2563EB / text_on_primary=#FFFFFF / neutrals=[#0F172A,#475569]，typography.scale 补录 [12,14,16,18,20]，invariants 按任务书写 3 条 | 检查器需结构化配对才能精确校验 CHK-01；页面在用字号档位需入契约；refine 红线须固化 | 保留扁平 shade map（CHK-01 降级为行级启发式，精度不足） |
| 2026-11-22 | Tailwind 间距数字键 4/8/12/16/24（像素等值重定义）保留不动 | extract 已警告语义漂移；a11y 主轴 refine 不动视觉与刻度（INV-01 最小 diff），留待后续 redesign 处理 | 改语义键并同步全部 JSX 类名（视觉不变但 diff 扩大一倍，超出本次范围） |
| 2026-11-22 | "清空"与"导出结果…"两处 div onclick、弹层关闭 span onclick 全部改为原生 button（type="button"），并删除非语义 `<i>` | 键盘不可达 + 无语义控件（CHK-06 error；WCAG 2.1.1/4.1.2）；`<i>` 为纯表现元素 | role="button"+tabindex+键盘事件（代码更多且语义弱于原生控件，拒绝正例风险） |
| 2026-11-22 | 计数文本内联色 #94A3B8 → text-ink-600，并加 aria-live="polite" | #94A3B8 on #F8FAFC ≈2.45:1 < 4.5:1（CHK-01 豁免条件不成立：浅底正文）；ink-600 ≈7.3:1；筛选计数需读屏播报 | 登记 exceptions 豁免（不成立，非深底场景） |
| 2026-11-22 | 副标题 h4 → h2 | h1→h4 跳级（WCAG 1.3.1 结构化）；与弹层 h2 同层级合法，视觉类名不变 | 保留 h4 补 aria-level（不如直接修正标签） |
| 2026-11-22 | 弹层补 role="dialog" + aria-modal + aria-labelledby；打开时聚焦弹层、Esc 关闭、Tab 圈定循环、关闭后焦点归还触发器（tabIndex={-1} 非正数） | 任务书硬性要求"弹层焦点圈定 + Esc 关闭"；静态工具不覆盖运行时焦点行为，需代码实现+人工 Tab 验证 | 仅加 role 不做焦点管理（键盘流程仍走不通，属拒绝正例） |
| 2026-11-22 | 全部交互控件统一 focus-visible:ring-2 ring-accent-600 ring-offset-2；未使用任何 outline:none | CHK-05 error；焦点样式是键盘导航系统的一部分（知识条目 focus-and-keyboard） | 依赖浏览器默认 outline（不一致，且 CHK-05 不通过） |
| 2026-11-22 | form 补 aria-label="工单筛选"，ul 补 aria-label="工单列表" | 区块需可感知名称（验收 checklist），零视觉影响 | 不加（无名 landmark/list 对读屏不友好） |
