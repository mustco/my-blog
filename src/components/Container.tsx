import React from "react";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container(props: ContainerProps) {
  return (
    <div
      className={`container mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}
