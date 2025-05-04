"use client";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./InterfacePost";
import { useParams } from "next/navigation";
import { formatedTimestamp } from "../../utils/supabase/formatedTimestamp";
export default function Card({ datas }: { datas: Post }) {
  const params = useParams();
  return (
    <Link
      href={`/blog/${datas.slug}/`}
      className="hover:-translate-y-1 transition-all ease-in-out hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-600 rounded-lg h-full"
    >
      <div className="border border-gray-400 p-3 flex flex-col space-y-5 rounded-lg h-full bg-white dark:bg-[#212121]">
        <div className="h-52 relative w-full flex flex-col justify-center">
          <img
            src={datas.image}
            alt="logo"
            width={600}
            height={600}
            className="rounded-md dark:bg-gray-100 h-full object-center"
            // loading="lazy"
            // unoptimized
            // quality={50}
          />
        </div>
        <div className="flex flex-col space-y-5 flex-grow justify-between">
          <h1 className="text-xl font-bold text-gray-800 leading-tight tracking-tight dark:text-gray-300">
            {datas.title}
          </h1>
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start text-center">
                {datas.category}
              </div>
            </div>
            <div className="dark:text-gray-300 text-sm text-end">
              {formatedTimestamp(datas.created_at)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
