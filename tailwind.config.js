/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'MO1': '#65381E',
        'MO2': '#F5EFDF',
        'MO3': '#FBFBFB',
        'MO4': '#2F2F2F',
        'MO5': '#EDEDED',
        'MO6': '#B5B5B5',
        'MO7': '#C9AE96',
      },
      boxShadow: {
        'MO1': '0 5px 20px #00000020',
        'MO2': '0 0 0 1px black',
      }
    },
  },
  plugins: [],
}
