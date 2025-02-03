import {
  Facebook,
  Github,
  Instagram,
  Twitter,
  Youtube,
} from "@/components/SocialLinks";

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
        <Twitter />
        <Instagram />
        <Facebook />
        <Youtube />
        <Github />
      </div>
    </div>
  );
}
