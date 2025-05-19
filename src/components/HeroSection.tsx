"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative md:p-8 my-8 p-4 dark:text-white">
      <div className={"image-container md:w-4/5 mx-auto relative"}>
        <Image
          src="/images/0r5nGhWdOEn8OT9JGf896GE3LqFR5ly9I.webp"
          alt="home_logo"
          width={600}
          height={300}
          // fill
          className="image rounded-md border border-gray-500 pointer-events-none"
          priority={true}
          // placeholder="blur"
          // blurDataURL="data:image/jpg;base64"
        />
      </div>
      <div className="w-3/4 md:w-2/3 lg:w-1/2 -bottom-1/4  md:-bottom-10 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-1/4  gap-3 md:gap-5 border flex flex-col text-left p-3 md:p-5 absolute bg-white shadow-lg rounded-xl dark:bg-[#171717] dark:border-gray-500">
        {/* <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs self-start">
          Technology
        </div> */}
        <h1 className="font-bold text-lg md:text-2xl leading-tight lg:leading-tight">
          Berbagi Wawasan, Menginspirasi Perubahan
        </h1>
        <div className="flex justify-between w-full md:w-2/3 items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png"
              alt="logo"
              width={30}
              height={30}
              className="rounded-full"
              priority={true}
              // placeholder="blur"
              // blurDataURL="data:image/png;base64"
              // loading="lazy"
            />
            <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">
              Mustco
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Feb 3, 2025
          </div>
        </div>
      </div>
    </div>
  );
}
