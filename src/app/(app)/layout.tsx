import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient"; // Import Client Component

export const metadata: Metadata = {
  title: "MustcoWeb",
  description: "Berbagi wawasan dan menginspirasi perubahan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
} 
