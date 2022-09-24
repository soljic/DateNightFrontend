const { i18n } = require("./next-i18next.config");

module.exports = {
  output: 'standalone',
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["walk.spiritusapp.com", "spiritusapp.com"],
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
  async rewrites() {
    return [
      {
        source: "/api/spiritus/create",
        destination: "https://walk.spiritusapp.com/wapi/spiritus",
      },
      {
        source: "/api/story/create",
        destination: "https://walk.spiritusapp.com/wapi/story",
      },
      {
        source: "/api/story/edit/:id",
        destination: "https://walk.spiritusapp.com/v2/story/:id",
      },
      {
        source: "/api/story/delete/:id",
        destination: "https://walk.spiritusapp.com/stories/self/:id",
      },
      // proxy pass STORY IMAGE delete to BE
      {
        source: "/api/story/image/delete/:imageId",
        destination: "https://walk.spiritusapp.com/v2/story/image/:imageId",
      },
      // proxy pass STORY IMAGE add to BE
      {
        source: "/api/story/:storyId/image",
        destination: "https://walk.spiritusapp.com/v2/story/:storyId/image",
      },

      // proxy pass SPIRITUS DELETE
      {
        source: "/api/spiritus/delete/:spiritusId",
        destination: "https://walk.spiritusapp.com/spiritus/self/{id}",
      },
      // proxy pass SPIRITUS EDIT
      {
        source: "/api/spiritus/edit",
        destination: "https://walk.spiritusapp.com/v2/spiritus",
      },

      // proxy pass SPIRITUS IMAGE add to BE
      {
        source: "/api/spiritus/:id/image",
        destination:
          "https://walk.spiritusapp.com/v2/spiritus/:id/image",
      },
      // proxy pass SPIRITUS IMAGE delete to BE
      {
        source: "/api/spiritus/:spiritusId/image/delete/:imageId",
        destination:
          "https://walk.spiritusapp.com/v2/spiritus/:spiritusId/image/:imageId",
      },
    ];
  },
};
