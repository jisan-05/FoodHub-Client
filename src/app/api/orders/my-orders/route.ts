import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/api/customer/orders`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}