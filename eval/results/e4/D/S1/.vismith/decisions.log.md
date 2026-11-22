# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-22 | 方向定为"简洁数据密集型"：单一 ink 中性 ramp + 低饱和 blue accent，operate 紧凑密度 | 检索命中 playbook-saas-dashboard / layout-hierarchy（saas-dashboard 默认方向，brief 未推翻） | 深色主题、多 accent 方案 |
| 2026-11-22 | neutrals 只收录可作正文的 4 档深色（0F172A/334155/475569/64748B），浅表面色单列为 surface_muted/surface_subtle/border | CHK-01 将 neutrals 逐档对 surface 校验；模板浅色档（E2E8F0/F8FAFC）会触发 floor 级 error 且不可豁免 | 照抄模板 neutrals（会被 floor 拦截） |
| 2026-11-22 | typography.scale 增补 18px 档（对应 Tailwind text-lg） | 顶栏 h1 与错误态标题需要 16/18/20 组合；18 是 Tailwind 默认 text-lg，不重定义刻度 | 全部用 20px（层级不够细）或自定义字号（破坏刻度纪律） |
| 2026-11-22 | 主图行采用 xl 4 列网格、主图占 3 列（≈75% 内容宽），未分配列表占 1 列 | brief 要求主图 ≥2/3；等分 2/3+1/3 在计入列间距后实测仅 66.2%，有擦线风险 | 3 列网格 span-2（66.2%，低于 2/3 阈值） |
| 2026-11-22 | 主图卡内做"图表/数据表"切换视图 + 一句话结论，不新增第二个数据图块 | uu-charts-a11y：表是可访问的事实源；playbook：第二数据块必须是列表 | 图下常驻数据表（挤压版面、与列表块竞争） |
| 2026-11-22 | 四态走异步状态机 + ?mock=loading|error|empty 开关 + 600ms 延迟 | generate.md 数据页四态硬规则：状态须真实可触达，禁止同步 mock 直接充当成功态 | 只写成功态（违反硬规则） |
| 2026-11-22 | 侧栏移动端折叠为横向导航条（无弹层） | 满足 INV-003 骨架要求的同时避免 aria-modal 弹层焦点三件套成本与风险 | 移动端抽屉弹层（需 Tab 圈定/Esc/焦点归还全套实现） |
| 2026-11-22 | 空态图标从 ink-300 改为 ink-500 | 首轮 checks CHK-01 contrast-class 提示 ink-300 对白底 1.48:1，装饰图形也应 ≥3:1 | 以"深底/非正文"理由留痕豁免（该处本就是白底，理由不成立） |
