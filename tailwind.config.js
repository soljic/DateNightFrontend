const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "340px",
      sm: "576px",
      md: "719px",
      lg: "1280px",
      xl: "1536px",
      "2xl": "2100px",
    },
    gradientColorStopPositions: {
      74: "74%",
      50: "50%",
    },
    // backgroundImage: {
    //   hero: "url('/images/img_hero_desktop.jpg')",
    //   "hero-mobile": "url('/images/img_hero_mobile.jpg')",
    // },
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
      dropShadow: {
        "3xl": "0 5px 40px #000000",
      },
      fontSize: {
        cta: ["44px", "50px"],
      },
      borderRadius: {
        "sp-5": "5px",
        "sp-10": "10px",
        "sp-14": "14px",
        "sp-40": "40px",
      },
      padding: {
        7.5: "30px",
      },
      letterSpacing: {
        "sp-tighten": "-0.01em",
      },
      height: {
        86: "360px",
        92: "372px",
        obituary: "600px",
        38: "140px",
      },
      width: {
        30: "120px",
        obituary: "960px",
      },
      maxHeight: {
        86: "360px",
        92: "372px",
        obituary: "600px",
        "story-mobile": "400px",
        "story-desktop": "640px",
      },
      minHeight: {
        "story-mobile": "400px",
        "story-desktop": "640px",
      },
      maxWidth: {
        obituary: "960px",
      },
      colors: {
        "sp-white": "#F0EFED",
        "sp-black": "#171411",
        "sp-gray": "#706E6B",

        // darkmode colors
        "sp-medium": "#302C29",
        "sp-medlight": "#1f1b16",
        "sp-lighter": "#666461",
        "sp-dark-gradient-mid": "#352719",

        // darkmode accents
        "sp-cotta": "#DB6D56",
        "sp-fawn": "#E3AA6D",
        "sp-fawn-subtle": "#EBD4BC",
        "sp-day-fawn": "#D17615",
        "sp-dark-fawn": "#ED9A4C",
        "sp-brown": "#2B231A",
        "sp-dark-brown": "#2C2117",

        // lightmode colors
        "sp-day-50": "#F0EBE6",
        "sp-day-100": "#DED4CA",
        "sp-day-200": "#DBD4CE", //200
        "sp-day-300": "#E3D4C5", // 300
        "sp-day-400": "#948B84",
        "sp-day-900": "#D67915",

        // lightmode gradient
        "day-gradient-start": "#EDE1D5",
        "day-gradient-stop": "#E8DED5",

        "sp-burgundy": "#582203",
      },

      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        fancy: ["Alegreya"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-font-inter"),
    require("@tailwindcss/typography"),
  ],
};
