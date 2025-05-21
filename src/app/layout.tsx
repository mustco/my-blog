// src/app/layout.tsx
import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient"; // Import Client Component

export const metadata: Metadata = {
  title: "MustcoWeb - Berbagi Wawasan, Menginspirasi Perubahan",
  description:
    "Berbagi Wawasan dan Menginspirasi Perubahan, Baca selengkapnya di MustcoWeb.",
  authors: [
    {
      name: "MustcoWeb",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
  ],
  icons: {
    icon: "/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png",
  },
  other: {
    "google-site-verification": "LhEA7t7qLLK7ohvQGOGLrk19Zu0aQieVE4y7cm4YoGA",
  },
  openGraph: {
    title: "MustcoWeb - Berbagi Wawasan, Menginspirasi Perubahan",
    description:
      "Berbagi Wawasan dan Menginspirasi Perubahan, Baca selengkapnya di MustcoWeb.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "MustcoWeb",
    images: [
      {
        url: "/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png",
        width: 1200,
        height: 630,
        alt: `Og Image MustcoWeb`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MustcoWeb - Berbagi Wawasan, Menginspirasi Perubahan",
    description:
      "Berbagi Wawasan dan Menginspirasi Perubahan, Baca selengkapnya di MustcoWeb.",
    images: ["/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
