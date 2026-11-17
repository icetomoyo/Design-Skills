# S5 · 已有设计系统的局部精修（E1 选中）

## 任务书
给定一个已有 tailwind.config + 两个页面（tests/fixtures 扩展版：含 3 处对比度不足、2 处硬编码色、1 处 img 缺 alt、间距 13px/17px 混用）。任务："改善可访问性与一致性，不改变产品特征"。
正确路径：extract 契约草稿 -> 确认 invariants -> refine 三档判定 -> 分层修复。

## 验收 checklist
- [ ] 产出 .vismith/contract.json 且 validate 通过
- [ ] checks error 清零（CHK-01/02/06）
- [ ] diff 最小：未重构、未换库、未改布局结构（invariants 保持）
- [ ] decisions.log 记录 >=2 条决策
- [ ] 13px/17px 归位到 4px 基线

## 拒绝正例
- 顺手重设计（改配色方案/换组件库）
- 未提取契约直接改样式
- 修复引入新 CHK 发现
