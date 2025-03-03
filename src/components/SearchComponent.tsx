"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchComponent({
  className,
  datas,
}: // setFilteredData,
any) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 300);

  useEffect(() => {
    if (!query) {
      router.push(`/blog`);
    } else {
      router.push(`/blog?search=${query}`);
    }
    console.log(search);
  }, [query, router]);
  const handleSearch = (e: any) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    // Filter artikel berdasarkan title atau category
    const filteredArticles = datas.filter(
      (article: any) =>
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    // setFilteredData(filteredArticles);
  };

  return (
    <input
      type="search"
      placeholder="search blog .."
      onChange={handleSearch}
      value={search}
      className={`${className} bg-gray-100 px-2 py-[0.1rem] dark:bg-gray-800 rounded-md self-center outline-none
                     focus:ring-[1px] dark:focus:ring-green-500 focus:ring-blue-600 w-1/2 md:w-1/4
                     appearance-none text-gray-900 dark:text-white`}
    />
  );
}
