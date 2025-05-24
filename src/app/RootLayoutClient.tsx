// src/app/RootLayoutClient.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useEffect } from "react";

// Preload fonts dengan display swap untuk mengurangi CLS
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load non-critical scripts after component mount
  useEffect(() => {
    // Load Ahrefs analytics after page is interactive
    const loadAhrefs = () => {
      const script = document.createElement("script");
      script.src = "https://analytics.ahrefs.com/analytics.js";
      script.setAttribute("data-key", "3S5QyjNj5K/1C2dabLbYXQ");
      script.async = true;
      document.head.appendChild(script);
    };

    // Load Google AdSense after page is interactive
    const loadAdSense = () => {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5863931134363900";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.head.appendChild(script);
    };

    // Delay loading of non-critical scripts
    const timer = setTimeout(() => {
      loadAhrefs();
      loadAdSense();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical CSS untuk mencegah FOUC */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS untuk tema */
            html.dark { color-scheme: dark; }
            html { color-scheme: light; }
            body { 
              margin: 0;
              font-family: system-ui, -apple-system, sans-serif;
              transition: none;
            }
            /* Prevent layout shift */
            .min-h-screen { min-height: 100vh; }
          `,
          }}
        />

        {/* Inline critical theme script untuk mencegah FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                let theme = localStorage.getItem('theme');
                if (!theme || theme === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.className = theme === 'dark' ? 'dark' : '';
              } catch (e) {
                console.warn('Theme loading error:', e);
              }
            })();
          `,
          }}
        />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Google Analytics - Load with high priority but not blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BLHPBPTR2D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BLHPBPTR2D', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed flex flex-col min-h-screen ${nunitoSans.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <ScrollToTopButton />
      </body>
    </html>
  );
}

// // src/app/RootLayoutClient.tsx
// "use client";

// import { ThemeProvider } from "next-themes";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Nunito_Sans } from "next/font/google";
// // import { SessionProvider } from "next-auth/react";
// import "./globals.css";
// import Script from "next/script";
// import ScrollToTopButton from "@/components/ScrollToTopButton";

// const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayoutClient({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // <SessionProvider>
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Google Tag Manager */}
//         <Script
//           strategy="beforeInteractive"
//           src="https://www.googletagmanager.com/gtag/js?id=G-BLHPBPTR2D"
//         />
//         <Script id="google-analytics" strategy="beforeInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-BLHPBPTR2D');
//           `}
//         </Script>
//         <Script
//           id="set-theme"
//           strategy="beforeInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//       (function() {
//         let theme = localStorage.getItem('theme');
//         if (!theme || theme === 'system') {
//           theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//         }
//         if (theme === 'dark') {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }
//       })();
//     `,
//           }}
//         />
//         <script
//           src="https://analytics.ahrefs.com/analytics.js"
//           data-key="3S5QyjNj5K/1C2dabLbYXQ"
//           async
//         ></script>
//         {/* <script
//           type="text/javascript"
//           src="//pl26618439.profitableratecpm.com/9f/b6/cb/9fb6cb939f95da38df0850d1383a8791.js"
//         ></script> */}
//         <script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5863931134363900"
//           crossOrigin="anonymous"
//         ></script>
//         {/* <script
//           id="cookieyes"
//           type="text/javascript"
//           src="https://cdn-cookieyes.com/client_data/bb2893cbec1aab2be627328b/script.js"
//         ></script> */}
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#212121] dark:text-[#ECECEC] bg-white text-[#171717] leading-relaxed flex flex-col min-h-screen ${nunitoSans.className}`}
//       >
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           {children}
//         </ThemeProvider>
//         {/* Tambahkan elemen untuk social bar agar bisa diatur posisinya */}
//         {/* <div id="social-bar-ads" className="fixed top-4 right-4 z-50"></div> */}

//         {/* Gunakan dangerouslySetInnerHTML untuk memastikan script masuk ke dalam div */}

//         {/* <script
//             dangerouslySetInnerHTML={{
//               __html: `
//       setTimeout(() => {
//         var ads = document.querySelector("iframe"); // Ambil iframe iklan
//         var target = document.getElementById("social-bar-ads"); // Target div
//         if (ads && target) {
//           target.appendChild(ads); // Pindahkan iklan ke dalam div
//           ads.style.position = "static"; // Hapus posisi fixed
//         }
//       }, 2000); // Tunggu beberapa detik agar iklan muncul dulu
//     `,
//             }}
//           ></script> */}
//         <ScrollToTopButton />
//       </body>
//     </html>
//     // </SessionProvider>
//   );
// }
