import { mealsService } from "@/services/meals.service";

const SingleMenupage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Fetch meals
  const mealsResponse = await mealsService.getMealsByProvider({ id });

  if (mealsResponse.error) {
    return <p className="text-red-500">{mealsResponse.error.message}</p>;
  }

  const meals = mealsResponse.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 ">Menu</h1>
      {meals && meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {meals.map((meal: any) => (
            <div key={meal.id} className="border rounded-lg p-4 shadow">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-xl font-semibold">{meal.name}</h2>
              <p className="text-gray-600">{meal.description}</p>
              <p className="font-bold mt-2">${meal.price}</p>
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
