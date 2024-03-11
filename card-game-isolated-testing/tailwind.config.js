/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Rocher: ["Rocher", "sans-serif"],
    },
    // screens: {
    //   "md-custom": { min: "899px" },

    // },
    extend: {
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
      },
      // !IMPORTANT: In the index.html ->     <meta name="viewport" content="width=1024" />
      // Therefore, the browser makes the width 1024px, and the height is scaled accordingly
      // Example: a iPhone SE (w:667, h:375) will be scaled to (w:1024, h:576)
      screens: {
        superSmall: { raw: "(max-height: 290px)" },
        mobile: {
          raw: "(max-height: 735px)",
        },
        largeMobile: {
          raw: "(min-height: 620px)",
          // raw: "(min-height: 410px)",
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
