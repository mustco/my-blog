"use client";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

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
  return (
    <div className={`${nunitoSans.className} flex flex-col min-h-screen`}>
      <Navbar />
      <Container className="flex-grow">{children}</Container>
      <Footer />
    </div>
  );
}
