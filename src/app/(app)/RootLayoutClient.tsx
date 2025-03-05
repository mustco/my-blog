"use client";

import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed`}
        >
          {children}
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
