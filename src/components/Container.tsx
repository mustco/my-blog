import React from "react";
import AdvertisementBanner from "./AdvertisementBanner";
import { usePathname } from "next/navigation";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container(props: ContainerProps) {
  const pathname = usePathname();
  return (
    <div
      className={`container mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
      {/* <div className="md:w-4/5 mx-auto p-5 md:p-8 flex flex-col items-center justify-center my-8 md:my-10 box-border">
      </div> */}
    </div>
  );
}
