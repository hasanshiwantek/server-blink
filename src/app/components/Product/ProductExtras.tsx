"use client"; // ⚠️ Must be a Client Component

import dynamic from "next/dynamic";

const ProductFAQs = dynamic(
  () => import("@/app/components/Product/ProductFAQs"),
  { ssr: false, loading: () => <p>Loading FAQs...</p> }
);

const ProductReview = dynamic(
  () => import("@/app/components/Product/ProductReview"),
  { ssr: false, loading: () => <p>Loading Reviews...</p> }
);

const RelatedProduct = dynamic(
  () => import("@/app/components/Home/RelatedProducts"),
  { ssr: false, loading: () => <p>Loading Related Products...</p> }
);

const FeaturedProducts = dynamic(
  () => import("@/app/components/Home/FeaturedProducts"),
  { ssr: false, loading: () => <p>Loading Recommended Products...</p> }
);

interface Props {
  products: any[];
}

export default function ProductExtras({ products }: Props) {
  return (
    <>
      {/* <ProductFAQs /> */}
      {/* <ProductReview /> */}
       <FeaturedProducts endpoint="web/products/featured-products" isSlider={true} title="RECOMMENDED"  />
    </>
  );
}
