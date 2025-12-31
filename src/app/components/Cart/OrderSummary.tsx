"use client";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";

const OrderSummary = () => {
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
            <span className="h5-regular">Subtotal</span>
            <span className="h5-regular">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="h5-regular">
              Shipping ({shippingLabel})
            </span>
            <span className="h5-regular">${shipping.toFixed(2)}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="h3-secondary">Order total</span>
          <span className="h3-secondary !text-[#FF435C]">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Discount Code */}
        <div className="mt-4 space-y-2">
          <label htmlFor="discountCode" className="h5-regular">
            Apply Discount Code
          </label>
          <div className="flex gap-2 my-2">
            <Input
              id="discountCode"
              type="text"
              className="xl:h-[45.5px] 2xl:h-[60px] !max-w-full"
            />
            <button className="h4-medium border border-black px-4 rounded">
              Apply
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-5">
          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="w-full bg-[#D42020] hover:bg-[#e04f33] !text-white py-5 h4-medium font-semibold rounded-lg mb-3 transition"
          >
          Checkout
          </button>

          <button className="w-full bg-black hover:bg-gray-900 !text-white py-5 h4-medium font-semibold rounded-lg mb-3 flex items-center justify-center gap-2 transition">
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
