# 主机清单 · 星链运维平台（S4 数据密集型表格，E2 seedA）

React 18 + Vite + Tailwind 3（无第三方 UI / 虚拟滚动库）。由 vismith skill generate 流程产出，
设计契约见 `.vismith/contract.json`（60 列 / 1 万行 / 冻结首两列 / 密度切换均为契约 invariant）。

## 运行

```bash
npm install
npm run dev
```

mock 数据开关（generate.md §4，四态真实可触达）：

| URL | 效果 |
| --- | --- |
| `/` | 成功态：10,000 行（确定性种子生成，每次一致） |
| `/?mock=error` | 错误态：role=alert + 错误码 HOSTS_SVC_503 + 重试按钮 |
| `/?mock=empty` | 真空空态：接入云账号 / 下载导入模板出口 |
| `/?rows=1000` | 缩小数据量便于观察 |
| 搜索框输入无匹配词 | 筛选无结果空态（清除筛选出口） |
| 工具栏「刷新」 | 重新走 loading 同形骨架 |

## 功能与验收对照

- **冻结列（INV-002）**：选择列 + 主机名 + 内网 IP 三列 `position: sticky; left`（偏移 0 / 44 / 304px），
  不透明底色 + hairline 右边框；行高与滚动容器同一 `rowH` 变量，横向滚动不位移、不错行。
- **60 列显隐**：`src/data/columns.js` 定义 60 列（基础信息/网络/规格/标签/监控/成本/负责人与生命周期/安全合规 八组）；
  「列设置」弹层按组勾选、支持列名过滤、全部显示/恢复默认；冻结两列锁定必显；选择持久化 localStorage。
- **1 万行虚拟滚动（INV-001）**：`VirtualTable.jsx` 固定行高 + 绝对定位行 + overscan 6 + rAF 节流，
  DOM 只渲染可视窗口；长文本 ellipsis + `title` 完整值（展开途径）。
- **批量操作（INV-003/004）**：选中即现操作条（已选 N 台）；重启/打标签均经 `role="alertdialog"` 确认
  （Esc 关闭、焦点圈、关闭归还焦点），执行有 busy 态，完成后 aria-live polite 播报；
  行选择为原生 checkbox（Tab/Space 键盘可达），支持 Shift 范围选择与表头全选（半选态）。
- **密度切换（INV-006）**：紧凑 32px / 舒适 40px，`data-density` 属性即时生效并持久化；行高、字号、
  冻结偏移同源计算，不错位。
- **溢出与对比（CHK-07/01）**：仅表格容器内部横滚，页面级无横向溢出（未用 overflow:hidden 藏溢出）；
  契约颜色配对 5 组全部 ≥ 4.5:1；状态为圆点 + 文本双通道（INV-005）。

## 结构

```
src/
  App.jsx                     页面组装：四态、工具栏、批量操作条、确认弹窗、toast、页脚
  components/VirtualTable.jsx 虚拟滚动 + 冻结列 + 多选（role=grid/row/gridcell，aria-rowcount）
  components/ColumnSettings.jsx 列显隐弹层
  components/ConfirmDialog.jsx  批量操作确认（alertdialog）
  components/StateViews.jsx     骨架 / 错误 / 空态
  data/columns.js             60 列定义（组、宽、对齐、格式化）
  data/mockHosts.js           种子化 mock：规范主机名、合法私网/公网 IP、按规格定价月费（¥267–¥30,417/月）
  hooks/useHosts.js           loading/success/error 状态机 + patchRows
.vismith/                     contract.json / decisions.log.md / exceptions.md / rules.json
checks-before.json            生成前基线（error 1 / warning 0 / info 1）
checks-after.json             生成后（error 0 / warning 0 / info 1）
```

> 说明：静态检查（vismith checks.mjs）已全绿；本环境未做浏览器运行时验证（无视觉/交互验证），
> 上述行为依据代码静态审阅。
