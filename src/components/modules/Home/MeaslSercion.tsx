import { mealsService } from '@/services/meals.service';
import { providerService } from '@/services/provider.service';
import Link from 'next/link';
import React from 'react';

const MealsSection = async () => {
  const { data } = await mealsService.getMeals()
  console.log("from meal ----",data)
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
          Popular Meals
        </h2>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((meal: any) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-500 cursor-pointer"
            >
              {/* Meal Image */}
              <div className="relative">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                  ${meal.price}
                </div>
              </div>

              {/* Meal Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {meal.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {meal.description}
                </p>

                <button className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 rounded-xl hover:bg-yellow-400 transition shadow-md">
                  <Link href={`/meals/${meal.id}`}>See Meals Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealsSection;
