import Image from "next/image";

// Server Component - Images rendered on server
export default function HeroSection() {
  return (
    <div className="relative md:p-8 my-8 p-4 dark:text-white">
      <div className={"image-container md:w-4/5 mx-auto relative"}>
        <Image
          src="/images/0r5nGhWdOEn8OT9JGf896GE3LqFR5ly9I.webp"
          alt="MustcoWeb - Berbagi Wawasan, Menginspirasi Perubahan"
          width={600}
          height={300}
          className="image rounded-md border border-gray-500 pointer-events-none"
          priority={true}
          quality={85}
          blurDataURL="data:image/webp;base64,UklGRpYAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <div className="w-3/4 md:w-2/3 lg:w-1/2 -bottom-1/4 md:-bottom-10 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-1/4 gap-3 md:gap-5 border flex flex-col text-left p-3 md:p-5 absolute bg-white shadow-lg rounded-xl dark:bg-[#171717] dark:border-gray-500">
        <h1 className="font-bold text-lg md:text-2xl leading-tight lg:leading-tight">
          Berbagi Wawasan, Menginspirasi Perubahan
        </h1>

        <div className="flex justify-between w-full md:w-2/3 items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png"
              alt="Mustco logo"
              width={30}
              height={30}
              className="rounded-full"
              quality={90}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              sizes="30px"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">
              Mustco
            </span>
          </div>

          <time
            className="text-gray-600 dark:text-gray-300 text-sm"
            dateTime="2025-02-03"
          >
            Feb 3, 2025
          </time>
        </div>
      </div>
    </div>
  );
}
