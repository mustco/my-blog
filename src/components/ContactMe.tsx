"use client"

import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail, MdWhatsapp } from "react-icons/md";

export default function ContactMe(){
    return (
      <div className="md:flex gap-x-10">
        <div className="flex-1 flex flex-col ">
          <h1 className="text-2xl md:text-3xl font-bold pb-3">Hubungi Kami</h1>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed -tracking-tighter mb-6">
            Punya pertanyaan, kritik, atau kerja sama? Silakan isi form di bawah
            atau kontak langsung lewat sosial media kami.
          </p>

          {/* === FORM KONTAK === */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Kirim ke API/email/supabase di sini
              alert("Pesan dikirim!");
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">Nama</label>
              <input
                type="text"
                required
                className="w-full border border-gray-400 px-3 py-2 rounded-md dark:bg-[#212021] dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full border border-gray-400 px-3 py-2 rounded-md dark:bg-[#212021] dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Pesan</label>
              <textarea
                required
                rows={4}
                className="w-full border border-gray-400 px-3 py-2 rounded-md dark:bg-[#212021] dark:text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-5 py-2 rounded-md text-md self-start text-center hover:bg-blue-800 dark:hover:bg-green-900 active:bg-blue-900 dark:active:bg-green-700"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
        {/* === KONTAK ALTERNATIF === */}
        <div className="flex-1 md:flex flex-col items-center mt-10 md:mt-0">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold">Kontak Alternatif</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2 flex items-center gap-x-2">
              <MdEmail />
              Email:{" "}
              <a
                href="mailto:mustcoweb@gmail.com"
                className="text-blue-500 underline"
              >
                mustcoweb@gmail.com
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-1 flex items-center gap-x-2">
              <MdWhatsapp />
              WhatsApp:{" "}
              <a
                href="https://wa.me/628xxxxxxxxxx"
                className="text-green-500 underline"
                target="_blank"
              >
                Klik untuk chat
              </a>
            </p>

            {/* === SOCIAL MEDIA === */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Sosial Media</h2>
              <div className="flex gap-4 mt-3 text-4xl">
                <a
                  href="https://twitter.com/MustcoWeb"
                  target="_blank"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com/MustcoWeb"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://facebook.com/MustcoWeb"
                  target="_blank"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://github.com/MustcoWeb"
                  target="_blank"
                >
                  <FaGithub />
                </a>
              </div>
            </div>

            {/* === DISCLAIMER === */}
            <div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
                Kami akan membalas secepatnya. Mohon bersabar ya!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}