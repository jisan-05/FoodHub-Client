const AboutUs = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About FoodHub
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            FoodHub connects food lovers with top restaurants, making ordering meals easy, fast, and delicious. From local favorites to international flavors, we bring it all to your doorstep.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Image */}
          <div className="relative">
            <img
              src="https://valk.bynder.nl/transform/ed58f156-6236-4885-88e0-95044bbab39c/Restaurant-Van-der-Valk-Amersfoort-2025?io=transform:fill,width:652,height:460&format=webp&quality=70"
              alt="About FoodHub"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px] transform hover:scale-105 transition duration-500"
            />

            {/* Decorative Circle */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-500 rounded-full mix-blend-multiply opacity-30"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply opacity-20"></div>
          </div>

          {/* Right Side - Features */}
          <div className="flex flex-col gap-8">
            <h3 className="text-3xl font-semibold text-gray-900">Why Choose FoodHub?</h3>
            <p className="text-gray-600 leading-relaxed">
              We combine convenience, variety, and quality to make every meal an experience. Whether you're craving a quick snack or a gourmet meal, FoodHub has you covered.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-yellow-500 p-3 rounded-full text-white text-xl">
                  🍕
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Top Restaurants</h4>
                  <p className="text-gray-500 text-sm">Only the best local and international restaurants.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-yellow-500 p-3 rounded-full text-white text-xl">
                  🚀
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                  <p className="text-gray-500 text-sm">Meals delivered to your door in record time.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-yellow-500 p-3 rounded-full text-white text-xl">
                  🌱
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fresh & Quality</h4>
                  <p className="text-gray-500 text-sm">Every meal prepared fresh with quality ingredients.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-yellow-500 p-3 rounded-full text-white text-xl">
                  💬
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                  <p className="text-gray-500 text-sm">Our team is ready to assist you anytime.</p>
                </div>
              </div>
            </div>

            <button className="mt-6 bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-400 transition w-max">
              Explore Meals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
