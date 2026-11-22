# Design Contract 协议（M2）

契约是本 skill 的核心：机器可读、git 可追踪、部分可自动验证。文件：项目根 .vismith/contract.json（JSON，字段见 assets/contract.schema.json 与模板 assets/templates/contract.template.json）。

## 1. 加载（每次任务开始）
- 存在：加载 contract.json + exceptions.md（未决例外）；meta.product_type 直接作为路由类别输入
- 不存在且 mode=generate：引导创建（见 §2）
- 不存在且 mode=refine/redesign：先 extract 草稿（见 §3），用户确认后落盘

## 2. 引导创建（generate）
最少问三次，能从 brief/代码推断的不问：
1. 产品类别 + 受众/场景（可推断则复述请确认）
2. 风格方向（给 2-3 个方向选项 + 默认推荐，附检索到的风格知识 scope）
3. tokens 决策：直接给一套与类别匹配的默认值（模板/unslop 数值体系知识），声明"可整体替换"
然后 node scripts/contract.mjs init --dir <项目>，编辑生成的契约（invariants 必须逐条按 brief 写，不能留示例），validate 通过后继续。

## 3. 提取草稿（refine/redesign）
node scripts/contract.mjs extract --dir <项目> --out .vismith/contract.draft.json
- 提取是启发式的：tailwind.config 的 colors/fontFamily/fontSize/borderRadius/spacing 与 CSS :root 变量
- 向用户展示草稿摘要并确认三件事：①颜色是否品牌色 ②间距基线 ③必须保留的 invariants（这是 refine 的红线来源）
- 确认后转正为 contract.json，记 decisions.log
- 提取不到 tokens（如样式散落）：引导式问答复用 §2 第 3 步

## 4. 变更纪律
- 一切契约变更（新增 token 档位、修改 invariants、批准例外）必须 append decisions.log.md 一行：日期 | 决策 | 理由 | 替代方案
- 例外（不进契约的一次性偏离）记录到 exceptions.md：日期 | 范围 | 原因 | 复审期
- validate 失败的契约不得使用；修复后再继续

## 5. 优先级（固定，不可配置）
invariants > a11y 硬规则 > 项目约束 > tokens > 风格偏好
冲突时高优先级胜出；胜负关系本身也是一条 decision。

## 6. Tailwind 刻度纪律（v0.2，E1 发现）
- **勿用数字键重定义默认刻度**：`spacing: { 4: '4px' }` 会把 p-4 从 16px 改成 4px（默认键 n = n×0.25rem）。自定义间距用语义键（tight/comfy/roomy）或保持标准 rem 公式。
- extract 会对等值默认刻度项自动剔除并留 note；对语义漂移的数字键给警告 note——转正契约时应消除漂移（改语义键或改回标准值），不要原样收录。
- 字号同理：代码中 `text-lg` 等类（=18px）必须能在 typography.scale 中对上；否则先在契约登记 18 或改用阶内档位（checks CHK-04 已扫类名）。
- 颜色类同纪律：契约存在时直接用 Tailwind 原生调色板类（bg-emerald-600 等）视为 off-token（CHK-02 off-token-color-class），应映射语义 token 或在契约显式登记。
