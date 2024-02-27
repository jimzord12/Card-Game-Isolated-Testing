/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   "md-custom": { min: "899px" },

    // },
    extend: {
      screens: {
        superSmall: { raw: "(max-height: 290px)" },
        mobile: {
          raw: "(max-height: 735px)",
        },
        tablet: {
          raw: "(min-height: 736px)",
        },
        largeScreen: {
          raw: "(min-height: 1023px)",
        },
        // => @media (min-width: 899px) { ... }
        // => Applies when viewport is wider than 899px
      },
    },
  },
  plugins: [],
};
