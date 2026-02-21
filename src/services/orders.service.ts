import { cartData } from "@/constants/types";

export const ordersService = {
  addToCart: async (cartData: cartData) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      });
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAddToCartData: async () => {
    try {
      const res = await fetch("/api/cart/data");
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getMyOrders: async () => {
    try {
      const res = await fetch("/api/orders/my-orders");
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  checkoutOrder: async (payload: { orderId: string; address: string }) => {
    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Checkout failed" } };
    }
  },
};