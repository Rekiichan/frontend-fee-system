/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '400px'
      },
      fontFamily: {
        beVietNamPro: ['"Be Vietnam Pro"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
