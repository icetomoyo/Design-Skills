# S5 缺陷地图（仅评审与修复验证用；生成代理不可见）

| # | 类型 | 位置 | 细节 |
|---|---|---|---|
| 1 | 对比度不足 | Dashboard.jsx KPI 卡 1 | #94A3B8 on #FFFFFF ≈ 2.56:1（<4.5） |
| 2 | 对比度不足 | Settings.jsx 签名 label | #94A3B8 on #F8FAFC ≈ 2.45:1 |
| 3 | 对比度不足（视觉连带） | Dashboard.jsx SLA 数字 #FF6B35 on #FFF ≈ 2.9:1，同时是硬编码色 |
| 4 | 硬编码色 | Dashboard.jsx | #FF6B35（SLA 数字） |
| 5 | 硬编码色 | Dashboard.jsx | #7C3AED（处理链接） |
| 6 | img 缺 alt | Dashboard.jsx | banner-q3.png |
| 7 | 魔法间距 | Dashboard.jsx | 13px / 17px inline style |
| 8 | 冗余 token | tailwind.config | spacing 表与默认刻度重复（extract 应清洗） |

预期修复面（FR/CHK 对应）：CHK-01 ×3、CHK-02 硬编码 ×2 + 间距、CHK-06 img-alt；invariants=布局结构与既有功能不变。
