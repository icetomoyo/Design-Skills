---
id: uu-stack-web
title: Web 技术栈基线惯例
category: tech-stack
product_types: [marketing-site, saas-dashboard, admin-console, consumer-app]
tech_stacks: [html, tailwind, react, next, vue, nuxt, svelte, astro, shadcn]
kind: principle
source: upstream:ui-ux-pro-max#d643997 (MIT)
scope_note: 各栈新代码惯例基线；性能优化见 uu-web-performance 与 uu-react-perf
---

- Astro（内容站）：默认零 JS，岛屿按需注水——首屏下 client:visible、非关键 client:idle、立即交互 client:load；静态组件不加指令
- Next：新项目用 App Router + 文件路由；路由私有组件同置于 app/x/_components，不建全局大杂烩 components 目录
- React：局部状态 useState；关联多值用 useReducer；共享状态提到最近公共祖先，不做深层 prop 井
- Vue 3：新代码 <script setup> + Composition API；ref 装原始值、reactive 装对象，不混用
- Nuxt：pages 文件路由，[id] 动态段、[...slug] 兜底段，不手写路由表
- Svelte 5：runes（$state/$derived）是响应式契约；legacy $: 仅限维护旧组件，禁止新写
- Tailwind：动效用内置 animate-* 并配 motion-reduce 前缀；UI 反馈 transition 时长 150-300ms，上 1000ms 即是错误信号
- shadcn：CLI init/add 取件而不是复制旧实现；统一 @/components/ui 路径别名
- 旧范式代码（class 组件、Options API、legacy Svelte）出现在新代码即改写；项目惯例与本表冲突时先进 decisions.log 再动手
