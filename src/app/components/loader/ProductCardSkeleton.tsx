"use client";
import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const ProductCardSkeleton = () => {
  return (
    <div className="w-full lg:max-w-[1170px] mx-auto">
      <div className="flex  rounded-xl w-full 2xl:max-w-[1719px] 2xl:px-3 px-0">
        <div className="flex flex-col gap-6 w-[20%]">
          {/* Categories Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-20" /> {/* Categories header */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full rounded-sm" />
            ))}
          </div>

          {/* Brands Skeleton */}
          <div className="space-y-3 mt-6">
            <Skeleton className="h-6 w-20" /> {/* Brands header */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full rounded-sm" />
            ))}
          </div>
        </div>
        {/* Breadcrumb Skeleton */}
        <nav
          aria-label="breadcrumb"
          className="flex items-center justify-center lg:justify-normal space-x-2 lg:mb-7 sm:mb-7 mb-7"
        >
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-2 w-2" />
          <Skeleton className="h-3 w-20" />
        </nav>

        <div className="flex flex-wrap justify-center lg:justify-normal lg:flex-nowrap gap-6 lg:gap-8 xl:gap-10">
          {/* ProductLeft Skeleton */}
          <div className="product-left flex flex-col w-[80%] lg:w-[50%]">
            <div className="flex flex-col gap-4">
              {/* Main Image Skeleton */}
              <div className="border-1 border-[#8b8b8b] rounded-2xl flex items-center justify-center bg-white p-4 w-full h-auto aspect-square lg:w-[90%] lg:h-[455px]">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Thumbnails Skeleton */}
              <div className="flex gap-2 overflow-x-auto">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="flex-shrink-0 w-20 h-20 rounded-md"
                  />
                ))}
              </div>

              {/* Trust Badges Skeleton */}
              {/* <div className="flex items-center justify-between gap-0 border-2 border-[#545454] mt-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center flex-1 px-2 ${
                      index < 3 ? "border-r-2 border-[#545454]" : ""
                    }`}
                  >
                    <Skeleton className="w-[90px] h-[90px]" />
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* ProductMiddle Skeleton */}
          <section className="product-middle flex flex-col h-full w-[80%] max-w-full xl:max-w-[50%] 2xl:max-w-[50%]">
            {/* Title Section Skeleton */}
            <div className="flex flex-col gap-2 mb-4">
              <Skeleton className="h-6 w-3/4 mb-3" /> {/* Product name */}
              <Skeleton className="h-4 w-24" /> {/* Brand name */}
            </div>

            {/* Price Section Skeleton */}
            <div className="mb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <Skeleton className="h-4 w-12" /> {/* "Price" label */}
                  <Skeleton className="h-4 w-20" /> {/* Strikethrough price */}
                </div>
                <Skeleton className="h-7 w-28 mb-2" /> {/* Main price */}
                <Skeleton className="h-4 w-32" /> {/* Savings text */}
              </div>
            </div>

            {/* Quantity & Add to Cart Skeleton */}
            <div className="mt-8 mb-6">
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <Skeleton className="h-4 w-20" /> {/* "Quantity:" label */}
                {/* Quantity Selector Skeleton */}
                <Skeleton className="h-9 w-32" />
              </div>

              {/* Add to Cart Button Skeleton */}
              <Skeleton className="h-12 w-full rounded-md mb-3" />

              {/* Bulk Quote Skeleton */}
              <Skeleton className="h-5 w-64" />
            </div>

            {/* Write a Review Skeleton */}
            <div className="mb-3 pb-3 border-b border-[#e5e5e5]">
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Product Details Skeleton */}
            <div className="mb-6">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Skeleton className="h-4 w-24" /> {/* Label */}
                    <Skeleton className="h-4 w-32" /> {/* Value */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
