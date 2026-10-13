"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { addCart, fetchCartList } from "@/redux/slices/cartsSlice";
import { RootState } from "@/redux/store";
import { errorMessage } from "@/utils/message";
import { getProductInfo } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
interface Brand {
  id: number;
  name: string;
  slug?: string;
  logo?: string;
}

interface Product {
  id: number;
  brand: Brand;
  sku: string;
  name: string;
  price: number | string;
  msrp?: number;
  image?: { path?: string; isPrimary?: number }[]; // image array from API
  slug: string;
  productUrl?: string; // URL for product page
  maxPurchaseQuantity?: number; // optional max quantity
  minPurchaseQuantity?: number; // optional min quantity
  callPricing?: boolean; // optional max quantity
  callForPricingLabel?: string;
  callForPricingPhone?: string;
  purchasabilityStatus?: string; //
  quantity?: number; //
  currentStock?: number; //s
  allowPurchase?: boolean;
}

interface ProductCardProps {
  product: Product;
}

// const robotoCondensedStyle = { fontFamily: '"Roboto Condensed"' };
const robotoCondensedStyle = { fontFamily: "var(--font-roboto-condensed)" };
const robotoStyle = { fontFamily: "var(--font-roboto)" };

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.carts?.items);
  const {
    id,
    productName,
    sku,
    productUrl,
    brandName,
    brandUrl,
    imageSrc,
    price,
    msrp,
    hasMsrp,
    callForPricingLabel,
    callForPricingPhone,
    callForPricingTel,
    availableForSale,
    disabledAddToCart,
    minQty,
    maxQty,
  } = getProductInfo(product);

  return (
    <div className="bg-[#F2F2F2] rounded transition flex flex-col h-full">
      {/* Image */}
      <Link href={productUrl}>
        <div className="relative w-full h-72 mb-2 bg-white">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
            loading="lazy" // ✅ priority hatao, lazy karo
            quality={75}
          />
        </div>
      </Link>
      {/* Info Wrapper */}
      <div
        className="px-3 pb-3 flex flex-col flex-1"
        style={robotoCondensedStyle}
      >
        {brandUrl ? (
          <Link href={brandUrl}>
            <span
              className="text-[12px] text-[#7B7B7B] hover:text-[#D42020]"
              style={robotoCondensedStyle}
            >
              {brandName}
            </span>
          </Link>
        ) : (
          <span
            className="text-[12px] text-[#7B7B7B]"
            style={robotoCondensedStyle}
          >
            {brandName}
          </span>
        )}
        <Link href={productUrl} className="inline-block w-fit">
          <p
            className="text-[1rem] text-gray-400 mb-1 hover:text-[#D42020]"
            style={robotoCondensedStyle}
          >
            Sku: {sku}
          </p>
        </Link>

        <Link href={productUrl}>
          <span
            className="text-[14px] font-bold mb-1 text-[#545454] line-clamp-2 hover:text-[#D42020]"
            style={robotoCondensedStyle}
          >
            {productName}
          </span>
        </Link>

        {!availableForSale ? (
          <div className="flex flex-col items-start gap-2 mb-2">
            <>
              <span className="text-gray-400 text-[1rem]">
                <span className="line-through font-normal!"></span>
              </span>

              {/* New Price */}
              <span className="text-[1rem] font-bold" style={robotoStyle}>
                {callForPricingLabel}:{" "}
                <Link
                  href={callForPricingTel}
                  className="text-[#d40511] underline"
                >
                  {callForPricingPhone}
                </Link>
              </span>
            </>
          </div>
        ) : (
          <div
            className="flex flex-col items-start gap-2 mb-2 "
            style={robotoStyle}
          >
            {hasMsrp ? (
              <>
                {/* Old Price */}
                <span className="text-[#545454] text-[1rem]">
                  Price $
                  <span className="line-through font-normal!">
                    {msrp.toFixed(2)}
                  </span>
                </span>

                {/* New Price */}
                <span className="text-[16px] font-bold">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-[16px] font-bold">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        )}

        {/* Button pushed to bottom */}
        {availableForSale ? (
          <button
            onClick={() => {
              if (availableForSale) {
                const cartItem = cart.find(
                  (item: any) => item.id === id,
                );
                const currentQty = cartItem?.quantity || 0;
                const remaining = maxQty ? maxQty - currentQty : Infinity;
                if (remaining <= 0) {
                  errorMessage(
                    `You have already reached the maximum limit (${maxQty}) for this product.`,
                  );
                  return;
                }
                // dispatch(addToCart(product));
                // Add only up to the allowed maximum
                const quantityToAdd = Math.min(minQty, remaining);

                dispatch(
                  addCart({
                    data: {
                      productId: id,
                      quantity: quantityToAdd,
                    },
                  }),
                )
                  .unwrap()
                  .then(() => {
                    // toast.success(`${productName} added to cart!`);
                    dispatch(fetchCartList());
                    router.push("/cart");
                  })
                  .catch((err) => {
                    errorMessage(err);
                  });
              }
            }}
            disabled={disabledAddToCart}
            // disabled={!availableForSale || cartLoad}
            className="w-full bg-[#CAC9C9] hover:bg-[#D42020] font-bold text-[#393939] border-b-2 border-[#393939] py-1 hover:text-white rounded text-[14px] mt-auto transition disabled:hover:bg-[#CAC9C9] disabled:hover:text-[#393939] disabled:cursor-not-allowed!"
          >
            {"ADD TO CART"}
          </button>
        ) : (
          <button
            onClick={() => {
              router.push(productUrl);
            }}
            className="w-full bg-[#CAC9C9] hover:bg-[#D42020] font-bold text-[#393939] border-b-2 border-[#393939] py-1 hover:text-white rounded text-[14px] mt-auto transition"
          >
            {"CALL FOR PRICING"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
