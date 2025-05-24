export async function generateMetadata() {
  return {
    title: "MustcoWeb - Syarat dan Ketentuan",
    description: "Syarat dan Ketentuan penggunaan situs MustcoWeb.xyz.",
  };
}

export default function TermsOfService() {
  return (
    <>
      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold pb-5">Syarat dan Ketentuan</h1>

        <h2 className="text-xl font-semibold mt-6">1. Penggunaan Situs</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Anda setuju untuk menggunakan situs ini secara bertanggung jawab dan
          tidak melanggar hukum atau hak pihak lain.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Penggunaan Konten</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Anda diperbolehkan membagikan konten dengan mencantumkan sumber
          (tautan balik ke MustcoWeb). Dilarang menggandakan, menjual, atau
          menyalahgunakan konten untuk kepentingan komersial tanpa izin.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Hak Cipta & Sumber</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Konten disusun berdasarkan penulisan internal dan sumber terbuka.
          Gambar berasal dari platform seperti{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Unsplash
          </a>{" "}
          yang memiliki lisensi bebas pakai.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Tautan Pihak Ketiga</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Kami tidak bertanggung jawab atas isi situs pihak ketiga yang
          ditautkan dari halaman kami.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Penafian</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Semua konten disediakan “sebagaimana adanya.” Kami tidak menjamin
          keakuratan atau ketersediaan informasi secara terus-menerus.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Perubahan Ketentuan</h2>
        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mt-2">
          Kami berhak mengubah syarat dan ketentuan kapan saja. Perubahan
          efektif sejak dipublikasikan.
        </p>
      </div>
    </>
  );
}
