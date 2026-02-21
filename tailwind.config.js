/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#111111',
        muted: '#6B7280',
        border: '#E5E7EB',
        highlight: '#F9FAFB',
        button: '#006342',
        'button-hover': '#004d33',
      },
      height: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '28': '7rem',   // 112px
        '32': '8rem',   // 128px
        '36': '9rem',   // 144px
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
        slideInLeft: 'slideInLeft 0.6s ease-out',
        slideInRight: 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
