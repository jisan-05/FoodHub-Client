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

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data, error } = await mealsService.getMeals();
        if (error) {
          setError("Failed to load meals");
        } else {
          setMeals(data);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading meals...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Meals</h1>

      {meals.length === 0 ? (
        <p className="text-gray-500">No meals found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
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

                <p className="font-bold text-yellow-600">
                  ৳ {meal.price}
                </p>

                <Link
                  href={`/dashboard/update-meals/${meal.id}`}
                  className="inline-block mt-3 w-full text-center bg-black text-white py-2 rounded-lg hover:opacity-90"
                >
                  Edit Meal
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllMeals;
