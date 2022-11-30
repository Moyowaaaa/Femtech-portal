/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'even'],
    borderWidth: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [],
}
