/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#030712',
        spaceCard: '#090d16',
        cosmicBorder: 'rgba(99, 102, 241, 0.15)',
        neonCyan: '#06b6d4',
        neonPurple: '#a855f7',
        neonIndigo: '#6366f1'
      },
      boxShadow: {
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.3)'
      }
    },
  },
  plugins: [],
}