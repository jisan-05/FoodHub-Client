// src/app/api/admin/orders/route.ts
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface AdminOrder {
  id: string;
  customerId: string;
  providerId: string;
  status: OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    // Get cookies from incoming request
    const cookieStore =await cookies();
    const cookieHeader = cookieStore.getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    // Forward request to backend with cookies
    const res = await fetch(`${API_URL}/api/admin/orders`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch admin orders");
    }

    const data: AdminOrder[] = (await res.json()) || [];

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return new Response(
      JSON.stringify({ data: [], error: "Failed to fetch orders" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}