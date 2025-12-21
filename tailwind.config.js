/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'btn-primary': '#eb5770', // Color de botones
        'header-footer': '#4a7d8a', // Color del header y footer
        'card-bg': '#adcbde', // Fondo de los cards
      },
    },
  },
  plugins: [],
}
