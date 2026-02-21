import { cookies } from "next/headers";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  // await params to get the actual object
  const { id: mealId } = await context.params;

  const body = await req.json();
  const cookieStore = await cookies(); // server-side cookies

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals/${mealId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies manually
    },
    body: JSON.stringify(body),
  });

  const data = await res.text(); // or res.json() depending on backend
  return new Response(data, { status: res.status });
}
