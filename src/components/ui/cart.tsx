import React from "react";
import { IoCartOutline } from "react-icons/io5";

const Cart = ({ count = 0 }) => {
  return (
    <div className="relative inline-block cursor-pointer">
      {/* Cart Icon */}
      <IoCartOutline size={32} className="text-gray-800" />

      {/* Badge */}
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </div>
      )}
    </div>
  );
};

export default Cart;
