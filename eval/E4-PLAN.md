# E4 四臂对照实验计划（状态：未执行 —— ADR-9）

目标：无 skill / ui-ux-pro-max / impeccable / Vismith 同任务对照（PRD §7 E4 行、D3、ADR-9）。本文件为方案，未执行。

## 1. 四臂定义与接入（版本可核查）
| 臂 | 内容 | 接入（本地安装，commit 锁定） |
|---|---|---|
| A | 无 skill 基线 | 仅任务书，零挂载 |
| B | ui-ux-pro-max v2.15.0 | 本地 `C:\Works\PubProj\ui-ux-pro-max-skill` @ d643997c82e94742dd3bee43210b0198e8bbba3d（2026-11-14，main，remote github.com/nextlevelbuilder/ui-ux-pro-max-skill）；在其 cli/ 本地运行 init（skill.json:42 `npx ui-ux-pro-max-cli init --ai claude`）生成到臂目录，禁拉远程 npm；生成物哈希入 manifest |
| C | impeccable | 本地 `C:\Works\PubProj\impeccable` @ 2b86d9c07b97d4bed7de23583e1bd1e58dd2baae（2026-11-14，main，remote github.com/pbakaus/impeccable）；复制其 `.claude\skills\impeccable\`（单源转换器产物，源 skill/SKILL.src.md）挂载；Rust 引擎不构建（PRD §8），C 为 skill 文本层，62 检测器缺席，计入局限 |
| D | Vismith | 本仓 `vismith\` @ 执行时 Design-Skills HEAD（记入 manifest） |

## 2. 场景抽样（S1–S7 取 4）
取 S1（生成·dashboard）、S3（生成·marketing/品牌，B 强项域）、S5（精修·既有 DS，fixture 已有）、S7（精修·a11y，C 强项域，fixture 已有）。
取舍：S4 与 S1 数据密度轴重叠且 E2 已有 D 单臂数据；S2 与 S5 表单精修重叠；S6 多页 fixture 未建且 review 模式对 B/C（无 contract 概念）不可比。4 场景 × 4 臂 × 2 seed = 32 run，即预算上限。

## 3. 变量控制
- 同 provider/model/采样档（E1 为 zhipu-coding 家族；E4 前须用户显式确认）
- 每 run 同预算上限（token+迭代），四臂一致
- 同 seed 任务书：每场景预生成 2 份变体锁 SHA-256；任务书以中性文本给 tokens/invariants（不用 Vismith contract 格式），四臂同题
- 隔离目录 `eval/run/e4/<arm>/<S#>-<seed>/`，臂间互不可见（独立子代理）；生成者禁读 rubric/grader 协议/其他臂产出/缺陷地图
- 同 Node 版本、同日执行；各臂只挂各自 skill

## 4. 评审（复用 grader-protocol.md + E4 附加条款）
- 双盲 grader（生成者≠评审者）；同维度差 ≥2 → 第三仲裁 grader 仅依双方证据裁决
- grader 不知 arm；输入=任务书+sanitize 后产出物+统一 checks JSON
- 盲评污染声明：B 留 MASTER.md 类自述、C 留 .impeccable//DESIGN.md、D 留 .vismith/ 与 checks JSON——三臂均易识别，D 尤甚。缓解：送审前 harness sanitize（剥离/改名状态目录与 provenance 标记，映射表存 manifest，grader 不可见）；代码风格残余不可消除，如实入报告
- 确定性检查由 harness 对四臂统一跑 checks.mjs（只读，按任务书 tokens 参数化，非按 .vismith/contract.json）

## 5. 指标与采集
- 六维 rubric（eval/rubric.md，0–4 × 2 grader）；"契约一致性"四臂统一口径=对任务书声明 tokens/invariants 的偏离
- 确定性：checks error/warning 计数、S5/S7 注入缺陷命中 n/8、拒绝正例命中数、精修类 diff 行数
- 成本：每 run 输入/输出 token 与耗时，子代理强制上报（E1 教训=未上报），试跑验证通道
- 产出 `eval/results/E4-<日期>.md`：臂间均分差+不确定性声明

## 6. 预算估算（【估算：E1/E2 未采 token，无实测基线，按 run 数×保守单run上限给出，执行时实测替换】）
| 项 | 数量 | 单位上限 | 合计上限 |
|---|---|---|---|
| 生成 | 32 run | 0.6M tok | 19.2M |
| 评审 | 64 pass（32×2 grader） | 0.15M | 9.6M |
| 仲裁 | ≤6（分歧率按 E2 外推） | 0.1M | 0.6M |
| 合计 | — | — | ≤30M tok；并发子代理 ≤1 工作日 |

任一 run 超单 run 上限即中止并记录，不重跑补分。

## 7. 局限与效度威胁
- 单 provider 家族，结论不外推其他模型
- 上游宿主适配差异：B 原生多平台 CLI、C 原生 Claude 生态+引擎；本实验测"skill 文本在评测宿主的效果"，非上游产品全功能；C 无引擎缺 62 检测器 → 对 C 偏保守
- instrument 与 D 同源（checks.mjs 为 Vismith 脚本）：确定性指标偏 D，rubric 为对冲主指标
- D 产出残余可识别性（sanitize 不完全）
- 无浏览器渲染（沿用 E1/E2）；n=32；对外公开结论须另行评审

## 8. 执行前置条件（未满足不启动）
- [ ] 用户批准 provider/model/预算
- [ ] 上游两仓 git status 干净、commit 复核、manifest 建立（含 B 生成物 hash、D 本仓 HEAD）
- [ ] C 臂挂载形态定案（文本层；引擎缺席已入局限）
- [ ] 8 份 seed 任务书预生成锁哈希；任务书 tokens 与 checks 参数对齐
- [ ] sanitize + run-manifest 机制就绪
- [ ] token/耗时采集通道经 1 次试跑验证
- [ ] 双 grader + 仲裁按 grader-protocol.md 配置
