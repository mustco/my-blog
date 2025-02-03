import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold pb-5">About MustcoBlog</h1>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter">
        MustcoBlog adalah platform yang didedikasikan untuk berbagi wawasan dan
        inspirasi melalui berbagai artikel informatif. Dengan visi{" "}
        <strong>"Berbagi Wawasan, Menginspirasi Perubahan"</strong>, blog ini
        hadir untuk menyajikan informasi yang bermanfaat, relevan, dan mendalam
        bagi para pembaca.
      </p>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 -tracking-tighter">
        Setiap artikel yang diterbitkan di MustcoBlog disusun dengan tujuan
        memberikan pemahaman yang lebih luas serta mendorong perubahan positif
        bagi pembaca.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        Terhubung dengan MustcoBlog
      </h2>
      <p className="text-gray-600 dark:text-gray-300 -tracking-tighter">
        Ikuti dan dapatkan update terbaru di:
      </p>

      <div className="flex gap-4 mt-3 text-4xl">
        <Youtube />
        <Instagram />
        <Github />
      </div>
    </div>
  );
}

export function Twitter() {
  return (
    <a
      href="https://twitter.com/mustcoblog"
      target="_blank"
      className="text-blue-500 hover:underline"
    >
      <FaTwitter />
    </a>
  );
}
export function Instagram() {
  return (
    <a
      href="https://instagram.com/mustcoblog"
      target="_blank"
      className="text-pink-500 hover:underline"
    >
      <FaInstagram />
    </a>
  );
}

export function Facebook() {
  return (
    <a
      href="https://facebook.com/mustcoblog"
      target="_blank"
      className="text-blue-700 hover:underline"
    >
      <FaFacebook />
    </a>
  );
}

export function Youtube() {
  return (
    <a
      href="https://youtube.com/mustcoblog"
      target="_blank"
      className="text-red-500 hover:underline"
    >
      <FaYoutube />
    </a>
  );
}

export function Github() {
  return (
    <a
      href="https://youtube.com/mustcoblog"
      target="_blank"
      className="dark:text-white  hover:underline"
    >
      <FaGithub />
    </a>
  );
}
