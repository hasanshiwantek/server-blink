"use client";
import React, { useEffect, useState } from "react";
import ProductLeft from "./ProductLeft";
import ProductMiddle from "./ProductMiddle";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slices/cartSlice";
import { addRecentView } from "@/redux/slices/recentSlice";
import Link from "next/link";
import { RootState } from "@/redux/store";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const minQty = product?.minPurchaseQuantity || 1;
  const maxQty = product?.maxPurchaseQuantity;
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const availableForSale = product?.purchasabilityStatus == "available" && Number(product?.price) > 0;

  const [quantity, setQuantity] = useState(minQty);
  const roboto = "'Roboto', sans-serif";
  const addtocart = () => {
    if (availableForSale) {
      const cartItem = cart.find((item: any) => item.id === product.id);

      const currentQty = cartItem?.quantity || 0;
      const remaining = maxQty ? maxQty - currentQty : Infinity;
      if (remaining <= 0) {
        toast.error(`You have already reached the maximum limit (${maxQty}) for this product.`);
        return;
      }
      // dispatch(addToCart(product));
      // Add only up to the allowed maximum
      const quantityToAdd = Math.min(minQty, remaining);

      dispatch(
        addToCart({
          ...product,
          quantity: quantityToAdd,
          minPurchaseQuantity: minQty,
          maxPurchaseQuantity: maxQty,
        })
      );
      toast.success(`${product.name} added to cart!`);
      // router.push("/cart")
    }
    // dispatch(addToCart(product));
    // toast.success(`${product?.name} added to cart!`);
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
        purchasabilityStatus: product?.purchasabilityStatus
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
          className="hidden md:flex items-center justify-center lg:justify-normal space-x-2 text-[11px] text-[#393939] lg:mb-7 sm:mb-7 mb-7 flex-wrap"
        >
          <h2>
            <Link href={"/"} className="text-[11px] hover:!text-[#D42020]" itemProp="name" style={{ fontFamily: roboto }}>
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
                  className={`text-[11px]   hover:!text-[#D42020]`}
                  style={{ fontFamily: roboto }}
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
            <Link href={product?.productUrl} className="text-[11px] !text-[#D42020]" itemProp="name" style={{ fontFamily: roboto }}>
              {product?.name}
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
            addtocart={addtocart}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;