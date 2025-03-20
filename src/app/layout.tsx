// src/app/layout.tsx
import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient"; // Import Client Component

export const metadata: Metadata = {
  title: {
    default: "MustcoWeb",
    template: "MustcoWeb | %s ",
  },
  description: "Berbagi wawasan dan menginspirasi perubahan.",
  icons: {
    icon: "/J6lMsBKUjgf7pbkD4EMqeX6tteWEe0dY.png",
  },
  other: {
    "google-site-verification": "LhEA7t7qLLK7ohvQGOGLrk19Zu0aQieVE4y7cm4YoGA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
