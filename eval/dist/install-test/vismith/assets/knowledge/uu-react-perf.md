---
id: uu-react-perf
title: React/Next 数据流与渲染性能
category: tech-stack
product_types: [saas-dashboard, admin-console, data-intensive, consumer-app]
tech_stacks: [react, next]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: React 18/19 与 Next App Router 的数据/渲染层；资源加载见 uu-web-performance
---

- 拆请求瀑布三招：无依赖请求 Promise.all 并行；依赖链只串必须串的；await 放进真正消费数据的分支，不在函数开头阻塞全路径
- Suspense 边界圈住慢区块：页面先出骨架、数据流式补齐，不整页等最慢请求
- 服务器组件：React.cache 去重同请求内的重复取数；fetch 并行发起；跨 client 边界只传必需的序列化字段；非关键收尾用 after 异步化
- 客户端数据：SWR/React Query 做请求去重与缓存，替代手写 useEffect 拉取；全局事件监听只注册一次
- 重渲染控制：状态放最近使用处；能从现有 state 推导的不另存；函数式 setState 避免读到旧值；昂贵初始计算惰性初始化；memo/useMemo 先测量再上，不预防性滥用
- 长列表：content-visibility 让屏外行跳过渲染；静态子树提升出重渲染路径；hydration 首帧无闪烁（属性直传而非挂载后再改）
- 打包：barrel file（index 全量 re-export）会把未用代码拖进 chunk，重依赖改直接路径引入
