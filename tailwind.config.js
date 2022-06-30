const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
        "sp-day-200": "#E3D4C5",
        "sp-day-900": "#D67915",

        // lightmode accents
        "sp-gray-100": "#DBD4CE",
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
  ],
};
