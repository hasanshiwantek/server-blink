
import Link from "next/link";
import React from "react";

const ProductOverview = ({ product }: { product: any }) => {
  const customFields = product?.customFields?.filter(
    (item: { name: string; value: string }) => item.name && item.value
  )
  return (
    <section className={"py-10   xl:px-0 2xl:px-0 w-[100%] lg:w-full max-w-[1170px] mx-autu px-0 " + (product.relatedProductsEnabled ? "border-b-2 border-[#545454]" : "")} aria-labelledby="product-overview-heading">
      <div className="w-full  flex flex-col roboto-condensed-only-font" >
        <div className="flex flex-col">
          {/* Main Overview Heading */}
          <div className="flex justify-center sm:justify-start roboto-condensed-only-font  " >
            <h2 className="text-[13px]  bg-[#F2F2F2] p-2 sm:w-48 w-full text-center text-[#545454] font-bold">Overview</h2>
          </div>
          <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">PRODUCT DESCRIPTION</h3>
          <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>
        </div>

        {/* Product Details Section */}
        <section className="border" aria-labelledby="product-details-heading">
          <div
            className="!p-4 bg-[#F2F2F2] text-[14px] text-[#545454] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product?.description || "No description available for this product." }}
          />
          {customFields?.length > 0 && <>
            <h3 className="text-[20px] bg-[#F2F2F2] px-5 text-[#545454] py-2 font-bold">PRODUCT DETAILS</h3>
            <div className="w-[97%] mx-auto h-[1px] bg-[#545454]"></div>

            {/* Key-Value Details */}
            <dl className="py-3 px-6 bg-[#F2F2F2]">
              {customFields?.map((item: {
                name: string; value: string
              }) => [item.name, item.value])?.map(([key, value]: any, index: number) => (
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
