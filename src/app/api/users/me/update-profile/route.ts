import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies(); // get cookies manually

    const body = await req.json();
    const { name, image } = body;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // ✅ send cookie manually
      },
      body: JSON.stringify({ name, image }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), { status: res.status });
  } catch (error) {
    console.error("Update profile error:", error);
    return new Response(JSON.stringify({ message: "Failed to update profile" }), {
      status: 500,
    });
  }
}