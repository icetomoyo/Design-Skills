# decisions.log — S7-seedA project

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 路由 mode=refine category=admin-console intent=operate | 工单筛选=内部后台 CRUD 列表+表单+弹层（routing.md 线索） | data-intensive（行密度不高，不取） |
| 2026-11-22 | 判档 heavy：确定性 error 3（CHK-06 clickable-div ×2、CHK-05）+ warning 1（硬编码色） | refine.md 三档判据按 checks 输出 | light（不满足） |
| 2026-11-22 | extract 草稿转正：neutrals 仅收录文本用色 #0F172A/#475569；ink-50 定为 surface、ink-100 定为 border、white 定为 surface_raised | CHK-01 按"neutrals on surface"配对；边框/背景色混入 neutrals 会产生伪 error | 全量收录 5 档色（2 组伪 error，不可取） |
| 2026-11-22 | 保留 Tailwind 数字间距键重定义（4=4px…24=24px），不消除 extract 报告的语义漂移 | 本次为 a11y refine：改语义键需重写全站类名与刻度，违反最小 diff 与 INV-003"不改视觉方向"；记入 constraints.project | 语义键重命名/改回标准 rem（留待 tokens 治理或 redesign 任务） |
| 2026-11-22 | 计数行 #94A3B8 → text-ink-600（#475569） | 原 2.45:1 < 4.5:1（实算对比）；ink-600 是页面既有次级文本 token（7.24:1），同时消除 CHK-02 硬编码色 | 新增中间档 token（扩大 diff） |
| 2026-11-22 | h4 副标题 → h2 | 消除 h1→h4 跳级；CHK-09 仅扫 .html，jsx 人工复核（uu-a11y-structure：标题是导航） | 补 h2/h3 占位（徒增噪音节点） |
| 2026-11-22 | 弹层：role=dialog + aria-modal + aria-labelledby（指向标题 id）+ 打开即聚焦 + Tab 圈定（focus trap）+ Esc 关闭 + 关闭归还触发器焦点 | 知识 focus-and-keyboard/uu-wcag22；验收项"弹层焦点圈定 + Esc + 返回焦点" | 仅加 Esc 不圈焦（焦点逃逸到背景，不达标）；引入 focus-trap 库（违反"不换库"红线） |
| 2026-11-22 | div/span onclick（清空、导出结果、×关闭）改原生 button（type=button） | CHK-06 clickable-div 为 floor 级不可豁免；uu-a11y-structure"语义元素优先"，同时解决键盘不可达 | role="button"+tabindex+keydown（等价但代码更多，非原生） |
| 2026-11-22 | 可聚焦元素统一 focus-visible:outline-none + focus-visible:ring-2 ring-accent-500（实心按钮加 ring-offset-2） | CHK-05 焦点可见且全站一致；outline-none 均有 ring 替代（拒绝正例规避）；ring 色对表面 4.94:1 ≥ 3:1 | 依赖浏览器默认 outline（各浏览器不一致） |
| 2026-11-22 | form 加 aria-label="筛选条件"、ul 加 aria-label="工单列表" | 验收项"区块有可感知名称"；不可见属性，零视觉影响 | fieldset+legend（引入可见结构元素，有改视觉风险） |
| 2026-11-22 | 匹配计数行加 aria-live="polite" | 输入时后台计数变化需读屏播报（uu-a11y-structure：动态更新播报） | 不播报（读屏用户对过滤结果无感知） |
