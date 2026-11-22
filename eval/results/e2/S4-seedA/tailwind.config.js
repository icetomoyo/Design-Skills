/** Design tokens —— 与 .vismith/contract.json 对齐（vismith contract）
 *  颜色只在此定义语义 token，组件内禁止手写 hex（CHK-02）。
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 中性墨色：文本/边框/底色（contract tokens.colors.neutrals + line）
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
        // 唯一强调色：操作与焦点
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          600: '#16A34A',
          700: '#15803D',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          600: '#DC2626',
          700: '#B91C1C',
        },
        warn: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          600: '#D97706',
          700: '#B45309',
        },
        info: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          600: '#0284C7',
          700: '#0369A1',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.08)',
        overlay: '0 12px 32px rgba(15,23,42,.16)',
      },
    },
  },
  plugins: [],
};
