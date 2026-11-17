/** @type {import('tailwindcss').Config} */
// 语义色 token —— 与 .vismith/contract.json 的 tokens.colors 一一对应。
// 组件中不写裸色值；全部文本/背景组合已按 WCAG >=4.5:1 验证（见 .vismith/decisions.log.md）。
// 约束：subtle 仅用于白色/浅灰（raised）表面，不用于 canvas 底（4.34:1 不达标）。
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-hover': '#1D4ED8',
        success: '#15803D',
        danger: '#B91C1B',
        warn: '#92400E',
        ink: '#0F172A',
        body: '#334155',
        muted: '#475569',
        subtle: '#64748B',
        line: '#E2E8F0',
        surface: '#FFFFFF',
        raised: '#F8FAFC',
        canvas: '#F1F5F9',
        night: '#0F172A',
        'night-raised': '#1E293B',
        nighttext: '#CBD5E1',
        nightsub: '#94A3B8',
        'danger-soft': '#FEF2F2',
        'warn-soft': '#FFFBEB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
