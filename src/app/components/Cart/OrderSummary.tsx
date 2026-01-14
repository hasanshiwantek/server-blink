"use client";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import React, { useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "world-countries";

const OrderSummary = () => {
    const [showCoupon, setShowCoupon] = useState(false);
      const [showShipping, setShowShipping] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const [shippingData, setShippingData] = useState({
  country: "",
  state: "",
  city: "",
  zip: "",
});

const [couponCode, setCouponCode] = useState("");

  const handleShippingSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Shipping Form Data:", shippingData);
};

const handleCouponSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Coupon Code:", couponCode);
};

   

     const countryList = countries
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

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
  <form onSubmit={handleShippingSubmit} className="flex flex-col gap-3 mt-4">
    
    {/* Country */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <label className="w-full md:w-1/3 text-xl">Country</label>

      <Select
        onValueChange={(value) =>
          setShippingData({ ...shippingData, country: value })
        }
      >
        <SelectTrigger className="w-full md:w-2/3 border-none outline-none">
          <SelectValue placeholder="Choose a Country" />
        </SelectTrigger>
        <SelectContent className="w-full md:w-2/3 border-none outline-none">
          {countryList.map((country) => (
            <SelectItem  key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* State */}
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="w-full md:w-1/3 text-xl">State/Province</label>
      <Input
        className="w-full md:w-2/3"
        onChange={(e) =>
          setShippingData({ ...shippingData, state: e.target.value })
        }
      />
    </div>

    {/* City */}
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="w-full md:w-1/3 text-xl">Suburb/City</label>
      <Input
        className="w-full md:w-2/3"
        onChange={(e) =>
          setShippingData({ ...shippingData, city: e.target.value })
        }
      />
    </div>

    {/* Zip */}
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="w-full md:w-1/3 text-xl">Zip/Postcode</label>
      <Input
        className="w-full md:w-2/3"
        onChange={(e) =>
          setShippingData({ ...shippingData, zip: e.target.value })
        }
      />
    </div>

    {/* Submit */}
    <div className="flex justify-end">
      <button
        type="submit"
        className="w-full md:w-[65%] p-2 border-b border-black rounded bg-[#D42020] text-white text-xl font-bold"
      >
        Estimate Shipping
      </button>
    </div>
  </form>
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
  <form
    onSubmit={handleCouponSubmit}
    className="flex flex-col md:flex-row gap-2 my-2"
  >
    <Input
      placeholder="Enter your coupon code"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      className="!max-w-full"
    />

    <button
      type="submit"
      className="border-b border-black px-12 rounded bg-[#D42020] text-white text-xl font-bold"
    >
      Apply
    </button>
  </form>
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
            className="btn-primary"
          >
          Checkout
          </button>

          {/* <button className="w-50 bg-black hover:bg-gray-900 !text-white py-3 h4-medium font-semibold flex items-center justify-center gap-2 transition">
            <img
              src="/checkouticon/googlepay.png"
              alt="Google"
              className="w-20 h-8"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
