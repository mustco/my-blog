"use client"; // Tambahkan ini di baris pertama

import { useEffect, useState } from "react";

export default function DetailBlogTemplate({
  params,
}: {
  params: { slug: string };
}) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;
  if (error || !post) return <div>Error fetching data</div>;

  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-5 my-5 md:p-8 flex flex-col text-gray-700 dark:text-gray-200">
      <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
        {post.category}
      </div>
      <h1 className="text-2xl font-bold pb-0">{post.title}</h1>

      <div className="mt-6">
        {post.articles.map((article: any) => (
          <div key={article.id} className="mb-1">
            {article.element === "h1" && (
              <h1 className="text-lg font-bold pb-0 dark:text-gray-200 -tracking-tighter mb-2">
                {article.content}
              </h1>
            )}
            {article.element === "h2" && (
              <h2 className="text-xl font-semibold dark:text-gray-200 -tracking-tighter mt-10 mb-3">
                {article.content}
              </h2>
            )}
            {article.element === "p" && (
              <p className="text-gray-800 dark:text-gray-200 -tracking-tighter">
                {article.content}
              </p>
            )}
            {article.element === "img" && (
              <img
                src={article.content}
                alt="Article image"
                className="rounded-lg border shadow-md px-8 py-3 border-gray-100 mb-10 dark:bg-gray-200"
              />
            )}
            {article.element === "li" && (
              <li className="font-bold dark:text-gray-200">
                {article.content}
              </li>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
