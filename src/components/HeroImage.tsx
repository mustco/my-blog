import Image from "next/image";

export default function HeroImage() {
    return (
      <img
        src="https://fusowjktlpehckfgwebs.supabase.co/storage/v1/object/public/images//r5nGhWdOEn8OT9JGf896GE3LqFR5ly9I.jpg"
        alt="logo"
        // fill
        className="image rounded-xl border border-gray-500"
        // priority={true}
        // placeholder="blur"
        // blurDataURL="data:image/jpg;base64"
      />
    );
}