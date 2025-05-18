import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tetap mempertahankan akses ke Supabase
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fusowjktlpehckfgwebs.supabase.co",
      },
      // Tambahkan domain website Anda sendiri jika diperlukan
      {
        protocol: "https",
        hostname: "mustcoweb.xyz",
      },
    ],
    // Format gambar yang dioptimasi
    formats: ["image/webp"],
    // Ukuran perangkat yang dioptimasi (penting untuk mobile)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Ukuran gambar yang dioptimasi (icon, thumbnail, dll)
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Waktu minimum caching (dalam detik)
    minimumCacheTTL: 60,
  },
  // Mengaktifkan mode ketat React
  reactStrictMode: true,
  // Eksperimental: Optimalkan CSS dan import package
  experimental: {
    // @ts-ignore - mungkin belum ada di tipe NextConfig Anda
    optimizeCss: true,
    // @ts-ignore - mungkin belum ada di tipe NextConfig Anda
    optimizePackageImports: ["next-themes"],
  },
  // Mengoptimalkan webpack untuk mobile
  webpack: (config, { dev, isServer }) => {
    // Hanya pada build produksi
    if (!dev) {
      // Memecah chunks lebih agresif untuk performa mobile
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: "framework",
            test: /[\\/]node_modules[\\/](@next|next|react|react-dom)[\\/]/,
            priority: 40,
            chunks: "all",
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            chunks: "all",
            name(module: any) {
              const match = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              if (!match) return "lib";
              const packageName = match[1];
              return `lib.${packageName.replace("@", "")}`;
            },
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: "shared",
            minChunks: 2,
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
