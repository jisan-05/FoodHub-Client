// lib/fetchWithCookies.ts
import { cookies } from "next/headers";

export async function fetchWithCookies(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies(); // server-side
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieStore.toString(), // forward cookies
    },
  });
}