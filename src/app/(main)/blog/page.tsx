import BlogClient from "@/components/BlogClient";
import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";
import SearchComponent from "@/components/SearchComponent";
import { supabase } from "../../../../utils/supabase/server";

export async function generateMetadata() {
  return {
    title: "MustcoWeb - Blog",
    description: "Blog - Berbagi wawasan dan menginspirasi perubahan.",
  };
}
async function getInitialPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?page=1&perPage=9`,
    {
      next: { revalidate: 86400 }, // <- ISR aktif
    }
  );
  const data = await res.json();
  return data.posts;
}
async function getPopularPost() {
  const supabaseClient = supabase();
  const { data: posts, error } = await supabaseClient
    .from("posts")
    .select("*")
    .eq("popular", true)
    .range(0, 10);
  return posts;
}
export default async function BlogPage() {
  const initialPosts = await getInitialPosts();
  const dataPopular = await getPopularPost();
  return <BlogClient initialPosts={initialPosts} dataPopular={dataPopular} />;
}

//  export default async function Blog({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string }>,
// }) {
//   const posts: Post[] = await getPosts();
//   const search = (await searchParams).search;
//   const filteredPosts = search
//     ? posts.filter((post) =>
//         post.title.toLowerCase().includes(search.toLowerCase())
//       )
//     : posts;

//   return (
//     <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
//       <div className="flex justify-between mb-5 text-md md:text-lg">
//         <h1 className="mb-0 flex items-center font-bold">Recent Blog :</h1>
//         <SearchComponent className="text-md" datas={filteredPosts} />
//       </div>
//       <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl gap-5">
//         {filteredPosts.map((item) => (
//           <Card key={item.id} datas={item} />
//         ))}
//       </div>
//     </div>
//   );
// }
