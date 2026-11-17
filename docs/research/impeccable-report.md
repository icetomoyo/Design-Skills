# impeccable 仓库深度调研报告（归档）

> 归档说明：由子代理 /root/research-impeccable（turn_root_research_impeccable_1，2026-11-15）产出；
> 上游本地路径 C:\Works\PubProj\impeccable，origin https://github.com/pbakaus/impeccable.git，commit 2b86d9c；
> 许可证结论：根 Apache-2.0（skill 文本/规则/知识可改造复用，须履行 §4 义务并携带 NOTICE；ios/android 两文件含 ehmo MIT 蒸馏链）。
> 传输截断：§3 尾段与 §4 引擎层主体缺失，原文见本地仓库 crates/ 与 docs/ENGINE.md；
> 归档时行内代码标记规范化为「」，代码块改缩进，文字内容未改动。

## 1. 仓库概况

- origin: https://github.com/pbakaus/impeccable.git；最近 commit 2b86d9c 2026-11-14（PR 已到 #1473，极活跃；星数本地不可查证，不臆测）
- 三层架构【源码证实，AGENTS.md:7、docs/ENGINE.md:17-46】：
  - Skill 层（源在 skill/）：SKILL.src.md + reference/ 47 个 md + scripts/（启动器）+ agents/ 5 个子代理提示词。根目录 22 个 .xxx 宿主目录 + plugin/ 均为 tracked 生成产物（AGENTS.md:30）
  - 引擎层（crates/ 19 个 crate + browser-bundle/）：单一静态 Rust 二进制承载全部 verb；同一规则集编译为 wasm 供页面内运行
  - 分发层：cli/（npm shim + 5 平台二进制包）、extension/（Chrome MV3 v1.4.0）、vscode/、cursor-plugin/、.claude-plugin/（v4.9.1）
- 版本：skill 4.9.1 / 引擎 0.1.24 / 扩展 1.4.0，独立发版

## 2. 许可证审计（最重要）

- root LICENSE = 完整 Apache-2.0，Copyright 2025 Paul Bakaus（LICENSE:179）
  - §2（LICENSE:67-72）：授予 reproduce, prepare Derivative Works of, sublicense, distribute
  - §4(b)（:98-99）修改文件须带显著修改声明；§4(c)（:101-103）保留版权/归属声明；§4(d)（:107-122）含 NOTICE 的衍生品分发须携带可读 NOTICE 副本
  - §6（:139-142）不授予商标权（"Impeccable" 名称不可用作产品名）
- cursor-plugin/LICENSE 与 root 逐字节相同的 Apache-2.0【源码证实，全文比对】
- NOTICE.md（11 行）：skill/reference/ios.md 与 android.md 蒸馏自 ehmo/platform-design-skills（MIT）——第三方内容仅此两份
- 全链一致：SKILL.md frontmatter license: Apache 2.0、package.json:20、Cargo.toml:11
- 溯源：README.md:229 "Impeccable started from Anthropic's frontend-design skill"
- 结论【源码证实】：skill 文本/设计规则/知识内容（含 62 条检测规则、reference 散文）允许改造复用；义务：随附 Apache-2.0 副本、标注修改、保留归属、携带 NOTICE（复用 ios/android 须连带 ehmo MIT 链）。我们同为 Apache-2.0，天然兼容

## 3. Skill 层（重点精读）

命令集（SKILL.src.md:48-73，24 条 + 系统命令）：
- Build: craft(弃用)/shape/init/document/extract；Evaluate: critique/audit(含 native 变体)；Refine: polish/bolder/quieter/distill/harden/onboard；Enhance: animate/colorize/typeset/layout/delight/overdrive；Fix: clarify/adapt/optimize；Iterate: live/generate
- 系统命令：context(Setup 必跑)/hooks/doctor/foundations/pin/teach
- 口径漂移【源码证实】：PRODUCT.md:27 说 23 条，README.md:52 说 24 条（craft 弃用所致）

组织结构：三层渐进披露——① SKILL.md 仅 93 行（源）；② 每命令一个 reference（3–375 行：routing.md 15 行 → critique-rubric.md 375 行、critique.md 362 行）；③ 引擎 verb 运行时输出 directive。craft-floor.md 在任何 UI 编辑前强制加载（SKILL.src.md:24），planning-only 不加载
Token 预算治理【源码证实，scripts/token-budget.json】："Every LLM-facing skill file has a cap"——SKILL.src.md 12750B、critique.md 30500B、craft-floor.md 7750B，bun run build 强制执行

品味编码三机制：
1. 散文规则：craft-floor.md "Refuse" 清单——同尺寸图标卡网格（"Cards are the lazy container; nested cards are always wrong"）、hero-metric 模板、eyebrow 绝对禁令（:27 "This one is a ban, not a default: no brief earns it back"）、渐变文字、玻璃拟态、>1px 侧条纹边框、硬偏移阴影、mono 装饰、系统显示字体、emoji 图标、几何遮罩；"Verify" 清单给硬数值（对比度 ≥4.5:1、measure 65–75ch、display max 6rem、tracking floor -0.04em）
2. 确定性检测器 62 条（crates/live/assets/antipatterns.json 实测计数）：slop 类直接编码 AI 审美特征——ai-color-palette、cream-palette、italic-serif-display、icon-tile-stack、overused-font、oversized-h1，甚至文案级规则 em-dash-overuse、marketing-buzzword、aphoristic-cadence、theater-slop-phrase；quality 类含 gray-on-color、low-contrast、cramped-padding 等；design-system-font/color/radius/font-size 四条以 DESIGN.md tokens 为契约做偏离检测
3. <!-- rule:xxx --> 注释标记贯穿 ios.md/craft-floor.md/SKILL.src.md，散文与引擎规则双向映射

多适配器目录不是同一份拷贝【源码证实，SHA256 实测 22 份全不同】：由 SKILL.src.md 经 scripts/lib/transformers/providers.js 每宿主转换——占位符替换（{{scripts_path}}、{{command_prefix}}：/ vs Codex 的 $）等
【传输截断：§3 尾段与 §4 引擎层（crates 清单、browser-bundle、引擎调用方式）缺失，原文见本地仓库】

## 5. 设计哲学

- PRODUCT.md:34："expert, opinionated, refined... zero hedging"；三词人格 expert/decisive/editorial；:38-44 反面清单（generic AI tool marketing、SaaS 落地页俗套、hedging 语言、教育式框架、过度装饰）
- 五原则（PRODUCT.md:56-60）：Practice what you preach（站点必须通过自家检测）、Show don't tell（The site IS the demo）、Editorial over marketing、Purposeful restraint
- DESIGN.md（自站 Neo Kinpaku 体系，534 行含完整 tokens frontmatter）：:255-257 "dark lacquer interface marked by Japanese gold leaf"；禁令（:525-533）"Do not use editorial magenta... italic serif display... purple gradients, neon cyan fields, glassmorphism"；OKLCH-only 规则（:408）；weight inversion（h1 100 < h2 300，:432）——强审美主张的活样本
- AGENTS.md 是工程治理文档：main 只在 release 动、next 开发、issue-first 贡献、AI 披露政策、oracle golden 不可随意重生成

## 6. 安装与多宿主适配

- 渠道：npx impeccable install / Claude Code marketplace / VS Code 扩展 / Grok plugin / submodule + npx impeccable link / 手动拷贝表 / npx skills（AGENTS.md:30：靠 tracked 根目录 harness 文件夹保证可装）
- 生成管线：skill/（唯一源）→ scripts/build.js → transformers/{providers,factory,hooks}.js → 20+ 根目录 + plugin/ + dist/；CI workflow 自动回写
- docs/HARNESSES.md 是 18 宿主能力矩阵活文档（frontmatter 支持表、hook 面、目录结构、子代理格式、占位符替换），含实测备注（Codex 拒绝未知 frontmatter 键、Gemini 只认 name/description）
- 对 npx skills add 的借鉴：① tracked 生成目录使任何安装器零构建可消费；② 单源+占位符+宿主差异配置远胜 N 份手写副本；③ hook 独立 opt-in 且每宿主 manifest 路径不同；④ 引擎版本 pin + checksum 清单 + 握手

## 7. 设计偏见与局限

- 类别适应性：主场是 web 营销页/产品 UI；native iOS/Android 有蒸馏参考但检测器/live/hook 全部 web-only（README.md:207）；JSX/TSX 只跑 pattern 规则、低对比度需渲染页面（README.md:88）
- 偏见证据（E-5）【源码证实】：对 "tasteful default"（cream+细衬线+pill button）系统性敌意——README.md:19 作为负面案例；检测器无条件标记 cream-palette/italic-serif-display，只能靠 ignore 豁免（README.md:90 即承认误报面）。对冲机制存在："brief wins"（SKILL.src.md:30 "Redirecting a clear brief toward your taste is failure"）+ craft-floor.md:21 "These are the category's defaults, not bans: the brief's own words can earn any of them"（eyebrow 等绝对禁令除外）+ Modes 轴让 Operate/Read 强制克制
- 可靠性：检测误报需多层 ignore；"站点自通过检测"承诺无法在本仓库核验（site 私有）；命令数 23/24 口径漂移；单一维护者主导 + 严格 issue-first

## 8. 三清单

值得继承：
1. token-budget.json 式每文件字节预算 + build 强制——渐进披露唯一可执行的做法
2. craft-floor"编辑前必读、planning 不读"的分层加载——护栏不占规划上下文
3. <!-- rule: --> 散文↔检测器双向标记——知识单一来源可追溯
4. critique 双子代理隔离（A 评审/B 检测互不可见）+ 强制降级横幅——防检测结论锚定 LLM 判断（critique.md:7-16）
5. "defaults, not bans / brief wins" 措辞——品味表达与品味强加的边界范本
6. Nielsen 0-4 打分 + mode 适用性 n/a 重归一化 + P0-P3 + 趋势线——可借鉴的评测语义
7. HARNESSES.md 宿主能力矩阵 + 单源转换器——多宿主工程正解
8. oracle 字节级 golden——行为契约测试范本
9. .impeccable/ 状态目录"哪些进 git"的显式划分（README.md:168）

应重新实现：
1. 引擎调用——Rust 二进制 + Releases 下载链重；按 ADR-1 用 plain Node ESM，仅借鉴 pin+checksum+握手思想
2. 检测规则集——Apache-2.0 允许改造复用，但应研究行为后按 contract tokens 框架重写（design-system-* 依 DESIGN.md tokens 的思路与 contract.yml 同构）
3. live 模式——价值高但工程极重（579KB 页面 JS + Rust server），v0.3 先做截图评审
4. Modes 四分法（Persuade/Operate/Read/Experience）与六类别正交互补（访客成功定义 × 产品类别），可作路由第二维

不值得引入：
1. 20+ 宿主目录全 tracked——发布噪音大，3-5 宿主规模不值得
2. 常驻编辑 hook——与"无后台 hook"安全原则冲突，且在 Claude Code 绕过模型审批
3. 在线 catalog/account/Pro 层——网络依赖与商业模式均不符
4. comp-led（图像生成先行）构建路径——依赖图像生成能力，范围外

## 9. PRD 待验证项核验

- E-2 命令集【源码证实】：critique/audit/polish/bolder/quieter/harden 全部存在，另有 24 条命令+系统命令；微操作命令质量极高（bolder.md "Scope is sovereign"/"The skeleton test"；quieter.md 按 Mode 分叉且给硬数值如 70-85% 饱和度、10-20px 位移、10% 用色规则）——M3 v0.3 可吸收其语义而非文本
- E-5 审美倾向【源码证实】：存在强审美编码（62 规则 + craft-floor 禁令 + DESIGN.md 自证），但第一原则是 brief-wins 对冲；检测器层无此缓冲。"按产品类别路由对冲"与其 Modes 轴互补而非重复，建议 W3 合并为二维路由
- 附加确认：ios/android 两文件含第三方 MIT 蒸馏链（NOTICE.md），复用时须连带标注；skills-lock.json 实为空壳（4 行），非安装机制核心【源码证实】
