"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import ProductPrice from "../productprice/ProductPrice";
import { fetchReviews, fetchStats } from "@/redux/slices/homeSlice";
import Link from "next/link";
import { RootState } from "@/redux/store";
import BulkInquiryModal from "../modal/BulkInquiryModal";

const ProductMiddle = ({ product, quantity, increment, decrement }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const { reviews, reviewsLoading, reviewsError, stats } = useAppSelector(
    (state) => state.home
  );

  const handleSeeMore = useCallback(() => {
    window.open(
      "https://www.trustpilot.com/review/newtownspares.com",
      "_blank"
    );
  }, []);

  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <>
    <section className="product-middle flex flex-col h-full w-[80%] max-w-full  xl:max-w-[50%] 2xl:max-w-[50%] ">
        {/* Title Section */}
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="font-bold text-[18px] sm:text-[18px] md:text-[18px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] leading-tight text-[#545454] border-b-1 border-[#8b8b8b] pb-3">
            {product?.name || "N/A"}
          </h1>

          {/* Brand */}
          <Link href={`/brand/${product?.brand?.slug}`}>
            <h2 className="text-[14px] sm:text-[14px] md:text-[14px] text-[#545454] font-[400] uppercase hover:text-[#d40511] transition">
              {product?.brand?.name || "N/A"}
            </h2>
          </Link>
        </div>

        {/* Price Section */}
        <div className="">
          <div className="flex flex-col">
            {product?.msrp && Number(product?.msrp) > 0 ? (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[16px] text-[#7b7b7b] font-normal">
                    Price
                  </span>
                  <span className="">
                    <ProductPrice
                      price={Number(product?.retailPrice)}
                      inline={true}
                      className="!text-[16px] text-[#7b7b7b] font-normal !line-through" 
                    />
                  </span>
                </div>
                <span className="">
                  <ProductPrice
                    price={Number(product?.price)}
                    inline={true}
                    textColor="#545454"
                    className="text-[#545454] font-bold !text-[22px]"
                  />
                </span>
              </>
            ) : (
              product?.price && (
                <span className="">
                  <ProductPrice
                    price={Number(product?.price)}
                    inline={true}
                    textColor="#545454"
                      className="text-[#545454] font-bold !text-[22px]"
                  />
                </span>
              )
            )}

            {product?.msrp && Number(product?.msrp) > 0 && (
              <span className="text-[#545454] text-[13px] sm:text-[16px]">
                (You save{" "}
                <ProductPrice
                  price={Number(product?.msrp)}
                  inline={true}
                  textColor="#545454"
                  className="!text-[13px] sm:!text-[16px]"
                />
                )
              </span>
            )}
          </div>
        </div>

        {/* Quantity & Add to Cart Section */}
        <div className="mt-8 mb-5">
          <div className="flex items-center gap-1 mb-8 flex-wrap ">
            <span className="text-[14px] sm:text-[14px] text-[#545454] font-bold min-w-[70px]">
              Quantity:
            </span>

            {/* Quantity Selector */}
            <div className="flex items-center border border-[#ddd] rounded">
              <button
                aria-label="Decrease quantity"
                onClick={decrement}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#f5f5f5] transition text-[#4a4a4a] bg-[#cac9c9]  border-b-3 border-[#8b8b8b]"
              >
                <ChevronDown width={15} height={15} />
              </button>

              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 sm:w-14 h-9 sm:h-8 text-center border-x border-[#ddd] text-[15px] sm:text-[16px] font-semibold text-[#545454] outline-none bg-white"
              />

              <button
                aria-label="Increase quantity"
                onClick={increment}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#f5f5f5] transition text-[#4a4a4a] bg-[#cac9c9] border-b-3 border-[#8b8b8b]"
              >
                <ChevronUp width={15} height={15} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            aria-label={`Add ${quantity} ${product?.name} to cart`}
            onClick={() => {
              const existingItem = cart.find(
                (item: any) => item.id === product.id
              );
              const currentQty = existingItem ? existingItem.quantity : 0;
              const remainingQty = product?.maxPurchaseQuantity
                ? product.maxPurchaseQuantity - currentQty
                : quantity;

              if (remainingQty <= 0) {
                toast.error(
                  `Cannot add more than ${product?.maxPurchaseQuantity} units of ${product.name} to cart.`
                );
                return;
              }

              const quantityToAdd = Math.min(quantity, remainingQty);
              dispatch(addToCart({ ...product, quantity: quantityToAdd }));
              toast.success(
                `${product.name} added to cart (${quantityToAdd})!`
              );
            }}
            className="btn-primary lg:!w-[51.7%] !py-3.5"
          >
            ADD TO CART
          </button>

          {/* Bulk Quote Link */}
          <p className="text-[15px] sm:text-[18px] text-[#545454] mt-3 font-normal">
            Looking for a large quantity?{" "}
            <a
              href="#"
              className="text-[var(--primary-color)] hover:underline font-normal"
               onClick={() => setIsModalOpen(true)}
            >
              Request A Bulk Quote
            </a>
          </p>
        </div>

        {/* Write a Review */}
        <div className="mb-3 pb-3 border-b border-[#e5e5e5]">
          <a
            href="#"
            onClick={handleSeeMore}
            className="text-[#393939] font-bold text-[13px] sm:text-[20px] hover:text-[#d40511] underline transition inline-block"
          >
            Write a Review
          </a>
        </div>

        {/* Product Details */}
        <div className="mb-6">
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-[12px] sm:text-[14px] font-bold text-[#545454] ">
                SKU:
              </span>
              <span className="text-[12px] sm:text-[14px] text-[#545454]">
                {product?.sku || "N/A"}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-[12px] sm:text-[14px] font-bold text-[#545454] ">
                Availability:
              </span>
              <span  className="text-[12px] sm:text-[14px] text-[#545454]">
                {product?.availabilityText || "N/A"}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-[12px] sm:text-[14px] font-bold text-[#545454] ">
                Weight:
              </span>
              <span className="text-[12px] sm:text-[14px] text-[#545454]">
                {product?.dimensions?.weight || "N/A"}
              </span>
            </div>

            <div className="flex gap-2">
              <span  className="text-[12px] sm:text-[14px] font-bold text-[#545454] ">
                Shipping:
              </span>
              <span className="text-[12px] sm:text-[14px] text-[#545454]">
                {product?.fixedShippingCost || "Calculated at Checkout"}
              </span>
            </div>
          </div>
        </div>
    </section>
        {/* Bulk Inquiry Modal */}
      <BulkInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={
          product
            ? {
                name: product.name,
                image:  product.image?.[1]?.path ||
    product.image?.[0]?.path ||
    "/default-product-image.svg",
                sku: product.sku ?? "",
              }
            : undefined
        }
      />
    </>
  );
};

export default ProductMiddle;
