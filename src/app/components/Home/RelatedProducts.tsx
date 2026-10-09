"use client";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { successMessage } from "@/utils/message";
import { getProductInfo, ProductInfoSource } from "@/utils/product";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BulkInquiryModal from "../modal/BulkInquiryModal";
import ProductPrice from "../productprice/ProductPrice";

type RelatedProductItem = ProductInfoSource;

const RelatedProductCard = ({
  product,
  onGetQuote,
}: {
  product: RelatedProductItem;
  onGetQuote: () => void;
}) => {
  const dispatch = useAppDispatch();
  const {
    productName,
    skuUrl,
    brandName,
    imageSrc,
    price,
    stockStatusText,
    disabledAddToCart,
  } = getProductInfo(product);

  return (
    <div className="group relative flex flex-col justify-evenly items-start w-full xl:w-[101.5%] xl:h-[335.55px] 2xl:w-[100.4%] 2xl:h-[449px] border border-[#D6D6D6] rounded-md bg-white p-4 lg:p-6 overflow-hidden">
      {/* Product Image */}
      <div className="w-full flex items-center justify-center xl:h-[225px] 2xl:h-[240px] mb-4">
        <Image
          src={imageSrc}
          alt={productName}
          width={200}
          height={100}
          className="object-contain h-full w-auto  xl:h-[185px] lg:h-[185px] md:h-[185px]"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          quality={80}
          fetchPriority="high"
        />
      </div>

      {/* Product Name (2 lines max, fixed height) */}
      <Link
        href={skuUrl}
        className="relative inline-block cursor-pointer group"
      >
        <p className="h6-18-px-medium line-clamp-2 min-h-[3rem]">
          {productName}
        </p>
      </Link>

      {/* Brand + Availability + Price (reserve space) */}
      <div className="flex flex-col justify-between min-h-[4.5rem] mt-2">
        <h3 className="h7-16-px-regular line-clamp-1">
          {brandName} | {stockStatusText}
        </h3>
        <p className="h6-18-px-medium group-hover:invisible">
          <ProductPrice price={price} inline className="h6-18-px-medium" />
        </p>
      </div>

      {/* Action Buttons → Always bottom aligned */}
      <div
        className="absolute bottom-5 xl:bottom-8 left-0 right-0 flex justify-center gap-3 
                                opacity-0 translate-y-10 group-hover:translate-y-4 
                                lg:group-hover:translate-y-6 group-hover:opacity-100 
                                transition-all duration-300 p-2"
      >
        <button
          name="cart"
          onClick={() => {
            dispatch(addToCart(product as any));
            successMessage(`${productName} added to cart!`);
          }}
          disabled={disabledAddToCart}
          className="btn-primary xl:!text-2xl 2xl:!text-[22px] 2xl:!font-medium
                               w-full sm:w-[48%] md:w-[45%] lg:w-[50%] xl:w-[45%]
                               2xl:w-[173.875px] 2xl:h-[50px] whitespace-nowrap
                               disabled:bg-gray-300! disabled:text-gray-700! disabled:cursor-not-allowed!"
        >
          Add to Cart
        </button>

        <button
          name="getQuote"
          onClick={onGetQuote}
          className="xl:!text-2xl 2xl:!text-[22px] 2xl:!font-medium 
                               w-full sm:w-[48%] md:w-[45%] lg:w-[50%] xl:w-[45%]
                               2xl:w-[173.875px] 2xl:h-[50px] mr-2
                               text-[#4A4A4A] bg-white border border-[#4A4A4A] 
                               rounded-md px-4 py-2 transition-all my-1 duration-200 cursor-pointer whitespace-nowrap"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

const RelatedProduct = ({ products }: { products: RelatedProductItem[] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 👈 direction detect
  const itemsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<RelatedProductItem | null>(null);

  const handlePrev = () => {
    setDirection(-1); // 👈 going left
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setDirection(1); // 👈 going right
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, products.length - itemsPerPage),
    );
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const selectedInfo = selectedProduct ? getProductInfo(selectedProduct) : null;
  const selectedProductInfo = selectedInfo
    ? {
        name: selectedInfo.productName,
        image: selectedInfo.imageSrc,
        sku: selectedInfo.sku || String(selectedInfo.id ?? ""),
      }
    : undefined;

  return (
    <>
      <h2 className="h1-secondary-medium">Related Products</h2>
      <div className="my-8 relative w-full max-w-[1719px] mx-auto ">
        {/* AnimatePresence for smooth slide */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={startIndex}
            initial={{ x: direction > 0 ? 300 : -300 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 
                 gap-10  relative justify-items-center "
          >
            {visibleProducts?.map((product) => (
              <RelatedProductCard
                key={product?.id}
                product={product}
                onGetQuote={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow */}
        <button
          name="left"
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 
                     md:-left-23 border-2 text-[#F15939] 
                     rounded-full p-6 2xl:p-8 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft className="w-[10px]" />
        </button>

        {/* Right Arrow */}
        <button
          name="right"
          onClick={handleNext}
          disabled={startIndex >= products.length - itemsPerPage}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     md:-right-23 border-2 text-[#F15939] 
                     rounded-full p-6 2xl:p-8 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight className="w-[10px]" />
        </button>
      </div>
      <BulkInquiryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProductInfo}
      />
    </>
  );
};

export default RelatedProduct;
