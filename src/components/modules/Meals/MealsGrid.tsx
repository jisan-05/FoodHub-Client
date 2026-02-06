'use client';

import { Button } from '@/components/ui/button';
import { ordersService } from '@/services/orders.service';

const MealsGrid = ({ meals }: { meals: any[] }) => {
  const handleAddToCart = async (meal: any) => {
    const cartData = {
      mealId: meal.id,
      providerId: meal.providerId,
      quantity: 1,
    };

    const res = await ordersService.addToCart(cartData);
    console.log('Cart added:', res);
    window.dispatchEvent(new Event("cart-updated"));

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold">{meal.name}</h2>
            <p className="text-gray-600 mt-2">{meal.description}</p>
            <p className="mt-3 font-bold text-green-600">৳ {meal.price}</p>

            <div className="w-full flex justify-end mt-4">
              <Button onClick={() => handleAddToCart(meal)}>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealsGrid;
