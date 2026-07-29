"use client";

import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { addCart, fetchCartList } from "@/redux/slices/cartsSlice";
interface Brand {
  id: number;
  name: string;
  slug?: string;
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
  productUrl?: string; // URL for product page
  maxPurchaseQuantity?: number; // optional max quantity
  minPurchaseQuantity?: number; // optional min quantity
  callPricing?: boolean; // optional max quantity
  purchasabilityStatus?: string; //
  quantity?: number; //
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
  const { cartLoading, loading } = useAppSelector(
    (state: RootState) => state.carts,
  );
  const cartLoad = cartLoading || loading;

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
    product.image?.[0]?.path ||
    product.image?.[1]?.path ||
    "/default-product-image.svg";
  const brandSlug =
    typeof product.brand === "object" ? product?.brand?.slug : undefined;
  const availableForSale =
    product?.purchasabilityStatus == "available" && Number(product?.price) > 0;

  return (
    <div className="bg-[#F2F2F2] rounded transition flex flex-col h-full">
      {/* Image */}
      <Link href={product?.productUrl || "/"}>
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
        <Link href={`/brand/${brandSlug || "/"}`}>
          <span
            className="text-[12px] text-[#7B7B7B] hover:text-[#D42020]"
            style={robotoCondensedStyle}
          >
            {brandName}{" "}
          </span>
        </Link>
        <p
          className="text-[1rem] text-gray-400 mb-1 hover:text-[#D42020]"
          style={robotoCondensedStyle}
        >
          Sku: {product.sku}
        </p>
        <Link href={product?.productUrl || "/"}>
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
                <span className="line-through !font-normal"></span>
              </span>

              {/* New Price */}
              <span className="text-[1rem] font-bold  " style={robotoStyle}>
                Call for pricing:
                {/* <Link
              href="tel:+15022063033"
              className="text-[#d40511] underline">
              (502) 206-3033
            </Link> */}
                <Link
                  href="tel:+15020000000"
                  className="text-[#d40511] underline"
                >
                  (502) 000-0000
                </Link>
              </span>
            </>
          </div>
        ) : (
          <div
            className="flex flex-col items-start gap-2 mb-2 "
            style={robotoStyle}
          >
            {product?.msrp && Number(product.msrp) > 0 ? (
              <>
                {/* Old Price */}
                <span className="text-[#545454] text-[1rem]">
                  Price $
                  <span className="line-through !font-normal">
                    {(Number(product.price) + Number(product.msrp)).toFixed(2)}
                  </span>
                </span>

                {/* New Price */}
                <span className="text-[16px] font-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-[16px] font-bold">
                ${Number(product.price)}
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
                  (item: any) => item.id === product.id,
                );
                const minQty = product.minPurchaseQuantity || 1;
                const maxQty = product.maxPurchaseQuantity;
                const currentQty = cartItem?.quantity || 0;
                const remaining = maxQty ? maxQty - currentQty : Infinity;
                if (remaining <= 0) {
                  toast.error(
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
                      productId: product?.id,
                      quantity: quantityToAdd,
                    },
                  }),
                )
                  .unwrap()
                  .then(() => {
                    toast.success(`${product.name} added to cart!`);
                    dispatch(fetchCartList());
                    router.push("/cart");
                  });
              }
            }}
            disabled={!availableForSale || cartLoad}
            className="w-full bg-[#CAC9C9] hover:bg-[#D42020] font-bold text-[#393939] border-b-2 border-[#393939] py-1 hover:text-white rounded text-[14px] mt-auto transition"
          >
            {"ADD TO CART"}
          </button>
        ) : (
          <button
            onClick={() => {
              router.push(product?.productUrl || "/");
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
