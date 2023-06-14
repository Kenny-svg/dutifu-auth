module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#603F8B",
        'secondary': '#686868',
        'dutify': "#B6B6E5"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}