// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear the HttpOnly cookie
  res.cookies.set({
    name: "better-auth.session_token",
    value: "",
    path: "/",
    httpOnly: true, // must match how it was set
    expires: new Date(0),
  });

  return res;
}