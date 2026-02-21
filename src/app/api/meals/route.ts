import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(), // 🔥 forward browser cookies
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.text();

    return new Response(data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}