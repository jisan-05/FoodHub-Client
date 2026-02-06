"use client";

import React, { useEffect, useState } from "react";
import { ordersService } from "@/services/orders.service";

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await ordersService.getAddToCartData();
      if (error) setError(error.message);
      else setOrders(data);
    } catch (err) {
      setError("Something went wrong while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading your orders...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center py-10 font-semibold">{error}</div>
    );
  if (orders.length === 0)
    return (
      <div className="text-gray-500 text-center py-10 font-semibold">
        No orders found.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">Order ID: {order.id.slice(0, 8)}...</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  order.status === "PLACED"
                    ? "bg-blue-500"
                    : order.status === "DELIVERED"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Address */}
            <div className="mb-4 text-gray-600">
              <strong>Address:</strong> {order.address}
            </div>

            {/* Order Items */}
            <div className="mb-4 space-y-3">
              {order.orderItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={item.meal.image}
                    alt={item.meal.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.meal.name}</div>
                    <div className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-gray-500 text-sm">Price: ${item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-auto text-right font-bold text-gray-800 text-lg">
              Total: $
              {order.orderItems.reduce(
                (total: any, item: any) => total + item.price * item.quantity,
                0
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
