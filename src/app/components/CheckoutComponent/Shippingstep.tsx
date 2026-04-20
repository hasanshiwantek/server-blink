"use client";
import React, { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  useWatch,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchShippingRates } from "@/redux/slices/shippingSlice";

interface ShippingStepProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
  onContinue: () => void;
  countryList: Array<{ name: string; code: string }>;
  isActive: boolean;
  isCompleted: boolean;
  onEdit?: () => void;
  shippingInfo?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

const ShippingStep: React.FC<ShippingStepProps> = ({
  register,
  errors,
  control,
  onContinue,
  countryList,
  isActive,
  isCompleted,
  onEdit,
  shippingInfo,
}) => {
  const { shippingRates, ratesLoader } = useAppSelector((state) => state.shippingZone);
  const dispatch = useAppDispatch()
  // Watch form values to check if shipping address is complete
  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });
  const address1 = useWatch({ control, name: "address1" });
  const city = useWatch({ control, name: "city" });
  const country = useWatch({ control, name: "country" });
  const zip = useWatch({ control, name: "zip" });
  const state = useWatch({ control, name: "state" });

  // Check if all required fields are filled
  const isShippingComplete = useMemo(() => {
    return !!(
      firstName?.trim() &&
      lastName?.trim() &&
      address1?.trim() &&
      city?.trim() &&
      country?.trim() &&
      zip?.trim()
    );
  }, [firstName, lastName, address1, city, country, zip]);
  useEffect(() => {
    if (!city?.trim() && !country?.trim() && !zip?.trim() && !state?.trim()) return;
    const timer = setTimeout(() => {
      dispatch(fetchShippingRates({
        data: {
          destination: {
            country_code: country.trim(),
            city: city.trim(),
            "state": state.trim(),
            postal_code: zip.trim(),
          },
          "package": {
            "total_weight": 2.5,
            "weight_unit": "LB",
            "package_length": 10,
            "package_width": 6,
            "package_height": 4,
            "dimension_unit": "IN",
            "order_total": 75.00,
            "item_count": 1,
            "package_value": 75.00
          }
        },
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, [city, country, zip, state]);



  console.log("shippingRates, ratesLoader", shippingRates
    , ratesLoader);


  if (isCompleted && !isActive) {
    return (
      <div className="flex items-start justify-between">
        <div className="text-base text-gray-600">
          <p>
            {shippingInfo?.firstName} {shippingInfo?.lastName}
          </p>
          <p>{shippingInfo?.address}</p>
          <p>
            {shippingInfo?.city}, {shippingInfo?.state} {shippingInfo?.zip}
          </p>
          <p>{shippingInfo?.country}</p>
        </div>
        <button type="button" onClick={onEdit} className="btn-primary">
          EDIT
        </button>
      </div>
    );
  }

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <div>
        <h3 className="text-sm font-medium mb-4 text-gray-700">
          Shipping Address
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className={cn(
                "mb-2 text-base",
                errors.firstName ? "text-red-500" : "text-gray-700"
              )}
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              className={`w-full !max-w-full h-[40px] ${errors.firstName ? "border-red-500" : ""
                }`}
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className={cn(
                "mb-2 text-base",
                errors.lastName ? "text-red-500" : "text-gray-700"
              )}
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              className={`w-full !max-w-full h-[40px] ${errors.lastName ? "border-red-500" : ""
                }`}
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="company"
            className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
          >
            <span>Company Name</span>
            <span className="shrink-0 text-gray-400">(Optional)</span>
          </label>
          <Input
            id="company"
            type="text"
            className="w-full !max-w-full h-[40px]"
            {...register("company")}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="phone"
            className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
          >
            <span>Phone Number</span>
            <span className="shrink-0 text-gray-400">(Optional)</span>
          </label>
          <Input
            id="phone"
            type="text"
            className="w-full !max-w-full h-[40px]"
            {...register("phone")}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="address1"
            className={cn(
              "mb-2 text-base",
              errors.address1 ? "text-red-500" : "text-gray-700"
            )}
          >
            Address Line 1
          </label>
          <Input
            id="address1"
            type="text"
            className={`w-full !max-w-full h-[40px] ${errors.address1 ? "border-red-500" : ""
              }`}
            {...register("address1", {
              required: "Address is required",
            })}
          />
          {errors.address1 && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address1.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="address2"
            className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
          >
            <span>Address Line 2</span>
            <span className="shrink-0 text-gray-400">(Optional)</span>
          </label>
          <Input
            id="address2"
            type="text"
            className="w-full !max-w-full h-[40px]"
            {...register("address2")}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="city"
            className={cn(
              "mb-2 text-base",
              errors.city ? "text-red-500" : "text-gray-700"
            )}
          >
            City
          </label>
          <Input
            id="city"
            type="text"
            className={`w-full !max-w-full h-[40px] ${errors.city ? "border-red-500" : ""}`}
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">
              {errors.city.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="country"
            className={cn(
              "mb-2 text-base",
              errors.country ? "text-red-500" : "text-gray-700"
            )}
          >
            Country
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`w-full !max-w-full h-[40px] ${errors.country ? "border-red-500" : ""
                    }`}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">
              {errors.country.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label htmlFor="state" className="text-base mb-2 text-gray-700">
              State/Province
            </label>
            <Input
              id="state"
              type="text"
              className="w-full !max-w-full h-[40px]"
              {...register("state")}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="zip"
              className={cn(
                "mb-2 text-base",
                errors.zip ? "text-red-500" : "text-gray-700"
              )}
            >
              Postal Code
            </label>
            <Input
              id="zip"
              type="text"
              className={`w-full !max-w-full h-[40px] ${errors.zip ? "border-red-500" : ""
                }`}
              {...register("zip", {
                required: "Postal code is required",
              })}
            />
            {errors.zip && (
              <p className="text-sm text-red-500 mt-1">
                {errors.zip.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="billingSame"
            {...register("billingSame")}
            className="w-4 h-4"
          />
          <label htmlFor="billingSame" className="text-base text-gray-700">
            My Billing address is the same as my Shipping address
          </label>
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <h3
          className={cn(
            "mb-4 text-sm font-medium",
            errors.shippingMethod ? "text-red-500" : "text-gray-700"
          )}
        >
          Shipping Method
        </h3>

        {!isShippingComplete && (
          <p className="text-sm text-amber-600 mb-3 bg-amber-50 p-3 rounded border border-amber-200">
            Please complete all required shipping address fields to select a shipping method.
          </p>
        )}

        {/* <div className="space-y-3">
          <label
            className={`flex items-start gap-3 border rounded p-4 ${isShippingComplete
              ? "cursor-pointer has-[:checked]:border-red-600"
              : "cursor-not-allowed opacity-50 bg-gray-50"
              }`}
          >
            <input
              type="radio"
              value="fedex_economy"
              {...register("shippingMethod", {
                required: "Please select a shipping method",
              })}
              className="mt-1"
              disabled={!isShippingComplete}
            />
            <div className="min-w-0 flex-1">
              <div className="flex w-full items-center justify-between gap-3">
                <Image
                  src="/checkouticon/fedex.png"
                  alt="FedEx"
                  width={60}
                  height={20}
                  className="shrink-0 object-contain"
                />
                <span className="text-right text-sm text-gray-600">
                  (International Economy)
                </span>
              </div>
              <div className="text-lg font-bold mt-1">$409.75</div>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 border rounded p-4 ${isShippingComplete
              ? "cursor-pointer has-[:checked]:border-red-600"
              : "cursor-not-allowed opacity-50 bg-gray-50"
              }`}
          >
            <input
              type="radio"
              value="fedex_priority"
              {...register("shippingMethod", {
                required: "Please select a shipping method",
              })}
              className="mt-1"
              disabled={!isShippingComplete}
            />
            <div className="min-w-0 flex-1">
              <div className="flex w-full items-center justify-between gap-3">
                <Image
                  src="/checkouticon/fedex.png"
                  alt="FedEx"
                  width={60}
                  height={20}
                  className="shrink-0 object-contain"
                />
                <span className="text-right text-sm text-gray-600">
                  (International Priority)
                </span>
              </div>
              <div className="text-lg font-bold mt-1">$459.68</div>
            </div>
          </label>
        </div> */}
        <div className="space-y-3">
          {ratesLoader ? (
            // Skeleton
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 border rounded p-4 animate-pulse">
                <div className="w-4 h-4 mt-1 bg-gray-200 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-5 bg-gray-200 rounded w-16" />
                </div>
              </div>
            ))
          ) : shippingRates?.map((rate) => (
            <label
              key={rate.method_id}
              className={`flex items-start gap-3 border rounded p-4 ${isShippingComplete
                  ? "cursor-pointer has-[:checked]:border-red-600"
                  : "cursor-not-allowed opacity-50 bg-gray-50"
                }`}
            >
              <input
                type="radio"
                value={rate.method_id}
                {...register("shippingMethod", {
                  required: "Please select a shipping method",
                })}
                className="mt-1"
                disabled={!isShippingComplete}
              />
              <div className="min-w-0 flex-1">
                <div className="flex w-full items-center justify-between gap-3">
                  {rate.is_fedex ? (
                    <Image
                      src="/checkouticon/fedex.png"
                      alt="FedEx"
                      width={60}
                      height={20}
                      className="shrink-0 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      {rate.display_name}
                    </span>
                  )}
                  {rate.transit_days && (
                    <span className="text-right text-sm text-gray-500">
                      {rate.transit_days} days
                    </span>
                  )}
                </div>
                <div className="text-lg font-bold mt-1">
                  {rate.total_charge === 0 ? "Free" : `$${rate.total_charge.toFixed(2)}`}
                </div>
                {rate.delivery_date && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    Delivery by {rate.delivery_date}
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>

        {errors.shippingMethod && (
          <p className="text-sm text-red-500 mt-2">
            {errors.shippingMethod.message as string}
          </p>
        )}
      </div>

      {/* Order Comments */}
      <div className="flex flex-col">
        <label htmlFor="orderComment" className="text-base mb-2 text-gray-700">
          Order Comments
        </label>
        <textarea
          id="orderComment"
          rows={4}
          className="w-full border-[1px] border-gray-400 rounded-md p-3 text-sm"
          {...register("orderComment")}
          placeholder="Add any special instructions..."
        />
      </div>

      <button type="button" onClick={onContinue} className="btn-primary">
        CONTINUE
      </button>
    </div>
  );
};

export default ShippingStep;