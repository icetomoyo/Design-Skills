---
id: hm-job-anatomy
title: 访客任务决定页面解剖：先定 job，再定区块与行动位
category: ux-pattern
product_types: [marketing-site, consumer-app, creative]
tech_stacks: [html, react, vue]
kind: principle
source: upstream:hallmark#04977e1 (MIT)
scope_note: 营销页/落地页信息架构与收尾；组件级与 app 工作屏不适用
---

页面结构从"访客来做什么"推导（订阅/预订/到访/参加/购买/试用/注册/聘用/加入/收听十类 job），而不是从"软件页长什么样"推导：hero 配图+数字行+三步介绍+邮件订阅带是生成页的默认解剖，真实站点几乎不长这样。

**落地要点**

- 每类 job 有自己的行动位：订阅页行动即 hero；预订入口在导航与 hero，并在菜单/课程旁重复，从不只在页脚；到访类首屏给今日营业时间与地址；试用类下载/安装按钮紧跟标题
- 区块用品类自有的内容：菜单、场次、曲目、作品集、时间表、定价行——不是通用三特性网格
- 导航携带该 job 的动词（预订/购票/购买/收听/免费开始）；hero 展示事物本身（房间、封面、日期、屏幕）
- 证明用品类自己的形式（菜品照片、场次行、发行列表），不用通用数字带
- 收尾不用默认邮件订阅：真实收尾依次是行动再现、实用信息（时间/地址/联系）、更多目录、信任尾巴；邮件订阅只是五种之一
- 镜像测试：这组区块换个公司名还成立吗？成立即没有自己的解剖，回 job 重推

> 改写自 hallmark（https://github.com/Nutlope/hallmark @ 04977e1），MIT，Hallmark contributors，有修改。
