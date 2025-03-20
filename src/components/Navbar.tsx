import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { CiDark, CiLight } from "react-icons/ci";
import { IoIosMenu, IoMdClose, IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import { CgClose, CgMenuRight } from "react-icons/cg";

interface Post {
  className?: string;
  show?: boolean;
}
export default function Navbar({ className, show }: Post) {
  const { theme, setTheme } = useTheme();
  const [showHello, setShowHello] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  // console.log(pathname);
  const handleSearch = () => {};
  console.log(showHello);
  console.log(show);
  console.log(pathname);
  return (
    <div
      className={` fixed w-full shadow-md dark:shadow-sm dark:shadow-gray-500 bg-white dark:bg-[#212121] z-50 ${
        className ? className : ""
      } ${show ? "translate-y-0 transition-all ease-in-out duration-500" : "-translate-y-16 md:-translate-y-20 transition-all ease-in-out duration-1000"}`}
    >
      <div className="max-w-7xl flex justify-between items-center text-center mx-auto  border-black/5 px-5 ">
        <h1 className="text-xl py-4 md:py-5 px-0 font-mono select-none">
          &lt;Mustco<span className="font-bold">Web</span> /&gt;
        </h1>
        <ul className="md:flex space-x-2 hidden text-base h-full my-0">
          <li className="p-0">
            <Link
              className={`py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800 border-blue-700 dark:border-green-600 ${pathname === "/" ? "text-blue-500 dark:text-green-500  border-b-2 border-blue-500 dark:border-green-500" : ""}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800 ${pathname.includes("blog") ? "text-blue-500 dark:text-green-500  border-b-2 border-blue-500 dark:border-green-500" : ""}`}
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={`py-6 px-5 hover:text-blue-500 active:text-blue-800 dark:hover:text-green-500 dark:active:text-green-800 ${pathname === "/about" ? "text-blue-500 dark:text-green-500 border-b-2 border-blue-500 dark:border-green-500" : ""}`}
              href="/about"
            >
              About
            </Link>
          </li>
        </ul>
        <div className="flex space-x-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-2 text-3xl hidden md:block"
          >
            {theme === "dark" ? <CiDark className="text-white" /> : <CiLight />}
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative px-3 py-3 text-3xl w-10 h-10 flex items-center justify-center overflow-hidden "
          >
            <CiDark
              className={`absolute transition-all duration-500 ease-in-out ${
                theme === "dark"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0  -translate-y-full"
              }`}
            />
            <CiLight
              className={`absolute transition-all duration-500 ease-in-out ${
                theme === "dark"
                  ? "opacity-0  -translate-y-full"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            />
          </button>

          <button
            onClick={() => setShowHello(!showHello)}
            className="relative text-3xl py-3 md:hidden w-10 h-10 flex items-center justify-center"
          >
            <CgMenuRight
              className={`absolute transition-all duration-300 ${
                showHello
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <CgClose
              className={`absolute transition-all duration-300 ${
                showHello
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </button>
        </div>
      </div>
      {show && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 mx-1 my-1 w-auto bg-white border px-5 py-5 border-gray-300 rounded-lg z-10 font-bold dark:bg-[#212121] dark:border-gray-600 transition-all duration-300 ease-in-out transform overflow-hidden ${
            showHello
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto max-h-[300px]"
              : "opacity-0 scale-95 -translate-y-0 pointer-events-none max-h-0"
          }`}
        >
          <ul className="flex flex-col text-base my-0 dark:text-white w-full gap-1">
            <li className="p-0">
              <Link
                onClick={() => setShowHello(false)}
                className={`block py-3 hover:bg-blue-700 px-3  dark:hover:bg-green-700 hover:text-white active:text-white dark:hover:text-green-100 dark:active:text-white ${pathname === "/" ? "bg-blue-600 text-white dark:bg-green-600" : ""}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowHello(false)}
                className={`block py-3 hover:bg-blue-700 px-3  dark:hover:bg-green-700 hover:text-white active:text-white dark:hover:text-green-100 dark:active:text-white ${pathname.includes("blog") ? "bg-blue-600 text-white dark:bg-green-600" : ""}`}
                href="/blog"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowHello(false)}
                className={`block py-3 hover:bg-blue-700 px-3  dark:hover:bg-green-700 hover:text-white active:text-white dark:hover:text-green-100 dark:active:text-white ${pathname === "/about" ? "bg-blue-600 text-white dark:bg-green-600" : ""}`}
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
