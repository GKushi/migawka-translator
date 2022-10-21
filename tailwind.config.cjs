/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F7FFFE",
        black: "#001412",
        blue: "#0AFFE7",
        light_blue: "#DAFFFB",
        green: "#00665C",
      },
    },
  },
  plugins: [],
};
