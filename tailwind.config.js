/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1e3a8a', light: '#2b4fb3', dark: '#172c6b' },
        accent: { DEFAULT: '#10b981', dark: '#059669' },
        surface: '#f8fafc',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        popIn: {
          from: { opacity: 0, transform: 'scale(0.95) translateY(8px)' },
          to: { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 150ms ease-out',
        popIn: 'popIn 200ms ease-out',
      },
    },
  },
  plugins: [],
};
