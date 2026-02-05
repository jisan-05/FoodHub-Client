import CategorySlider from "@/components/ui/CategorySlider";
import { categoryService } from "@/services/category.service";
// import CategorySlider from "./CategorySlider"; // Import the new component

const CategorySection = async () => {
  const { data, error } = await categoryService.getCategorys();

  if (error) return <p className="text-center text-red-500">Failed to load</p>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Browse Categories 🍔
        </h2>
        
        {/* Pass the data to the Client Slider */}
        <CategorySlider data={data} />
      </div>
    </section>
  );
};

export default CategorySection;