"use client";

export default function AdBanner() {
  const handleClick = () => {
    window.open(
      "https://www.effectiveratecpm.com/vcvcr7qsk?key=f35b406a64c9034a5bebb3ef500b573d",
      "_blank"
    );
  };

  return (
    <div
      className="w-full max-w-[412px] h-[90px] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src="https://fusowjktlpehckfgwebs.supabase.co/storage/v1/object/public/images//kZz9iDdRyXDacyMoy85KBAxqON41qUDW.gif"
        alt="Ads"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
