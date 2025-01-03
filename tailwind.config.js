/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'public': ["Public Sans", "sans-serif"],
      },
      colors: {
        'primary': '#F7F7FF',
      },
    },
  },
  plugins: [],
}

