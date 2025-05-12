import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import {
  formatedTimestamp,
  formatedTimestampByDetail,
} from "../../../../../utils/supabase/formatedTimestamp";
import Image from "next/image";
import Link from "next/link";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import dynamic from "next/dynamic";
import PopupAd from "@/components/PopupAd";
import AdBanner from "@/components/AdBanner";
import { Metadata } from "next";
import Card from "@/components/Card";
import DaftarIsi from "@/components/DaftarIsi";
import DaftarIsiArticle from "@/components/DaftarIsi";

// export const revalidate = 86400;
export const revalidate = 7200;
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`).then(
    (res) => res.json()
  );

  return res.posts.map((post: any) => ({ params: { slug: post.slug } }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${(await params).slug}`
  ).then((res) => res.json());
  const { post } = res;

  if (!post || !post.image) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `MustcoWeb - ${post.title}`,
    description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
    authors: [
      {
        name: post.author,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      },
    ],
    openGraph: {
      title: `MustcoWeb - ${post.title}`,
      description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
      type: "article",
      images: [
        {
          url: post.image,
          width: 800,
          height: 400,
          alt: `Og Image ${post.category}`,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `MustcoWeb - ${post.title}`,
      description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
      images: [
        {
          url: post.image,
        },
      ],
    },
  };
}

export default async function DetailBlogTemplate({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${slug}`
  );

  const randomArticles = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?page=1&perPage=50`
  );
  const random = await randomArticles.json();
  const newRandom = random.posts.filter((item: any) => item.slug !== slug);
  const randomThreeArticles = newRandom
    .sort(() => 0.5 - Math.random())
    .slice(0, 9);

  if (!res.ok) {
    return <div className="text-red-500">Error fetching data</div>;
  }
  const { post } = await res.json();
  if (!post) return <div>Loading...</div>;
  const underList = [
    "**node_modules/** → Berisi semua dependensi proyek yang diinstal melalui npm, yarn, atau pnpm.",
    "**public/** → Folder ini digunakan untuk menyimpan aset statis seperti gambar, ikon, dan file lainnya yang bisa diakses secara langsung. contoh: logo.",
    "**src/app/** → Merupakan direktori utama, Menggunakan App Router (app/) yang merupakan fitur terbaru Next.js 13+.",
  ];
  // console.log(post.element)
  // const daftarIsi = post.articles.map((item: any) => console.log(item.element));
  const headings = ["h2", "h3", "h4"];
  const filterDaftarIsi = post.articles.filter((item: any) =>
    headings.includes(item.element)
  );

  return (
    <>
      <div className="md:max-w-3xl p-4 mx-auto card gap-10 my-5 md:p-8 flex flex-col text-gray-700 dark:text-gray-200">
        <div className="flex justify-between">
          <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
            {post.category}
          </div>
          <div className=" text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
            {formatedTimestamp(post.created_at)}
          </div>
        </div>
        {/* <AdvertisementBanner /> */}

        <h1 className="text-3xl font-bold pb-0 tracking-tight">{post.title}</h1>

        <div className="flex flex-col gap-5 border-b-4 border-dashed pb-7 border-gray-300 dark:border-gray-300">
          {post.articles.map((article: any) => (
            <div key={article.id}>
              {article.element === "h1" && (
                <h1 className="text-3xl font-bold dark:text-gray-200 tracking-normal">
                  {article.content}
                </h1>
              )}
              {article.element === "h2" && (
                <h2
                  id={article.content
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .replace(/^\d+\.\s*/, "") // hapus angka + titik di awal, misal "1. "
                    .replace(/[^\w\s-]/g, "") // hapus karakter non-alfabet
                    .trim()
                    .replace(/\s+/g, "-")}
                  className="text-2xl font-bold dark:text-gray-200 tracking-normal scroll-mt-20 md:scroll-mt-24"
                >
                  {article.content}
                </h2>
              )}
              {article.element === "h3" && (
                <h3
                  id={article.content
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .replace(/^\d+\.\s*/, "") // hapus angka + titik di awal, misal "1. "
                    .replace(/[^\w\s-]/g, "") // hapus karakter non-alfabet
                    .trim()
                    .replace(/\s+/g, "-")}
                  className="text-xl font-bold dark:text-gray-200 tracking-normal scroll-mt-20 md:scroll-mt-24"
                >
                  {article.content}
                </h3>
              )}
              {article.element === "h4" && (
                <h4
                  id={article.content
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .replace(/^\d+\.\s*/, "") // hapus angka + titik di awal, misal "1. "
                    .replace(/[^\w\s-]/g, "") // hapus karakter non-alfabet
                    .trim()
                    .replace(/\s+/g, "-")}
                  className="text-lg font-bold dark:text-gray-200 tracking-normal scroll-mt-20 md:scroll-mt-24"
                >
                  {article.content}
                </h4>
              )}
              {article.element === "h5" && (
                <h5
                  id={article.content
                    .toLowerCase()
                    .toLowerCase()
                    .toLowerCase()
                    .replace(/^\d+\.\s*/, "") // hapus angka + titik di awal, misal "1. "
                    .replace(/[^\w\s-]/g, "") // hapus karakter non-alfabet
                    .trim()
                    .replace(/\s+/g, "-")}
                  className="text-md font-bold dark:text-gray-200 tracking-normal scroll-mt-20 md:scroll-mt-24"
                >
                  {article.content}
                </h5>
              )}
              {article.element === "p" && (
                <p className="text-gray-800 dark:text-gray-200 tracking-normal">
                  {article.content
                    .split(/(\*\*.*?\*\*|!.*?!)/g) // Tambahkan regex untuk mendeteksi teks diapit `!`
                    .map((part: string, index: number) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <span
                            key={index}
                            className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
                          >
                            {part.replace(/\*\*/g, "")}
                          </span>
                        );
                      } else if (part.startsWith("!") && part.endsWith("!")) {
                        const link = part.replace(/!/g, ""); // Ambil teks dalam tanda `!`
                        return (
                          <a
                            key={index}
                            href={
                              link.startsWith("http") ? link : `https://${link}`
                            } // Tambahkan "https://" jika belum ada
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {link}
                          </a>
                        );
                      } else {
                        return part;
                      }
                    })}
                </p>
              )}

              {article.element === "img" && (
                <Image
                  src={article.content}
                  alt="Article image"
                  width={600}
                  height={340}
                  className="mb-5 rounded-lg shadow-md bg-transparent border-gray-100 bg-gray-100 dark:bg-gray-700 pointer-events-none"
                  priority
                  // loading="lazy"
                  // quality={50}
                />
              )}

              {article.element === "li" && (
                <ul className="list-disc list-outside ms-5">
                  <li className=" dark:text-gray-200">
                    {article.content
                      .split(/(\*\*.*?\*\*)/g)
                      .map((part: any, index: any) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <span
                            key={index}
                            className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
                          >
                            {part.replace(/\*\*/g, "")}
                          </span>
                        ) : (
                          part
                        )
                      )}
                  </li>
                </ul>
              )}

              {article.element === "ul" && (
                <ul className="list-disc list-outside ms-5 flex flex-col gap-4">
                  {JSON.parse(article.content).map(
                    (item: string, index: number) => (
                      <li key={index} className="dark:text-gray-200">
                        {item
                          .split(/(\*\*.*?\*\*)/g)
                          .map((part: any, index: any) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <span
                                key={index}
                                className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
                              >
                                {part.replace(/\*\*/g, "")}
                              </span>
                            ) : (
                              part
                            )
                          )}
                      </li>
                    )
                  )}
                </ul>
              )}

              {/*             
              <ol className="list-disc list-outside ms-5 dark:text-gray-200">
                <li>eaddddddddd  dddddddddddddd ddddddd ddddddd dddddddd djksfksf skjfksfks fskhfskfhks</li>
                <li>12</li>
              </ol> */}

              {article.element === "code" && (
                <CodeSyntaxHighlight code={article.content} />
              )}
              {article.element === "blockquote" && (
                <blockquote className="border-l-4 text-lg border-blue-500 dark:border-green-500 pl-4 pe-1 italic text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-[rgba(43,43,43)] py-1">
                  {article.content}
                </blockquote>
              )}
              {article.element === "daftar-isi" && (
                <DaftarIsiArticle filterDaftarIsi={filterDaftarIsi} />
              )}
              {article.element === "ads" && <AdBanner />}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center dark:bg-[#212121] px-2 md:px-3 py-5">
          {randomThreeArticles.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 tracking-normal mb-5">
                Artikel Lainnya
              </h2>
              <div className="grid grid-cols-1 gap-4 px-3">
                <div className="grid md:grid-cols-3 gap-3 mt-5">
                  {randomThreeArticles.map((article: any) => (
                    <div
                      className="border-b-[1px] border-dashed md:border md:border-solid md:p-1 md:rounded-b-md cursor-pointer pb-3 border-gray-200 dark:border-gray-700 flex-1 group hover:scale-95 transition-all duration-200"
                      key={article.id}
                    >
                      <Link
                        href={`/blog/${article.slug}`}
                        className="relative overflow-visible w-full h-full flex md:flex-col md:justify-between items-center  gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200"
                      >
                        <p className="absolute z-20 -left-3 top-1 md:top-1 md:-right-3 md:left-auto text-xs font-normal px-[2px] py-[1px] md:py-1 md:px-2 rounded-sm shadow-sm bg-blue-700 dark:bg-green-700 text-white ">
                          {article.category}
                        </p>
                        <div className="flex md:flex-col items-center gap-3 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.category}
                            className="w-[130px] h-[100px] shadow-md bg-transparent bg-white dark:bg-gray-200 md:w-full md:h-28 border border-gray-700 md:border-none lg:border-none transition-transform duration-300 "
                          />
                          <p className="text-gray-700 dark:text-gray-200 text-[13px] leading-tight">
                            {article.title}
                          </p>
                        </div>
                        <div className="w-full justify-between px-2 font-normal hidden md:flex">
                          <p className="text-gray-700 dark:text-gray-200 text-[13px] leading-tight">
                            By {article.author}
                          </p>
                          <p className="text-gray-700 dark:text-gray-200 text-[13px] leading-tight">
                            {formatedTimestampByDetail(article.created_at)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {randomThreeArticles.length === 0 && (
            <div className="text-center text-gray-700 dark:text-gray-300 mt-5">
              Tidak ada artikel terkait
            </div>
          )}
        </div>
        {/* <AdvertisementBanner /> */}
        {/* <AdBanner /> */}
        <PopupAd />
      </div>
    </>
  );
}

// [
//   "**node_modules/** → Berisi semua dependensi proyek yang diinstal melalui npm, yarn, atau pnpm.",
//   "**public/** → Folder ini digunakan untuk menyimpan aset statis seperti gambar, ikon, dan file lainnya yang bisa diakses secara langsung. contoh: logo.",
//   "**src/app/** → Merupakan direktori utama, Menggunakan App Router (app/) yang merupakan fitur terbaru Next.js 13+.",
//   "Di dalam folder **app/**, memiliki beberapa file penting yaitu:"
// ]
// [
//   "**layout.tsx** → Layout utama yang membungkus semua halaman.",
//   "**page.tsx** → Halaman utama dari aplikasi Next.js ini.",
//   "**globals.css** → File CSS global untuk styling seluruh aplikasi.",
//   "**page.module.css** → CSS module khusus untuk page.tsx.",
//   "**.gitignore** → File untuk menentukan file/folder yang tidak di-track Git.",
//   "**next.config.ts** → Konfigurasi Next.js.",
//   "**package.json** → Berisi dependencies dan scripts proyek ini.",
//   "**tsconfig.json** → Konfigurasi TypeScript.",
// ]
// [
//   "**components/** → Supaya lebih rapi, kita buat komponen reusable seperti Navbar.tsx, Footer.tsx, Card.tsx, dll.",
//   "**styles/** → Jika butuh CSS Module atau file khusus styling tiap halaman.",
//   "**lib/** → Berisi helper functions / utilities, Kalau ada fungsi helper seperti fetching data dari API.",
//   "**data/** → Kalau ada data statis seperti daftar kategori atau dummy data.",
// ]
