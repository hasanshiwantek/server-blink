"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updatecustomer } from "@/redux/slices/myaccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "world-countries";

interface AddressFormValues {
  address1?: string;
  address2?: string;
  suburb: string;
  country: string;
  state: string;
  postcode: string;
}

const AddressForm = () => {
  const { register, handleSubmit,setValue, formState: { errors }, reset } = useForm<AddressFormValues>();
  const { loading, error } = useAppSelector((state: RootState) => state.myaccount);
  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

    const countryList = countries
    .map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onSubmit = async (data: AddressFormValues) => {
    try {
      // Only addresses in payload
      const mergedData = {
        addresses: [
          {
            addressLine1: data.address1 || "",
            addressLine2: data.address2 || "",
            city: data.suburb,
            state: data.state,
            zip: data.postcode,
            country: data.country,
          }
        ]
      };

      const result = await dispatch(
        updatecustomer({ id: auth?.user?.id, data: mergedData })
      );

      if (updatecustomer.fulfilled.match(result)) {
        reset();
      } else {
        const errorMessage =
          result.error?.message || "Update address failed. Please try again.";
        console.error("Update address failed:", errorMessage);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const inputClass = "!w-full h-[42px] !max-w-full";

  return (
    <div className="max-w-full mx-auto p-8 rounded-lg">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1: Address Line 1 & Address Line 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-[14px] flex md:justify-between" htmlFor="address1">Address Line 1 <span className="">*</span></Label>
            <Input
              id="address1"
              {...register("address1", { required: "Address Line 1 is required" })}
              className={inputClass}
            />
            {errors.address1 && <p className="text-sm text-red-500">{errors.address1.message}</p>}
          </div>
          <div>
            <Label className="text-[14px] flex md:justify-between" htmlFor="address2">Address Line 2</Label>
            <Input
              id="address2"
              {...register("address2")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2: Suburb/City & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-[14px] flex md:justify-between" htmlFor="suburb">Suburb / City <span className="">*</span></Label>
            <Input
              id="suburb"
              {...register("suburb", { required: "Suburb/City is required" })}
              className={inputClass}
            />
            {errors.suburb && <p className="text-sm text-red-500">{errors.suburb.message}</p>}
          </div>
                <div>
                              <Label className="text-[14px] flex md:justify-between" htmlFor="country">Country <span className="">*</span></Label>
              <Select onValueChange={(value) => setValue("country", value)}>
               <SelectTrigger className="!w-full !h-[42px] !max-w-full !border-none">
                  <SelectValue placeholder="Choose a Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

        </div>

        {/* Row 3: State/Province & Zip/Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-[14px] flex md:justify-between" htmlFor="state">State / Province <span className="">*</span></Label>
            <Input
              id="state"
              {...register("state", { required: "State/Province is required" })}
              className={inputClass}
            />
            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
          </div>
          <div>
            <Label className="text-[14px] flex md:justify-between" htmlFor="postcode">Zip / Postcode <span className="">*</span></Label>
            <Input
              id="postcode"
              {...register("postcode", { required: "Zip/Postcode is required" })}
              className={inputClass}
            />
            {errors.postcode && <p className="text-sm text-red-500">{errors.postcode.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Button type="submit" className="w-full md:w-[16%] !p-7 text-2xl border-b-2 border-black bg-[#D42020] text-white font-bold">
            {loading ? "Saving..." : "SAVE ADDRESS"}
          </Button>
          <Button 
            onClick={() => router.back()}
            type="button" 
            className="w-full md:w-36 !p-7 text-2xl border-b-2 border-black bg-[#D42020] font-bold text-white transition"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
