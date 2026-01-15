/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'net-green': '#22c55e',
        'net-orange': '#f97316',
        'net-cyan': '#06b6d4',
        'net-dark': '#0a0f0a',
        'net-darker': '#050805',
        'net-terminal': '#0d1a0d',
      },
    },
  },
  plugins: [],
}
