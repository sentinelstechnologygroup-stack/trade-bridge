const isDev = process.env.NODE_ENV !== "production";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: isDev ? ".next-dev" : ".next",
};

module.exports = nextConfig;
