// "use client";

import { providerService } from "@/services/provider.service";
import Image from "next/image";
import Link from "next/link";

type Provider = {
  id: string;
  restaurantName: string;
  address: string;
  description: string;
  image: string;
  createdAt: string;
};
export const dynamic = "force-dynamic";

const ProviderPage = async () => {
  const { data } = await providerService.getProvider();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Restaurants</h1>
          <p className="mt-2 text-white/90">
            Discover your favorite restaurants and order delicious food
          </p>
        </div>
      </div>

      {/* Provider List */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((provider: Provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56 w-full">
              <Image
                src={
                  provider.image?.startsWith("http")
                    ? provider.image
                    : "/images/restaurant-placeholder.jpg"
                }
                alt={provider.restaurantName}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold">
                {provider.restaurantName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                📍 {provider.address}
              </p>

              <p className="mt-4 text-gray-600 line-clamp-3">
                {provider.description}
              </p>

              {/* Meta */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Opened on {new Date(provider.createdAt).toLocaleDateString()}
                </span>

                <button className="px-5 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition">
                  <Link href={`/provider-menu/${provider.id}`}>View Menu</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderPage;
