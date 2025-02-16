"use client"; // Agar bisa menggunakan useSession

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Contact() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Pakai replace agar tidak bisa kembali ke dashboard
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Tambahkan layar loading agar tidak flash halaman
  }

  if (!session) {
    return null; // Mencegah render konten sebelum redirect selesai
  }

  return <h1>Dashboard</h1>; // Gantilah dengan konten dashboard-mu
}
