# S3 · Landing Page 与品牌一致性（E1 选中）

## 任务书
为一个开发者工具（示例：本地优先的 SQLite 同步引擎）生成产品落地页：hero（一句话价值+主 CTA）+ 三段功能论点 + 定价表 + 页脚。已有 contract：低饱和 ink 中性 ramp、accent 钴蓝、正文 Inter。
前置：先 contract.mjs init 建立 invariants（顶部导航与 CTA 必须保留），再生成。

## 验收 checklist
- [ ] hero 标题换掉产品名后不成立（具体性）
- [ ] 主 CTA 唯一，至多一个次级动作
- [ ] 定价表首屏以下可见且对比度达标
- [ ] 与 contract tokens 零偏离（checks CHK-02）
- [ ] 信任区只有可验证要素（如开源仓库链接），无头像点阵/五星
- [ ] 章节间距 80-128 节奏

## 拒绝正例
- "赋能/无缝/革命性" hype 词
- hero 上方 pill 徽章 + 悬浮 blob 背景
- 全部居中堆叠布局
