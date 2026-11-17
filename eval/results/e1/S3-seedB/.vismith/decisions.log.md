# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-17 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-17 | tokens：ink 中性 ramp #1C2B3A→#52657A + 钴蓝 #0047AB accent；非文字 tint（#F4F6F9 subtle / #E3E8EF border）单列分键，不进 neutrals | brief 前提（低饱和 ink + 钴蓝 + Inter）；neutrals 四档对 surface 对比度 6.0–14.4:1 全部 ≥4.5 | slate 系（浅档对白不达标，且蓝味偏饱和） |
| 2026-11-17 | invariants=INV-001 顶部导航保留、INV-002 hero 主 CTA 唯一（次级动作 ≤1） | 任务书指定顶部导航与主 CTA 必须保留 | 只记 CTA 不记导航 |
| 2026-11-17 | spacing.scale 扩至 64/80/96/128；typography.scale 增 18/40/48 | 落地页 80–128 分节节奏（验收项）与营销 display 字号 | 沿用模板紧凑档 |
| 2026-11-17 | 字体本地栈 Inter→system-ui 回退，零字体文件 | 项目约束：不引入字体文件 | webfont 下载 |
| 2026-11-17 | 颜色一律经 tokens.css CSS 变量引用，index.html 与 styles.css 零 hex | CHK-02 硬编码颜色零偏离 | 内联色值 |
| 2026-11-17 | 方向（五行）：帮开发者给已有 SQLite 加双向同步；性格 pragmatic/calm/honest；真实终端会话与 SQL 结果作证据；首屏=终端演示；签名元素=可 SELECT 的同步队列视觉。布局非对称双栏交替，拒全居中堆叠 | playbook-marketing-site + slop-signs 两套知识约束 | 居中 hero+装饰背景（模板化） |
| 2026-11-17 | 生成后 checks：error 0 / warning 0 / info 1（CHK-01 契约配对全部达标）；未做浏览器视觉验证（静态检查+知识指导） | 铁律 5：降级诚实 | — |
