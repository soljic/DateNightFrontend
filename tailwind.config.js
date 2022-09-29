const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '340px',
      'sm': '576px',
      'md': '719px',
      'lg': '1280px',
      'xl': '1536px',
      '2xl': '2100px',
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      7: "7px",
      8: "8px",
    },
    extend: {
      fontSize: {
        "cta": ['44px', '50px'],
      },
      borderRadius: {
        "sp-10": "10px",
        "sp-14": "14px",
        "sp-40": "40px"
      },
      letterSpacing: {
        "sp-tighten": "-0.01em",
      },
      height: {
        "92": "372px",
      },
      colors: {
        "sp-white": "#F0EFED",
        "sp-black": "#171411",

        // darkmode colors
        "sp-medium": "#302C29",
        "sp-medlight": "#1f1b16",
        "sp-lighter": "#666461",

        // darkmode accents
        "sp-cotta": "#DB6D56",
        "sp-fawn": "#E3AA6D",
        "sp-dark-fawn": "#ED9A4C",
        "sp-brown": "#2B231A",
        "sp-dark-brown": "#2C2117",

        // lightmode colors
        "sp-day-50": "#F0EBE6",
        "sp-day-100": "#DED4CA",
        "sp-day-200": "#DBD4CE", //200
        "sp-day-300": "#E3D4C5", // 300
        "sp-day-900": "#D67915",
        
        // lightmode accents
      },

      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require('tailwindcss-font-inter')
  ],
};
