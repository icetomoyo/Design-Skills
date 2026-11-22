# Refine 协议（不破坏产品特征的改善）

铁律：最小 diff；invariants 不可动；不顺手重构、不换库、不改技术栈。

## 1. 现状理解
- 无 contract：contract.md §3 提取草稿并确认 invariants（refine 的红线）
- 有 contract：读 invariants + 页面级 constraints

## 2. 三档决策（先判档再动手）
- heavy：明显问题多（对比度 fail、层次混乱、状态缺失）-> 分层修复
- light：基本健康 -> 只做 2-3 处提升
- no-change：已经很好 -> 明说"当前界面已满足契约与检查"，只提 2-3 个可选小改进，不动代码
判档依据：checks 输出 + 契约偏离度，不凭感觉。

## 3. 分层修复顺序（heavy 档）
1. 确定性 error（对比度/语义/焦点）
2. 契约偏离（硬编码色/间距/字号 -> tokens）
3. 层次与密度（视觉权重、留白节奏）
4. 状态完整性（空/载/错）
一轮只做一层，整页推进；每层结束重跑 checks。

## 4. 验证
- checks error 清零；heuristic 逐条确认
- invariants 逐条复核（功能性红线靠人工/测试确认，不只靠静态）
- diff 审视：改动是否超出 refine 范围（超了 -> 停，转 redesign 建议）

## 5. 收尾
decisions.log 记录改了什么/为什么；新例外进 exceptions.md；review 结果存 reviews/。
