/** @type {import('tailwindcss').Config} */
// 语义色 token 定义文件：契约 colors 的 Tailwind 侧映射。
// 组件代码只允许使用这里的语义类（bg-surface / text-ink-700 / bg-primary-600 ...），
// 禁止直接使用 Tailwind 原生调色板类（bg-slate-500 等，见 .vismith/contract.json 纪律）。
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        line: '#E2E8F0',
        ink: { 900: '#0F172A', 700: '#334155', 600: '#475569', 500: '#64748B' },
        primary: { 50: '#EEF2FF', 100: '#E0E7FF', 500: '#6366F1', 600: '#4F46E5', 700: '#4338CA' },
        success: { 50: '#F0FDF4', 100: '#DCFCE7', 500: '#22C55E', 600: '#15803D', 700: '#166534' },
        warning: { 50: '#FFFBEB', 100: '#FEF3C7', 500: '#F59E0B', 600: '#B45309', 700: '#92400E' },
        danger: { 50: '#FEF2F2', 100: '#FEE2E2', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif']
      }
    }
  },
  plugins: []
};
