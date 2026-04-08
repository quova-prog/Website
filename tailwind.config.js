/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orbit: {
          navy:       '#0A0F1E',
          teal:       '#00C2A8',
          'teal-dark':'#00897B',
          'teal-light':'#E0F2F1',
          'gray-dark':'#212121',
          'gray-mid': '#424242',
          gray:       '#616161',
          'gray-light':'#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.8s ease-out forwards',
        'count-up':  'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
