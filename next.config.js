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
  async rewrites() {
    return [
      // Get stories for spiritus -- using slug
      {
        source: "/api/stories/spiritus/:query*",
        destination: `${process.env.NEXT_API_URL}/wapi/stories/spiritus/:query*`,
      },
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
        destination: `${process.env.NEXT_API_URL}/spiritus/self/:spiritusId`,
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
      // proxy pass GLOBAL SEARCH -> search spiritus, story, place depending on query
      {
        source: "/api/search/:query*",
        destination: `${process.env.NEXT_API_URL}/wapi/search`,
      },
      // proxy pass SPIRITUS FULL TEXT SEARCH
      {
        source: "/api/spiritus-search/:query*",
        destination: `${process.env.NEXT_API_URL}/wapi/spiritus/search/full`,
      },

      // proxy pass AUTHENTICATION LOGOUT
      {
        source: "/api/authentication/logout",
        destination: `${process.env.NEXT_API_URL}/authentication/logout`,
      },
      // proxy pass USER PROFILE
      {
        source: "/api/authentication/user/profile",
        destination: `${process.env.NEXT_API_URL}/v2/user/account`,
      },
      {
        source: "/api/authentication/user/spiritus",
        destination: `${process.env.NEXT_API_URL}/v2/user/account/spiritus`,
      },

      // SAVE API
      {
        source: "/api/save/story/:id",
        destination: `${process.env.NEXT_API_URL}/wapi/story/save/:id`,
      },
      {
        source: "/api/unsave/story/:id",
        destination: `${process.env.NEXT_API_URL}/wapi/story/unsave/:id`,
      },
      {
        source: "/api/save/spiritus/:id",
        destination: `${process.env.NEXT_API_URL}/wapi/spiritus/:id/save`,
      },
      {
        source: "/api/unsave/spiritus/:id",
        destination: `${process.env.NEXT_API_URL}/wapi/spiritus/:id/unsave`,
      },

      // Places
      {
        source: "/api/spiritus/place/:query*",
        destination: `${process.env.NEXT_API_URL}/wapi/spiritus/place/:query*`,
      },

      // Rose
      {
        source: "/api/spiritus/rose/:id",
        destination: `${process.env.NEXT_API_URL}/wapi/rose/spiritus/:id`,
      },
     
    ];
  },
};
