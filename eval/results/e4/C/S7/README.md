# S7 · 可访问性精修（实验组 C · impeccable）

## 产出
- `project/src/pages/TicketFilter.jsx` —— 修复后页面（唯一代码改动；fixture 先整体复制至本目录，未触碰 eval/fixtures）
- `audit-report.md` —— 静态基线审计 + 修复后核验（impeccable audit 报告格式）
- `decisions.log` —— 修复决策记录（7 条，>=2 要求满足）

## 流程（impeccable 工作流）
1. 隔离复制 fixture → 本目录 project/。
2. `impeccable context --target src/pages/TicketFilter.jsx`：SCOPED_EXISTING_ALLOWED——窄幅精修以既有实现为设计权威，不阻塞、不重构。
3. 基线：`impeccable detect --json src/pages/TicketFilter.jsx` → `[]`；叠加 audit.md 五维静态人工审计（见 audit-report.md）。
4. 编辑前读 reference/craft-floor.md；按 polish.md 分层 triage：先阻断性路径（键盘不可达/语义控件/弹层焦点），再结构与命名，再对比与焦点样式，最后微项。
5. 修复后复跑 detect（仍 `[]`）+ 对比度按 WCAG 相对亮度公式用 node 脚本精确计算核验。

## 降级声明（引擎不可用部分）
- 本环境禁网络/浏览器/npm：detect 引擎无渲染目标，两次均返回空数组；渲染级验证（截图、真实 Tab/Esc 走查、读屏播报）未执行，键盘流程结论来自代码路径静态推演。
- 对比度为公式计算值（node 脚本），非取色器实测。
- 项目无构建链（package.json 无依赖、禁 install），JSX 未做编译验证，语法经人工复核。
- 子代理无用户交互通道：按 AUTONOMY_DIRECTIVE_CHECK 以任务书为唯一 brief 直接推断执行，未做 init 访谈；后续可补 /impeccable init 固化 PRODUCT.md。
