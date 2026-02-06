import { providerService } from '@/services/provider.service';
import Link from 'next/link';
import React from 'react';

const FeaturedProviders = async () => {
  const { data } = await providerService.getProvider();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Restaurants
        </h2>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((provider: any) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              {/* Provider Image */}
              <img
                src={provider.image}
                alt={provider.restaurantName}
                className="w-full h-48 object-cover"
              />

              {/* Provider Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {provider.restaurantName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{provider.address}</p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {provider.description}
                </p>
                <button className="mt-4 bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
                  <Link href={`/provider-menu/${provider.id}`}>
                  View Menu
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
