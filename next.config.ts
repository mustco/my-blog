import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fusowjktlpehckfgwebs.supabase.co",
      },
    ],
    // Ini adalah properti tambahan yang mungkin perlu disesuaikan atau dipertimbangkan:
    // formats: ["image/webp", "image/avif"], // Default Next.js sudah mengoptimalkan ini
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Default sudah cukup lengkap
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Default sudah cukup lengkap
    // minimumCacheTTL: 60, // Default 60 detik. Mungkin terlalu rendah untuk produksi.
  },
  // ... bagian lain dari nextConfig jika ada (misal: webpack)
};

export default nextConfig;
