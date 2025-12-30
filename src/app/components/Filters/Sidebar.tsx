"use client";

import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import only the motion.div wrapper
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);
export default function Sidebar({
  categories,
  brands,
  filters,
  setFilters,
  products,
  filterMeta,
  setFilterMeta,
  isBrandPage,
  isCategoryPage,
}: {
  categories: any;
  brands: any;
  filters: any;
  setFilters: any;
  products: any;
  filterMeta: any;
  setFilterMeta: any;
  isBrandPage?: boolean;
  isCategoryPage?: boolean;
}) {
  // const [expandedCategorySection, setExpandedCategorySection] = useState<
  //   string | null
  // >(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const router = useRouter();
  const params = useParams();
  // const toggleCategorySection = (section: string) => {
  //   setExpandedCategorySection((prev) => (prev === section ? null : section));
  // };
   
 const handleToggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId); // collapse
      } else {
        newSet.add(categoryId); // expand
      }
      return newSet;
    });
  };

  // ✅ Category click: update filter + URL (only if not on brand page)
  const handleCategoryClick = (catId: number, name: string, slug?: string) => {
    setFilters((prev: any) => ({
      ...prev,
      categoryIds: [catId],
      page: 1,
    }));
    setFilterMeta((prev: any) => ({ ...prev, categoryName: name }));

    // Only navigate if we're NOT on a brand page
    // If on brand page, just update filters without changing URL
    if (slug && !isBrandPage) {
      router.push(`/category/${slug}`);
    }
  };

  // user clicks a brand
  const handleBrandClick = (brandId: number, name: string, slug?: string) => {
    setFilters((prev: any) => ({
      ...prev,
      brandId,
      page: 1,
    }));
    setFilterMeta((prev: any) => ({ ...prev, brandName: name }));

    // Only navigate if we're NOT on a category page
    // If on category page, just update filters without changing URL
    if (slug && !isCategoryPage) {
      router.push(`/brand/${slug}`);
    }
  };

  // ✅ Utility: Find a category by slug and return its parent chain
  const findParentChain: any = (
    cats: any[],
    slug: string,
    chain: any[] = []
  ) => {
    for (const cat of cats) {
      if (cat.slug === slug) return [...chain, cat];
      if (cat.subcategories?.length) {
        const found = findParentChain(cat.subcategories, slug, [...chain, cat]);
        if (found) return found;
      }
    }
    return null;
  };

  // ✅ When URL slug changes, auto-expand matching categories
 useEffect(() => {
    if (params?.slug && categories?.length > 0) {
      const chain = findParentChain(categories, params.slug);
      if (chain && chain.length > 0) {
        // Auto-expand all parents in the chain
        const idsToExpand = chain.map((c: any) => c.id);
        setExpandedCategories(new Set(idsToExpand));
      }
    }
  }, [params?.slug, categories]);

  return (
    <aside
      className="
      flex flex-col gap-5 w-full  rounded-xl
      transition-all duration-300
    "
    >
      <div className="border rounded-xl">
           {/* Header */}
      <div className="bg-[#393939] px-3 py-1 uppercase tracking-wide border-b-3 border-[#8b8b8b]">
        <h2 className="h2-bold">SHOP BY CATEGORY</h2>
      </div>

        <ul className="py-2 space-y-2">
          <li>
            <CategoryFilter
            categories={categories}
            handleCategoryClick={handleCategoryClick}
            activeCategoryId={filters?.categoryIds?.[0]}
            expandedCategories={expandedCategories}
            onToggleExpand={handleToggleExpand}
          />
          </li>
        </ul>
      <div className="bg-[#393939] px-3 py-1 uppercase tracking-wide border-b-3 border-[#8b8b8b] mt-8">
        <h2 className="h2-bold">SHOP BY BRAND</h2>
      </div>

        <ul className="py-2 space-y-2">
          <li>  
            <AnimatePresence initial={false}>
                <MotionDiv
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <BrandFilter
                    brands={brands}
                    handleBrandClick={handleBrandClick}
                    activeBrandId={filters?.brandId}
                  />
                </MotionDiv>
            </AnimatePresence>
          </li>
        </ul>
      </div>

    </aside>
  );
}
