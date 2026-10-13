"use client";
import { getProductInfo, ProductInfoSource } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";

interface CartDropdownItemProps {
  item: ProductInfoSource & { quantity?: number };
  onClick: () => void;
}

const CartDropdownItem = ({ item, onClick }: CartDropdownItemProps) => {
  const { productName, productUrl, hasBrand, brandName, imageSrc, price } =
    getProductInfo(item);
  const quantity = item?.quantity ?? 0;

  return (
    <Link
      href={productUrl}
      onClick={onClick}
      className=" px-2 flex gap-3 items-center cursor-pointer border-b border-gray-300 pb-1 last:border-b-0"
    >
      <div className="w-16 h-16 shrink-0 border border-gray-100 rounded-none">
        <Image
          src={imageSrc}
          alt={productName}
          width={64}
          fetchPriority="high"
          height={64}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        {hasBrand && (
          <p className="text-[13px] text-[#393939] inline-block font-bold uppercase">
            {brandName}
          </p>
        )}
        <p className="text-[13px] font-light text-[#d42020] leading-snug whitespace-pre-line wrap-break-word">
          {productName}
        </p>
        <p className="text-[#393939] font-bold text-[13px] mt-1">
          {quantity >= 1 && <span>{quantity} × </span>}${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CartDropdownItem;
