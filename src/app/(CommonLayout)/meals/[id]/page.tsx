import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AddToCartButton from "@/components/modules/Meals/AddToCartButton";
import { mealsService } from "@/services/meals.service";

type Meal = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  providerId?: string;
};

const MealsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // ✅ now id works


  const mealResponse = await mealsService.getMealById(id);
  const meal: Meal | null = mealResponse?.data ?? null;

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-400">
        <div className="text-center">
          <p className="mb-4">Meal not found</p>
          <Link
            href="/meals"
            className="text-yellow-500 hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft size={18} /> Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/meals"
          className="inline-flex items-center gap-1 text-neutral-400 hover:text-white mb-8"
        >
          <ChevronLeft size={18} />
          Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={meal.image || "/placeholder.png"}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-3xl font-bold">{meal.name}</h1>

            <p className="text-neutral-400">{meal.description}</p>

            <p className="text-2xl font-bold text-yellow-500">
              ৳ {meal.price}
            </p>

            {/* Add to Cart */}
            <AddToCartButton mealId={meal.id} providerId={meal.providerId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetailsPage;
