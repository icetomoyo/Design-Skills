# unslop 仓库调研报告（Vismith Phase 1 · 三仓库调研之 unslop 篇）

> 归档说明：由子代理 /root/research-unslop（turn_root_research_unslop_1，2026-11-15）产出；
> 上游本地路径 C:\Works\PubProj\unslop，origin https://github.com/heydamir/unslop.git，commit 620163e；
> 许可证结论：CC BY 4.0，允许改造复用（需署名+标注修改），无 share-alike 义务。
> 传输截断说明：§2 结论尾段、§3、§4 在传输中被截断，缺失部分请直接查阅本地仓库原文（skills/unslop/SKILL.md 236 行等）；
> 归档时将行内代码标记规范化为「」，文字内容未改动。

## 1. 概况

- origin：https://github.com/heydamir/unslop.git；最近 commit 620163e（2026-11-15）
- 29 文件 = 23 文本 + 6 webp；结构：
    unslop/
      .claude-plugin/{marketplace.json, plugin.json(license CC-BY-4.0)}
      CITATION.cff(19行)  LICENSE(396行 CC BY 4.0 全文)  README.md(96行)
      examples/{dashboard.html 190行, hero.html 98行, store.html 146行}
      skills/unslop/SKILL.md(236行)  agents/openai.yaml(4行)
      skills/unslop/references/{signs.md 122, tokens.md 137, visuals.md 84, effects.md 113, refs.md 17, rtl.md 72}
      skills/unslop/scripts/{snapshot.mjs 197, story.mjs 505, story-path.mjs 27}
      test/{snapshot.test.mjs 111, story.test.mjs 89, story-path.test.mjs 68}
- CITATION.cff：作者 Damir Sokolovsky（@heydamir），license: CC-BY-4.0，明确欢迎 adaptation 并要求引用署名

## 2. 许可证审计

- 类型【源码证实】：CC BY 4.0（LICENSE:1,57；CITATION.cff:12；SKILL.md:4；plugin.json:6；README.md:96 五处一致）
- Section 2(a)(1)（LICENSE:137-145）：允许整体/部分复制与改造后分享
- Section 3(a)(1)（LICENSE:217-244）：署名五要素 + 须标注修改；无 share-alike（3(a)(4)，LICENSE:257-259）
- Section 4 数据库权利（LICENSE:262-281）：摘取大部（如整份症状目录）同样须署名
- 逐文件署名：6 个 reference md 末尾均有 "Part of unslop by Damir Sokolovsky (@heydamir), CC BY 4.0. Keep this credit in copies and adaptations."
- 结论：规则文本允许改造复用；对 Apache-2.0 仓库无传染性，但知识类内容（signs/tokens/rtl 等）改编须署名+标注修改+链接仓库
- 【传输截断：§2 尾段细则、§3 SKILL.md 逐段分析、§4 examples/test 分析缺失，原文见本地仓库】

## 5. 对 Vismith 的互补价值

### 5.1 吸收映射
| unslop 资产 | 映射去处 | 说明 |
|---|---|---|
| signs.md 症状目录（~90 条 sign→fix） | M4 checks.mjs 新增 CHK 规则 + critique.md 检查项 | 大半可静态检测：gradient text（background-clip:text）、colored glow、animate-pulse/ping、transition-all、hover:scale、大写宽字距、emoji 图标、非 4 倍数间距、rounded-full 滥用、weight 700-900、小字负字距、hype 词表、9999px pill |
| Direction 五行框架 + 禁词表 | M3 generate.md 方向模板 + M1 条目 | 补"方向先行"环节；禁词表可做 critique 检查 |
| 换名测试（SKILL.md:236） | M4 verify 字段 / M5 Verify 阶段 | 反泛化终检，零成本 |
| tokens.md 数值体系 | M2 contract 默认 seed + M1 条目 | 三 ramp、字号阶、圆角嵌套公式、单一 easing 曲线+时长表 |
| 一屏一亮点 / quiet chrome / moments | M1 principle 条目 | 反极简化与反堆砌双重对冲 |
| Copy 规则（hype 词表/变化量带基准/假数据识别） | M4 CHK + M1 | 词表可确定性匹配 |
| rtl.md（72 行） | M1 RTL 条目 | PRD 零覆盖空白 |
| 三档决策（heavy/light/no slop） | M3 保守分支 + M5 停止条件 | no slop = 只提 2-3 个小改进并明说"已经很好" |
| 九 pass 顺序 + pass 间 checklist | M5 流程协议参考 | 整屏完成一个 pass 再下一个，防碎片化 |
| snapshot.mjs 行为规格 | v0.3 capture.mjs 参考（重写） | 懒加载滚动、CSS/图片内联、scheme 冻结、live.png 对照、无 Playwright 给安装命令即退出 |
| story-path.mjs realpath 防护 | 本地文件服务安全模式 | 27 行 + 68 行测试 |

### 5.2 定位差异
- unslop：单一主题深度工作流；散文知识、无检索、无确定性检测脚本；整屏深度改造；强设计师人格
- vs ui-ux-pro-max（待验证）：它是广度知识库；unslop 独有"负面症状目录+方向框架"；无 scope 元数据与检索恰是 ADR-2/6 的超越点
- vs impeccable（待验证）：操作动词型；unslop 规则更可静态化，且有方向推导与换名测试
- 一句话：三者中唯一以反模板化为第一性目标、把负面模式写成可执行清单的仓库

## 6. 三清单

值得继承（CC BY 4.0 改造复用，SOURCES.md 标注 @heydamir + commit 620163e + 改写范围）：
1. signs.md → CHK 规则扩容（最高价值密度）
2. Direction 五行框架 + 禁词表 → generate.md 方向模板
3. 换名测试 → critique 终检规则
4. tokens.md 数值体系 → contract 默认 seed + M1 条目
5. 一屏一亮点/quiet chrome/moments → M1 principle 条目
6. Copy hype 词表 → CHK 确定性规则
7. rtl.md → M1 RTL 条目
8. no-slop 保守分支 → refine/review 停止条件
9. 测试风格 → Vismith 脚本测试规范

应重新实现（研究行为不抄代码）：
1. snapshot.mjs → capture.mjs（避免 CC BY 代码混入 Apache-2.0 代码树）
2. story-path.mjs 路径防护 → 重写同款 realpath 校验
3. 静态检测脚本化本身（unslop 全是散文规则，落成脚本正是差异化）
4. 九 pass → 按六类别裁剪的分层修复协议

不值得引入：
1. story.mjs/video 全套（营销产物，越界）
2. 图像生成工具链（fal/Replicate/OpenAI images MCP，违反无隐式网络上报基线）
3. effects.md canvas 特效实现（远期 creative 条目足够）
4. .claude-plugin 分发元数据（有自己的 npx skills add 链路）

风险/待决：① PRD §8 需补 CC BY 4.0 档；② 三者中复用合规成本最低；③ 散文知识改写需补 scope 标注。
