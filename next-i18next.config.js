const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "hr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale:  "hr",
    localeDetection: false,
    // defaultLocale: "en",
    // localeDetection: true,
    // localePath: path.resolve('./public/locales')
  },
  // react: { useSuspense: false }, //this line
};
