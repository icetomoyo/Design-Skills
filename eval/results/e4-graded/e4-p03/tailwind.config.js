/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 月白冷纸地面（内容区）
        ground: '#F5F7F6',
        paper: '#FFFFFF',
        ink: {
          DEFAULT: '#1B2A2E', // 正文墨色 13.7:1 on ground
          muted: '#55666B',  // 次级 5.6:1 on ground
        },
        // 绀青侧轨（committed shell）
        rail: {
          DEFAULT: '#153841',
          hover: '#1D4650',
          text: '#E8F0F0',
          muted: '#9FB9BE', // 5.8:1 on rail
          line: '#2A545E',
        },
        // 物候色卡：立冬青黛 → 小雪冰蓝（数据系列与强调）
        term: {
          lidong: '#3F6672',
          xiaoxue: '#2E7E9E', // 4.6:1 on paper，可作文字与柱色
          ice: '#5FAFC7',      // 轨上强调（4.8:1 on rail）
          iceText: '#23647D',  // 文字级冰蓝（6.1:1 on ground / 5.7:1 on 浅蓝底）
        },
        // 状态色（仅在携带语义处出现）
        state: {
          danger: '#B3362B',
          dangerBg: '#FBEAE8',
          warn: '#9A5B00',
          warnBg: '#FBF3E4',
          ok: '#2E6B45',
          okBg: '#EAF3ED',
        },
        line: {
          DEFAULT: '#DCE3E2', // 分隔线（非文字元素）
          strong: '#B9C6C4',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'PingFang SC',
          'Microsoft YaHei',
          'Noto Sans SC',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27, 42, 46, 0.06), 0 4px 12px rgba(27, 42, 46, 0.05)',
      },
    },
  },
  plugins: [],
}
