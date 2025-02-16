"use client"
import { useParams } from "next/navigation";
export default function DashboardDetail() {
  const params = useParams();
  
  return (
    <div>
      <h1>Dashboard Detail: {params.id}</h1>
    </div>
  );
}
