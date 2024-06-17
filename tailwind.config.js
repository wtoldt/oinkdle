/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './index.html',
    './src/App.tsx',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'pig-pink': {
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d6',
          DEFAULT: '#f6a2ac',
          300: '#f6a2ac',
          400: '#f17b8b',
          500: '#e74c65',
          600: '#d32b4f',
          700: '#b21e41',
          800: '#951c3c',
          900: '#801b3a',
          950: '#470a1b',
        },
        'pig-purple': {
          50: '#faf5f9',
          100: '#f7ecf4',
          200: '#f0daea',
          300: '#e4bdd9',
          400: '#d294bf',
          DEFAULT: '#c984b2',
          500: '#c984b2',
          600: '#ac568b',
          700: '#934372',
          800: '#7a3a5f',
          900: '#673451',
          950: '#3d1a2e',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
