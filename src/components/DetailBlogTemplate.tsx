import { useEffect, useState } from "react";
import { Post } from "./InterfacePost";

export default function DetailBlogTemplate() {
  const [datas, setDatas] = useState<Post[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/api/posts");
      const data = await res.json();
      setDatas(data.posts);
    };
    getData();
  }, []);

  console.log(datas);
  return (
    <div>
      DetailBlogTemplate
      <div></div>
    </div>
  );
}
