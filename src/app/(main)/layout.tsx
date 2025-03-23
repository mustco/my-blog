"use client";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nunito_Sans } from "next/font/google";
// import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import PopupAd from "@/components/PopupAd";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > scroll) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  return (
    <div className={`${nunitoSans.className} flex flex-col min-h-screen`}>
      <Navbar show={showNavbar} />
      <Container className="flex-grow mt-16">{children}</Container>
      {/* <AdvertisementBanner /> */}
      <Footer />
    </div>
  );
}
