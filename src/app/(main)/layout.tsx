"use client";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nunito_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import Script from "next/script"; // Gunakan Next.js Script component untuk script eksternal

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

  // Pindahkan kode terkait window ke dalam useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scroll) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setScroll(window.scrollY);
    };

    // Tambahkan passive option untuk performa lebih baik
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Tambahkan script untuk Google Tag Manager dengan Next Script Component */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-YOUR-ID-HERE');
          `,
        }}
      />

      {/* Set theme script harus konsisten antara server dan client */}
      <Script
        id="set-theme"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.add(theme === 'system' ? systemTheme : theme);
              } catch (e) {}
            })();
          `,
        }}
      />

      <div
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.className}`}
      >
        <header>
          <Navbar show={showNavbar} />
        </header>
        <section>
          <div className="image-grid absolute inset-0 opacity-25 dark:opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-white opacity-100 dark:from-[rgba(33,33,33,0.4)] dark:to-[#212121] dark:opacity-100"></div>
        </section>
        <main>
          <Container className="flex-grow mt-24">{children}</Container>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
