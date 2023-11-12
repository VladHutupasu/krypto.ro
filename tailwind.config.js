/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{html,ts}',
  ],
  blocklist: [
    'tooltip'
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"]
  },
}
