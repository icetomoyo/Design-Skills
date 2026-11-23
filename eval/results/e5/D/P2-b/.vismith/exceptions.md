# 已批准例外

- 2026-11-22 | index.html | CHK-02 hardcoded-color（11 处） | 单文件自包含交付，色值只能内联；11 处全部是 :root 里的 token 定义，与契约 tokens.colors 一一对应，其余样式全走 var() | 复审期：若将来拆出 tokens.css，立即撤销本例外
