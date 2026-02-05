import CategorySection from "@/components/modules/Home/CategorySection ";
import BannerSlider from "@/components/modules/Home/Slider";
import { categoryService } from "@/services/category.service";
import { providerService } from "@/services/provider.service";

export default async function Home() {
  const categories = await categoryService.getCategorys();
  console.log(categories);
      const providers = await providerService.getProvider()

      console.log(providers)
  return (
    <div className="w-full ">
      {/* Banner Slider */}
      <BannerSlider />

      {/* category  */}
      <CategorySection/>
      {/* Other Sections */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Meals</h2>
        {/* featured meals grid */}
      </section>
    </div>
  );
}
