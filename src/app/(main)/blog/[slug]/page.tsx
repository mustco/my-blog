import CodeSyntaxHighlight from "@/components/CodeSyntaxHighlight";
import { formatedTimestamp } from "../../../../../utils/supabase/formatedTimestamp";
import Image from "next/image";

export const revalidate = 86400;
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`).then(
    (res) => res.json()
  );

  return res.posts.map((post: any) => ({ params: { slug: post.slug } }));
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
                {article.content}
              </p>
            )}
            {article.element === "img" && (
              <img
                src={article.content}
                alt="Article image"
                width={600}
                height={600}
                className="mb-5 rounded-lg border shadow-md bg-transparent border-gray-100 dark:bg-gray-200"
              />
            )}

            {article.element === "li" && (
              <li className="list-inside font-bold dark:text-gray-200">
                {article.content}
              </li>
            )}
            {article.element === "code" && (
              <CodeSyntaxHighlight code={article.content} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
