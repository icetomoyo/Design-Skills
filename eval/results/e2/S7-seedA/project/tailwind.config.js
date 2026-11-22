/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        ink: { 50: '#F8FAFC', 100: '#E2E8F0', 600: '#475569', 900: '#0F172A' },
        accent: { 500: '#2563EB', 600: '#1D4ED8' }
      },
      spacing: { 4: '4px', 8: '8px', 12: '12px', 16: '16px', 24: '24px' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
}
