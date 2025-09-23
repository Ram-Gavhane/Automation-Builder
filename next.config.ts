import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol:'https',
        hostname:'24b3j2r0ce.ucarecd.net'
      }
    ],
  },
};

export default nextConfig;
