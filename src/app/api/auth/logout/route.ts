// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear session token
  res.cookies.set({
    name: "__Secure-better-auth.session_token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(0),
  });

  // Clear session data
  res.cookies.set({
    name: "__Secure-better-auth.session_data",
    value: "",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(0),
  });

  return res;
}