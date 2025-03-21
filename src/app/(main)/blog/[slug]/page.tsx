import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import { formatedTimestamp } from "../../../../../utils/supabase/formatedTimestamp";
import Image from "next/image";
import Link from "next/link";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import dynamic from "next/dynamic";
import PopupAd from "@/components/PopupAd";
import AdBanner from "@/components/AdBanner";
import { Metadata } from "next";

export const revalidate = 86400;
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
    title: `Blog · ${post.title}`,
    description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
    authors: [
      {
        name: post.author,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      },
    ],
    openGraph: {
      title: `MustcoWeb | Blog · ${post.title}`,
      description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
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
      title: `MustcoWeb | Blog · ${post.title}`,
      description: `Artikel kategori ${post.category}: ${post.title}. Baca selengkapnya di MustcoWeb.`,
      images: post.image,
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
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-10 my-5 md:p-8 flex flex-col text-gray-700 dark:text-gray-200">
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

      <div className="flex flex-col gap-5">
        {post.articles.map((article: any) => (
          <div key={article.id} className="ea">
            {article.element === "h1" && (
              <h1 className="text-3xl font-bold dark:text-gray-200 tracking-normal">
                {article.content}
              </h1>
            )}
            {article.element === "h2" && (
              <h2 className="text-2xl font-bold dark:text-gray-200 tracking-normal">
                {article.content}
              </h2>
            )}
            {article.element === "h3" && (
              <h3 className="text-xl font-bold dark:text-gray-200 tracking-normal">
                {article.content}
              </h3>
            )}
            {article.element === "h4" && (
              <h4 className="text-lg font-bold dark:text-gray-200 tracking-normal">
                {article.content}
              </h4>
            )}
            {article.element === "h5" && (
              <h5 className="text-md font-bold dark:text-gray-200 tracking-normal">
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
              <img
                src={article.content}
                alt="Article image"
                width={600}
                height={600}
                className="mb-5 rounded-lg shadow-md bg-transparent border-gray-100 dark:bg-gray-200 pointer-events-none"
                // priority
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
            {article.element === "ads" && <AdBanner />}
          </div>
        ))}
      </div>
      {/* <AdvertisementBanner /> */}
      <PopupAd />
      {/* <AdBanner /> */}
    </div>
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
