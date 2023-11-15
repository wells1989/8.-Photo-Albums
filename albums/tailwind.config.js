/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
        // moving an element 100% over to the right hand side
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      }
      // doing the shimmer move over 1.5 seconds infinite times
    },
  },
  plugins: [],
}