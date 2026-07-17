import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffaf4',
        peach: '#ffd8ba',
        coral: '#ff8f70',
        cocoa: '#5c4033',
        mint: '#c6f3d8',
        sky: '#d8efff',
        dusk: '#1f2937',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(92, 64, 51, 0.12)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', '"PingFang SC"', '"Hiragino Sans GB"', 'sans-serif'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      animation: {
        rise: 'rise 0.45s ease-out',
        pop: 'pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
