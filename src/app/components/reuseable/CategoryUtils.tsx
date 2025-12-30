"use client";
import {  ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";


interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

interface Props {
  category: Category;
  expanded: Set<number>;
  toggle: (id: number) => void;
  level?: number;
}

export const CategoryItem = ({ category, expanded, toggle, level = 0 }: Props) => {
  const hasChildren = category.subcategories && category.subcategories.length > 0;
  const isOpen = expanded.has(category.id);

  return (
    <div>
     <Link href={`/category/${category?.slug}`}>
      <button
        onClick={() => hasChildren && toggle(category.id)}
        className={`w-full px-3 py-1 flex items-center justify-between
          hover:text-[var(--primary-color)] transition-colors
          text-[15px] font-normal text-[#545454]`}
        style={{ paddingLeft: `${level * 6 + 6}px` }}
      >
        <span>{category.name}</span>

        {hasChildren &&
          (isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          ))}
      </button>
     </Link>

      {hasChildren && isOpen && (
        <div className="bg-[#f2f2f2]">
          {category.subcategories!.map((sub) => (
            <CategoryItem
              key={sub.id}
              category={sub}
              expanded={expanded}
              toggle={toggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};




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
          <div
            key={item}
            className="flex items-center justify-between px-3"
          >
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

