"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/api/category";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Category[];
}

const LinkHeader = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  // ✅ Limit to only 3 categories as shown in the image
  const visibleCategories = categories.slice(0, 3);

  return (
    <header className="bg-[#393939] text-white w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto border-b-3 border-[#8b8b8b]">
      <nav className="px-4 sm:px-6 lg:px-8 xl:px-5 2xl:px-28">
        <ul className="flex items-center gap-8 xl:gap-12 2xl:gap-16 h-12 sm:h-14 lg:h-16">
          {/* Dynamic Categories from API (first 3 only) */}
          {visibleCategories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold hover:text-gray-300 transition-colors"
              >
                {cat.name}
              </Link>
            </li>
          ))}

          {/* Static Links */}
          <li>
            <Link
              href="/contact-us"
              className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold hover:text-gray-300 transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold hover:text-gray-300 transition-colors"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LinkHeader;