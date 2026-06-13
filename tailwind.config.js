/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        status: {
          wishlist: '#f3e8ff',
          applied: '#dbeafe',
          followup: '#fef3c7',
          interview: '#d1fae5',
          offer: '#dcfce7',
          rejected: '#fee2e2',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
