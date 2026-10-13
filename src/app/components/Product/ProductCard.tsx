"use client";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { addRecentView } from "@/redux/slices/recentSlice";
import { getProductInfo } from "@/utils/product";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductLeft from "./ProductLeft";
import ProductMiddle from "./ProductMiddle";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const { id, sku, productName, productUrl, categoryHierarchy, minQty, maxQty } =
    getProductInfo(product);
  const [quantity, setQuantity] = useState(minQty);
  const [selectedImage, setSelectedImage] = useState("");

  // memoized so ProductLeft gets a stable array between renders
  const images = useMemo(() => getProductInfo(product).images, [product]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (!id) return;

    dispatch(
      addRecentView({
        id: Number(id),
        sku,
      }),
    );
  }, [id, sku, dispatch]);

  const increment = () => {
    if (!maxQty || quantity < maxQty) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => quantity > minQty && setQuantity(quantity - 1);

  return (
    <div className="max-w-full mx-auto">
      <div className=" rounded-xl w-full px-0">
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="hidden md:flex items-center justify-center lg:justify-normal space-x-2 text-[12px] text-[#393939] lg:mb-7 sm:mb-7 mb-7 flex-wrap"
        >
          <h2>
            <Link
              href={"/"}
              className="text-[12px] hover:text-[#D42020]! roboto-sans-font"
              itemProp="name "
            >
              Home
            </Link>

            {categoryHierarchy.map((cat) => (
              <span key={cat.id}>
                <span
                  className="mt-2 mx-3 text-gray-400 text-[11px]"
                  aria-hidden="true"
                >
                  /
                </span>

                <Link
                  href={`/category/${cat?.slug}`}
                  className={`text-[11px]   hover:text-[#D42020]! roboto-sans-font`}
                  itemProp="name"
                >
                  {cat.name}
                </Link>
              </span>
            ))}
            <span
              className="mt-2 mx-3 text-gray-400 text-[11px]"
              aria-hidden="true"
            >
              /
            </span>
            <Link
              href={productUrl}
              className="text-[12px] text-[#D42020]! roboto-sans-font"
              itemProp="name"
            >
              {productName}
            </Link>
          </h2>
        </nav>

        <div className="flex flex-wrap justify-center  lg:justify-normal md:flex-nowrap gap-6 lg:gap-8 xl:gap-8">
          <ProductLeft
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductMiddle
            product={product}
            quantity={quantity}
            increment={increment}
            decrement={decrement}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
