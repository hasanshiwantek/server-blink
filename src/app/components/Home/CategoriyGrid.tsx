"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/lib/api/category";
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
        />
      </div>

      {/* Fade overlay on non-hovered tiles when grid is hovered */}
      <div className="pointer-events-none absolute inset-0 bg-white/70 opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100 group-hover/item:opacity-0 z-10" />

      {/* Semi-transparent black text band (center, like reference) */}
      <div className="absolute inset-x-0 bottom-4 z-20 bg-black/50 flex items-center justify-center px-6 py-7">
        <p
          className="text-white text-2xl md:text-3xl font-normal drop-shadow-2xl text-center uppercase tracking-wide m-0"
          style={{ fontWeight: 300 }}
        >
          {category.name}
        </p>
      </div>
    </Link>
  );
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`relative h-[200px] rounded-xs overflow-hidden bg-gray-200 animate-pulse ${i < 4 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 group/grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2.5">
        {categories.map((category, index) => (
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
