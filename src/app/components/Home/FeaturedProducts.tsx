"use client";

import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { title } from "process";

interface Product {
  id: number;
  brand: string;
  sku: string;
  name: string;
  price: number;
  oldPrice?: number;
  imgSrc: string;
}

interface FeaturedProductsProps {
  products: Product[];
  isSlider?: boolean; // optional, default false
  title?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  isSlider = false,
  title
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth, // scroll by container width (4 items)
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth, // scroll by container width (4 items)
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-transparent py-4 rounded relative">
      <div className="flex items-center justify-between mb-4 bg-[#393939] border-b border-gray-400">
        <h2 className="font-bold text-xl text-white p-3 flex-1">
          {title}
        </h2>

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

      {isSlider ? (
       <div
  ref={sliderRef}
  className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
>
  {products.map((product) => (
    <div key={product.id}  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <ProductCard product={product} />
    </div>
  ))}
</div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
