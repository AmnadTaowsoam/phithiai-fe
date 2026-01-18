import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'var(--font-charm)', 'serif'],
        sans: ['var(--font-sarabun)', 'var(--font-inter)', 'sans-serif'],
        thai: ['var(--font-charm)', 'cursive'],
      },
      colors: {
        background: '#0d0a09',
        surface: '#18110d',
        brand: {
          50: '#fdf9ee',
          100: '#f9f0d4',
          200: '#f2dfa8',
          300: '#ead07b',
          400: '#e0be4f',
          500: '#d4af37',
          600: '#b89025',
          700: '#8f6a1b',
          800: '#6a4b13',
          900: '#422e0a',
          950: '#221705',
        },
        emerald: {
          100: '#e3f7ed',
          300: '#8dddb3',
          500: '#50c878',
          700: '#30965a',
        },
        lotus: {
          100: '#ffe7ef',
          300: '#ffbfd3',
          500: '#ffb6c1',
          700: '#e37f98',
        },
        temple: '#8b4513',
        ivory: '#f5f1e6',
        ink: {
          50: '#f4f0eb',
          100: '#ded3c2',
          200: '#c3b198',
          300: '#a98f75',
          400: '#896f58',
          500: '#6d5644',
          600: '#523f31',
          700: '#3a2b21',
          800: '#241a13',
          900: '#120d09',
          950: '#0a0604',
        },
        accent: {
          500: '#f6f0dc',
          600: '#f4e4b8',
          700: '#eecf8e',
        },
        shadow: '#311c0a',
      },
      boxShadow: {
        glow: '0 25px 60px -20px rgba(212, 175, 55, 0.35)',
        subtle: '0 18px 35px -18px rgba(12, 8, 5, 0.65)',
        emerald: '0 15px 30px -15px rgba(80, 200, 120, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.18), transparent 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(12,8,5,0.65))',
        'gradient-emerald': 'linear-gradient(135deg, rgba(80,200,120,0.22), transparent)',
        'gradient-lotus': 'linear-gradient(135deg, rgba(255,182,193,0.18), transparent)',
      },
    },
  },
  plugins: [typography],
};

export default config;
