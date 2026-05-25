"use client";
import { Input } from "@/components/ui/input";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "world-countries";
import { applyCoupon, removeCoupon } from "@/redux/slices/couponSlice";
import { Country, State, City } from "country-state-city";
import { fetchShippingRates } from "@/redux/slices/shippingSlice";
import { calculatePackage } from "../CheckoutComponent/Shippingstep";
import Image from "next/image";



const OrderSummary = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const { appliedCoupon, discountAmount, loading: couponLoading } = useAppSelector(
    (state: RootState) => state.coupon
  );
  const router = useRouter();

  const [showCoupon, setShowCoupon] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");

  const [shippingData, setShippingData] = useState({
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));
  const stateList = useMemo(() => {
    if (!shippingData.country) return [];
    return State.getStatesOfCountry(shippingData.country).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [shippingData.country]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const shipping = useMemo(() => {

    if (typeof window !== "undefined") {
      const savedCost = localStorage.getItem("shippingCost");
      if (savedCost) return Number(savedCost);
    }

    if (cart.length === 0) return 0;

    return cart.reduce((sum, item) => {
      const cost = Number(item.fixedShippingCost || 0);
      return sum + cost;
    }, 0);
  }, [cart]);

  const shippingLabel = `FedEx priority $${shipping.toFixed(2)}`;

  // Total before discount
  const totalBeforeDiscount = subtotal + shipping;
  const shippingCost = Number(localStorage.getItem("shippingCost"));
  // Final total after discount
  const finalTotal = Math.max(totalBeforeDiscount - discountAmount, 0);
  const { shippingRates, ratesLoader } = useAppSelector((state) => state.shippingZone);
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const pkg = calculatePackage(cart);
    dispatch(fetchShippingRates({
      data: {
        destination: {
          ...shippingData,
          country_code: shippingData?.country?.trim(),
          postal_code: shippingData?.zip?.trim(),
        },
        package: pkg,
      },
    })).unwrap().finally(() => {
      setLoading(false);
    })
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      await dispatch(
        applyCoupon({ couponCode, total: totalBeforeDiscount })
      ).unwrap();
      toast.success("Coupon applied successfully!");
      setCouponCode("");
      setShowCoupon(false); // Close coupon form after success
    } catch (err: any) {
      toast.error(err || "Failed to apply coupon");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const handleProceedToCheckout = useCallback(() => {
    if (!cart.length) {
      toast.error("Please add something");
      return;
    }
    router.push("/checkout");
  }, [cart.length, router]);
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/detect-country"); // apna Next.js route
        const data = await res.json();
        if (data.country_code) {
          setShippingData((prev) => ({
            ...prev,
            country: data.country_code,
            // state: data.state ?? "",
            // city: data.city ?? "",
            // zip: data.zip ?? "",
          }));
        }
        const shippingDataLocal = localStorage.getItem("shippingData"); // Clear any previously saved shipping cost when component mounts
        if (shippingDataLocal) {
          setShippingData(JSON.parse(shippingDataLocal));
        }
      } catch {
        setShippingData({ ...shippingData, country: "US" });
      }
    };

    detectCountry();
  }, []);


  return (
    <div className="border rounded-lg 2xl:w-full">
      {/* Header */}

      {/* Estimate Shipping */}
      <div className="px-6 py-6">
        {/* Subtotal + Shipping */}
        <div className="text-sm text-gray-700 space-y-2 mb-2">
          <div className="flex justify-between py-2">
            <span className="text-[14px] text-[#393939]">Subtotal:</span>
            <span className="text-[14px]">${subtotal.toFixed(2)}</span>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-300 my-3"></div>
          {/* Header */}
          <div className="flex justify-between py-2">
            <span className="text-[14px] text-[#393939]">Shipping:</span>

            {shippingCost ? <span
              className={shippingCost ? "text-[14px] text-red-500 border-b border-red-500 inline-block cursor-pointer" : "text-[14px] border-b border-gray-500 inline-block cursor-pointer"}
              onClick={() => setShowShipping(!showShipping)}
            >
              {!showShipping ? `$${shippingCost.toFixed(2)}` : ""}

            </span> : <span
              className={showShipping ? " text-[14px]  border-b hover:border-red-500 border-gray-500 inline-block cursor-pointer italic hover:text-red-500" : "hover:border-red-500 hover:text-red-500 text-[14px] border-b border-gray-500 inline-block cursor-pointer"}
              onClick={() => setShowShipping(!showShipping)}
            >
              {showShipping ? "Cancel" : "Add info"}
            </span>}
          </div>

          {/* Shipping form */}
          {showShipping && (
            <form
              onSubmit={handleShippingSubmit}
              className="flex flex-col gap-3 mt-4"
            >
              {/* Country */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <label className="w-full md:w-1/3 text-[14px]">Country</label>

                <Select
                  value={shippingData.country}
                  onValueChange={(value) =>
                    setShippingData({ ...shippingData, country: value })
                  }
                >
                  <SelectTrigger className="w-full md:w-2/3 border-none outline-none">
                    <SelectValue placeholder="Choose a Country" />
                  </SelectTrigger>
                  <SelectContent className="w-full md:w-2/3 border-none outline-none">
                    {countryList.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-full md:w-1/3 text-[14px]">
                  State/Province
                </label>
                {stateList.length > 0 ? <Select
                  value={shippingData.state}
                  onValueChange={(value) =>
                    setShippingData({ ...shippingData, state: value })
                  }
                >
                  <SelectTrigger className="w-full md:w-2/3 border-none outline-none">
                    <SelectValue placeholder="Choose a State" />
                  </SelectTrigger>
                  <SelectContent className="w-full md:w-2/3 border-none outline-none">
                    {stateList.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> : <Input
                  className="w-full md:w-2/3"
                  onChange={(e) =>
                    setShippingData({ ...shippingData, state: e.target.value })
                  }
                />}
                {/* <Input
                  className="w-full md:w-2/3"
                  onChange={(e) =>
                    setShippingData({ ...shippingData, state: e.target.value })
                  }
                /> */}
              </div>

              {/* City */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-full md:w-1/3 text-[14px]">Suburb/City</label>
                <Input
                  value={shippingData.city}
                  className="w-full md:w-2/3"
                  onChange={(e) =>
                    setShippingData({ ...shippingData, city: e.target.value })
                  }
                />
              </div>

              {/* Zip */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-full md:w-1/3 text-[14px]">Zip/Postcode</label>
                <Input
                  className="w-full md:w-2/3"
                  value={shippingData.zip}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, zip: e.target.value })
                  }
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-[65%] btn-primary"
                // className="w-full md:w-[65%] p-2 border-b border-black  bg-[#D42020] text-white text-[14px] font-bold"
                >
                  {loading ? "Loading..." : "Estimate Shipping"}
                </button>
              </div>

              {shippingRates?.length > 0 && <div className="">
                {ratesLoader ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 border rounded p-4 animate-pulse">
                      <div className="w-4 h-4 mt-1 bg-gray-200 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-5 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                  ))
                ) : shippingRates?.map((rate, i) => {
                  return <label
                    key={`${rate.method_id}-${rate.service_type}`}
                    className={`flex items-start gap-3  p-4 transition-colors cursor-pointer ${selectedShippingMethod === rate.service_type ? "" : ""}`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={rate.service_type}
                      checked={selectedShippingMethod === rate.service_type}
                      onChange={(e) => setSelectedShippingMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1 flex items-center justify-between gap-3 text-[#545454] text-[14px] ">
                      <div className="flex items-center gap-2 font-normal" >
                        {rate.is_fedex && (
                          <span>
                            FedEx
                          </span>
                        )}
                        <span className="">
                          {rate.is_fedex ? `(${rate.service_name})` : rate.display_name}
                        </span>
                      </div>
                      <div className=" font-bold flex-shrink-0">
                        {rate.total_charge === 0 ? "Free" : `$${Number(rate.total_charge).toFixed(2)}`}
                      </div>
                    </div>
                  </label>
                })}
                <div className="flex justify-end mt-1.5 mb-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedShippingMethod) {
                        toast.error("Please select a shipping method");
                        return;
                      }
                      const selectedRate = shippingRates?.find(
                        (rate: any) => rate.service_type === selectedShippingMethod
                      );
                      const cost = selectedRate ? Number(selectedRate.total_charge).toFixed(2) : "0";
                      localStorage.setItem("shippingCost", cost);
                      localStorage.setItem("shippingData", JSON.stringify(shippingData));
                      window.location.reload(); // Refresh to update totals with new shipping cost
                    }}
                    className="w-full md:w-[55%] text-[18px] btn-primary"
                  // className="w-full md:w-[65%] p-2 border-b border-black  bg-[#D42020] text-white text-[14px] font-bold"
                  >
                    Update Shipping Cost
                  </button>
                </div>
              </div>}

            </form>
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-300 my-3"></div>

          {/* Coupon Section */}
          <div className="flex justify-between py-2">
            <span className="text-[14px] text-[#393939]">Coupon Code: {appliedCoupon ? (appliedCoupon.couponCode.toUpperCase()) : ""}</span>

            {/* If coupon already applied, show it here */}
            {appliedCoupon ? (
              <span className="text-[14px] font-medium">
                -${discountAmount.toFixed(2)}
              </span>
            ) : (
              <span
                className="text-[14px] border-b border-gray-500 inline-block cursor-pointer"
                onClick={() => setShowCoupon(!showCoupon)}
              >
                {showCoupon ? "Cancel" : "Add Coupon"}
              </span>
            )}
          </div>

          {/* Show applied coupon details */}
          {appliedCoupon && (
            <div className="flex gap-3 items-center rounded">
              {/* <span className="text-sm">
                ${Number(appliedCoupon.discountAmount).toFixed(2)} off (
                {appliedCoupon.couponCode.toUpperCase()})
              </span> */}
              <button
                onClick={handleRemoveCoupon}
                className=" text-[14px] underline text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          {/* Coupon input - only show if no coupon applied */}
          {showCoupon && !appliedCoupon && (
            <form
              onSubmit={handleCouponSubmit}
              className="flex flex-col md:flex-row gap-2 my-2"
            >
              <Input
                placeholder="Enter your coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="!max-w-full"
                disabled={couponLoading}
              />

              <button
                type="submit"
                className="border-b border-black px-12 rounded bg-[#D42020] text-white text-[14px] font-bold disabled:opacity-50"
                disabled={couponLoading}
              >
                {couponLoading ? "..." : "Apply"}
              </button>
            </form>
          )}

          {/* Show discount breakdown if applied */}
          {/* {appliedCoupon && discountAmount > 0 && (
            <div className="mt-2">
              <div
                className="flex justify-between items-center text-gray-700 cursor-pointer select-none py-2"
                onClick={() => setDiscountOpen((prev) => !prev)}
              >
                <span className="flex items-center gap-1 text-[14px]">
                  Discounts
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      discountOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                <span className="text-[14px] text-green-600 font-medium">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>

              {discountOpen && (
                <div className="flex justify-between text-gray-600 text-sm mt-1 px-4">
                  <span>
                    ${Number(appliedCoupon.discountAmount).toFixed(2)} off (
                    {appliedCoupon.couponCode.toUpperCase()})
                  </span>
                  <span className="font-medium text-green-600">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )} */}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="text-[14px] text-[#393939]">Grand total:</span>
          <span className="text-[14px] text-[#393939]">
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Savings message */}

        {/* {appliedCoupon && discountAmount > 0 && (
          <div className="text-sm text-green-600 text-right mt-1">
            You saved ${discountAmount.toFixed(2)}!
          </div>
        )} */}

        {/* Buttons */}
        <div className="flex flex-col items-end gap-3 mt-5">
          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;