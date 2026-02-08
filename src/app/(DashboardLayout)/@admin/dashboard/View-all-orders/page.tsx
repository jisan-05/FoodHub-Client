"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import {
  adminOrderClientService,
  AdminOrder,
} from "@/services/admin-order.client.service";

const ViewAllorders = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } =
        await adminOrderClientService.getAllOrders();

      if (error) {
        setError(error.message);
      } else {
        setOrders(data || []);
      }
    } catch {
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
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-10 font-semibold">
        {error}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-gray-500 text-center py-10 font-semibold">
        No orders found.
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        View All Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-700">
                  {order.id.slice(0, 8)}...
                </td>

                <td className="p-4 text-gray-600">
                  {order.customerId.slice(0, 8)}...
                </td>

                <td className="p-4 text-gray-600">
                  {order.providerId.slice(0, 8)}...
                </td>

                <td className="p-4 text-gray-600">{order.address}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "PLACED"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "READY"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllorders;
