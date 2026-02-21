import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function DELETE(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const categoryId = params.id;

    const cookieStore = await cookies();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(), // forward cookies
        },
      }
    );

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to delete category" }),
      { status: 500 }
    );
  }
}