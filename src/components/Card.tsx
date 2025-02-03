"use client";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
    return (
      <Link
        href={"/page"}
        className="hover:-translate-y-1 transition-all ease-in-out hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-600 rounded-lg"
      >
        <div className="border border-gray-400 p-3 flex flex-col space-y-5 rounded-lg">
          <Image
            src={"/images/technology.jpg"}
            alt="logo"
            width={600}
            height={600}
            className="rounded-md"
            priority
          />

          <h1 className="text-xl font-bold text-gray-800 leading-tight tracking-tight dark:text-gray-300">
            Next.js tutorial for beginners.
          </h1>
          <div className="flex justify-between w-full items-center pe-3">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-700 dark:bg-green-800 text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs self-start">
                Technology
              </div>
            </div>
            <div className="dark:text-gray-300 text-sm">August 20, 2025</div>
          </div>
        </div>
      </Link>
    );

}