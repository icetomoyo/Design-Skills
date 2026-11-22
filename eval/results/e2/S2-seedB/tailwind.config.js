/** @type {import('tailwindcss').Config} */
// 设计 token 唯一定义点（对应 .vismith/contract.json tokens）：
// 颜色一律走语义名（brand/ink/danger/success/warning/surface/canvas/on-brand），
// 组件代码禁止出现 Tailwind 原生调色板类与硬编码色值。
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          600: '#DC2626',
          700: '#B91C1C',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          700: '#B45309',
        },
        surface: '#FFFFFF',
        canvas: '#F1F5F9',
        'on-brand': '#FFFFFF',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.06)',
      },
    },
  },
  plugins: [],
};
