import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/orders`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  return new Response(await res.text(), {
    status: res.status,
  });
}