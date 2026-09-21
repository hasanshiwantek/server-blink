"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  applyCoupon,
  fetchMyCouponUsage,
  removeCoupon,
} from "@/redux/slices/couponSlice";
import {
  addShippingCost,
  checkoutFormSave,
  fetchShippingRate,
  fetchShippingRates,
  getCheckoutForm,
  resetShippingRates,
} from "@/redux/slices/shippingSlice";
import { RootState } from "@/redux/store";
import { Country, State } from "country-state-city";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { calculatePackage } from "../CheckoutComponent/Shippingstep";

const OrderSummary = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.carts?.items);
  const {
    appliedCoupon,
    discountAmount,
    manualDiscount,
    loading: couponLoading,
  } = useAppSelector((state: RootState) => state.coupon);
  const discountTotal = Number(discountAmount) + Number(manualDiscount);

  const router = useRouter();

  const [showCoupon, setShowCoupon] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDetectCountry, setLoadingDetectCountry] = useState(false);
  const [fedexShow, setFedexShow] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const shippingCostLoading = useAppSelector(
    (state: RootState) => state.shippingZone?.loading,
  );
  const { shippingDetail, saveDetail } = useAppSelector(
    (state: any) => state.shippingZone,
  );
  const cartItems = useAppSelector((state: RootState) => state?.carts?.items);
  const [shippingData, setShippingData] = useState({
    country: "",
    state: "",
    city: "",
    zip: "",
  });
  const countryList = useMemo(
    () =>
      Country.getAllCountries().map((c) => ({
        name: c.name,
        code: c.isoCode,
      })),
    [],
  );
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
      const savedCost = Number(shippingDetail?.rate?.total_charge);
      if (savedCost) return Number(savedCost);
    }

    if (cart.length === 0) return 0;

    return cart.reduce((sum, item) => {
      const cost = Number(item.fixedShippingCost || 0);
      return sum + cost;
    }, 0);
  }, [cart, shippingDetail]);

  const packageInfo = useMemo(() => calculatePackage(cart), [cart]);

  const shippingLabel = `FedEx priority $${shipping.toFixed(2)}`;

  // Total before discount
  const totalBeforeDiscount = subtotal + shipping;
  const shippingCost = Number(shippingDetail?.rate?.total_charge);
  // Final total after discount
  const finalTotal = Math.max(totalBeforeDiscount - discountTotal, 0);
  const { shippingRates, ratesLoader } = useAppSelector(
    (state) => state.shippingZone,
  );
  const handleShippingSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const pkg = calculatePackage(cart);
    const { city, zip, country, ...restShippingData } = shippingData;

    dispatch(resetShippingRates());
    dispatch(
      fetchShippingRates({
        data: {
          destination: {
            ...restShippingData,
            country_code: country?.trim(),
            postal_code: zip?.trim(),
            ...(city?.trim() && { city: city.trim() }),
          },
          package: pkg,
        },
      }),
    )
      .unwrap()
      .finally(() => {
        setLoading(false);
        setFedexShow(true);
      });
  };

  const handleCouponSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      await dispatch(
        applyCoupon({
          couponCode,
          total: totalBeforeDiscount,
          productIds: cart.map((item) => item.id),
        }),
      ).unwrap();
      await dispatch(fetchMyCouponUsage());
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
    // if (shippingDetail?.country) return; // already hai, mat karo

    const detectCountry = async () => {
      setLoadingDetectCountry(true);
      try {
        const res = await fetch("/api/detect-country");
        const data = await res.json();
        if (data.country_code) {
          setShowShipping(false);
          // dispatch(fetchShippingRate({}))
          setShippingData((prev) => ({
            ...prev,
            country: data.country_code,
          }));
        }
      } catch {
        setShippingData((prev) => ({ ...prev, country: "US" }));
      } finally {
        setLoadingDetectCountry(false);
      }
    };
    const getShippingRates = async () => {
      try {
        await dispatch(fetchShippingRate({ cartIds: cartItems?.map((item: any) => item.cartItemId) })).unwrap();
      } catch (err) {
        detectCountry();
      }
    };
    getShippingRates();
  }, [cart]);

  useEffect(() => {
    if (shippingDetail?.country) {
      setShippingData({
        country: shippingDetail.country,
        city: shippingDetail.city,
        state: shippingDetail.state,
        zip: shippingDetail.zip,
      });
    }
  }, [shippingDetail]);

  useEffect(() => {
    dispatch(getCheckoutForm());
    dispatch(fetchMyCouponUsage());
  }, [dispatch]);

  return (
    <div className="border rounded-lg 2xl:w-full">
      {/* Header */}

      {/* Estimate Shipping */}
      <div className="px-6 py-6 roboto-font">
        {/* Subtotal + Shipping */}
        <div className="text-sm text-gray-700 space-y-2 mb-2">
          <div className="flex justify-between py-2">
            <span className="text-[14px] font-bold text-[#393939]">
              Subtotal:
            </span>
            <span className="text-[14px]">${subtotal.toFixed(2)}</span>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-300 my-3"></div>
          {/* Header */}
          <div className="flex justify-between py-2">
            <span className="text-[14px] font-bold text-[#393939]">
              Shipping:
            </span>

            {shippingCostLoading || loadingDetectCountry ? (
              <span
                className={
                  showShipping
                    ? " text-[14px] inline-block cursor-pointer italic "
                    : " text-[14px]   inline-block "
                }
              >
                <div className="h-6 w-6 rounded-full border-[3px] border-gray-300 border-t-red-500 animate-spin" />
              </span>
            ) : shippingCost ? (
              <span
                className={
                  shippingCost
                    ? "text-[14px] text-red-500 border-b border-red-500 inline-block cursor-pointer"
                    : "text-[14px] border-b border-gray-500 inline-block cursor-pointer"
                }
                onClick={() => setShowShipping(!showShipping)}
              >
                {!showShipping ? `$${shippingCost.toFixed(2)}` : ""}
              </span>
            ) : (
              <span
                className={
                  showShipping
                    ? " text-[14px]  border-b hover:border-red-500 border-gray-500 inline-block cursor-pointer italic hover:text-red-500"
                    : "hover:border-red-500 hover:text-red-500 text-[14px] border-b border-gray-500 inline-block cursor-pointer"
                }
                onClick={() => setShowShipping(!showShipping)}
              >
                {showShipping ? "Cancel" : "Add info"}
              </span>
            )}
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
                  <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    className="w-[var(--radix-select-trigger-width)] border-none outline-none p-0"
                  >
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
                {stateList.length > 0 ? (
                  <Select
                    value={shippingData.state}
                    onValueChange={(value) =>
                      setShippingData({ ...shippingData, state: value })
                    }
                  >
                    <SelectTrigger className="w-full md:w-2/3 border-none outline-none">
                      <SelectValue placeholder="Choose a State" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      sideOffset={4}
                      avoidCollisions={false}
                      className="w-[var(--radix-select-trigger-width)] border-none outline-none p-0"
                    >
                      {stateList.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    className="w-full md:w-2/3"
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        state: e.target.value,
                      })
                    }
                  />
                )}
              </div>

              {/* City */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-full md:w-1/3 text-[14px]">
                  Suburb/City
                </label>
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
                <label className="w-full md:w-1/3 text-[14px]">
                  Zip/Postcode
                </label>
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
                >
                  {loading ? "Loading..." : "Estimate Shipping"}
                </button>
              </div>

              {shippingRates?.length > 0 && fedexShow && (
                <div>
                  {ratesLoader
                    ? Array.from({ length: 2 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 border rounded p-4 animate-pulse"
                        >
                          <div className="w-4 h-4 mt-1 bg-gray-200 rounded-full shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-5 bg-gray-200 rounded w-16" />
                          </div>
                        </div>
                      ))
                    : shippingRates?.map((rate, i) => {
                        return (
                          <label
                            key={`${rate.method_id}-${rate.service_type}`}
                            className={`flex items-start gap-3  p-4 transition-colors cursor-pointer ${selectedShippingMethod === rate.service_type ? "" : ""}`}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={rate.service_type}
                              checked={
                                selectedShippingMethod === rate.service_type
                              }
                              onChange={(e) =>
                                setSelectedShippingMethod(e.target.value)
                              }
                              className="mt-1"
                            />
                            <div className="min-w-0 flex-1 flex items-center justify-between gap-3 text-[#545454] text-[14px] ">
                              <div className="flex items-center gap-2 font-normal">
                                {rate.is_fedex && <span>FedEx</span>}
                                <span className="">
                                  {rate.is_fedex
                                    ? `(${rate.service_name})`
                                    : rate.display_name}
                                </span>
                              </div>
                              <div className=" font-bold shrink-0">
                                {rate.total_charge === 0
                                  ? "Free"
                                  : `$${Number(rate.total_charge).toFixed(2)}`}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                  <div className="flex justify-end mt-1.5 mb-1.5">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!selectedShippingMethod) {
                          toast.error("Please select a shipping method");
                          return;
                        }
                        const selectedRate = shippingRates?.find(
                          (rate: any) =>
                            rate.service_type === selectedShippingMethod,
                        );
                        const cost = selectedRate
                          ? Number(selectedRate.total_charge).toFixed(2)
                          : "0";

                        const shippingPayload: any = {
                          country: shippingData.country,
                          city: shippingData.city,
                          state: shippingData.state,
                          zip: shippingData.zip,
                          cartId: cartItems.map((item) => item.cartItemId),
                          rate: {
                            service_type: selectedRate?.service_type,
                            method_type: selectedRate?.method_type,
                            total_charge: cost,
                          },
                        };

                        await dispatch(addShippingCost(shippingPayload))
                          .unwrap()
                          .then(() => {
                            if (shippingData && saveDetail) {
                              const updatedShippingFormData = {
                                ...saveDetail.shipping_form_data, // ← existing preserve
                                country: shippingData.country,
                                city: shippingData.city,
                                state: shippingData.state || null,
                                zip: shippingData.zip,
                                shippingMethod: selectedShippingMethod,
                              };

                              dispatch(
                                checkoutFormSave({
                                  data: {
                                    shippingFormData: updatedShippingFormData,
                                    billingFormData:
                                      saveDetail.billing_form_data || {},
                                  },
                                }),
                              );
                            }
                            window.location.reload();
                          });

                        /// Refresh to update totals with new shipping cost
                      }}
                      disabled={shippingCostLoading}
                      className="w-full md:w-[55%] text-[18px] btn-primary"
                      // className="w-full md:w-[65%] p-2 border-b border-black  bg-[#D42020] text-white text-[14px] font-bold"
                    >
                      {shippingCostLoading
                        ? "Loading..."
                        : "Update Shipping Cost"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-300 my-3"></div>

          {/* Coupon Section */}
          <div className="flex justify-between py-2">
            <span className="text-[14px] font-bold text-[#393939]">
              Coupon Code:{" "}
              {appliedCoupon ? appliedCoupon?.couponCode?.toUpperCase() : ""}
            </span>

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

          {manualDiscount > 0 && (
            <>
              {/* Manual Discount */}
              <div className="w-full h-[1px] bg-gray-300 my-3"></div>

              {/* Coupon Section */}
              <div className="flex justify-between py-2">
                <span className="text-[14px] font-bold text-[#393939]">
                  Manual Discount:
                </span>
                <span className="text-[14px] font-medium">
                  -${manualDiscount?.toFixed(2)}
                </span>
              </div>
            </>
          )}

          {/* Show discount breakdown if applied */}
        </div>
        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="text-[14px] font-bold text-[#393939]">
            Grand total:
          </span>
          <span className="text-[14px] text-[#393939]">
            ${finalTotal?.toFixed(2)}
          </span>
        </div>

        {/* Savings message */}

        {/* Buttons */}
        <div className="flex flex-col items-end gap-3 mt-5">
          <button
            type="button"
            disabled={shippingCostLoading || loadingDetectCountry}
            onClick={handleProceedToCheckout}
            className="btn-primary"
          >
            Checkout
          </button>

          <div className="w-full flex justify-end">
            <div className="w-full md:w-auto min-w-[200px]">
              {/* <StripeWalletButton
                amount={finalTotal}
                totalWeight={packageInfo.total_weight}
                itemCount={packageInfo.item_count}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
