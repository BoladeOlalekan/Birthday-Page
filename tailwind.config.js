/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#F7F7F8',
        'surface-card': '#F2F2F5',
        primary: {
          DEFAULT: '#5B21E6',
          dark: '#3B14B8',
          light: '#7C3AED',
          glow: 'rgba(91, 33, 230, 0.35)',
        },
        periwinkle: {
          DEFAULT: '#6F7CF0',
          light: '#8B97FF',
          dark: '#5865E0',
          soft: '#EBEFFE',
        },
        accent: {
          pink: '#F472B6',
          'pink-deep': '#EC4899',
          yellow: '#FFD84D',
          'yellow-deep': '#FBBF24',
          cyan: '#38BDF8',
        },
        brand: {
          black: '#111111',
          muted: '#6B7280',
          border: '#E5E7EB',
        },
      },
      borderRadius: {
        '3xl': '28px',
        '4xl': '36px',
        '5xl': '44px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Sora"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'panel': '0 20px 60px -15px rgba(91, 33, 230, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
        'panel-lg': '0 30px 80px -20px rgba(91, 33, 230, 0.22), 0 8px 24px -8px rgba(0, 0, 0, 0.06)',
        'pill': '0 10px 30px -5px rgba(91, 33, 230, 0.35)',
        'pill-hover': '0 16px 36px -6px rgba(91, 33, 230, 0.45)',
        'card-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sparkle': 'sparkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'scale(1.15) rotate(180deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

