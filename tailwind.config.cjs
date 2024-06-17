/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.customer-container',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
		preflight: true
	},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
