/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   "md-custom": { min: "899px" },

    // },
    extend: {
      screens: {
        "md-custom": { min: "899px" },
        // => @media (min-width: 899px) { ... }
        // => Applies when viewport is wider than 899px
      },
    },
  },
  plugins: [],
};
