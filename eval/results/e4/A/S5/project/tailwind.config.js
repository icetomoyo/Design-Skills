/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        ink: { 50: '#F8FAFC', 100: '#F1F5F9', 600: '#475569', 900: '#0F172A' },
        accent: { 500: '#2563EB', 600: '#1D4ED8' },
        highlight: { 700: '#C2410C' },
        link: { 600: '#7C3AED' }
      },
      spacing: { 4: '4px', 8: '8px', 12: '12px', 16: '16px', 24: '24px', 32: '32px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
}
