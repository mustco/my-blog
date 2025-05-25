"use client";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";
import { FaArrowDown } from "react-icons/fa";
import { getRelativeOrFormattedDate } from "../../utils/supabase/formatedTimestamp";
import Image from "next/image";
import Link from "next/link";

const perPage = 6;

export default function BlogClient({
  initialPosts,
  popularPosts,
  popularPosts2,
  dataByCategory,
}: {
  initialPosts: Post[];
  dataPopular: any;
  popularPosts: Post[];
  popularPosts2: Post[];
  dataByCategory: any;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const { posts, page, hasMore, setPosts, appendPosts, setPage, setHasMore } =
    useBlogStore();
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  //   const [hasMore, setHasMore] = useState(initialPosts.length === perPage);
  // Hydrate store only once
  useEffect(() => {
    if (posts.length === 0 && initialPosts.length > 0) {
      setPosts(initialPosts);
      setHasMore(initialPosts.length === perPage);
    }
  }, [posts.length, initialPosts, setPosts, setHasMore]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    const res = await fetch(`/api/posts?page=${nextPage}&perPage=${perPage}`);
    const data = await res.json();
    if (data.posts.length < perPage) setHasMore(false);

    appendPosts(data.posts);
    setPage(nextPage);
    setLoading(false);
  };
  const handleLoadMoreCategory = async () => {
    setLoadingCategory(true);
    setTimeout(() => {
      setVisibleCount(visibleCount + 3);
      setLoadingCategory(false);
    }, 500);
  };

  // Fallback to initialPosts if store belum kebaca
  const displayPosts = posts.length > 0 ? posts : initialPosts;
  // const popularPosts = displayPosts.slice(0, 1);

  const categories = [
    "All",
    "Technology",
    "Tools & Software",
    "Produktivitas Digital",
    "Work-Life Tech",
    "AI & Otomatisasi",
  ];
  const filteredPosts =
    selectedCategory === "All"
      ? dataByCategory
      : dataByCategory.filter(
          (post: any) =>
            post.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 relative ">
        <div className="flex flex-wrap gap-x-6 gap-y-5 mb-12">
          {/* <!-- Card Utama --> */}
          {popularPosts.map((post: any) => (
            <div
              key={post.id}
              className="flex w-full max-w-[1170px] flex-col gap-6 shadow-1 rounded-b-lg lg:rounded-b-none lg:rounded-r-lg lg:flex-row lg:items-center lg:gap-11 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]"
            >
              {/* <!-- Gambar Utama --> */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[536/320] w-full"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  className="object-cover"
                />
              </Link>
              {/* <!-- Konten Utama --> */}
              <div className="w-full lg:max-w-[540px] flex flex-col px-2 pb-3 md:py-5">
                <p className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start text-center">
                  {post.category}
                </p>
                <h1 className="text-2xl font-bold text-dark xl:text-heading-4 mt-2 mb-3">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h1>
                <p className="max-w-[524px] hidden 2xl:block mb-3">
                  Secara sederhana, framework adalah kumpulan komponen, tools,
                  dan struktur kode yang sudah dirancang sebelumnya untuk
                  membantu developer membangun aplikasi lebih cepat dan
                  efisien...
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        alt="icon"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        src="/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png"
                      />
                    </div>
                    <p className="text-sm">Mustco</p>
                  </div>
                  <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {getRelativeOrFormattedDate(post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {popularPosts2.map((post: any) => (
            <div
              key={post.id}
              className="flex w-full flex-col gap-6 rounded-b-lg md:rounded-b-none md:rounded-r-lg shadow-1 sm:flex-row sm:items-center lg:max-w-[570px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]"
            >
              {/* <div className=" aspect-[312/180] sm:aspect-[238/180] w-full overflow-hidden"> */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[536/320] w-full"
                >
                  <Image
                    priority={true}
                    src={post.image}
                    fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                    alt={post.title}
                    className=" dark:bg-gray-100 h-full object-center"
                    // loading="lazy"
                    // unoptimized
                    // quality={50}
                  />
                </Link>
              {/* </div> */}
              <div className="w-full lg:max-w-[272px] flex flex-col px-2 pb-3">
                <p className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start text-center">
                  {post.category}
                </p>
                <h2 className="mb-3 text-xl font-semibold text-dark mt-2">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm">By Mustco</p>
                  <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {getRelativeOrFormattedDate(post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-3 md:my-7">
          <h2 className="mb-3 text-xl font-bold">Recent Blog Post :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                className="hover:-translate-y-1 transition-all ease-in-out hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-600 rounded-lg h-full"
              >
                <Card key={post.id} datas={post} />
              </article>
            ))}
          </div>
          {loading ? (
            <div className="w-full p-0 mx-auto card gap-3 my-2 md:p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ) : (
            ""
          )}
          {hasMore && (
            <div className="text-center mt-5">
              <button
                onClick={handleLoadMore}
                className={`${
                  loading ? "hidden" : ""
                } px-5 bg-white text-gray-800 dark:text-gray-100 dark:bg-[#212121]  border border-gray-300 dark:border-gray-700 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <div className="flex items-center justify-center gap-x-2 font-bold">
                    <FaArrowDown /> Load More{" "}
                  </div>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="border border-gray-200 dark:border-gray-700"></div>
        <div className="my-3 md:my-7">
          <h2 className="mb-3 mt-5 text-xl font-bold">Select by Category :</h2>

          <div className="flex flex-wrap gap-2 justify-center my-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? "bg-[#212121] dark:bg-white dark:text-black text-white"
                    : "bg-white dark:bg-[#212121] text-black dark:text-white border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {visiblePosts.map((post: any) => (
              <article
                key={post.id}
                className="hover:-translate-y-1 transition-all ease-in-out hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-600 rounded-lg h-full"
              >
                <Card key={post.id} datas={post} />
              </article>
            ))}
          </div>
          {loadingCategory ? (
            <div className="w-full p-0 mx-auto card gap-3 my-2 md:p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 h-24 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ) : (
            ""
          )}
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-5">
              <button
                onClick={handleLoadMoreCategory}
                className="px-5 bg-white text-gray-800 dark:text-gray-100 dark:bg-[#212121] border border-gray-300 dark:border-gray-700 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-center gap-x-2 font-bold">
                  <FaArrowDown /> Load More{" "}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
