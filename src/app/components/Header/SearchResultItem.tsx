"use client";
import { getProductInfo, ProductInfoSource } from "@/utils/product";
import Image from "next/image";
import React from "react";

interface SearchResultItemProps {
  item: ProductInfoSource;
  onSelect: (url: string) => void;
}

const SearchResultItem = ({ item, onSelect }: SearchResultItemProps) => {
  const {
    productName,
    sku,
    productUrl,
    brandName,
    brandUrl,
    imageSrc,
    price,
    costPrice,
    hasCostPrice,
  } = getProductInfo(item);

  // mousedown fires before the search input blurs and closes the dropdown
  const selectOnMouseDown = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(url);
  };

  return (
    <div
      className="border-b-4 border-gray-200 last:border-b-2 hover:bg-gray-50 transition-colors cursor-pointer group"
      onClick={() => onSelect(productUrl)}
    >
      <div className="flex">
        {/* Product Image - Left Side */}
        <div className="w-[160px] min-h-[140px] shrink-0 bg-white border-r border-gray-200 p-3 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={productName}
            width={145}
            height={125}
            fetchPriority="high"
            onMouseDown={selectOnMouseDown(productUrl)}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        {/* Product Details - Right Side */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Brand */}
          {brandUrl ? (
            <p
              onMouseDown={selectOnMouseDown(brandUrl)}
              className="text-[1rem] text-[#545454] uppercase hover:text-[#d42020]"
            >
              {brandName}
            </p>
          ) : (
            <p className="text-[1rem] text-[#545454] uppercase ">{brandName}</p>
          )}

          {/* SKU */}
          <p
            onMouseDown={selectOnMouseDown(productUrl)}
            className="text-[1rem] text-[#545454] mt-0.5 hover:text-[#d42020]"
          >
            Sku: {sku || "N/A"}
          </p>

          {/* Product Name */}
          <p
            onMouseDown={selectOnMouseDown(productUrl)}
            className="text-[14px] font-bold text-[#54545F] leading-tight mt-2 line-clamp-2 min-h-[42px] hover:text-[#d42020]"
          >
            {productName}
          </p>

          {/* Pricing */}
          <div className="mt-auto pt-3">
            {hasCostPrice && (
              <p className="text-[13px] text-gray-500">
                Price{" "}
                <span className="line-through">${costPrice.toFixed(2)}</span>
              </p>
            )}

            <p className="text-[16px] font-bold text-[#545454]  mt-1">
              ${price.toFixed(2)}
            </p>
          </div>

          {/* View Details Button */}
          <button
            onMouseDown={selectOnMouseDown(productUrl)}
            className="font-bold text-[14px] font-roboto-condensed leading-4 uppercase font-robot border-b-[4px] border-b-[#393939] bg-[#cac9c9] text-[#393939] rounded-none hover:bg-[#b81818] hover:border-b-[#6b0107] hover:text-white px-[2.28571rem] py-[0.85714rem] my-0"
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
