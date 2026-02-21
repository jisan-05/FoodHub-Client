import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (error: any) {
    console.error("Review GET error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}