// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchWithCookies } from "@/lib/fetchWithCookies";

export async function GET(req: NextRequest) {
  try {
    const res = await fetchWithCookies(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`);
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ data: null, error: { message: "Failed to fetch users" } }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetchWithCookies(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update user status");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ data: null, error: { message: err.message } }, { status: 500 });
  }
}