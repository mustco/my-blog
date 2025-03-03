import Image from "next/image";

export default function HeroImage() {
    return (
        <Image
          src="/images/technology.jpg"
          alt="logo"
          fill
          className="image rounded-xl border border-gray-500"
          priority
        />
    );
}