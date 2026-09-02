/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0066CC',
        'brand-dark': '#004E99',
        'brand-accent': '#82C300',
        'brand-surface': '#F0F9E8',
        'brand-ice': '#F8FAFC',
      },
      fontFamily: {
        'display': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
