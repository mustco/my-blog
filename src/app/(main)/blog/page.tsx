import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";


async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.posts.sort(
    (a: Post, b: Post) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
export default async function Blog() {
  const datas: Post[] = await getPosts();
  // console.log(datas);
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
      <h1 className="text-lg font-bold pb-5">Recent Blog Post :</h1>
      <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  rounded-xl gap-5">
        {datas.map((item) => (
          <Card key={item.id} datas={item} />
        ))}
      </div>
    </div>
  );
}
