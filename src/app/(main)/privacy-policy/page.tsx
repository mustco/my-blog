import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export async function generateMetadata() {
  return {
    title: "MustcoWeb - Tentang Kami",
    description: "Tentang Kami - Berbagi wawasan dan menginspirasi perubahan.",
  };
}
export default function About() {
  return (
    <>
      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold pb-5">Kebijakan Privasi</h1>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter">
          Di MustcoWeb, privasi pengunjung adalah prioritas utama kami. Halaman
          ini menjelaskan jenis informasi yang dikumpulkan dan bagaimana kami
          menggunakannya.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Informasi yang Kami Kumpulkan
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami dapat mengumpulkan informasi non-pribadi seperti browser, jenis
          perangkat, sistem operasi, dan halaman yang dikunjungi. Jika Anda
          mengisi formulir kontak, kami juga menyimpan informasi seperti nama
          dan email Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Penggunaan Cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          MustcoWeb menggunakan cookies untuk meningkatkan pengalaman pengguna
          dan menganalisis performa situs. Anda dapat memilih untuk
          menonaktifkan cookies melalui pengaturan browser Anda.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Iklan Pihak Ketiga</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Kami dapat menampilkan iklan dari pihak ketiga seperti Google AdSense,
          yang mungkin menggunakan cookies untuk menayangkan iklan yang relevan
          berdasarkan kunjungan sebelumnya ke situs ini dan situs lainnya.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Tautan Eksternal</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Beberapa artikel di MustcoWeb dapat berisi tautan ke situs eksternal.
          Kami tidak bertanggung jawab atas konten atau kebijakan privasi dari
          situs tersebut.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Persetujuan</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Dengan menggunakan situs kami, Anda menyetujui kebijakan privasi ini.
        </p>
      </div>
    </>
  );
}
