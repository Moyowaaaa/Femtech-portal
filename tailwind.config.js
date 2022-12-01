/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e9ebfb",
          200: "#a8aff0",
          300: "#7c87e9",
          400: "#515fe1",
          500: "#3041dc",
          600: "#1e2cae",
          700: "#121c6d",
          800: "#0b1141",
          900: "#040616",
        },
      }
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'even'],
    borderWidth: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [],
})
