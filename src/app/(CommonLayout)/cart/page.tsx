"use client";

import CartEmpty from "@/components/ui/CartEmpty";
import { ordersService } from "@/services/orders.service";
import { useEffect, useState } from "react";

interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: string;
  meal: Meal;
  quantity: number;
  price: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const { data, error } = await ordersService.getAddToCartData();

                // console.log("from cart count", data);


      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        // Merge duplicate meals
        const map = new Map<string, CartItem>();
        data.forEach((order: any) => {
          order.orderItemForCarts.forEach((item: any) => {
            const mealId = item.meal.id;
            if (map.has(mealId)) {
              const existing = map.get(mealId)!;
              existing.quantity += item.quantity;
              existing.price += item.meal.price * item.quantity;
            } else {
              map.set(mealId, {
                id: mealId,
                meal: item.meal,
                quantity: item.quantity,
                price: item.meal.price * item.quantity,
              });
            }
          });
        });

        setCartItems(Array.from(map.values()));
      }

      setLoading(false);
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((t, i) => t + i.price, 0);

  const increaseQty = (mealId: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === mealId
          ? { ...item, quantity: item.quantity + 1, price: (item.quantity + 1) * item.meal.price }
          : item
      )
    );
  };

  const decreaseQty = (mealId: string) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === mealId
            ? { ...item, quantity: item.quantity - 1, price: (item.quantity - 1) * item.meal.price }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleCheckout = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    setCheckoutLoading(true);

    const { error } = await ordersService.checkoutOrder({ address });

    setCheckoutLoading(false);

    if (error) {
      alert(error.message || "Checkout failed");
    } else {
      alert("Order placed successfully ✅");
      setCartItems([]);
      setAddress("");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;
  if (cartItems.length === 0) return  <CartEmpty />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div className="flex items-center gap-4">
            <img src={item.meal.image} alt={item.meal.name} className="w-20 h-20 object-cover rounded" />
            <div>
              <p className="font-medium">{item.meal.name}</p>
              <p className="text-gray-500">${item.meal.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => decreaseQty(item.id)} className="bg-gray-200 px-2 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} className="bg-gray-200 px-2 rounded">+</button>
              </div>
            </div>
          </div>
          <p className="font-semibold">${item.price}</p>
        </div>
      ))}

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">Subtotal: ${subtotal}</p>
        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Delivery Address"
          className="w-full border px-3 py-2 mt-3 rounded"
        />
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="w-full bg-blue-600 text-white py-2 mt-3 rounded hover:bg-blue-700 transition"
        >
          {checkoutLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
