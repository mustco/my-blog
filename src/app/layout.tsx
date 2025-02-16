"use client";
import { ThemeProvider, useTheme } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed`}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>

    // <SessionProvider>
    // <html lang="en" suppressHydrationWarning>
    //   <title>Mustco Blog</title>
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#171717] dark:text-white bg-white text-[#171717] leading-relaxed`}
    //   >
    //     <ThemeProvider attribute="class" defaultTheme="light">
    //       <Navbar />
    //       <Container>{children}</Container>
    //       <Footer />
    //     </ThemeProvider>
    //   </body>
    // </html>
    // </SessionProvider>
  );
}
