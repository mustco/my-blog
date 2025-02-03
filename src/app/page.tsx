"use client";
import { useTheme } from "next-themes";
import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="md:w-4/5 mx-auto p-5 md:p-8 flex flex-col items-center justify-center my-20 md:my-24 md:mt-14 box-border">
        <HomeContent />
      </div>
    </>
  );
}
