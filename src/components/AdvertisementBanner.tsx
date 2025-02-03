"use client";

export default function AdvertisementBanner() {
  return (
    <div className="p-0 md:p-8 flex justify-center mt-36 md:mt-20">
      <div className="w-full md:w-2/3 lg:w-1/2 py-2 bg-gray-200 text-black/60 flex flex-col items-center rounded-xl space-y-1">
        <p className="leading-normal text-gray-500 text-base">Advertisement</p>
        <h1 className="text-xl font-bold text-gray-500 leading-tight">
          You can place ads
        </h1>
        <p className="leading-normal text-gray-500 text-base">750x100</p>
      </div>
    </div>
  );
}
