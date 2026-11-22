# S4 · 主机清单（运维资产平台）— E2 seedB

React 18 + Tailwind CSS 3 + Vite。vismith skill `generate` 模式产出（route: data-intensive / operate）。
设计契约：`.vismith/contract.json`（`node vismith/scripts/contract.mjs validate` 通过）。

## 运行

```bash
npm install
npm run dev
# 数据四态演示（也可用页面右上角「演示状态」下拉）：
#   http://localhost:5173/            正常数据（10,000 行）
#   http://localhost:5173/?mock=slow  模拟慢加载（骨架态 2.6s）
#   http://localhost:5173/?mock=error 模拟服务错误（错误码 OPS-504 + 重试）
#   http://localhost:5173/?mock=empty 模拟空清单（真空空态）
```

## 文件结构

```
src/
  App.jsx                     页面装配：筛选/统计/四态/批量操作/对话框/抽屉/toast
  data/columns.js             59 个数据列定义（8 分组；冻结列/宽度/对齐/类型）
  data/mockHosts.js           种子化 PRNG mock（1 万行）+ 异步 fetchHosts 四态开关
  hooks/useHosts.js           loading/success/error 状态机 + reload
  lib/format.js               单元格值格式化（单位/千分位/使用率阈值色）
  components/
    HostTable.jsx             核心：虚拟滚动 + 冻结列 + 列宽对齐 + 窗口信息条
    Toolbar.jsx               搜索/环境筛选/密度切换/刷新/列设置入口
    ColumnSettingsPanel.jsx   列显隐（分组+搜索+冻结列保护+最少 3 列保护）
    BulkBar.jsx               选中计数 + 批量动作入口
    ConfirmDialog.jsx         批量确认（Esc/焦点归还/busy 进度）
    DetailDrawer.jsx          单机全字段详情（截断内容的展开途径）
    PageStates.jsx            骨架/错误/真空/筛选无结果 四态
    Toast.jsx                 完成反馈（成功/失败计数，失败点名原因）
    ui.jsx                    语义色按钮/输入常量 + 状态点
```

## 验收 checklist 对照

| 验收项 | 实现 |
|---|---|
| 冻结列横向滚动不位移、行高对齐 | 选择列 + 主机名 + 内网IP 三列 `position: sticky`（left 0/40/320），冻结偏移由列宽精确累加；表头与表体同 `colgroup` + `table-layout: fixed`，行高由 `tr height` 统一（32/44） |
| 50+ 列横向滚动 + 列显隐 + 不截断不可读 | 59 数据列，总宽约 7,900px，容器内横向滚动；列设置面板按 8 分组显隐（搜索、`显示全部 59 列`）；单元格 `title` 悬停完整值，主机名点击开全字段抽屉 |
| 1 万行虚拟滚动 | 窗口化渲染可见行 ±8（约 30-50 行 DOM）+ 上下 spacer 占位；rAF 节流滚动采样；底部信息条实时显示「第 X–Y 行 · 渲染 N / 10,000 行」；行高固定不跳动 |
| 批量操作：计数/确认/反馈 | BulkBar「已选 N 台」；重启/打标签均先弹确认框（点名数量 + 前 6 台样例）；执行中按钮禁用 + 内联进度；toast 给「成功 N 台，失败 M 台」，批量 ≥20 台模拟 1 台 SSH 超时失败并点名 |
| 密度切换即时生效不错位 | 紧凑 32 / 舒适 44 只改行高；列宽与冻结偏移不变；滚动位置按比例换算；选择已 localStorage 记忆 |
| 窄视口无页面级横向溢出 + 对比达标 | 页面布局 `min-w-0` 自适应，横向滚动收敛在表格容器（CHK-07）；契约色板文本对白底全部 ≥4.5:1（CHK-01 五组配对全过） |

## 拒绝正例规避

- **不整表渲染**：任何状态只渲染窗口行（含 spacer），虚拟化为核心实现而非可选。
- **不用 overflow:hidden 藏溢出**：溢出全部在单元格 ellipsis + `title` 完整值 + 详情抽屉展开；表格横向滚动在滚动容器内，不在页面级。
- **批量操作必确认**：无任何直接执行路径；行选择是原生 `<input type="checkbox">`（键盘 Tab/空格可触达，含表头全选 indeterminate）。

## Mock 真实性

- 主机名规范：`{机房}-{环境}-{应用}-{用途}-{序号}.ops.example.cn`（如 `sh1-prod-order-api-00042.ops.example.cn`），10,000 条无重复。
- IP 合法：内网 `10.{1-4}.{0-31}.{1-254}`；公网取 47.98/121.40/39.104/8.142 等段，四段 0-255、主机位避开 0/255（脚本校验 0 违例）。
- 月费数量级：2C4G ≈ ¥120–200/月、8C32G ≈ ¥1,300+/月、200Mbps 带宽主机 ≈ ¥1,000+/月、GPU（A10）≈ ¥8k+/月、A100×8 ≈ ¥12 万/月、裸金属 ≈ ¥22k+/月；GPU 占比 3%、裸金属 1%，全表月费合计约 ¥1,800 万（1 万台规模）。
- 其余字段：阿里云风格实例 ID/vpc/vsw、机型 ecs.c7/r7/c8y、真实 OS/内核对应、成本中心/值班组/工单组等运维语境。

## Vismith 流程记录

1. Route：`generate × data-intensive × operate`
2. Contract：init 模板 -> 按 S4 任务书改写（invariants 六条、row_height 档位、列纪律）-> validate 通过
3. Recall：search.mjs 命中 tables-density / playbook-data-intensive / uu-search-bulk / uu-action-feedback / focus-and-keyboard / empty-states
4. Generate：五行方向（克制/精准/可靠；hairline 台账质感；签名元素=冻结身份列）后落地代码
5. Verify：`node vismith/scripts/checks.mjs eval/results/e2/S4-seedB --contract .vismith/contract.json` -> error 0 / warning 0 / info 1（CHK-01 五组对比度全过）
6. Memory：决策已 append 到 `.vismith/decisions.log.md`
