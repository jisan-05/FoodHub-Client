import { cartData } from "@/constants/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ordersService = {
  addToCart: async (cartData: cartData) => {
    try {
      const res = await fetch(`${API_URL}/api/customer/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ browser sends cookies
        body: JSON.stringify(cartData),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAddToCartData: async () => {
    try {
      const res = await fetch(`${API_URL}/api/customer/orders-cart`, {
        credentials: "include", // ✅ REQUIRED
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMyOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/api/customer/orders`, {
        credentials: "include", // ✅ REQUIRED
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },


   checkoutOrder: async (payload: { orderId: string; address: string }) => {
    try {
      const res = await fetch(
        `${API_URL}/api/customer/orders/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Checkout failed" } };
    }
  },

};
