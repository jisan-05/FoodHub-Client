import Image from "next/image";

type Category = {
  id: string;
  name: string;
  description?: string | null;
  image: string;
};

type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h3 className="text-xl font-bold capitalize tracking-wide">
          {category.name}
        </h3>

        {category.description && (
          <p className="mt-1 text-sm text-white/80 line-clamp-2">
            {category.description}
          </p>
        )}

        <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
          Browse Category 
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
