"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((m) => m.AnimatePresence),
  { ssr: false }
);

interface CategoryFilterProps {
  categories: any[];
  handleCategoryClick: (
    categoryId: number,
    categoryName: string,
    catSlug: string
  ) => void;
  activeCategoryId?: number;
  expandedCategories?: Set<number>;
  onToggleExpand?: (categoryId: number) => void;
  level?: number;
}

export default function CategoryFilter({
  categories,
  handleCategoryClick,
  activeCategoryId,
  expandedCategories = new Set(),
  onToggleExpand,
  level = 0,
}: CategoryFilterProps) {
  return (
    <ul>
      {categories.map((cat: any) => {
        const isActive = activeCategoryId === cat.id;
        const isExpanded = expandedCategories.has(cat.id);
        const hasChildren = cat.subcategories?.length > 0;

        return (
          <li key={cat.id}>
            {/* Row */}
            <div
               className={`
    flex items-center justify-between text-[15px] transition-colors bg-white hover:bg-[#f9f9f9]
    ${
      isActive
        ? "text-[#D42020] font-medium"   // ✅ ACTIVE
        : "text-[#545454] hover:text-[var(--primary-color)]"
    }
  `}
              style={{ paddingLeft: `${level * 12 + 12}px` }}
            >
              {/* Name */}
              <button
                onClick={() =>
                  handleCategoryClick(cat.id, cat.name, cat.slug)
                }
                className="py-1 text-left flex-1"
              >
                {cat.name}
              </button>

              {/* Chevron */}
              {hasChildren && onToggleExpand && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand(cat.id);
                  }}
                  className="p-1"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Children */}
            {hasChildren && (
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <MotionDiv
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-[#f2f2f2]"
                  >
                    <CategoryFilter
                      categories={cat.subcategories}
                      handleCategoryClick={handleCategoryClick}
                      activeCategoryId={activeCategoryId}
                      expandedCategories={expandedCategories}
                      onToggleExpand={onToggleExpand}
                      level={level + 1}
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
            )}
          </li>
        );
      })}
    </ul>
  );
}
