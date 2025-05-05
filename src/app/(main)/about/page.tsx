
export async function generateMetadata() {
  return {
    title: "MustcoWeb - Tentang Kami",
    description: "Tentang Kami - Berbagi wawasan dan menginspirasi perubahan.",
  };
}

export default function About() {
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold pb-5">Tentang MustcoWeb</h1>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter">
        MustcoWeb adalah platform yang didedikasikan untuk berbagi wawasan dan
        inspirasi melalui berbagai artikel informatif. Dengan visi{" "}
        <strong>"Berbagi Wawasan, Menginspirasi Perubahan"</strong>, blog ini
        hadir untuk menyajikan informasi yang bermanfaat, relevan, dan mendalam
        bagi para pembaca.
      </p>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 -tracking-tighter">
        Setiap artikel yang diterbitkan di MustcoWeb disusun dengan tujuan
        memberikan pemahaman yang lebih luas serta mendorong perubahan positif
        bagi pembaca.
      </p>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 -tracking-tighter">
        Kami percaya bahwa pengetahuan adalah kunci perubahan. Oleh karena itu,
        kami berkomitmen untuk terus menghadirkan konten yang berkualitas dan
        mudah dipahami oleh siapa pun.
      </p>
    </div>
  );
}
