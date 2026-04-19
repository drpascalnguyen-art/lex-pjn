/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FEF9EF',
          200: '#FBF1DA',
        },
        blush: {
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          500: '#EC4899',
        },
        sky: {
          100: '#E0F2FE',
          200: '#BAE6FD',
          500: '#0EA5E9',
        },
        sage: {
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#22C55E',
          700: '#15803D',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(34,197,94,0.25)',
        glow: '0 0 40px -10px rgba(249,168,212,0.55)',
      },
      backgroundImage: {
        'warm-grad':
          'linear-gradient(135deg, #FEF9EF 0%, #FCE7F3 45%, #E0F2FE 100%)',
        'leaf-grad': 'linear-gradient(135deg, #BBF7D0 0%, #BAE6FD 100%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
