/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          50:'#e6edf9',
          300: '#054fc7',
          500: '#033079'
        }
      }
    },
  },
  plugins: [],
}