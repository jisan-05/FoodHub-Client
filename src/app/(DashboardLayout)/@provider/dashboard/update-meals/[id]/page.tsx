
import UpdateMealForm from "@/components/modules/Meals/UpdateMealForm";
import { mealsService } from "@/services/meals.service";

export const dynamic = "force-dynamic";

const UpdateMealPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealResponse = await mealsService.getMealById(id);
  const meal = mealResponse?.data;

  if (!meal) {
    return (
      <div className="p-10 text-center text-red-500">
        Meal not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Update Meal</h1>

      <UpdateMealForm meal={meal} />
    </div>
  );
};

export default UpdateMealPage;
