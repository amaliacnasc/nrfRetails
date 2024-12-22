/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6edf9',
          300: '#054fc7',
          500: '#033079',
        },
      },
    },
  },
  plugins: [],
};