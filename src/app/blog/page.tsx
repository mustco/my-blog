"use client";
import Card from "@/components/Card";

export default function Blog() {
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8">
      <h1 className="text-lg font-bold pb-5">Recent Blog Post :</h1>
      <div className="text-black/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  rounded-xl gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
