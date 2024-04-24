/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      padding: {md: "10rem"}, // only apply medium and up, adding extra padding so that container elements are more in the center.
    },
  },
  plugins: [],
}

