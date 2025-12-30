"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchProductsData } from "@/redux/slices/homeSlice";

// Skeleton loader
const ProductSkeleton = () => (
  <div className="bg-[#f2f2f2] rounded shadow animate-pulse flex flex-col h-full">
    <div className="w-full h-72 mb-2 bg-gray-300 rounded" />
    <div className="px-3 pb-3 flex flex-col flex-1">
      <div className="h-4 bg-gray-300 mb-2 w-1/3 rounded" />
      <div className="h-4 bg-gray-300 mb-2 w-1/2 rounded" />
      <div className="h-4 bg-gray-300 mb-2 w-full rounded" />
      <div className="mt-auto h-8 bg-gray-300 rounded" />
    </div>
  </div>
);

interface FeaturedProductsProps {
  endpoint: string;
  isSlider?: boolean;
  title?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  endpoint,
  isSlider = false,
  title
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { products, error } = useAppSelector((state: any) => state.home);
  const productsData = products?.data || [];

  const [loading, setLoading] = useState(true); // local loading flag

  useEffect(() => {
    setLoading(true); // start loader
    dispatch(fetchProductsData(endpoint))
      .finally(() => setLoading(false)); // stop loader
  }, [dispatch, endpoint]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-transparent py-4 rounded relative">
      <div className="flex items-center justify-between mb-4 bg-[#393939] border-b border-gray-400">
        <h2 className="font-bold text-xl text-white p-3 flex-1">{title}</h2>
        {isSlider && (
          <div className="flex gap-2 ml-2">
            <button
              onClick={scrollLeft}
              className="p-2 hover:bg-gray-800 rounded text-white flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 hover:bg-gray-800 rounded text-white flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {/* Loading */}
      {loading ? (
        <div
          className={
            isSlider
              ? "flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          }
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={isSlider ? "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" : ""}>
              <ProductSkeleton />
            </div>
          ))}
        </div>
      ) : (
        // Render products
        isSlider ? (
          <div ref={sliderRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide">
            {productsData.map((product: any) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsData.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FeaturedProducts;
