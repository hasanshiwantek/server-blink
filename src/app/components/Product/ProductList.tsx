// components/Product/ProductList.tsx

"use client";

import { useState, useEffect } from "react";
import ProductCategoryCard from "./ProductCategoryCard";
// import ProductGridCard from "./ProductGridCard";
import SortingBar from "./SortingBar";
import ProductSkeleton from "../loader/ProductSkeleton";
import Pagination from "@/components/ui/pagination";
import dynamic from "next/dynamic";
import ProductCard from "../../components/Home/ProductCard";


// Dynamically import motion.div and AnimatePresence (client only)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

interface BreadcrumbItem {
  name: string;
  href: string;
}
interface ProductListProps {
  items?: BreadcrumbItem[];
  filters: any;
  setFilters: any;
  products: any[];
  pagination: any;
  isLoading?: boolean;
  error?: string | null;
  filterMeta: any;
  initialCategorydescription?: any;
}

export default function ProductList({
  items,
  filters,
  setFilters,
  products,
  pagination,
  isLoading = false,
  error = null,
  filterMeta,
initialCategorydescription,
}: ProductListProps) {
  const [view, setView] = useState<"list" | "grid">("grid");
  const [page, setPage] = useState(1);
  const total = pagination?.total || 0;
  // ✅ Scroll to top when filters.page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);
  return (
    <section
      className="w-full
        transition-all duration-300
      "
    >
      {/* Headings */}
      <div className="flex items-center justify-between bg-[#393939] border-b border-gray-400">
  {items?.slice(-1).map((item, index) => (
        <h2 key={index} className="font-bold text-xl text-white py-2 px-4 flex-1">
{item.name}
</h2>
  ))}
         </div>
{/* 
          <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-4 px-4 py-6">
    <span className="text-xl font-bold text-center  text-[#545454] cursor-pointer hover:text-[#f15939]">
      Battery Chargers
    </span>
  </div> */}

      {/* <div className="mb-4
        <h2 className="h2-medium ">Heading Text</h2>
        <p className="h4-regular ">
          Do you need to fix your computer or make it work better? At
          NewTownSpares, we have all the IT Accessories you need! It doesn’t
          matter if it’s for your home, work, or even an old computer. We are
          here to help you. We have parts from popular brands like Intel, Dell,
          and HP.
        </p>
      </div> */}

      {/* Sort Bar */}
      <SortingBar
        total={total || 0}
        view={view}
        setView={setView}
        filters={filters}
        setFilters={setFilters}
        filterMeta={filterMeta}
      />

      {/* Error State */}
      {error && (
        <div className="mt-6 text-center text-red-500 font-medium">
          ⚠️ Failed to load products. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products?.length === 0 && (
        <div className="mt-6 text-center text-gray-500 font-medium">
          No products found. Try adjusting your filters.
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <MotionDiv
          key="loading"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-4 ${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }`}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductSkeleton key={idx} view={view} />
          ))}
        </MotionDiv>
      )}

      {/* Product Cards */}
      {!isLoading && !error && products?.length > 0 && (
        <MotionDiv
          key={view}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`mt-4 ${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-4"
          }`}
        >
          <AnimatePresence mode="wait">
            {products.map((product, idx) =>
              view === "list" ? (
                <MotionDiv
                  key={`list-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <ProductCategoryCard product={product} />
                </MotionDiv>
              ) : (
                <MotionDiv
                  key={`grid-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
              <ProductCard key={product.id} product={product} />
                </MotionDiv>
              )
            )}
          </AnimatePresence>
        </MotionDiv>
      )}

      {/* Pagination */}
      {!isLoading && !error && (
        <div className="mt-6 flex justify-start">
          <Pagination
            currentPage={filters.page}
            totalPages={pagination?.lastPage || 1}
            onPageChange={(page) =>
              setFilters((prev: any) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>
      )}
    </section>
  );
}
