"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { UseFormRegister, FieldErrors, Control, Controller, UseFormSetValue } from "react-hook-form";

interface BillingStepProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: any;
  setValue: UseFormSetValue<any>;
  onContinue: () => void;
  countryList: Array<{ name: string; code: string }>;
  stateList: Array<{ name: string; code: string }>;
  cityList: Array<{ name: string }>;
  isActive: boolean;
  isCompleted: boolean;
  onEdit?: () => void;
  billingInfo?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

const BillingStep: React.FC<BillingStepProps> = ({
  register,
  errors,
  control,
  setValue,
  onContinue,
  countryList,
  stateList,
  cityList,
  isActive,
  isCompleted,
  onEdit,
  billingInfo,
}) => {
  if (isCompleted && !isActive &&
    billingInfo?.firstName &&
    billingInfo?.city &&
    billingInfo?.country &&
    billingInfo?.zip && billingInfo?.state) {
    // Show completed state with billing info and edit button
    return (
      <div className="flex items-start justify-between">
        <div className="text-base text-gray-600">
          <p>{billingInfo?.firstName} {billingInfo?.lastName}</p>
          <p>{billingInfo?.address}</p>
          <p>{billingInfo?.city}, {billingInfo?.state} {billingInfo?.zip}</p>
          <p>{billingInfo?.country}</p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="btn-primary"
        >
          EDIT
        </button>
      </div>
    );
  }

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium mb-4 text-gray-700">Billing Address</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="billingFirstName"
            className={cn(
              "mb-2 text-base",
              errors.billingFirstName ? "text-red-500" : "text-gray-700"
            )}
          >
            First Name
          </label>
          <Input
            id="billingFirstName"
            type="text"
            className={`w-full !max-w-full h-[40px] ${errors.billingFirstName ? "border-red-500" : ""
              }`}
            {...register("billingFirstName", {
              required: "First name is required",
            })}
          />
          {errors.billingFirstName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.billingFirstName.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="billingLastName"
            className={cn(
              "mb-2 text-base",
              errors.billingLastName ? "text-red-500" : "text-gray-700"
            )}
          >
            Last Name
          </label>
          <Input
            id="billingLastName"
            type="text"
            className={`w-full !max-w-full h-[40px] ${errors.billingLastName ? "border-red-500" : ""
              }`}
            {...register("billingLastName", {
              required: "Last name is required",
            })}
          />
          {errors.billingLastName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.billingLastName.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingCompany"
          className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
        >
          <span>Company Name</span>
          <span className="shrink-0 text-gray-400">(Optional)</span>
        </label>
        <Input
          id="billingCompany"
          type="text"
          className="w-full !max-w-full h-[40px]"
          {...register("billingCompany")}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingPhone"
          className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
        >
          <span>Phone Number</span>
          <span className="shrink-0 text-gray-400">(Optional)</span>
        </label>
        <Input
          id="billingPhone"
          type="text"
          className="w-full !max-w-full h-[40px]"
          {...register("billingPhone")}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingAddress1"
          className={cn(
            "mb-2 text-base",
            errors.billingAddress1 ? "text-red-500" : "text-gray-700"
          )}
        >
          Address Line 1
        </label>
        <Input
          id="billingAddress1"
          type="text"
          className={`w-full !max-w-full h-[40px] ${errors.billingAddress1 ? "border-red-500" : ""
            }`}
          {...register("billingAddress1", {
            required: "Address is required",
          })}
        />
        {errors.billingAddress1 && (
          <p className="text-sm text-red-500 mt-1">
            {errors.billingAddress1.message as string}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingAddress2"
          className="mb-2 flex items-baseline justify-between gap-2 text-base text-gray-700"
        >
          <span>Address Line 2</span>
          <span className="shrink-0 text-gray-400">(Optional)</span>
        </label>
        <Input
          id="billingAddress2"
          type="text"
          className="w-full !max-w-full h-[40px]"
          {...register("billingAddress2")}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingCity"
          className={cn(
            "mb-2 text-base",
            errors.billingCity ? "text-red-500" : "text-gray-700"
          )}
        >
          City
        </label>
        <Input
          id="billingCity"
          type="text"
          className={`w-full !max-w-full h-[40px] ${errors.billingCity ? "border-red-500" : ""
            }`}
          {...register("billingCity", {
            required: "City is required",
          })}
        />
        {errors.billingCity && (
          <p className="text-sm text-red-500 mt-1">
            {errors.billingCity.message as string}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="billingCountry"
          className={cn(
            "mb-2 text-base",
            errors.billingCountry ? "text-red-500" : "text-gray-700"
          )}
        >
          Country
        </label>
        <Controller
          name="billingCountry"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Select onValueChange={(val) => {
              field.onChange(val);
              setValue("state", "");
            }} value={field.value}>
              <SelectTrigger
                className={`w-full !max-w-full h-[40px] ${errors.billingCountry ? "border-red-500" : ""
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
        {errors.billingCountry && (
          <p className="text-sm text-red-500 mt-1">
            {errors.billingCountry.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="billingState" className="text-base mb-2 text-gray-700 flex items-baseline justify-between" >
            <span className="">
              State/Province
            </span>
            {!stateList.length && (
              <span className="shrink-0 text-gray-400">(Optional)</span>
            )}
          </label>
          {/* <Input
            id="billingState"
            type="text"
            className="w-full !max-w-full h-[40px]"
            {...register("billingState")}
          /> */}
          {stateList.length > 0 ? <Controller
            name="billingState"
            control={control}
            rules={{ required: "State/Province is required" }}
            render={({ field }) => (
              <Select onValueChange={(val) => {
                field.onChange(val);
                setValue("billingCity", "");
                setValue("billingZip", "");
              }} value={field.value}>
                <SelectTrigger
                  className={`w-full !max-w-full h-[40px] ${errors.state ? "border-red-500" : ""
                    }`}
                >
                  <SelectValue placeholder="Select state/province" />
                </SelectTrigger>
                <SelectContent>
                  {stateList.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          /> : <Input
            id="billingState"
            type="text"
            className="w-full !max-w-full h-[40px]"
            {...register("billingState")}
          />}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="billingZip"
            className={cn(
              "mb-2 text-base",
              errors.billingZip ? "text-red-500" : "text-gray-700"
            )}
          >
            Postal Code
          </label>
          <Input
            id="billingZip"
            type="text"
            className={`w-full !max-w-full h-[40px] ${errors.billingZip ? "border-red-500" : ""
              }`}
            {...register("billingZip", {
              required: "Postal code is required",
            })}
          />
          {errors.billingZip && (
            <p className="text-sm text-red-500 mt-1">
              {errors.billingZip.message as string}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="btn-primary"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default BillingStep;