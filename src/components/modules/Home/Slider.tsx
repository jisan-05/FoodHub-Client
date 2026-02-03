"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="w-full h-[90vh]"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div
          className="relative h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />

          {/* content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Discover Delicious Meals 🍱
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-xl">
                Order from your favorite restaurants & enjoy fast delivery
              </p>
              <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div
          className="relative h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Fast & Fresh Delivery 🚀
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-xl">
                Hot meals delivered straight to your door
              </p>
              <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg">
                Browse Meals
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}