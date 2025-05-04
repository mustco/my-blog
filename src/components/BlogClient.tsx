"use client";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";

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

  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
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
  );
}
