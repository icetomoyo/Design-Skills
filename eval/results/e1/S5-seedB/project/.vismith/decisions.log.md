# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-17 | extract 草稿转正为 contract.json（product_type=saas-dashboard；neutrals 只收录作文本用的 #0F172A/#475569，浅灰 #F8FAFC/#F1F5F9 归入 bg 而非 neutrals） | refine 前必须先有契约；CHK-01 的 neutrals-on-surface 配对只对文本色有意义，浅背景色入列会误报 | 照抄模板 neutrals（含 #E2E8F0，会误报对比度 error） |
| 2026-11-17 | Dashboard.jsx:15 与 Settings.jsx:14 标签色 #94A3B8 → text-ink-600 | #94A3B8 对白底 2.57:1 < 4.5:1（a11y 硬规则）；同排其他标签已是 ink-600，顺带消硬编码 | 新增更深的 slate 档位（违反"只修用法不改值"） |
| 2026-11-17 | Dashboard.jsx:24 SLA 值 #FF6B35 → text-accent-600 | 2.84:1 < 3.0（text-3xl=30px 属大字号，阈值 3.0 也不达）；保留强调语义，用品牌深 accent（6.70:1） | 改 ink-900 与其余指标一致（放弃强调）；新增橙色深档（新增调色板，被 do_not 禁止） |
| 2026-11-17 | Dashboard.jsx:38 链接 #7C3AED → text-accent-600 + focus-visible:ring-2 | 紫色为脱离调色板的硬编码；链接语义应走 accent；CHK-05 要求可见焦点 | 保留紫色仅加深（仍属体系外色）；underline 修饰（超出最小 diff，列为可选） |
| 2026-11-17 | Dashboard.jsx:44 img 补 alt="第三季度运营横幅" | CHK-06 error：缺 alt；横幅传达运营活动信息，非纯装饰 | alt=""（按装饰处理，会丢弃信息） |
| 2026-11-17 | 间距 17px→mb-16、13px→mt-12（Dashboard.jsx:8,13） | 17/13 非 4px 基线倍数（CHK-02/03）；就近归位 16/12，用 spacing 类替代 inline style | 取 20/16（偏离原值更大，非最小 diff） |
| 2026-11-17 | 内联 boxShadow '0 1px 3px rgba(0,0,0,.08)' 晋升为 tailwind token boxShadow.card（tailwind.config.js + shadow-card 类，值不变） | CHK-02 将 rgba 计为硬编码色；token 定义文件豁免扫描，且沉淀为可复用影子档 | 保留内联并在 exceptions.md 豁免（治标）；改用 Tailwind 默认 shadow-sm（值变化，非最小 diff） |
| 2026-11-17 | Settings.jsx:17 保存按钮补 focus-visible:ring-2 focus-visible:ring-accent-600 | contract a11y.focus_visible=required；CHK-05 error | 仅加全局 CSS（超出最小 diff） |
| 2026-11-17 | 层次/密度与状态完整性（层 3/4）不动 | 无相关 error/warning；refine 红线最小 diff，列为可选后续 | 顺手统一四张卡片阴影（一致性收益小、扩散 diff） |
