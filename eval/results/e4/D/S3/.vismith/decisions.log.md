# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-22 | 按模板落盘并转正：marketing-site/persuade，ink ramp #111827/#374151/#51607A + 钴蓝 #1A56DB + Inter（本机栈） | S3 brief 品牌前提；neutrals 只收录实算 >=4.5:1 的文本档（6.36/10.3/17.7 on #FFF），hairline/canvas/代码面作为非文本键登记 | slate 系默认模板值（含 #E2E8F0/#F8FAFC 会触发 CHK-01 error） |
| 2026-11-22 | neutrals 不收录 hairline/canvas 色档 | CHK-01 会把 neutrals 全部按 surface 文本验证；E2 发现 #3 边缘档禁令后宁可少收录 | 收录后逐条豁免（floor 级不可豁免，行不通） |
| 2026-11-22 | 主 CTA 层级：实心钴蓝按钮全页唯一（hero），顶栏 CTA 与三档定价按钮全部描边样式 | S3 验收"主 CTA 唯一，至多一个次级动作"；hero 次级动作=GitHub 仓库链接 | 定价推荐档用实心按钮（会产生第 2-4 个实心 CTA） |
| 2026-11-22 | 章节节奏取 96px（scale 内），hero/功能节非对称分栏，终端卡为唯一签名元素 | playbook-marketing-site 80-128 分节 + 一节一论点一视觉；hm-screen-budget 首屏词量预算 | 128px 顶格与居中堆叠 hero |
| 2026-11-22 | 全部裸值（色/字号/间距/阴影）收敛进 tokens.css，styles.css/index.html 只引用 var() | 静态交付无构建链，CSS 变量即 token 载体；CHK-02/03/04 对 token 定义文件豁免是设计而非漏洞 | Tailwind CDN（禁网络） |
| 2026-11-22 | 自检修复：取消 band 间 margin，改为 band 统一 padding-block 48，章节内容间距 96/112/128 | 首检后语义层发现 hero 底 48 + band margin 96 = 144px 超出 80-128 节奏（styles.css 修复前 `.band + .band` 规则） | 保留 144px 并豁免（无必要） |
