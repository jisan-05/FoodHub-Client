import BannerSlider from "@/components/modules/Home/Slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[60vh]">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Other Sections */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Featured Meals
        </h2>
        {/* featured meals grid */}
      </section>
    </div>
  );
}
