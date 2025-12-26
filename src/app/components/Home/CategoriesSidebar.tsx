"use client";

import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api/category";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Category[];
}

const CategoriesSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="  rounded-xs overflow-hidden mb-5">
      <div className="bg-[#393939] px-3 py-2  uppercase tracking-wide border-b-3 border-[#8b8b8b]">
        <h2 className="h2-bold">
        SHOP BY CATEGORY
        </h2>
      </div>
      <div className="py-2 bg-white text-[#545454] ">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-3 py-1 flex items-center justify-between hover:text-[var(--primary-color)] transition-colors text-[15px] font-normal text-[#545454]"
            >
              <span>{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 && (
                expandedCategories.has(category.id) ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )
              )}
            </button>
            {expandedCategories.has(category.id) &&
              category.subcategories &&
              category.subcategories.length > 0 && (
                <div className="bg-[#f2f2f2]">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      className="w-full px-3 py-1  text-left font-normal hover:text-[var(--primary-color)] transition-colors text-[15px] text-[#545454]"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;