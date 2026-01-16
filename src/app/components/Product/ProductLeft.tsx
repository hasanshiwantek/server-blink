"use client";
import React from "react";
import Image from "next/image";
import img1 from "@/assets/slug/trustpilot-img.webp";
import img2 from "@/assets/slug/easyReturn-image.webp";
import img3 from "@/assets/slug/fastShipping-img.webp";
import img4 from "@/assets/slug/securePayment-img.webp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const ProductLeft = ({ images, selectedImage, setSelectedImage }: any) => {
  return (
    <div className="product-left flex flex-col  w-full md:px-0 px-10 lg:w-[50%]">
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <figure className="border-1 border-[#8b8b8b]  rounded-2xl flex items-center justify-center bg-white p-4 w-full h-auto aspect-square lg:w-[90%]  lg:h-[455px]">
          <Image
            src={selectedImage || "/default-product-image.svg"}
            alt="Main product image"
            className="object-contain w-full h-full"
            width={500}
            height={500}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
            quality={90}
          />
        </figure>

        {/* Thumbnails - Only show if multiple images */}
        {images && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition ${
                  selectedImage === img
                    ? "border-[#d40511]"
                    : "border-[#e5e5e5] hover:border-[#999]"
                }`}
              >
                <Image
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className="object-contain w-full h-full p-1"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        <TooltipProvider>
          {/* Trust Badges */}
          <div className="flex items-center justify-between gap-0 border-2 border-[#545454] mt-2">
            {/* Trustpilot Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center flex-1 border-r-2  border-[#545454] px-2">
                  <div className="w-[60] h-[60] sm:w-[60] sm:h-[60] mb-2 flex items-center justify-center">
                    <Image
                      src={img1}
                      alt="Trustpilot"
                      width={60}
                      height={60}
                      className="w-[60] h-[60] sm:w-[60] sm:h-[60] object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#3d3d3d] text-white px-4 py-2 rounded-md max-w-[280px] text-base"
              >
                <p>
                  A well-known review website is Trustpilot. It is used by
                  companies of all sizes, from small local businesses to large
                  international corporations.
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Fast Shipping Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center flex-1 border-r-2  border-[#545454]  px-2">
                  <div className="w-[60] h-[60] sm:w-[60] sm:h-[60] mb-2 flex items-center justify-center">
                    <Image
                      src={img2}
                      alt="Fast Shipping"
                      width={60}
                      height={60}
                      className="w-[60] h-[60] sm:w-[60] sm:h-[60] object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#3d3d3d] text-white px-4 py-2 rounded-md max-w-[280px] text-base"
              >
                <p>
                  Express shipping is available. Get your product delivered in
                  as fast as one day
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Easy Return Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center flex-1 border-r-2  border-[#545454]  px-2">
                  <div className="w-[60] h-[60] sm:w-[60] sm:h-[60] mb-2 flex items-center justify-center">
                    <Image
                      src={img3}
                      alt="Easy Return"
                      width={60}
                      height={60}
                      className="w-[60] h-[60] sm:w-[60] sm:h-[60] object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#3d3d3d] text-white px-4 py-2 rounded-md max-w-[280px] text-base"
              >
                <p>
                  Have peace of mind knowing that *replacements/refunds are done
                  promptly
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Secure Payment Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center flex-1 px-2">
                  <div className="w-[60] h-[60] sm:w-[60] sm:h-[60] mb-2 flex items-center justify-center">
                    <Image
                      src={img4}
                      alt="Secure Payment"
                      width={60}
                      height={60}
                      className="w-[60] h-[60] sm:w-[60] sm:h-[60] object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#3d3d3d] text-white px-4 py-2 rounded-md max-w-[280px] text-base"
              >
                <p className="mb-2">
                  Protects both users and merchants from the threats posed by
                  fraudulent payments. Accepted Payment Cards:
                </p>
                <ul className="list-none space-y-1">
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                  <li>Discover</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductLeft;