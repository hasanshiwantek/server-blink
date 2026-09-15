"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";
import { fetchLoadSavedQuote } from "@/redux/slices/couponSlice";
const Cart = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const quoteToken = searchParams.get("quoteToken");
  const shouldLoadQuote = action === "loadSavedQuote" && !!quoteToken;
  const { cartLoading, loading } = useAppSelector(
    (state: RootState) => state.carts,
  );
  const auth = useAppSelector((state: RootState) => state?.auth);
  const cartLoad = cartLoading || loading;
  const cartItems = useAppSelector((state: RootState) => state?.carts?.items);
  const cartItemCount =
    cartItems?.reduce(
      (sum: number, item: any) => sum + (item?.quantity ?? 1),
      0,
    ) ?? 0;

  useEffect(() => {
    if (!shouldLoadQuote || !quoteToken || !auth?.isAuthenticated) return;
    dispatch(fetchLoadSavedQuote(quoteToken)).unwrap().then((res) => {
      console.log("res", res);
    });
  }, [shouldLoadQuote, quoteToken]);
  return (
    <main className="flex flex-col gap-8 w-full py-1">
      {/* Container: max-width 1170px, centered */}
      <div className="w-full max-w-[1170px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        {/* Heading */}
        <div className="w-full">
          <h2 className="">
            <span className="text-[11px] sans-font" itemProp="name">
              Home
            </span>{" "}
            <span
              className="mt-2 mx-3 text-gray-400 text-[11px]"
              aria-hidden="true"
            >
              /
            </span>{" "}
            <span
              className="!text-[#D42020] text-[11px] sans-font"
              itemProp="name"
            >
              Your Cart
            </span>
          </h2>

          <h1 className="text-[28px] mt-5 text-[#545454] font-light roboto-font">
            Your Cart ({cartItemCount} items)
          </h1>
          {cartItemCount === 0 && (
            <h1 className="text-[22px] mt-8 text-[#545454] font-light">
              Your cart is empty
            </h1>
          )}
        </div>

        {cartItemCount > 0 && (
          <div className="relative">
            {cartLoad && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <div className="h-10 w-10 rounded-full border-[3px] border-gray-300 border-t-red-500 animate-spin" />
              </div>
            )}

            {/* Cart */}
            <div className="w-full">
              <CartList />
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-[45%] md:ml-auto mt-6">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
