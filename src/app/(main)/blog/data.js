import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";
import SearchComponent from "@/components/SearchComponent";

// async function getPosts(searchParams:{search?:string}) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
//     next: { revalidate: 86400 },
//     cache:"force-cache"
//   });
//   const data = await res.json();
// if(!searchParams.search) {
//   return data.posts.sort(
//     (a: Post, b: Post) =>
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   );
// }else{
//     return data.posts
//       .filter((post: Post) =>
//         post.title.toLowerCase().includes(searchParams.search!.toLowerCase())
//       )
//       .sort(
//         (a: Post, b: Post) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
// }

// }
//   export default async function Blog({searchParams}:{searchParams:Promise<{search?:string}>}) {
//   const datas: Post[] = await getPosts(await searchParams);
//   return (
//     <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
//       <div className="flex justify-between mb-5 text-md md:text-lg">
//         <h1 className="mb-0 flex items-center font-bold">Recent Blog :</h1>
//         <SearchComponent className="text-md" datas={datas} />
//       </div>
//       <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl gap-5">
//         {datas.map((item) => (
//           <Card key={item.id} datas={item} />
//         ))}
//       </div>
//     </div>
//   );
// }
















// export const revalidate = 86400;
// async function getPosts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
//     next: { revalidate: 86400 },
//     cache: "force-cache",
//   });
//   const data = await res.json();
//   return data.posts.sort(
//     (a: Post, b: Post) =>
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   );
// }

// export default async function Blog({
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
