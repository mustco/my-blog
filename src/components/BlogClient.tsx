"use client";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { formatedTimestamp } from "../../utils/supabase/formatedTimestamp";

const perPage = 9;

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
  const { posts, page, hasMore, setPosts, appendPosts, setPage, setHasMore } =
    useBlogStore();
  const [loading, setLoading] = useState(false);
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

  // Fallback to initialPosts if store belum kebaca
  const displayPosts = posts.length > 0 ? posts : initialPosts;
  // const popularPosts = displayPosts.slice(0, 1);
  const popularIds = [18];
  const popularIdsTwo = [3, 19];

  const popularPosts = displayPosts.filter((post) =>
    popularIds.includes(post.id)
  );
  const popularPosts2 = displayPosts.filter((post) =>
    popularIdsTwo.includes(post.id)
  );
  return (
    <>

      <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 relative ">
        <div className="flex flex-wrap gap-x-6 gap-y-5 mb-12">
          {/* <!-- Card Utama --> */}
          {popularPosts.map((post) => (
            <div
              key={post.id}
              className="flex w-full max-w-[1170px] flex-col gap-6 rounded-xl p-3 shadow-1 lg:flex-row lg:items-center lg:gap-11 lg:p-3 border border-gray-400 bg-white dark:bg-[#212121]"
            >
              {/* <!-- Gambar Utama --> */}
              <div className="relative aspect-[536/320] w-full">
                <div className="absolute right-0 z-10 m-5 flex rounded-md bg-orange px-2.5 py-2 text-base uppercase text-white">
                  <img
                    alt="icon"
                    loading="lazy"
                    width="15"
                    height="15"
                    decoding="async"
                    className="mr-1.5"
                    src={post.image}
                  />
                  <span>pro</span>
                </div>
                <a href={`/blog/${post.slug}`}>
                  <img
                    alt="Wellness Unveiled: Empowering Your Journey to a Balanced and Vibrant Life"
                    loading="eager"
                    decoding="async"
                    className="w-full rounded-lg object-cover"
                    sizes="100vw"
                    src={post.image}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      inset: "0",
                      color: "transparent",
                    }}
                  />
                </a>
              </div>
              {/* <!-- Konten Utama --> */}
              <div className="w-full lg:max-w-[540px]">
                <a
                  href={`/category/${post.category}`}
                  className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start text-center"
                >
                  {post.category}
                </a>
                <h1 className="mb-4 text-2xl font-bold text-dark xl:text-heading-4 mt-2">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h1>
                <p className="max-w-[524px]">
                  Framework adalah kerangka kerja atau sekumpulan kode yang
                  sudah dibuat sebelumnya untuk mempermudah pengembangan
                  perangkat lunak. Framework menyediakan struktur dasar dan
                  berbagai fitur...
                </p>
                <div className="mt-5 flex items-center gap-2.5">
                  <a href="/author/mustco" className="flex items-center gap-3">
                    <div className="flex h-6 w-6 overflow-hidden rounded-full">
                      <img
                        alt="user"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        src={post.image}
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <p className="text-sm">Mustco</p>
                  </a>
                  <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {formatedTimestamp(post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {popularPosts2.map((post) => (
            <div
              key={post.id}
              className="flex w-full flex-col gap-6 rounded-xl p-3 shadow-1 sm:flex-row sm:items-center lg:max-w-[570px] border border-gray-400 bg-white dark:bg-[#212121]"
            >
              <div className="relative aspect-[238/180] w-full overflow-hidden">
                <a href={`/blog/${post.slug}`}>
                  <img
                    src={post.image}
                    alt="logo"
                    width={600}
                    height={600}
                    className="rounded-md dark:bg-gray-100 h-full object-center"
                    // loading="lazy"
                    // unoptimized
                    // quality={50}
                  />
                </a>
              </div>
              <div className="w-full lg:max-w-[272px]">
                <a
                  href="/category/health"
                  className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start text-center"
                >
                  health
                </a>
                <h2 className="mb-3 text-xl font-semibold text-dark mt-2">
                  <a href={`/posts/${post.slug}`}>{post.title}</a>
                </h2>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm">
                    <a href="/author/mustco">By Mustco</a>
                  </p>
                  <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {formatedTimestamp(post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-xl font-bold">Recent Blog Post :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayPosts.map((post) => (
            <Card key={post.id} datas={post} />
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
              } px-5 bg-white text-gray-800 dark:text-gray-100 dark:bg-[#212121]  border border-gray-400 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
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
    </>
  );
}
