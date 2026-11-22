# S5 修复说明（对照组 A · 无设计 skill，仅凭前端工程师最佳职业判断）

工作对象：`eval/fixtures/s5-project/` → 复制到本目录 `project/`。
任务：改善可访问性与一致性，不改变产品特征（未重构、未换库、未改布局结构；diff 仅 3 文件 11+/9-，全部为行内替换）。

## 修复清单（问题 → 方案 → 文件:行，行号为修复前 fixture 行号）

### 一、对比度不足（WCAG AA）×3
1. 指标标签 "今日新增工单" 使用 `#94A3B8`（白底对比度约 2.6:1，要求 4.5:1）
   → 改用既有 token `text-ink-600`（#475569，约 7.6:1），与同组另 3 张卡片的标签一致
   → `src/pages/Dashboard.jsx:15`
2. 表单标签 "回复签名" 使用 `#94A3B8`（同上不达标）
   → 改用 `text-ink-600`，与同表单另一标签（Settings.jsx:10 "显示名称"）完全一致
   → `src/pages/Settings.jsx:14`
3. 强调数值 "98.4%" 使用 `#FF6B35`（白底约 2.8:1，大号文本也需 3:1）
   → 保留橙色强调语义（产品特征），同色系加深为 `#C2410C`（约 5.2:1，通过 AA），并收编为新 token `highlight-700`
   → `src/pages/Dashboard.jsx:24` + `tailwind.config.js:8`

### 二、硬编码色（绕过设计 token）×2 + 附带 1 处
4. "处理" 链接硬编码 `#7C3AED`（该色对比度 5.7:1 达标，问题仅在硬编码）
   → 同一色值原样收编为 token `link-600`，视觉零变化，仅治理取色方式
   → `src/pages/Dashboard.jsx:38` + `tailwind.config.js:9`
5. SLA 数值硬编码 `#FF6B35` → 见第 3 条（一并解决）
6. （附带）4 张统计卡中仅第 1 张带 inline `boxShadow rgba(0,0,0,.08)`，卡片渲染不一致
   → 移除该一次性 inline 样式，4 卡样式统一
   → `src/pages/Dashboard.jsx:14`

### 三、图片缺少替代文本 ×1
7. `<img src="/banner-q3.png">` 无 alt
   → 补充 `alt="Q3 活动横幅"`（若确认纯装饰，可改为 `alt=""` 由读屏忽略，此处按信息性横幅处理）
   → `src/pages/Dashboard.jsx:44`

### 四、间距脱离 4px 基线 ×2
8. header `marginBottom: 17px` → 归位 `mb-16`（16px，最近基线刻度）
   → `src/pages/Dashboard.jsx:8`
9. 统计区 `marginTop: 13px` → 归位 `mt-12`（12px，与列表 `mt-12` 节奏一致）
   → `src/pages/Dashboard.jsx:13`

## 修复后自检
- 页面中已无任何 inline `style` / 十六进制色值 / 13px、17px 值（grep 验证通过）。
- 全部取色经 tailwind.config token：ink / accent / 新增 highlight-700、link-600。
- 未动布局结构（grid、列表、表单结构原样）、未改组件库与依赖（package.json 未动）。
- 白底文字对比度：ink-600 ≈7.6:1、ink-900 ≈16:1、link-600 ≈5.7:1、highlight-700 ≈5.2:1、按钮白字/accent-500 ≈5.2:1，均达 WCAG AA。

## 有意不改（保持 diff 最小）
- "处理" 链接无下划线（WCAG 1.4.1 仅靠颜色区分链接的争议点）：当前列表语境可辨识，加下划线属视觉改版，超出本次范围。
- 未新增任何契约/决策日志文件（该流程属于 skill 工作流，本对照组不使用）。
