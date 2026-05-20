"use client";
import React, { useEffect, useState } from "react";
import ProductLeft from "./ProductLeft";
import ProductMiddle from "./ProductMiddle";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slices/cartSlice";
import { addRecentView } from "@/redux/slices/recentSlice";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const minQty = product?.minPurchaseQuantity || 1;
  const maxQty = product?.maxPurchaseQuantity;
  const [quantity, setQuantity] = useState(minQty);
  const addtocart = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.name} added to cart!`);
  };

  const images =
    product?.image?.length > 0
      ? product?.image?.map((img: any) => img?.path)
      : [];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    if (!product) return;

    dispatch(
      addRecentView({
        id: product.id,
        sku: product.sku,
        slug: product.slug,
        productUrl: product.productUrl,

        brand: product.brand,

        name: product.name,

        price: product.price,
        msrp: product.msrp,

        image: product.image,
      })
    );
  }, [product, dispatch]);

  const increment = () => {
    if (
      !maxQty ||
      quantity < maxQty
    ) {
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
          className="flex items-center justify-center lg:justify-normal space-x-2 text-[11px] text-[#393939] lg:mb-7 sm:mb-7 mb-7 flex-wrap"
        >
          <h2 className="">
            <Link href={"/"} className="text-[11px]" itemProp="name">
              Home
            </Link>

            {product?.categoryHierarchy?.map((cat: any, index: number) => (
              <span key={cat.id}>
                <span
                  className="mt-2 mx-3 text-gray-400 text-[11px]"
                  aria-hidden="true"
                >
                  /
                </span>

                <Link href={`/category/${cat?.slug}`}
                  className={`text-[11px] ${index === product.categoryHierarchy.length - 1
                    ? "!text-[#D42020]"
                    : "text-black"
                    }`}
                  itemProp="name"
                >
                  {cat.name}
                </Link>
              </span>
            ))}
          </h2>
          {/* <span>Home</span>
          {product.categoryHierarchy?.map((data: any, index: number) => (
          ))}
          <React.Fragment>
            <Image
              className="inline-block align-middle"
              src="/arrow-right.png"
              alt="Arrow Right"
              width={10}
              height={10}
              loading="lazy"
              sizes="12px"
            />
            <span className="text-[11px] text-[var(--primary-color)]">{product?.sku}</span>
          </React.Fragment> */}
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
            addtocart={addtocart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;