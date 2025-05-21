import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-4 bg-gray-50 dark:bg-[#212121]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          404
        </h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-300">
          Halaman Tidak Ditemukan
        </h2>
      </div>

      <Image
        src="/images/notfound.png" // Ganti dengan ilustrasi 404 custom
        width={300}
        height={300}
        alt="Halaman tidak ditemukan"
        className="rounded-lg"
        priority
      />

      <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Lihat Artikel Terbaru
        </Link>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Butuh bantuan?{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            Hubungi kami
          </a>
        </p>
      </div>
    </div>
  );
}
