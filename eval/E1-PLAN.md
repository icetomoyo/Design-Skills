# E1 执行计划（状态：未执行 —— ADR-9 诚实原则）

范围：S1 / S3 / S5（其余场景 E2）。每场景 x 2 独立生成（不同 seed）+ 双 grader 盲评。

## 前置条件（未满足前不启动）
- [ ] S5 专用 fixture（含注入缺陷的示例项目）——当前未建
- [ ] 生成者宿主与模型预算经用户确认（skill-creator 规范：run-eval 需显式 Provider/model/cwd/预算，不继承会话凭据）
- [ ] grader 子代理按 grader-protocol.md 配置

## 流程（hallmark harness 模式）
1. 生成：每场景新建隔离目录，挂载 vismith skill，记录 token/耗时
2. 确定性层：产出物跑 checks.mjs --json 存档
3. 盲评：两个 grader 独立评分（协议见 grader-protocol.md）
4. 聚合：维度均分 + 一致性 + 确定性指标 -> eval/results/E1-<日期>.md
5. 局限声明必附：样本量、模型、未验证项

## 当前状态（2026-11-17）
骨架就绪；**尚未执行任何生成或评分**。执行需用户批准模型预算。
