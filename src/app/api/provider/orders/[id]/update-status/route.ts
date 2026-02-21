import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // params is a Promise
) {
  const { id: orderId } = await params; // ✅ unwrap the promise

  const body = await req.json();
  const { status } = body;

  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/orders/${orderId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.text();

  return new Response(data, { status: res.status });
}