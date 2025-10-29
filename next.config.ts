import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kalasquare.com',
        pathname: '/public/frontend/images/**',
      },
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }, {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // ✅ Added Google image host
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
