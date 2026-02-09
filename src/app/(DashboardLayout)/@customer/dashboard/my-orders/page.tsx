"use client";

export const dynamic = "force-dynamic";

import { ordersService } from "@/services/orders.service";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ReviewPayload {
  mealId: string;
  orderId: string;
  rating: number;
  comment: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL


const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reviewingMeal, setReviewingMeal] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");

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

const handleSubmitReview = async (payload: ReviewPayload) => {
  try {
    const resGet = await fetch(`${API_URL}/api/customer/reviews`, {
      method: "GET",
      credentials: "include",
    });

    if (!resGet.ok) throw new Error("Failed to fetch existing reviews");

    const data = await resGet.json();

    const alreadyReviewed = data.some(
      (review: any) =>
        String(review.orderId) === String(payload.orderId) &&
        String(review.mealId) === String(payload.mealId)
    );

    if (alreadyReviewed) {
      toast("You already gave a review for this meal.", { icon: "ℹ️" });
      return;
    }

    const resPost = await fetch(
      `${API_URL}/api/customer/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    if (!resPost.ok) {
      const errorData = await resPost.json().catch(() => null);
      const msg =
        (errorData && errorData.message) ||
        "You already submitted Review.";
      toast.error(msg); // ✅ show toast instead of throw
      return;
    }

    toast.success("Review submitted successfully!");
    setReviewingMeal(null);
    setReviewRating(5);
    setReviewComment("");
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Something went wrong");
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
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">
                Order ID: {order.id.slice(0, 8)}...
              </span>
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
                  className="flex flex-col border p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={item.meal.image}
                      alt={item.meal.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {item.meal.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Price: ${item.price}
                      </div>
                    </div>
                  </div>

                  {/* Leave Review Section */}
                  {reviewingMeal === item.meal.id ? (
                    <div className="mt-2 space-y-2">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={reviewRating}
                        onChange={(e) =>
                          setReviewRating(Number(e.target.value))
                        }
                        className="border p-1 rounded w-20"
                        placeholder="Rating 1-5"
                      />
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="border p-2 rounded w-full"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleSubmitReview({
                              mealId: item.meal.id,
                              orderId: order.id,
                              rating: reviewRating,
                              comment: reviewComment,
                            })
                          }
                          className="bg-green-500 text-white py-1 px-3 rounded"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setReviewingMeal(null)}
                          className="bg-gray-400 text-white py-1 px-3 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (order.status === "DELIVERED") {
                          setReviewingMeal(item.meal.id);
                        } else {
                          toast("You can leave a review after delivery.", {
                            icon: "ℹ️",
                          });
                        }
                      }}
                      className="mt-2 bg-blue-500 text-white py-1 px-3 rounded w-32 text-center"
                    >
                      Leave Review
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-auto text-right font-bold text-gray-800 text-lg">
              Total: $
              {order.orderItems.reduce(
                (total: any, item: any) => total + item.price * item.quantity,
                0,
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
