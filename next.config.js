module.exports = {
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
};
