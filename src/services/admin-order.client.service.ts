const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

export interface AdminOrder {
  id: string;
  customerId: string;
  providerId: string;
  status: OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminOrdersResponse {
  data: AdminOrder[];
}

export const adminOrderClientService = {
  getAllOrders: async (): Promise<{ data: AdminOrder[] | null; error: any }> => {
    try {
      const res = await fetch(`/api/admin/orders`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const json: AdminOrdersResponse = await res.json();

      return { data: json.data, error: null }; // ← unwrap .data here
    } catch (error) {
      console.error("Admin orders fetch error:", error);
      return { data: null, error: { message: "Failed to fetch orders" } };
    }
  },
};