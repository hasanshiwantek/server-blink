"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { fetchCategories } from "@/lib/api/category";
import Link from "next/link";

import memoryImg from "@/assets/categories/memory.jpg";
import motherboardImg from "@/assets/categories/motherboard.jpg";
import gpuImg from "@/assets/categories/gpu.jpg";
import hddImg from "@/assets/categories/hdd.jpg";
import psuImg from "@/assets/categories/psu.jpg";

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

// Category images mapping - Add your actual category images here
const categoryImages: { [key: string]: StaticImageData } = {
  "server-memory": memoryImg,
  motherboards: motherboardImg,
  "graphic-cards": gpuImg,
  "hard-drives": hddImg,
  "power-supplies": psuImg,
};
const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        // Get only first 5 categories
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`relative h-52 rounded-xs overflow-hidden bg-gray-200 animate-pulse ${
                i === 4 ? "md:col-span-1 lg:col-span-2" : ""
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => {
          // Fourth item (index 3) spans 2 columns
          const isWide = index === 3;
          const categoryImage = categoryImages[category.slug];

          return (
            <Link
              href={`/category/${category.slug}`}
              key={category.id}
              className={`relative h-52 rounded-xs overflow-hidden group cursor-pointer ${
                isWide ? "md:col-span-1 lg:col-span-2" : ""
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 ">
                {categoryImage ? (
                  <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

              {/* Category Title */}
              <div className="relative h-full flex items-center justify-center px-6">
                <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-2xl text-center uppercase tracking-wide">
                  {category.name}
                </h2>
              </div>

              {/* Hover effect - subtle zoom */}
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
