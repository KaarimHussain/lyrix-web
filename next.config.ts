import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.echelonindustries.net",
      },
    ],
  },
};

export default nextConfig;
