import { providerService } from '@/services/provider.service';
import Link from 'next/link';
import ProviderAddToCart from './ProviderAddToCart';


const FeaturedProviders = async () => {
  const { data } = await providerService.getProvider();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Provider
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((provider: any) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={provider.image}
                alt={provider.restaurantName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {provider.restaurantName}
                </h3>
                <p className="text-sm text-gray-500">
                  {provider.address}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {provider.description}
                </p>

                {/* View Menu */}
                <Link
                  href={`/provider-menu/${provider.id}`}
                  className="block mt-4 text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  View Menu
                </Link>

                {/* Add to Cart */}
                {/* <ProviderAddToCart providerId={provider.id} /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
