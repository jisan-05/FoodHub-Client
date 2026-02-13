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

export const adminOrderClientService = {
  getAllOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data: AdminOrder[] = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error("Admin orders fetch error:", error);
      return { data: null, error: { message: "Failed to fetch orders" } };
    }
  },
};
