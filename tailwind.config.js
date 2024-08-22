/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'  ],
  theme: {
    extend: {
      colors:{
        primaryColor: "rgb(224,36,36)",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

