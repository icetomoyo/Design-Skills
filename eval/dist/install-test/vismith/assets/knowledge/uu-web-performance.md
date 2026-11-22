---
id: uu-web-performance
title: Web 加载性能基线
category: tech-stack
product_types: [marketing-site, consumer-app, saas-dashboard, admin-console]
tech_stacks: [html, css, react, next]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 资源加载与渲染阻塞层；React 数据流层见 uu-react-perf
---

- 图片：WebP/AVIF + 按显示尺寸出图（srcset/sizes）+ 首屏外 loading lazy + 固定宽高比占位防跳动；首屏大图加 fetchpriority high
- 字体：font-display swap（或 optional）；中文字体子集化；fallback 字体用度量对齐（size-adjust）防换行跳动；全站字体 <=2 族
- JS：按路由/功能代码分割；重组件（编辑器、图表库）dynamic import；第三方脚本 async/defer 且为其加载失败兜底；警惕 barrel file 把整库拖进首包
- CSS：关键 CSS 内联首屏，其余异步加载；无用样式进包是慢性债
- 缓存：静态资源文件名带内容哈希 + immutable 长缓存；HTML 入口 no-cache
- 指标目标（移动端 p75）：LCP <=2.5s、INP <=200ms、CLS <=0.1；包体预算进 CI，超限即红
- 媒体：默认点击播放，禁自动播放带声音；循环动画消耗电量与注意力，减到必要项；重 3D/大图资产先压缩再懒加载

**验证**：节流到慢 4G + 4x CPU 降速看首屏；三个核心指标在真实设备 p75 达标。
