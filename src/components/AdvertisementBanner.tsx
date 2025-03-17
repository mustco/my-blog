"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdvertisementBanner() {
  const pathname = usePathname();
  const [adKey, setAdKey] = useState(0); // Key untuk merender ulang script

  useEffect(() => {
    // console.log("Pathname changed:", pathname);
    setTimeout(() => {
      setAdKey((prevKey) => prevKey + 1);
    });
    // Ganti key agar script di-reload
  }, [pathname]); // Setiap kali pathname berubah, script akan di-load ulang

  return (
    <>
      {/* Iklan akan direload setiap kali key berubah */}
      <Script
        key={adKey}
        src="//pl26103797.effectiveratecpm.com/d364bfdf4cf646c4a2f590cdf0245fea/invoke.js"
        strategy="afterInteractive"
      />
      <div
        id="container-d364bfdf4cf646c4a2f590cdf0245fea"
        className="my-4"
      ></div>
    </>
  );
}
