import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function About() {
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold pb-5">About MustcoWeb</h1>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter">
        MustcoWeb adalah platform yang didedikasikan untuk berbagi wawasan dan
        inspirasi melalui berbagai artikel informatif. Dengan visi{" "}
        <strong>"Berbagi Wawasan, Menginspirasi Perubahan"</strong>, blog ini
        hadir untuk menyajikan informasi yang bermanfaat, relevan, dan mendalam
        bagi para pembaca..
      </p>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 -tracking-tighter">
        Setiap artikel yang diterbitkan di MustcoWeb disusun dengan tujuan
        memberikan pemahaman yang lebih luas serta mendorong perubahan positif
        bagi pembaca.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        Terhubung dengan MustcoWeb
      </h2>
      <p className="text-gray-600 dark:text-gray-300 -tracking-tighter">
        Ikuti dan dapatkan update terbaru di:
      </p>

      <div className="flex gap-4 mt-3 text-4xl">
        <a
          href="https://twitter.com/MustcoWeb"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/mustofaadnan_03"
          target="_blank"
          className="text-pink-500 hover:underline"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/MustcoWeb"
          target="_blank"
          className="text-blue-700 hover:underline"
        >
          <FaFacebook />
        </a>
        <a
          href="https://youtube.com/MustcoWeb"
          target="_blank"
          className="text-red-500 hover:underline"
        >
          <FaYoutube />
        </a>
        <a
          href="https://youtube.com/MustcoWeb"
          target="_blank"
          className="dark:text-white hover:underline"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}
