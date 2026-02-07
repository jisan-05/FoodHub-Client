import AboutUs from "@/components/modules/Home/About-Us";
import CategorySection from "@/components/modules/Home/CategorySection ";
import FeaturedProviders from "@/components/modules/Home/FeaturedProviders";
import MealsSection from "@/components/modules/Home/MeaslSercion";
import ReviewSerction from "@/components/modules/Home/ReviewSerction";
import BannerSlider from "@/components/modules/Home/Slider";
import { categoryService } from "@/services/category.service";
import { providerService } from "@/services/provider.service";

export default async function Home() {
  const categories = await categoryService.getCategorys();
      const providers = await providerService.getProvider()

  return (
    <div className="w-full ">
      {/* Banner Slider */}
      <BannerSlider />

      {/* About us  */}
      <AboutUs></AboutUs>

      {/* category  */}
      <CategorySection/>

      {/* Provider / Restaurent  */}
      <FeaturedProviders/>

      {/* Meals Sercion  */}

      <MealsSection/>

      {/* Reviews section  */}
      <ReviewSerction/>

      {/* Other Sections */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4"></h2>
        {/* featured meals grid */}
      </section>
    </div>
  );
}
