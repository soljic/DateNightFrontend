const { i18n } = require("./next-i18next.config");

module.exports = {
  output: 'standalone',
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
  async rewrites() {
    return [
      {
        source: "/api/spiritus/create",
        destination: `${process.env.NEXT_API_URL}/wapi/spiritus`,
      },
      {
        source: "/api/story/create",
        destination: `${process.env.NEXT_API_URL}/wapi/story`,
      },
      {
        source: "/api/story/edit/:id",
        destination: `${process.env.NEXT_API_URL}/v2/story/:id`,
      },
      {
        source: "/api/story/delete/:id",
        destination: `${process.env.NEXT_API_URL}/stories/self/:id`,
      },
      // proxy pass STORY IMAGE delete to BE
      {
        source: "/api/story/image/delete/:imageId",
        destination: `${process.env.NEXT_API_URL}/v2/story/image/:imageId`,
      },
      // proxy pass STORY IMAGE add to BE
      {
        source: "/api/story/:storyId/image",
        destination: `${process.env.NEXT_API_URL}/v2/story/:storyId/image`,
      },

      // proxy pass SPIRITUS DELETE
      {
        source: "/api/spiritus/delete/:spiritusId",
        destination: `${process.env.NEXT_API_URL}/spiritus/self/{id}`,
      },
      // proxy pass SPIRITUS EDIT
      {
        source: "/api/spiritus/edit",
        destination: `${process.env.NEXT_API_URL}/v2/spiritus`,
      },

      // proxy pass SPIRITUS IMAGE add to BE
      {
        source: "/api/spiritus/:id/image",
        destination: `${process.env.NEXT_API_URL}/v2/spiritus/:id/image`,
      },
      // proxy pass SPIRITUS IMAGE delete to BE
      {
        source: "/api/spiritus/:spiritusId/image/delete/:imageId",
        destination: `${process.env.NEXT_API_URL}/v2/spiritus/:spiritusId/image/:imageId`,
      },
    ];
  },
};
