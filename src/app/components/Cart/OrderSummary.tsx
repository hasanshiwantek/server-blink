"use client";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import React, { useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";

const OrderSummary = () => {
    const [showCoupon, setShowCoupon] = useState(false);
      const [showShipping, setShowShipping] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

const shipping = useMemo(() => {
  if (cart.length === 0) return 0;

  return cart.reduce((sum, item) => {
    const cost = Number(item.fixedShippingCost || 0);
    return sum + cost;
  }, 0);
}, [cart]);

const shippingLabel = `FedEx priority $${shipping.toFixed(2)}`;

  const total = subtotal + shipping;

  const handleProceedToCheckout = useCallback(() => {
    if (!cart.length) {
      toast.error("Please add something");
      return;
    }

    router.push("/checkout");
  }, [cart.length, router]);

  return (
    <div className="border rounded-lg 2xl:w-full">
      {/* Header */}

      {/* Estimate Shipping */}
      <div className="px-6 py-6">

        {/* Subtotal + Shipping */}
        <div className="text-sm text-gray-700 space-y-2 mb-2">
          <div className="flex justify-between py-2">
            <span className="text-xl text-[#393939]">Subtotal:</span>
            <span className="text-xl">${subtotal.toFixed(2)}</span>
          </div>
       {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>
            {/* Header */}
      <div className="flex justify-between py-2">
        <span className="text-xl text-[#393939]">
          Shipping:
        </span>

        <span
          className="text-xl border-b border-gray-500 inline-block cursor-pointer"
          onClick={() => setShowShipping(!showShipping)}
        >
          {showShipping ? "Cancel" : "Add info"}
        </span>
      </div>

      {/* Shipping form */}
     {showShipping && (
  <div className="flex flex-col gap-3 mt-4">
    {/* Country */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <label className="text-gray-700 font-medium w-full md:w-1/3 text-xl">Country</label>
      <Input className="w-full !max-w-full md:w-2/3" placeholder="Pakistan" />
    </div>

    {/* State/Province */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <label className="text-gray-700 font-medium w-full md:w-1/3 text-xl">State/Province</label>
      <Input className="w-full !max-w-full md:w-2/3" placeholder="State/Province" />
    </div>

    {/* Suburb/City */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <label className="text-gray-700 font-medium w-full md:w-1/3 text-xl">Suburb/City</label>
      <Input className="w-full !max-w-full md:w-2/3" placeholder="Suburb/City" />
    </div>

    {/* Zip/Postcode + Button */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <label className="text-gray-700 font-medium w-full md:w-1/3 text-xl">Zip/Postcode</label>
        <Input className="w-full !max-w-full md:w-2/3" placeholder="Zip/Postcode" />
    </div>
    {/*  Button */}
    <div className="flex items-center justify-end">
       <button className="w-full md:w-[65%] p-2 border-b border-black rounded bg-[#D42020] !text-white text-xl font-bold hover:bg-[#e04f33] transition">
          Estimate Shipping
        </button>
    </div>
  </div>
)}


                 {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>
           <div className="flex justify-between py-2">
        <span className="text-xl text-[#393939]">
          Coupon Code:
        </span>

        {/* Toggle button */}
        <span
          className="text-xl border-b border-gray-500 inline-block cursor-pointer"
          onClick={() => setShowCoupon(!showCoupon)}
        >
          {showCoupon ? "Cancel" : "Add Coupon"}
        </span>
      </div>

      {/* Coupon input & apply button */}
      {showCoupon && (
        <div className="flex flex-col md:flex-row gap-2 my-2">
          <Input
            id="discountCode"
            placeholder="Enter your coupon code"
            type="text"
            className="!max-w-full"
          />
          <button className="border-b border-black py-2 md:py-0 px-3 md:px-12 rounded bg-[#D42020] !text-white text-xl font-bold hover:bg-[#e04f33] transition">
            Apply
          </button>
        </div>
      )}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="text-xl text-[#393939]">Grand total:</span>
          <span className="text-xl text-[#393939]">
            ${total.toFixed(2)}
          </span>
        </div>
        {/* Buttons */}
        <div className="flex flex-col items-end gap-3 mt-5">
          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="w-50 bg-[#D42020] border-b border-black hover:bg-[#e04f33] !text-white py-2 h4-medium font-semibold mb-2
             transition"
          >
          Checkout
          </button>

          <button className="w-50 bg-black hover:bg-gray-900 !text-white py-3 h4-medium font-semibold flex items-center justify-center gap-2 transition">
            <img
              src="/checkouticon/googlepay.png"
              alt="Google"
              className="w-20 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
