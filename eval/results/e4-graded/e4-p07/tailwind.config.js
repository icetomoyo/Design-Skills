/** @type {import('tailwindcss').Config} */
// 语义色板与阴影映射自 design-system/supportdesk-ops/MASTER.md（skill Step 2b 持久化契约）。
// 文本用色均经 WCAG 对比度实测（见 README §对比度验证）：全部 >= 4.5:1。
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // 图形/主色，白底 5.17:1
          700: '#1D4ED8',     // 文本级主色，白底 6.70:1
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#EA580C', // 仅作非文本强调（3:1），不作正文文本色
          foreground: '#C2410C', // 文本级强调，白底 5.18:1
        },
        background: '#F8FAFC',
        foreground: '#1E293B',
        card: '#FFFFFF',
        muted: {
          DEFAULT: '#E9EFF8',
          foreground: '#475569', // 白底 7.58:1
        },
        border: '#E2E8F0',
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#B91C1C', // 白底 6.47:1
        },
        success: '#15803D',   // 白底 5.02:1
        warning: '#B45309',   // 白底 5.02:1
      },
      fontFamily: {
        // Inter + 系统栈：MASTER 配对中的正文字体；数字列使用 JetBrains Mono/tabular-nums
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      // Density 8/10（Dense / Dashboard）：MASTER 阴影仅取 sm/md 两档
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.05)',
        raised: '0 4px 6px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
};
