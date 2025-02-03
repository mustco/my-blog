import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ message: "Hello Developer Adnan!",status:200 });
}
// export async function GET() {
//   return new Response(JSON.stringify({ message: "Helo Developer Adnan!" }), {
//     status: 200,
//   });
// }
