import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies(); // ✅ ADD await
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/profile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // ✅ now works
      },
      body: JSON.stringify(body),
    }
  );

  return new Response(await res.text(), {
    status: res.status,
  });
}
