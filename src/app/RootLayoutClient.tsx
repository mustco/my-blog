// src/app/RootLayoutClient.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
// import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Script from "next/script";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
    // <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BLHPBPTR2D"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BLHPBPTR2D');
          `}
        </Script>
        <Script
          id="set-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        let theme = localStorage.getItem('theme');
        if (!theme || theme === 'system') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })();
    `,
          }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="3S5QyjNj5K/1C2dabLbYXQ"
          async
        ></script>
        {/* <script
          type="text/javascript"
          src="//pl26618439.profitableratecpm.com/9f/b6/cb/9fb6cb939f95da38df0850d1383a8791.js"
        ></script> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5863931134363900"
          crossOrigin="anonymous"
        ></script>
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed flex flex-col min-h-screen ${nunitoSans.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {/* Tambahkan elemen untuk social bar agar bisa diatur posisinya */}
        {/* <div id="social-bar-ads" className="fixed top-4 right-4 z-50"></div> */}

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
        <ScrollToTopButton />
      </body>
    </html>
    // </SessionProvider>
  );
}
