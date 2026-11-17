# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-17 | refine 转正 contract：以 tailwind.config.js 为真值源修正 extract 草稿（颜色嵌套/spacing 32/radius lg 丢失），neutrals 仅收录可作文本的 #0F172A/#475569（ink.50/ink.100 归入 surface_alt/border） | extract 是启发式；CHK-01 将 neutrals 全部按"surface 上文本"校验，混入背景色会误报 | 直接用草稿（颜色键冲突 "600" 语义不明） |
| 2026-11-17 | 判档 heavy，按层修复：第 1 层确定性 error（img alt / focus-visible / 低对比文本），第 2 层 token 偏离（硬编码色、13/17px 间距） | 基线 checks error 2 / warning 4，且人工对比度核算 3 处 <4.5:1 | light 档只修 2-3 处（不足） |
| 2026-11-17 | #94A3B8 标签（Dashboard:15、Settings:14）→ text-ink-600：2.56:1 → 7.58:1（白卡）/7.24:1（ink-50 底） | a11y 硬规则 4.5:1 优先于原浅灰风格；与同卡组其余标签一致化 | 加深为新的灰阶值（引入非 token 色，违背一致性） |
| 2026-11-17 | #FF6B35 SLA 数值 → text-accent-600（2.84:1 → 6.70:1）；#7C3AED 处理链接 → text-accent-500（5.70:1 → 5.17:1，均达标） | 消除 off-token 硬编码色且保留"高亮指标/可点击链接"语义；知识检索确认"项目已有良好体系则只修用法不改值" | 改 ink-900（丢失强调）/ 新增橙紫 token（改配色方案=顺手重设计，拒绝） |
| 2026-11-17 | 指标卡内联 boxShadow rgba(0,0,0,.08) → tailwind boxShadow.card token + shadow-card 类 | 值不变、渲染不变，消除页面内 rgba 硬编码（CHK-02） | exceptions.md 豁免（留下永久豁免口子）或 shadow-sm（改视觉值 0.05） |
| 2026-11-17 | 17px/13px 内联间距 → mb-16/mt-12 类（归位 4px 基线，视觉差 ≤1px） | 契约 spacing.scale [4,8,12,16,24,32]；与全页 tailwind 间距写法一致 | 内联改 16px/12px（仍留内联样式，风格不一） |
| 2026-11-17 | 处理链接与保存按钮补 focus-visible:ring-2（CHK-05 为 heuristic，经 brief"改善可访问性"+契约 a11y.focus_visible=required 确认后修复） | 键盘可达性属 a11y 硬规则层级，高于最小 diff 顾虑 | 仅记录不修（error 不清零） |
