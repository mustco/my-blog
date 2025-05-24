"use client"
export default function HomeContent() {
  return (
    //   <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-300 my-5">
    //     <h1 className="text-2xl font-bold mb-3">Selamat datang di MustcoWeb</h1>
    //     <p className="text-base -tracking-tighter leading-relaxed">
    //       Tempat di mana wawasan dan pengetahuan dibagikan untuk memberikan
    //       inspirasi dan mendorong perubahan positif. Blog ini hadir dengan
    //       tujuan untuk menyajikan informasi, ide, dan pemikiran yang dapat
    //       memperluas pandangan serta memberikan manfaat bagi para pembaca.
    //     </p>
    //     <p className="text-base -tracking-tighter leading-relaxed">
    //       Setiap artikel yang dipublikasikan di sini bertujuan untuk memberikan
    //       pemahaman yang lebih dalam mengenai berbagai topik, serta menawarkan
    //       perspektif yang dapat mendorong refleksi dan tindakan positif. Kami
    //       berharap konten yang disajikan di blog ini dapat menjadi sumber
    //       pengetahuan yang berharga dan relevan untuk berbagai kalangan.
    //     </p>
    //     <p className="text-base -tracking-tighter leading-relaxed">
    //       Terima kasih telah berkunjung..
    //     </p>
    //   </div>

    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold pb-5">Selamat Datang di MustcoWeb</h1>

      <p className="text-gray-800 dark:text-gray-300 -tracking-tighter leading-relaxed">
        MustcoWeb adalah platform berbagi wawasan yang bertujuan untuk
        menghadirkan informasi berkualitas dan menginspirasi perubahan positif.
        Dengan visi <strong>"Berbagi Wawasan, Menginspirasi Perubahan"</strong>,
        blog ini menyajikan berbagai artikel yang membahas beragam topik
        menarik.
      </p>

      <ul className="list-inside text-gray-800 dark:text-gray-300 -tracking-tighter mt-4 list-none">
        <li>📌 Artikel informatif dan edukatif</li>
        <li>📌 Analisis mendalam dari berbagai perspektif</li>
        <li>📌 Ide dan gagasan untuk mengembangkan wawasan</li>
      </ul>

      <p className="text-gray-800 mt-4 dark:text-gray-300 -tracking-tighter">
        Kami percaya bahwa berbagi ilmu adalah langkah kecil namun berarti dalam
        menciptakan perubahan. Selamat menjelajahi MustcoWeb, semoga setiap
        artikel dapat memberikan inspirasi dan wawasan baru bagi Anda.
      </p>

    </div>
  );
}
