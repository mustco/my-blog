"use client";
import { useTheme } from "next-themes";
import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace(
      "https://www.profitableratecpm.com/vcvcr7qsk?key=f35b406a64c9034a5bebb3ef500b573d"
    );
  }, []);
  return (
    <>
      <HeroSection />
      <div className="md:w-4/5 mx-auto p-5 md:p-8 flex flex-col items-center justify-center my-20 md:my-24 md:mt-14 box-border">
        <HomeContent />
        {/*  */}
      </div>
    </>
  );
}
