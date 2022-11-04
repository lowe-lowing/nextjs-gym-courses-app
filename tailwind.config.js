/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5C5C",
        secondary: "#d3d3d3",
        success: "#00b95c",
        bColor: "#616161",
        profileInfo: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
