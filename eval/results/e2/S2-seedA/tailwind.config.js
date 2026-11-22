/**
 * 语义色板与 .vismith/contract.json tokens 一一对应：
 * 颜色只允许出现在本文件（token 定义处）与契约中，业务代码只用语义类名。
 * ink-500 (#64748B) 为白底上最浅的可读文本档（4.76:1），浅灰底上请用 ink-700。
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',   // primary_soft
          100: '#DBEAFE',
          600: '#1D4ED8',  // primary（主行动）
          700: '#1E40AF',  // primary_hover / 链接文本
        },
        ink: {
          900: '#0F172A', // 主文本
          700: '#334155', // 次文本 / 标签
          500: '#64748B', // 弱文本 / placeholder（仅白底）
          300: '#CBD5E1', // hairline_strong
          200: '#E2E8F0', // hairline
          100: '#F1F5F9', // canvas 页面底
          50: '#F8FAFC',  // fill_subtle
        },
        success: {
          50: '#F0FDF4',
          600: '#15803D',
          700: '#166534',
        },
        danger: {
          50: '#FEF2F2',
          600: '#B91C1C',
          700: '#991B1B',
        },
        warning: {
          50: '#FFFBEB',
          600: '#B45309',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.06)',
        overlay: '0 4px 12px rgba(15,23,42,.10)',
      },
    },
  },
  plugins: [],
};
