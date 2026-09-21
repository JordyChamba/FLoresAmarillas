/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sunflower: {
          100: '#FFF6D6',
          200: '#FFEDAA',
          300: '#FFE27A',
          400: '#FFD93B',
          500: '#F5B81E',
          600: '#D9960B',
          700: '#A96F06',
        },
        gold: {
          DEFAULT: '#C9A227',
          soft: '#E4C566',
          deep: '#8A6D1B',
        },
        cream: {
          DEFAULT: '#FAF3E3',
          dim: '#EDE0C4',
        },
        moss: {
          900: '#131A0E',
          800: '#1C2615',
          700: '#2A3A1E',
          600: '#3E5527',
        },
        olive: {
          DEFAULT: '#6B7A3A',
          soft: '#9AA65C',
        },
        ember: {
          DEFAULT: '#E8930C',
          soft: '#F5A968',
        },
        espresso: {
          950: '#0D0A06',
          900: '#161009',
          800: '#221709',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
