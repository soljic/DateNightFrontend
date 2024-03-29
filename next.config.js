const { i18n } = require("./next-i18next.config");

module.exports = {
  output: "standalone",
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["walk.spiritusapp.com", "app.spiritusapp.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
  // reloadOnPrerender: true,
};
