"use client";

import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  brand: string;
  sku: string;
  name: string;
  price: number;
  oldPrice?: number;
  imgSrc: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-[#F2F2F2] rounded shadow hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-72 mb-2 bg-white">
        <Image
          src={product.imgSrc}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Info Wrapper */}
      <div className="px-3 pb-3 flex flex-col flex-1">
        <p className="text-[1rem] text-gray-500">{product.brand}</p>
        <p className="text-[1rem] text-gray-400 mb-1">Sku: {product.sku}</p>
        <p className="text-[14px] font-medium mb-1 line-clamp-2">{product.name}</p>

        <div className="flex flex-col items-start gap-2 mb-2">
          {product.oldPrice && (
            <span className="text-gray-400 text-[1rem]">
              Price $<span className="line-through">{product.oldPrice.toFixed(2)}</span>
            </span>
          )}
          <span className="text-[16px] font-bold">${product.price.toFixed(2)}</span>
        </div>

        {/* Button pushed to bottom */}
        <button className="w-full bg-[#CAC9C9] hover:bg-[#D42020] font-bold text-[#393939] border-b-2 border-[#393939] py-1 rounded text-[14px] mt-auto transition">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
