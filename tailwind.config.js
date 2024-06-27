/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/App.tsx',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['dark'],
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: [
          'Quicksand',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
