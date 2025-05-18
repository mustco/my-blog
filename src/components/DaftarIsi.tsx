"use client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function DaftarIsiArticle({ filterDaftarIsi }: { filterDaftarIsi: any }) {
  const [showTOC, setShowTOC] = useState(true);
  function toTitleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="dark:text-gray-300 border bg-gray-100 dark:bg-[#2B2B2B] px-2 py-4 shadow-sm border-gray-200 dark:border-gray-700 rounded-md max-w-[600px]">
      <button
        onClick={() => setShowTOC(!showTOC)}
        className={`text-2xl font-bold text-gray-700 dark:text-gray-200 tracking-normal ${
          showTOC ? "mb-2" : "transition-all duration-500 ease-in-out"
        } flex justify-between items-center w-full`}
      >
        <span className="transition-none ms-1 text-lg">Daftar Isi</span>
        <span
          className={`mr-2 text-4xl transform transition-transform duration-300 ease-in-out ${
            showTOC ? "rotate-0" : "-rotate-90"
          }`}
        >
          <MdKeyboardArrowDown />
        </span>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showTOC ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="list-outside ms-10 list-decimal dark:text-green-600 text-blue-700">
          {filterDaftarIsi.map((item: any, index: number) => {
            const anchorId = item.content
              .toLowerCase()
              .replace(/^\d+\.\s*/, "")
              .replace(/[^\w\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-");

            const title = toTitleCase(
              item.content
                .replace(/^\d+\.\s*/, "")
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, " ")
            );

            return (
              <li key={index} className="my-1">
                <a href={`#${anchorId}`} className="hover:underline">
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default DaftarIsiArticle;
