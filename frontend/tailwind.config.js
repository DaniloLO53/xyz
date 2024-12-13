/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      textColor: {
        default: 'var(--color-text-default)',
        strong: 'var(--color-text-strong)',
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins: [],
}
