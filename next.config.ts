import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fusowjktlpehckfgwebs.supabase.co",
      },
    ],
  },
  formats: ["image/webp"],
  deviceSizes: [320, 420, 640, 768, 1024, 1200, 1920],
  imageSizes: [16, 32, 64, 128, 256],
  minimumCacheTTL: 60,
};

export default nextConfig;
