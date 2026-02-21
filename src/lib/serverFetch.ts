// app/lib/serverFetch.ts
import { cookies } from "next/headers";

export async function serverFetch(
  path: string,
  options?: RequestInit
) {
  const cookieStore = await cookies(); // server-side cookies

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies
      ...(options?.headers || {}),
    },
  });

  const data = await res.text(); // or res.json()
  return new Response(data, { status: res.status });
}
