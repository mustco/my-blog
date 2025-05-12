import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export async function generateMetadata() {
  return {
    title: "MustcoWeb - Kebijakan Privasi",
    description: "kebijakan Privasi penggunaan situs MustcoWeb.xyz.",
  };
}
export default function About() {
  return (
    <>
      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold pb-5">Kebijakan Privasi</h1>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter">
          Di MustcoWeb, privasi pengunjung sangat penting bagi kami. Dokumen ini
          menjelaskan bagaimana informasi Anda dikumpulkan, digunakan, dan
          dilindungi.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Informasi yang Dikumpulkan
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami mengumpulkan informasi non-pribadi seperti jenis browser, sistem
          operasi, alamat IP, halaman yang dikunjungi, dan waktu kunjungan. Jika
          Anda mengisi formulir, kami dapat menyimpan nama dan email Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Penggunaan Cookie</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami menggunakan cookie untuk meningkatkan pengalaman pengguna dan
          menganalisis lalu lintas situs. Google, sebagai pihak ketiga,
          menggunakan cookie DART untuk menayangkan iklan berdasarkan riwayat
          kunjungan Anda. Anda dapat menonaktifkan cookie melalui pengaturan
          browser atau melalui{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6">
          3. Penggunaan Data oleh Pihak Ketiga
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami bekerja sama dengan penyedia iklan pihak ketiga seperti Google
          AdSense, yang dapat menggunakan teknologi pelacakan (seperti cookies)
          untuk menampilkan iklan yang relevan. Lihat{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Kebijakan Privasi Google
          </a>{" "}
          untuk informasi lebih lanjut.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          4. Tautan ke Situs Eksternal
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          MustcoWeb dapat berisi tautan ke situs eksternal. Kami tidak
          bertanggung jawab atas isi atau kebijakan privasi situs tersebut.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Persetujuan</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Dengan menggunakan situs ini, Anda menyetujui kebijakan privasi kami.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Perubahan Kebijakan</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami berhak memperbarui kebijakan ini kapan saja. Perubahan akan
          ditampilkan di halaman ini.
        </p>
      </div>
    </>
  );
}
