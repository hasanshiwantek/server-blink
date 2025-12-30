"use client";

import React from "react";
import Image from "next/image";

interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
}

interface Product {
  id: number;
  brand: Brand | string; // brand object ya string dono aa sakta hai
  sku: string;
  name: string | { name?: string }; // sometimes object, sometimes string
  price: number | string;
  msrp?: number;
  image?: { path?: string }[]; // image array from API
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // safe brand name
  const brandName =
    typeof product.brand === "string"
      ? product.brand
      : product.brand?.name || "Unknown Brand";

  // safe product name
  const productName =
    typeof product.name === "string"
      ? product.name
      : product.name?.name || "Unnamed Product";

  // safe image src
  const imageSrc =
    product.image?.[1]?.path ||
    product.image?.[0]?.path ||
    "/default-product-image.svg";

  return (
    <div className="bg-[#F2F2F2] rounded shadow hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-72 mb-2 bg-white">
        <Image src={imageSrc} alt={productName} fill className="object-contain" />
      </div>

      {/* Info Wrapper */}
      <div className="px-3 pb-3 flex flex-col flex-1">
        <p className="text-[1rem] text-gray-500">{brandName}</p>
        <p className="text-[1rem] text-gray-400 mb-1">Sku: {product.sku}</p>
        <p className="text-[14px] font-medium mb-1 line-clamp-2">{productName}</p>

        <div className="flex flex-col items-start gap-2 mb-2">
          {product.msrp && Number(product.msrp) > 0 && (
            <span className="text-gray-400 text-[1rem]">
              Price $<span className="line-through">{product.msrp}</span>
            </span>
          )}
          <span className="text-[16px] font-bold">${product.price}</span>
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
