// src/app/layout.tsx
import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient"; // Import Client Component

export const metadata: Metadata = {
  title: {
    default: "MustcoWeb",
    template: "MustcoWeb | %s ",
  },
  description: "Berbagi wawasan dan menginspirasi perubahan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
