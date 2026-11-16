/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0d0e12',
        surface: '#15171e',
        'surface-card': '#1b1e27',
        'surface-elevated': '#232733',
        neon: {
          DEFAULT: '#d2fd39',
          400: '#e0fe63',
          500: '#d2fd39',
          600: '#b6e026',
        },
        accent: {
          green: '#22c55e',
          orange: '#ff6b35',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
