"use client"; // This is required for refs and buttons

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use your own icons
import CategoryCard from "../modules/Home/CategoriesCard";


const CategorySlider = ({ data }: { data: any[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* --- Prev Button --- */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition hidden group-hover:block"
      >
        <ChevronLeft size={24} />
      </button>

      {/* --- The Slider --- */}
      <div
        ref={sliderRef}
        className="flex flex-nowrap gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
      >
        {data?.map((category: any) => (
          <div
            key={category.id}
            className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 snap-start"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      {/* --- Next Button --- */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition hidden group-hover:block"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CategorySlider;