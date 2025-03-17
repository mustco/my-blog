"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";

export default function PopupAd() {
  const [isOpen, setIsOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const pathname = usePathname();
  const directLink =
    "https://www.effectiveratecpm.com/ywamwhbf5?key=2bef0110a8d315fd50cdee222322c25f"; // Ganti dengan link tujuan

  useEffect(() => {
    setCloseCount(0); // Reset setiap pindah halaman
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight / 2) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll); // Hapus event listener setelah muncul
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClose = () => {
    if (closeCount === 0) {
      window.open(directLink, "_blank");
    } else {
      setIsOpen(false);
    }
    setCloseCount(closeCount + 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
      <div className="relative bg-gray-200 rounded-lg shadow-lg text-center w-96 mx-5 h-28">
        {/* Tombol Close "X" di pojok kanan atas */}
        <button
          onClick={handleClose}
          className="absolute -top-10 -right-2 text-3xl text-gray-200"
        >
          <CgClose />
        </button>
        <div className="flex items-center justify-center text-gray-700">
          Ads
          {/* <img src="/images/technology.jpg" alt="tutup" className="w-full h-full" /> */}
          {/* <p>ads</p> */}
        </div>

        {/* <h3 className="text-lg font-semibold">Iklan Menarik!</h3> */}
        {/* <p className="mt-2">Dapatkan penawaran spesial hanya untuk Anda.</p> */}
      </div>
    </div>
  );
}
