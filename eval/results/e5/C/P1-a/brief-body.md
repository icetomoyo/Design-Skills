# Surface brief — eval/results/e5/C/P1-a/index.html

Scope & visitor mode: 单页长文（Read），中文科普讲解页《马尔可夫链》。
Audience/job/action: 自学的中文读者（学生/成年人），几分钟内建立“下一步只取决于当前状态”的可复述心智模型；动作是读、点“走一步”、看分布收敛。
Proof/content: 页面内嵌真实 4×4 转移矩阵；所有展示数字由该矩阵实时计算。
Constraints: 单文件自包含、零外部请求、系统字体栈、离线可用。

## Direction contract

THESIS: 马尔可夫链是一座“只看当前站、不看来路”的随机换乘系统；第一屏就把活的机制摆在读者面前（一张线路图上随机乘客正按频率表行走），拒绝“大标题+图标卡片+静态插图”的科普模板。
OWN-WORLD: 轨交印刷品语言——藏青报头带、线路色徽（橙/青/玫红/紫）、等宽数字时刻表、编号图版（图 1…表 2）、运行头、终点站指示牌；纸白地、藏青墨。
STORY: 读者按“线路站点”顺序经过：状态 → 转移概率 → 无记忆性 → 多步演化 → 平稳分布；每站有可操作的证据，最后以“换乘信息”收尾。
FIRST VIEWPORT: 藏青刊头带（白字刊名+四色站徽）横贯，其下标题与开篇段直接回答“下一站由什么决定”，随即图 1：四站线路图 + 随机乘客 + 「走一步」按钮与轨迹条；主操作（走一步）在首屏内。
FORM: 城市轨道交通图与时刻表系统；自有七候选第 3 位；seed:88a539807a99132e
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Raises (donor → 纪律): tanaka-plane-portrait → 报头/色带为整块平涂色面、锁定同一网格；rw-botteghe-quarterly-interior → 严格行宽、运行头与编号图版仪器、一切齐框架边距；brick-build-instructions → 编号步骤开题 + 1:1 记号标注框；hand-drawn-zine-explainer → 转移箭头描边生长动画（reduced-motion 降级）；operate-a-cutting-bench-select-rail → 状态用“旗标”标记而非换色、发丝刻度；sneaker-box-stacks → 时刻表的三列标签网格纪律。
Challenger verdicts: rw-botteghe competitive（清晰度）；brick competitive（认同感）；hand-drawn-zine competitive（认同感）；tanaka / sneaker-box / cutting-bench declined。
Unresolved: 无（无人值守轮，按分配方向建造）。
