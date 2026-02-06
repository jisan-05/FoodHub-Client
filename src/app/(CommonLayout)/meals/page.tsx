import MealsGrid from '@/components/modules/Meals/MealsGrid';
import { mealsService } from '@/services/meals.service';
import { ordersService } from '@/services/orders.service';


const MealsPage = async () => {
  const { data: meals, error } = await mealsService.getMeals();

  if (error) {
    return <div className="text-red-500">Failed to load meals: {error}</div>;
  }

  const data = await ordersService.getAddToCartData()
    console.log("From meals",data)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Meals</h1>

      {meals.length === 0 ? (
        <p className="text-center text-gray-500">No meals available right now.</p>
      ) : (
        <MealsGrid meals={meals} />
      )}
    </div>
  );
};

export default MealsPage;
