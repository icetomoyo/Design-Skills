/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        ink: { 50: '#F8FAFC', 100: '#F1F5F9', 600: '#475569', 900: '#0F172A' },
        accent: { 500: '#2563EB', 600: '#1D4ED8' },
        // S5 精修新增语义 token（色值入档，组件内禁止裸 hex）：
        warm: { 600: '#C2410C' }, // 指标强调：原行内 #FF6B35，加深至 AA 对比度，橙色特征保留
        link: '#7C3AED' // 列表行链接：原行内 #7C3AED，色相不变仅入库
      },
      spacing: { 4: '4px', 8: '8px', 12: '12px', 16: '16px', 24: '24px', 32: '32px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
}
