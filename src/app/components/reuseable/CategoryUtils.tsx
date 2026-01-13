"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

interface CategoryItemProps {
  category: Category;
  expanded: Set<number>;
  toggle: (id: number) => void;
  level?: number;
  activeCategoryId?: number; // ✅ highlight active
  parentExpanded?: boolean;   // used internally to open active path
}

export const CategoryItem = ({
  category,
  expanded,
  toggle,
  level = 0,
  activeCategoryId,
  parentExpanded = true,
}: CategoryItemProps) => {
  const hasChildren = category.subcategories && category.subcategories.length > 0;
  const isOpen = expanded.has(category.id) || category.id === activeCategoryId;

  // Highlight if active
  const isActive = category.id === activeCategoryId;

  return (
    <div>
     <Link href={`/category/${category.slug}`}>
  <button
    className={`w-full px-3 py-1 flex items-center justify-between transition-colors text-[15px] font-normal
      ${isActive ? "text-[#d40511]" : "text-[#545454] hover:text-[var(--primary-color)]"}`}
    style={{ paddingLeft: `${level * 6 + 6}px` }}
  >
    <span>{category.name}</span>

    {hasChildren && (
      <span
        onClick={(e) => {
          e.stopPropagation(); // link navigation ko stop kare
          e.preventDefault();  // optional
          toggle(category.id);
        }}
      >
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </span>
    )}
  </button>
</Link>


      {/* Render children only if open */}
      {hasChildren && isOpen && (
        <div className="bg-[#f2f2f2]">
          {category.subcategories!.map((sub) => (
            <CategoryItem
              key={sub.id}
              category={sub}
              expanded={expanded}
              toggle={toggle}
              level={level + 1}
              activeCategoryId={activeCategoryId}
              parentExpanded={isOpen && parentExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// -----------------------------
// Skeleton
// -----------------------------
export const CategoriesSidebarSkeleton = () => {
  return (
    <div className="rounded-xs overflow-hidden mb-5">
      {/* Header */}
      <div className="bg-[#393939] px-3 py-2 border-b-3 border-[#8b8b8b]">
        <div className="h-5 w-44 bg-gray-400 rounded animate-pulse" />
      </div>

      {/* Category list */}
      <div className="py-3 bg-white space-y-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex items-center justify-between px-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
