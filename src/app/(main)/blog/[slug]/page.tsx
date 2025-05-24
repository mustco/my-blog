import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import {
  formatedTimestampByDetail,
  getRelativeOrFormattedDate,
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
import RelatedPosts from "@/components/RelatedPosts";
import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";

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
    return notFound();
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

  const renderFormattedContent = (content: string) => {
    // First handle Markdown links [text](url)
    const processedContent = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, text, url) => {
        return `<a href="${url}">${text}</a>`;
      }
    );

    return processedContent
      .split(/(\*\*.*?\*\*|\*.*?\*|!.*?!|_.*?_|<a.*?<\/a>|`.*?`)/g)
      .map((part: string, index: number) => {
        if (part.startsWith("<a") && part.endsWith("</a>")) {
          // Extract href and text from the generated anchor tag
          const hrefMatch = part.match(/href="([^"]+)"/);
          const textMatch = part.match(/>([^<]+)</);

          if (hrefMatch && textMatch) {
            const url = hrefMatch[1];
            const text = textMatch[1];

            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-green-700 underline"
              >
                {text}
              </a>
            );
          }
          return part;
        } else if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.replace(/\*\*/g, "")}</strong>;
        } else if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={index}>{part.replace(/\*/g, "")}</em>;
        } else if (part.startsWith("!") && part.endsWith("!")) {
          // Keep the old link format as fallback
          const link = part.replace(/!/g, "");
          return (
            <a
              key={index}
              href={link.startsWith("http") ? link : `https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-green-700 underline"
            >
              {link}
            </a>
          );
        } else if (part.startsWith("_") && part.endsWith("_")) {
          // Keep the old underscore formatting as a fallback
          return <em key={index}>{part.replace(/_/g, "")}</em>;
        } else if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <span
              key={index}
              className="bg-blue-700 dark:bg-green-700 text-white px-2 rounded"
            >
              {part.replace(/`/g, "")}
            </span>
          );
        } else {
          return part;
        }
      });
  };
  function formatSlugToTitle(slug:any) {
    // Ubah 'build-tersakit-lancelot' menjadi 'Build Tersakit Lancelot'
    return slug
      .split("-")
      .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <>
      <div className="md:max-w-3xl p-4 mx-auto card gap-10 my-5 md:p-8 flex flex-col text-gray-800 dark:text-gray-200">
        <div className="flex justify-between">
          <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
            {post.category}
          </div>
          <div className=" text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
            {getRelativeOrFormattedDate(post.created_at)}
          </div>
        </div>
        {/* <AdvertisementBanner /> */}

        <h1 className="text-3xl font-bold pb-0 tracking-tight">{post.title}</h1>

        <div className="flex flex-col gap-5 border-b-4 border-dashed pb-7 border-gray-300 dark:border-gray-300">
          {post.articles.map((article: any) => (
            <div key={article.id}>
              {article.element === "h1" && (
                <h1 className="text-3xl font-bold dark:text-gray-200 tracking-normal">
                  {renderFormattedContent(article.content)}
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
                  {renderFormattedContent(article.content)}
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
                  {renderFormattedContent(article.content)}
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
                  {renderFormattedContent(article.content)}
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
                  {renderFormattedContent(article.content)}
                </h5>
              )}
              {article.element === "p" && (
                <p className="text-gray-800 dark:text-gray-200 tracking-normal">
                  {renderFormattedContent(article.content)}
                </p>
              )}

              {article.element === "img" && (
                <Image
                  src={article.content}
                  alt={article.alt}
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
                  <li className="dark:text-gray-200">
                    {renderFormattedContent(article.content)}
                  </li>
                </ul>
              )}

              {article.element === "ul" && (
                <ul className="list-disc list-outside ms-5 flex flex-col gap-4">
                  {(() => {
                    try {
                      const items = JSON.parse(article.content);
                      return Array.isArray(items) ? (
                        items.map((item, index) => (
                          <li key={index} className="dark:text-gray-200">
                            {renderFormattedContent(item)}
                          </li>
                        ))
                      ) : (
                        <li className="text-red-500">Invalid list format</li>
                      );
                    } catch (e) {
                      return (
                        <li className="text-red-500">
                          Error parsing list: {article.content}
                        </li>
                      );
                    }
                  })()}
                </ul>
              )}
              {article.element === "ol" && (
                <ol className="list-decimal list-outside ms-5 flex flex-col gap-4">
                  {(() => {
                    try {
                      const items = JSON.parse(article.content);
                      return Array.isArray(items) ? (
                        items.map((item, index) => (
                          <li key={index} className="dark:text-gray-200">
                            {renderFormattedContent(item)}
                          </li>
                        ))
                      ) : (
                        <li className="text-red-500">Invalid list format</li>
                      );
                    } catch (e) {
                      return (
                        <li className="text-red-500">
                          Error parsing list: {article.content}
                        </li>
                      );
                    }
                  })()}
                </ol>
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
                <blockquote className="border-l-4 text-lg border-blue-500 dark:border-green-500 pl-4 pe-1 italic text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-[rgba(43,43,43)] py-1">
                  {renderFormattedContent(article.content)}
                </blockquote>
              )}
              {article.element === "daftar-isi" && (
                <DaftarIsiArticle filterDaftarIsi={filterDaftarIsi} />
              )}
              {article.element === "ads" && <AdBanner />}
              {article.element === "baca-juga" && (
                <div className="baca-juga-container p-4 bg-gray-100 shadow-sm dark:bg-[#2B2B2B] rounded-lg border  border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3 italic">
                    <h4 className="text-lg font-medium  mr-2">
                      Baca Juga :
                    </h4>
                    <div className="h-0.5 rounded-md bg-blue-600 dark:bg-green-700 flex-grow"></div>
                  </div>
                  <ul className="space-y-2">
                    {(() => {
                      try {
                        // First check if content is already an array
                        const items =
                          typeof article.content === "string"
                            ? JSON.parse(article.content)
                            : article.content;

                        return Array.isArray(items) ? (
                          items.map((item, index) => {
                            // Try to find the article in randomThreeArticles by slug
                            const relatedPost = newRandom.find(
                              (post: any) => post.slug === item
                            );
                            const title = relatedPost
                              ? relatedPost.title
                              : item;

                            return (
                              <li
                                key={index}
                                className="flex items-center italic"
                              >
                                <span className="text-blue-600 dark:text-green-600 mr-2">
                                  •
                                </span>
                                <Link
                                  href={`/blog/${item}`}
                                  className="text-blue-600  hover:underline hover:text-blue-800 dark:text-green-600 dark:hover:text-green-400"
                                >
                                  {formatSlugToTitle(title)}
                                </Link>
                              </li>
                            );
                          })
                        ) : (
                          <li className="text-gray-600 dark:text-gray-400">
                            Tidak ada artikel terkait
                          </li>
                        );
                      } catch (e) {
                        console.error("Error parsing baca-juga content:", e);
                        return (
                          <li className="text-gray-600 dark:text-gray-400">
                            Tidak ada artikel terkait
                          </li>
                        );
                      }
                    })()}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center dark:bg-[#212121] px-2 md:px-3 py-5">
          {randomThreeArticles.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 tracking-normal mb-5">
                Artikel Lainnya
              </h2>
              <div className="grid grid-cols-1 gap-4">
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
                        <div className="flex md:flex-col items-center justify-center gap-3 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.category}
                            className="w-[140px] h-[90px] shadow-md bg-transparent bg-white dark:bg-gray-200 md:w-full md:h-28 border border-gray-300 dark:border-gray-700 md:border-none lg:border-none transition-transform duration-300 "
                          />
                          <p className="text-gray-800 dark:text-gray-200 text-[13px] leading-tight">
                            {article.title}
                          </p>
                        </div>
                        <div className="w-full justify-between px-2 font-normal hidden md:flex">
                          <p className="text-gray-800 dark:text-gray-200 text-[13px] leading-tight">
                            By {article.author}
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 text-[13px] leading-tight">
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
            <div className="text-center text-gray-800 dark:text-gray-300 mt-5">
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
