"use client";

import Link from "next/link";
import React from "react";

const ProductOverview = ({ product }: { product: any }) => {

  return (
    <section className={"py-10   xl:px-0 2xl:px-0 w-[100%] lg:w-full max-w-[1170px] mx-autu px-0 " + (product.relatedProductsEnabled ? "border-b-2 border-[#545454]" : "")} aria-labelledby="product-overview-heading">
      <div className="w-full  flex flex-col">
        <div className="flex flex-col">
          {/* Main Overview Heading */}
          <div className="flex justify-center sm:justify-start  ">
            <h2 className="text-[13px]  bg-[#F2F2F2] p-2 sm:w-48 w-full text-center text-black font-bold">Overview</h2>
          </div>
          <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">PRODUCT DESCRIPTION</h3>
          <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>

          {/* Intro Paragraph */}

          {/* <div className="description-content" 
         dangerouslySetInnerHTML={{ __html: product?.description }}>
    </div> */}
          {/* <p className="h5-regular !leading-relaxed w-full xl:w-[60rem] 2xl:w-[80rem]">
            Introducing the {product?.name || "N/A"}, a versatile solution for
            your networking needs. This product is manufactured by
            {product?.brand?.name || "N/A"}, offering reliable performance for
            enterprises and organizations.
          </p> */}

          {/* Key Features */}
          {/* <section className="" aria-labelledby="key-features-heading">
            <h3 className="h5-regular !mb-2">Key Features:</h3>
            <ul className="!list-disc !list-inside !space-y-3">
              <li className="h5-regular">
                <span className="">SKU:</span> {product?.sku || "N/A"}
              </li>
              <li className="h5-regular">
                <span className="">MPN:</span> {product?.mpn || "N/A"}
              </li>
              <li className="h5-regular">
                <span className="">Brand:</span> {product?.brand?.name || "N/A"}
              </li>
              <li className="h5-regular">
                <span className="">Category:</span>{" "}
                {product?.categories?.[0]?.name || "N/A"}
              </li>
              <li className="h5-regular">
                <span className="">Availability:</span>{" "}
                {product?.availabilityText || "N/A"}
              </li>
              <li className="h5-regular">
                <span className="">Weight:</span>{" "}
                {product?.dimensions?.weight
                  ? `${product.dimensions.weight} lbs`
                  : "N/A"}
              </li>
            </ul>
          </section> */}

          {/* Closing Paragraph */}
          {/* <p
            className="!mb-10 !leading-relaxed h5-regular"
            dangerouslySetInnerHTML={{
              __html:
                product?.metaDescription ||
                product?.description ||
                "No description available for this product.",
            }}
          ></p> */}
        </div>

        {/* Product Details Section */}
        <section className="border" aria-labelledby="product-details-heading">
          {/* <div className="p-4">
          </div> */}
          <h2 className="!p-4 bg-[#F2F2F2]">{product?.metaDescription || "N/A"}</h2>
          {product?.customFields.length > 0 && <>
            <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">PRODUCT DETAILS</h3>
            <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>

            {/* Key-Value Details */}
            <dl className="py-3 px-6 bg-[#F2F2F2]">
              {[
                ...product?.customFields?.map((item: {
                  name: string; value: string

                }) => [item.name, item.value])
              ].map(([key, value], index) => (
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
          </>}
        </section>
      </div>
    </section>
  );
};

export default ProductOverview;
