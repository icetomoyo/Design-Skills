# S7 审计报告 · TicketFilter（基线 → 修复后）

- 目标：`src/pages/TicketFilter.jsx`（隔离副本）
- 方式：`impeccable detect --json`（基线/修复后各一次，均返回 `[]`——无渲染目标，见降级声明）+ audit.md 五维静态人工审计
- 模式：Operate（工单筛选 = 任务型界面），精修不重构

## Audit Health Score（基线）

| # | 维度 | 分 | Key Finding |
|---|------|----|-------------|
| 1 | Accessibility | 0 | 3 处点击挂载于非语义元素，键盘全流程不可用 |
| 2 | Performance | 3 | 无明显问题；输入过滤 O(n) 可接受 |
| 3 | Theming | 3 | token 体系在用；1 处内联硬编码色 #94A3B8（L20） |
| 4 | Responsive Design | 3 | 布局流式；无触控目标显式保障（44px 未验证） |
| 5 | Implementation Integrity | 3 | 结构贴产品语义；弹层为原生轻实现 |
| **合计** | | **12/20** | **Acceptable（可访问性为 0 拖底）** |

## Detailed Findings（基线，file = src/pages/TicketFilter.jsx）

- **[P0] 键盘不可达 ×3 + div/span onclick**：L17 `div onClick`「清空」、L36 `span onClick`「×」、L42 `div onClick`「导出结果…」。Category: A11y；WCAG 2.1.1 (A)、4.1.2；CHK-06。键盘用户无法清空、无法开/关弹层 → 任务链断裂。
- **[P0] 弹层无键盘支持与焦点管理**：L31-40 无 Esc 关闭、无焦点圈定（Tab 逃逸至被遮蔽背景）、打开不移焦、关闭不复原。WCAG 2.1.1/2.4.3。
- **[P1] 标题跳级**：L11 `h1` → L12 `h4`。WCAG 1.3.1。
- **[P1] 文本对比不足**：L20 `#94A3B8` on `#F8FAFC` = 2.45:1 < 4.5:1。WCAG 1.4.3 (AA)；CHK-01。同时是 theming 硬编码色。
- **[P2] 区块无可感知名称**：L22 列表、L14 表单、L33 弹层（无 role/aria-modal/labelledby）。WCAG 1.3.1/4.1.2。
- **[P2] 焦点样式未统一**：依赖各浏览器 UA 默认，无全站一致的 focus 表现。WCAG 2.4.7；CHK-05（无 outline:none 裸用，属缺统一而非违例）。
- **[P3] 结果计数无 live region**：过滤结果变化对读屏不可感知；`<i>清空</i>`（L17）语义误用。

## 修复后核验（静态）

| 项 | 结果 |
|----|------|
| 语义控件 | ✅ 4 个交互元素全为 button（type=button），onclick 语义化，CHK-06 清零 |
| 键盘全流程 | ✅ 代码路径：Tab 序 = DOM 序 = 视觉序（label→input→清空→列表→导出结果）；弹层开→焦点入「关闭」→Tab 首尾环绕圈定→Esc/× 关闭→焦点回触发器；无正数 tabindex；无焦点陷阱 |
| 标题层级 | ✅ h1→h2（页面）/ h2（弹层，挂 id 供 labelledby），零跳级 |
| 对比 | ✅ ink-600/#F8FAFC=7.24、ink-900=17.06、white/#2563EB=5.17、accent-600 链接=6.41；全部 ≥4.5:1，CHK-01 零 error、零豁免 |
| 焦点可见 | ✅ 全站统一 focus-visible 2px accent-600 ring（6.41:1 ≥ 3:1）；outline:none 仅与 ring 替代成对 |
| diff 最小 | ✅ 仅 +53/−12 行；布局/间距/文案/逻辑未动；决策 7 条见 decisions.log |

## Positive Findings
- 既有 label[for]/input id 配对正确；main 地标、列表语义 ul/li、key 使用规范；token 化配色（ink/accent）本就齐备，修复全部走 token。

## Recommended Actions（后续）
1. [P3] `/impeccable polish`：在可渲染环境补真实键盘/读屏走查与触控目标验证。
2. [P3] `/impeccable init`：固化 PRODUCT.md，补齐上下文工件。

> Re-run `/impeccable audit` after fixes to see your score improve.
