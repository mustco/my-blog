export async function generateMetadata() {
  return {
    title: "MustcoWeb - Disclaimer",
    description:
      "Disclaimer MustcoWeb.xyz mengenai penggunaan situs dan konten.",
  };
}

export default function Disclaimer() {
  return (
    <>
      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold pb-5">Disclaimer</h1>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
          Informasi yang tersedia di situs MustcoWeb disediakan hanya untuk
          tujuan informasi umum. Kami berusaha menyajikan informasi seakurat dan
          seaktual mungkin, namun kami tidak memberikan jaminan apa pun, baik
          tersurat maupun tersirat, terkait kelengkapan, keandalan, dan
          keakuratan konten.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          Setiap tindakan yang Anda ambil berdasarkan informasi di situs ini
          sepenuhnya merupakan risiko Anda sendiri. MustcoWeb tidak bertanggung
          jawab atas kerugian atau kerusakan sehubungan dengan penggunaan situs
          ini.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          Situs kami dapat menyertakan tautan ke situs eksternal yang tidak kami
          kelola. Kami tidak memiliki kendali atas konten dan kebijakan
          situs-situs tersebut, dan kami tidak bertanggung jawab atas kontennya.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          Iklan yang tampil di situs ini, termasuk dari Google AdSense, dapat
          menggunakan cookies atau teknologi pelacakan lainnya untuk menampilkan
          iklan yang relevan. Informasi lebih lanjut dapat ditemukan di{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Kebijakan Privasi Google
          </a>
          .
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          Dengan menggunakan situs ini, Anda memahami dan menyetujui disclaimer
          ini.
        </p>
      </div>
    </>
  );
}
