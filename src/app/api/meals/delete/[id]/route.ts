// app/api/meals/delete/[id]/route.ts
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  // Unwrap params if it's a Promise
  const params = await context.params;
  const mealId = params.id;

  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals/${mealId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
  });

  const data = await res.text(); // or res.json()
  return new Response(data, { status: res.status });
}
