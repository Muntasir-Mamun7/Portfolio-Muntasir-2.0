import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/[...slug]": [
      "./*.html",
      "./*.css",
      "./*.js",
      "./*.json",
      "./*.pdf",
      "./robots.txt",
      "./sitemap.xml",
      "./Images/**/*",
      "./assets/**/*",
    ],
  },
};

export default nextConfig;
