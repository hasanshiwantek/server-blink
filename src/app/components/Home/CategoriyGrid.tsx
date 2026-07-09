import Image from "next/image";
import Link from "next/link";
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_visible: boolean;
  parent_id: number | null;
  direct_products: number;
  total_products: number;
  image?: string;
}

const CategoryTile = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {

  const colSpan = index < 3 ? "lg:col-span-2" : "lg:col-span-3";

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group/item relative block h-[200px] rounded-xs overflow-hidden cursor-pointer ${colSpan}`}
    >
      <div className="absolute inset-0">
        <Image
          src={category?.image || "/default-product-image.svg"}
          alt={category?.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 2}     // ← pehli 2 tiles above-fold, eager load
          quality={70}
        />
      </div>

      {/* Fade overlay on non-hovered tiles when grid is hovered */}
      <div className="pointer-events-none absolute inset-0 bg-white/70 opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100 group-hover/item:opacity-0 z-10" />

      {/* Semi-transparent black text band (center, like reference) */}
      <div className="absolute inset-x-0 bottom-4 z-20 bg-black/50 flex items-center justify-center px-6 py-7">
        <p
          className="text-white text-2xl md:text-3xl !font-light drop-shadow-2xl text-center uppercase tracking-wide m-0"
        >
          {category.name}
        </p>
      </div>
    </Link>
  );
};

const CategoryGrid = ({ categories }: any) => {
  if (!categories?.length) return null
  return (
    <div className="mt-6 group/grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2.5">
        {categories?.map((category: Category, index: number) => (
          <CategoryTile
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
