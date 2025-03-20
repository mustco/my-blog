// src/app/RootLayoutClient.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Head from "next/head";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta
            name="google-site-verification"
            content="LhEA7t7qLLK7ohvQGOGLrk19Zu0aQieVE4y7cm4YoGA"
          />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed`}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
          {/* Tambahkan elemen untuk social bar agar bisa diatur posisinya */}
          <div id="social-bar-ads" className="fixed top-4 right-4 z-50"></div>

          {/* Gunakan dangerouslySetInnerHTML untuk memastikan script masuk ke dalam div */}

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
      setTimeout(() => {
        var ads = document.querySelector("iframe"); // Ambil iframe iklan
        var target = document.getElementById("social-bar-ads"); // Target div
        if (ads && target) {
          target.appendChild(ads); // Pindahkan iklan ke dalam div
          ads.style.position = "static"; // Hapus posisi fixed
        }
      }, 2000); // Tunggu beberapa detik agar iklan muncul dulu
    `,
            }}
          ></script> */}
        </body>
      </html>
    </SessionProvider>
  );
}
