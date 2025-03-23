"use client";
// import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  // const { data: session, status } = useSession();
  //     const router = useRouter();
  //     console.log(session);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [status]);

  // return <h1>Welcome to your Dashboard, {session?.user?.name}</h1>;
  return (
    <h1 className="text-xl md:text-3xl">
      Welcome Back, <span className="font-bold">Adnan</span>! 👀
    </h1>
  );
}
