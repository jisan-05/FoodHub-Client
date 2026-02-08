"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mealsService } from "@/services/meals.service";

type Meal = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
};

const ShowAllMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all meals on mount
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const { data, error } = await mealsService.getMeals();

        if (error) throw new Error(error.message || "Failed to fetch meals");
        setMeals(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, []);

  // DELETE handler
  const handleDelete = async (mealId: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
      const token = localStorage.getItem("accessToken") || "";
      await mealsService.deleteMeal(mealId, token);

      // Remove from UI instantly
      setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
    } catch (err: any) {
      alert(err.message || "Failed to delete meal");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading meals...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Meals</h1>

      {meals.length === 0 ? (
        <p className="text-gray-500 text-center">No meals found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={meal.image || "/placeholder.png"}
                  alt={meal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{meal.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {meal.description || "No description"}
                </p>
                <p className="font-bold text-yellow-600">৳ {meal.price}</p>

                <div className="flex gap-2 pt-3">
                  <Link
                    href={`/dashboard/update-meals/${meal.id}`}
                    className="flex-1 text-center bg-black text-white py-2 rounded-lg hover:opacity-90"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllMeals;
