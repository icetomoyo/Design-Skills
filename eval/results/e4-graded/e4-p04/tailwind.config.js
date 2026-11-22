/** @type {import('tailwindcss').Config} */
// tokens 与 .vismith/contract.json 保持一一对应（ink=neutrals 文本档，canvas=表面，primary/success/danger/warning=语义色）
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0F172A',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        canvas: {
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        primary: {
          700: '#1D4ED8',
          600: '#2563EB',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        success: {
          700: '#047857',
          600: '#059669',
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        danger: {
          700: '#B91C1C',
          600: '#DC2626',
          100: '#FEE2E2',
          50: '#FEF2F2',
        },
        warning: {
          700: '#B45309',
          600: '#D97706',
          100: '#FEF3C7',
          50: '#FFFBEB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
