# 设计决策记录

| 日期 | 决策 | 理由 | 替代方案 |
|---|---|---|---|
| 2026-11-22 | 初始化 contract | Vismith init | 从零建立 |
| 2026-11-15 | 路由 generate x data-intensive x operate，检索词取路由表 表格 密度 性能 | 大表格高密度操作界面 | admin-console |
| 2026-11-15 | 主色 #4F46E5；语义色 ink/line/canvas/surface/success/warning/danger 集中定义在 tailwind.config.js | 冷灰画布+高对比文本，CHK-01 五组配对全部>=4.5:1 | slate 默认调色板 |
| 2026-11-15 | 密度档位 compact 32px / comfy 44px 写入 components.table.row_height | 任务书密度切换；32 为数据密集起点（playbook-data-intensive） | 40/52 |
| 2026-11-15 | 冻结=选择列+主机名+内网IP（前两数据列），宽 40/280/130，sticky left 精确累加，border-r 分隔 | 覆盖冻结前两列两种读法；宽度固定保证密度切换不错位 | 只冻结主机名 |
| 2026-11-15 | 虚拟滚动自实现：窗口可见行+上下 spacer+overscan 8，rAF 节流，不引第三方库 | 1 万行禁止整表渲染；依赖最小化 | react-window |
| 2026-11-15 | 批量操作链路=操作条计数 -> 确认对话框点名数量与样例 -> busy 进度禁用 -> toast 成功/失败计数（>=20 台模拟 1 台 SSH 超时失败） | INV-003 + uu-action-feedback/uu-search-bulk | 无确认直接执行 |
| 2026-11-15 | 组件代码零硬编码颜色、零原生调色板类；颜色只出现在 tailwind.config.js（token 定义文件） | contract.md 刻度纪律与 CHK-02 off-token 规避 | 组件内 hex |
| 2026-11-15 | mock 标定：合法 10.x 内网 IP、规范主机名 {dc}-{env}-{app}-{role}-{seq}.ops.example.cn、月费 2C4G 约 120-200 / GPU 8k+ / 裸金属 22k+；GPU 占比 3%、裸金属 1% | 任务书 mock 真实性要求；首版 GPU 36% 导致均价 1.2 万已修正为 1875 | 未标定随机 |
| 2026-11-15 | 数据四态真实可触达：URL ?mock=slow/error/empty + 页面演示状态下拉 + 重试/清除筛选出口 | generate.md 数据页四态硬规则 | 仅代码不可触达 |
