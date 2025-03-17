import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <Image
        src="/images/notfound.png"
        width={200}
        height={200}
        alt="Not Found"
        className="rounded-xl w-auto h-auto"
        priority
      />
      <h2 className="text-4xl">Page Not Found</h2>
    </div>
  );
}
