"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ordersService } from "@/services/orders.service";
import Link from "next/link";

const MealsGrid = ({ meals }: { meals: any[] }) => {
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = async (meal: any) => {
    const cartData = {
      mealId: meal.id,
      providerId: meal.providerId,
      quantity: 1,
    };

    await ordersService.addToCart(cartData);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchPrice =
        maxPrice === null || meal.price <= maxPrice;

      const matchSearch =
        meal.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchPrice && matchSearch;
    });
  }, [meals, maxPrice, searchTerm]);

  return (
    <div className="w-full">
      
      {/* 🔥 Modern Fire Filter Bar */}
      <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 
                      p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row 
                      gap-4 justify-between items-center">

        <h2 className="text-2xl font-bold text-yellow-600">
          🔥 Discover Delicious Meals
        </h2>

        <div className="flex gap-4 w-full md:w-auto">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search meals..."
            className="px-4 py-2 rounded-xl border border-yellow-400 
                       focus:outline-none focus:ring-2 focus:ring-yellow-500 
                       transition w-full md:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Price Filter */}
          <select
            className="px-4 py-2 rounded-xl border border-yellow-400 
                       focus:outline-none focus:ring-2 focus:ring-yellow-500 
                       transition"
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">All Prices</option>
            <option value="200">Under 200</option>
            <option value="500">Under 500</option>
            <option value="1000">Under 1000</option>
          </select>
        </div>
      </div>

      {/* 🍽 Meals Grid */}
      {filteredMeals.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No meals found 😔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden 
                         hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-52 object-cover group-hover:scale-110 
                             transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">
                  {meal.name}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {meal.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-yellow-600">
                    ৳ {meal.price}
                  </p>

                  <Link href={`/meals/${meal.id}`}>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 
                                      text-black font-semibold rounded-xl px-4">
                      View
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 🔥 Fire Glow Border */}
              <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsGrid;