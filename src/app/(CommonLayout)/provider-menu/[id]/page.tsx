import AddToCartButton from "@/components/modules/Meals/AddToCartButton";
import { mealsService } from "@/services/meals.service";


const SingleMenupage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: providerId } = await params;

  const mealsResponse = await mealsService.getMealsByProvider({ id: providerId });

  if (mealsResponse.error) {
    return <p className="text-red-500">{mealsResponse.error.message}</p>;
  }

  const meals = mealsResponse.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {meals && meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {meals.map((meal: any) => (
            <div
              key={meal.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-48 object-cover rounded mb-3"
              />

              <h2 className="text-xl font-semibold">{meal.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {meal.description}
              </p>

              <p className="font-bold text-lg mt-2">
                ${meal.price}
              </p>

              {/* ✅ Add to Cart */}
              <div className="mt-4">
                <AddToCartButton
                  mealId={meal.id}
                  providerId={providerId}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No meals found for this provider.</p>
      )}
    </div>
  );
};

export default SingleMenupage;
