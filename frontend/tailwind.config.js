/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        hero:"url('./src/assets/aboute.jpg')",
        hero2:"url('./src/assets/learninghero.jpg')",
        hero3:"url('./src/assets/bg.webp')",
        contactBG:"url('./src/assets/contact.jpg')"
      },
      colors:{
        primary: "green-900"

      }

    },
  },
  plugins: [],
}