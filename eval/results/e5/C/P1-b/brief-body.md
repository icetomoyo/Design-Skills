# Surface brief: index.html（马尔可夫链讲解页）

- Scope: 单页自包含讲解站（eval/results/e5/C/P1-b/index.html）；Visitor mode: Read。
- Audience: 中文自学者/学生，初次接触马尔可夫链；独自阅读，桌面或手机，线下可开。
- Job: 理解"无记忆的随机过程仍会收敛到确定的平稳分布"；Action: 亲手掷链并观测频率收敛；Proof/content: 页内实时计算的转移矩阵、Pⁿ 收敛表、经验频率 vs 理论 π；Constraint: 单 HTML 文件、全内联、零外部请求、无浏览器验证可用（静态降级）。
- Chosen direction: 概率观测年鉴（气象台年册 × 东亚官厅朱丝栏账簿 rendition）；memorable moment: 观测记录逐格盖印、经验频率沉淀到 π 细线。
- Unresolved: 无（brief 单句，其余自行推断并已在 PRODUCT.md 标注）。

## Direction contract

THESIS: 只凭"现在"转移、遗忘全部历史的随机过程，长期仍安顿进确定的平稳分布——无记忆，却有归宿。本页拒绝品类默认的黑底霓虹节点图与白卡片博客文章，改为一座概率观测台印刷自己的年册：读者亲手走链，看频率在朱丝栏格线里沉淀成 π。

OWN-WORLD: 冷调观测纸面（蓝灰纸白一族，非暖 cream），铁胆青墨正文；朱砂红只承担"记录"语义——印章与朱丝栏格线（结构线，非散点强调色）；普鲁士蓝为"雨"态通道、赭金为"晴"态通道；细线双栏刊头压双细线；图版一律细框+编号+图注；签名动作=朱砂观测印章（章节扉与观测记录盖印）。状态以字形+位置编码，绝不仅靠色相。字体：中文宋体衬线栈+Georgia 数字（环境禁外链字体，系统栈降级已声明）；等宽不作为装饰。

STORY: 读者带着"马尔可夫链是什么"而来：首屏图版一给出两态转移与无记忆性；第二章学会读转移矩阵；第三章在观测台亲手掷链（调 a、b，单步/自动/暂停/重置），记录逐格盖印；第四章看经验频率收敛并对照理论 π（πP=π、Pⁿ 表）；第五章划清边界（无记忆≠独立、有限状态、时齐）并列应用（PageRank、n-gram、遗传漂变、排队、评级迁移）。离场能转述"只看现在，不问过去，终有归宿"。

FIRST VIEWPORT: 1440×900：细刊头条贯穿顶部（左「概率观测年鉴·随机过程观测记录」右横排目次），下压双细线；主标题「马尔可夫链」衬线特排（≤4.2rem）紧接引言"只看现在，不问过去。"；其下即图版一：两态转移图（SVG 手绘 晴/雨 字形、带概率的弧线箭头、细框与图版编号），左列首段正文同时开始；无眉题、无指标英雄位。主行动（掷一步）在第三章观测台，首屏由图版一暗示其下可操作。

FORM: 观测年鉴 direction，构建自本人七方向接地方向清单第 4 位（1 手绘统计图版 2 《论猜想》雕版 3 俄苏习题集 4 观测年鉴 5 博物馆图版目录 6 五十年代期刊 7 数字长文阅读器）；seed:076632a39c5b7c8f。Challenger 裁决：emission-line-rail 与 cutting-bench 与 cloud-quarry 判 declined（借其纪律为三项 raise：状态按字形+位置编码、停驻处保留标记、章节具材料重量）；swiss-grid 与 provenance-ribbon 判 competitive 留作备选。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
