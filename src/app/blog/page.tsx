"use client"; 

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Post } from "@/components/InterfacePost";

export default function Blog() {
  const [datas, setDatas] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setDatas(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
      <h1 className="text-lg font-bold pb-5">Recent Blog Post :</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl gap-5">
          {datas.map((item) => (
            <Card key={item.id} datas={item} />
          ))}
        </div>
      )}
    </div>
  );
}
