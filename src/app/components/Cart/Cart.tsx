"use client"
import React from "react";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
const Cart = () => {
    const cartItems = useAppSelector((state: RootState) => state?.cart?.items);
  return (
   <main className="flex flex-col gap-8 w-full py-5">
  {/* Container: max-width 1170px, centered */}
  <div className="w-full max-w-[1170px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
    
    {/* Heading */}
    <div className="w-full">
      <h2 className=""><span
                  className="text-[11px]"
                  itemProp="name"
                >
                  Home
                </span> {" "} <span className="mt-2 mx-3 text-gray-400 text-[11px]" aria-hidden="true">/</span> {" "} <span
                  className="!text-[#D42020] text-[11px]"
                  itemProp="name"
                >
                 Your Cart
                </span></h2>

      <h1 className="text-2xl lg:text-4xl mt-5">Your Cart ({cartItems?.length} items)
                 </h1>
    </div>

    {/* Cart List */}
    <div className="w-full">
      <CartList />
    </div>

    {/* Order Summary */}
    <div className="w-full md:w-[45%] xl:self-end">
      <OrderSummary />
    </div>
  </div>
</main>

  );
};

export default Cart;
