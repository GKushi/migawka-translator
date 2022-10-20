/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F7FFFE",
        black: "#001412",
        blue: "#0AFFE7",
        green: "#00665C",
      },
      backgroundImage: {
        "hero-img": "url('pexels-buro-millennial-1438084 1.png')",
      },
    },
  },
  plugins: [],
};
