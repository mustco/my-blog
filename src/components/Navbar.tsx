import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { CiDark, CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoIosMenu, IoMdClose, IoMdMenu } from "react-icons/io";

interface Post {
  className?: string;
}
export default function Navbar({ className }: Post) {
  const { theme, setTheme } = useTheme(); 
  const [showHello, setShowHello] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div
      className={`relative shadow-md dark:shadow-sm dark:shadow-gray-500 ${
        className ? className : ""
      }`}
    >
      <div className="max-w-7xl flex justify-between items-center text-center mx-auto  border-black/5 px-5 ">
        <h1 className="text-xl py-4 md:py-5 px-0">
          Mustco<span className="font-bold">Blog</span>
        </h1>
        <ul className="md:flex space-x-2 hidden text-base h-full my-0">
          <li className="p-0">
            <Link
              className="py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800 border-blue-700 dark:border-green-600"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800"
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800"
              href="/about"
            >
              About
            </Link>
          </li>
        </ul>
        <div className="flex space-x-3">
          <input
            type="search"
            placeholder="Search.."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="bg-gray-100 px-2 py-1 dark:bg-gray-800 rounded-md self-center outline-none
             focus:ring-1 dark:focus:ring-green-500 focus:ring-blue-600 hidden md:block
             appearance-none text-gray-900 dark:text-white"
          />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-2 text-3xl hidden md:block"
          >
            {theme === "dark" ? <CiDark className="text-white" /> : <CiLight />}
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-3 text-3xl "
          >
            {theme === "dark" ? <CiDark className="text-white" /> : <CiLight />}
          </button>
          <button
            onClick={() => setShowHello(!showHello)}
            className="text-3xl py-3 md:hidden"
          >
            {!showHello ? <IoIosMenu /> : <IoMdClose />}
          </button>
        </div>
      </div>

      {showHello && (
        <div className="md:hidden absolute top-auto left-0 right-0 mx-1 my-1 w-auto bg-white border px-5 py-5 border-gray-400 z-10 dark:bg-[#171717] dark:border-gray-500">
          <ul className="flex flex-col text-base my-0 dark:text-white w-full gap-1">
            <li className="p-0">
              <Link
                onClick={() => setShowHello(!showHello)}
                className="block py-3 hover:bg-blue-100 px-3 dark:hover:bg-green-700 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-100 dark:active:text-green-950 border-blue-700 dark:border-green-600"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowHello(!showHello)}
                className="block py-3 hover:bg-blue-100 px-3 dark:hover:bg-green-700 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-100 dark:active:text-green-950"
                href="/blog"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowHello(!showHello)}
                className="block py-3 hover:bg-blue-100 px-3 dark:hover:bg-green-700 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-100 dark:active:text-green-950"
                href="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
