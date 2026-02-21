import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // get cookies from the client/browser
    const cookieStore = await cookies();

    // read review payload
    const body = await req.json(); // { mealId, orderId, rating, comment }

    // forward the request to your backend
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // 🔥 manually forward cookies
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (error: any) {
    console.error("Review POST error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}