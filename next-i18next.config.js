module.exports = {
  i18n: {
    locales: ["en", "hr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "hr",
    defaultLocaleDetection: false,
  },
  react: { useSuspense: false }, //this line
};
