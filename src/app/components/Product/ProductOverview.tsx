"use client";
import React, { useState } from "react";
import Link from "next/link";
import { decode } from "html-entities";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { formatReviewDate } from "@/const/review";



const Stars = ({ rating }: { rating: number }) => {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <span className="text-[15px] tracking-[1px] text-[#1a1a1a]">
      {"★".repeat(value)}
      <span className="text-[#cfcfcf]">{"★".repeat(5 - value)}</span>
    </span>
  );
};
const tabBase =
  "text-[13px] p-2 sm:w-48 w-full text-center font-bold cursor-pointer transition-colors";
const tabActive = "bg-[#F2F2F2] text-[#545454]";
const tabInactive = "bg-transparent text-[#545454] hover:bg-[#F2F2F2]/70";
const ProductOverview = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const { reviews } = useAppSelector((state: RootState) => state?.storeFront);
  const reviewCount = reviews?.length;
  const customFields = product?.customFields?.filter(
    (item: { name: string; value: string }) => item?.name && item?.value
  );

  const decodedHtml = decode(
    product?.description?.replace(/<pre[^>]*>/gi, "")?.replace(/<\/pre>/gi, "")
  );

  return (
    <section
      className={
        "py-10 xl:px-0 2xl:px-0 w-[100%] lg:w-full max-w-[1170px] mx-auto px-0 " +
        (product?.relatedProductsEnabled ? "border-b-2 border-[#545454]" : "")
      }
      aria-labelledby="product-overview-heading"
    >
      <div className="w-full flex flex-col roboto-condensed-only-font">
        {/* Tabs */}
        <div className="flex justify-center sm:justify-start roboto-condensed-only-font">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`${tabBase} ${activeTab === "overview" ? tabActive : tabInactive}`}
            aria-selected={activeTab === "overview"}
            role="tab"
          >
            Overview
          </button>
          {reviewCount > 0 && <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`${tabBase} ${activeTab === "reviews" ? tabActive : tabInactive}`}
            aria-selected={activeTab === "reviews"}
            role="tab"
          >
            Reviews ({reviewCount})
          </button>}
        </div>

        {activeTab === "overview" && (
          <>
            <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">
              PRODUCT DESCRIPTION
            </h3>
            <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>

            <section className="border" aria-labelledby="product-details-heading">
              <div
                className="
                  p-4
                  bg-[#F2F2F2]
                  text-[14px]
                  text-[#545454]
                  prose
                  max-w-none
                  break-words
                  [&_*]:max-w-full
                  [&_img]:max-w-full
                  [&_img]:h-auto
                  [&_table]:w-full
                  [&_pre]:whitespace-pre-wrap
                  [&_pre]:break-words
                "
                dangerouslySetInnerHTML={{
                  __html: decodedHtml || "No description available for this product.",
                }}
              />

              {customFields?.length > 0 && (
                <>
                  <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">
                    PRODUCT DETAILS
                  </h3>
                  <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>

                  <dl className="py-3 px-6 bg-[#F2F2F2]">
                    {customFields
                      ?.map((item: { name: string; value: string }) => [
                        item.name,
                        item.value,
                      ])
                      ?.map(([key, value]: any, index: number) => (
                        <div
                          key={key}
                          className={`
                            !grid 
                            grid-cols-1 sm:!grid-cols-[200px_1fr]
                            !items-start sm:!items-center
                            !px-2 !py-1
                            ${index % 2 === 1 ? "" : "bg-gray-50"}
                          `}
                        >
                          <dt className="text-[13px] text-[#545454] font-bold mb-1 sm:mb-0">
                            {key}
                          </dt>
                          <dd className="text-[14px]">
                            {key === "Brand" && product?.brand?.name ? (
                              <Link href={`/brand/${product.brand.slug}`}>
                                {value}
                              </Link>
                            ) : (
                              value
                            )}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </>
              )}
            </section>
          </>
        )}

        {activeTab === "reviews" && (
          <>
            <section className="border bg-[#F2F2F2] p-4 text-[#545454]">
              {reviewCount === 0 ? (
                <p className="text-[14px] px-2 py-4">
                  No reviews yet for this product.
                </p>
              ) : (
                <>
                  <div className="flex bg-[#F2F2F2] items-center   text-[#545454] justify-between mb-5">
                    <h3 className="text-[20px] font-medium ">
                      {reviews?.length || 0} Reviews
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowReviews(!showReviews)}
                      className="text-[13px] text-[#888] hover:text-[#333]"
                    >
                      {showReviews ? "Hide Reviews" : "Show Reviews"}
                    </button>
                  </div>
                  {showReviews && (
                    <div >
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                        {reviews?.map((review: any, index: number) => (
                          <li key={review?.id || index} className="min-w-0">
                            <Stars rating={review?.rating} />

                            <p className="mt-1 text-[15px] font-semibold text-[#222]">
                              {review?.subject || "Review"}
                            </p>

                            <p className="mt-0.5 text-[13px] text-[#888]">
                              Posted by{" "}
                              {review?.user_name ||
                                review?.author ||
                                review?.email?.split("@")[0] ||
                                "Customer"}{" "}
                              on {formatReviewDate(review?.created_at)}
                            </p>

                            <p className="mt-2 text-[14px] leading-6 text-[#444] break-words">
                              {review?.comment || ""}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductOverview;