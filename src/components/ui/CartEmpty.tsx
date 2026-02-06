// CartEmpty.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // optional icon

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center px-4 my-14 ">
      <div className="bg-blue-100 rounded-full p-6 mb-6">
        <ShoppingCart className="w-16 h-16 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Your Cart is Empty
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Looks like you haven’t added any meals yet. Explore our delicious menu
        and start adding your favorites to the cart!
      </p>
      <Link href="/meals">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
          Browse Meals
        </button>
      </Link>
    </div>
  );
};

export default CartEmpty;
