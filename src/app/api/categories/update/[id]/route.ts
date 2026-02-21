import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const categoryId = params.id;

    const cookieStore = await cookies();
    const body = await req.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(), // forward cookies
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to update category" }),
      { status: 500 }
    );
  }
}