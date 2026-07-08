"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import countries from "world-countries";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { registerUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Country, State, City } from "country-state-city";
import { fetchCartList } from "@/redux/slices/cartsSlice";
import { baseURL, sitekey, storeId } from "@/lib/axiosInstance";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  password_confirmation: string;
  companyName: string;
  addressLine1: string;
  addressLine2?: string;
  suburb: string;
  country: string;
  state: string;
  zip: string;
  useRole: 2;
}

const SignupPage = () => {
  // const countryList = countries
  //   .map((country) => ({
  //     name: country.name.common,
  //     code: country.cca2,
  //   }))
  //   .sort((a, b) => a.name.localeCompare(b.name));
  const countryList = Country.getAllCountries().map((c) => ({
    name: c.name,
    code: c.isoCode,
  }));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { registerLoading } = useAppSelector((state: RootState) => state?.auth);
  const router = useRouter();
  const password = watch("password");
  const watchedCountry = watch("country");
  const watchedState = watch("state");
  const stateList = useMemo(() => {
    if (!watchedCountry) return [];
    return State.getStatesOfCountry(watchedCountry).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [watchedCountry]);
  // ✅ State change hone pe cities
  const cityList = useMemo(() => {
    if (!watchedCountry || !watchedState) return [];
    return City.getCitiesOfState(watchedCountry, watchedState).map((c) => ({
      name: c.name,
    }));
  }, [watchedCountry, watchedState]);
  const onSubmit = async (data: SignupFormValues) => {
    if (!captchaToken) {
      alert("Please verify the captcha.");
      return;
    }

    try {
      const payload = {
        userRole: 2,
        ...data,
      };
      const result = await dispatch(registerUser(payload));

      if (registerUser.fulfilled.match(result)) {
        const token = result?.payload?.token
        const fetchCartListInner = async () => {
          const sessionId = localStorage.getItem("sessionId")
          const res = await fetch(`${baseURL}web/cart/transfer`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "storeId": storeId,
              "X-Session-ID": sessionId || "",
              "Content-Type": "application/json",
            },
          });
          reset();
          dispatch(fetchCartList());
          router.push("/action");
        };
        fetchCartListInner()
      } else {
        const errorMessage =
          result.payload || "Registration failed. Please try again.";
       
      }
    } catch (err: any) {
     
    }
  };

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/detect-country"); // apna Next.js route
        const data = await res.json();

        if (data.country_code) {
          setValue("country", data.country_code);
          // setValue("state", data.state);
        }
      } catch {
        setValue("country", "US");
      }
    };

    detectCountry();
  }, [setValue]);

  return (
    <div className="">
      {/* Header/Navigation - Dark gray bar at top */}
      <div className=" w-full" />

      {/* Breadcrumb */}
      <div className="  md:px-10 xl:px-0  w-full  xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-7xl mx-auto py-4">
        <div className="hidden md:flex items-center gap-2 text-sm mb-2">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-red-600">Create Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-0 pb-[8px] md:py-8 md:pb-16 md:px-6 xl:px-0 w-full xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-7xl mx-auto">
        <h1 className="h1-lg !font-light text-[28px] mb-2">New Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* Left Column */}

            {/* Email Address */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="email"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Email Address
                </label>
                <span className="text-[#545454]">*</span>
              </div>
              <Input
                id="email"
                type="email"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Password
                </label>
                <span className="text-[#545454]">*</span>
              </div>
              <Input
                id="password"
                type="password"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex justify-between items-center">

                <label
                  htmlFor="confirmPassword"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Confirm Password
                </label>
                <span className="text-[#545454]">*</span>
              </div>

              <Input
                id="confirmPassword"
                type="password"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="firstName"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  First Name
                </label>
                <span className="text-[#545454]">*</span>
              </div>

              <Input
                id="firstName"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <div className="flex justify-between items-center">

                <label
                  htmlFor="lastName"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Last Name
                </label>
                <span className="text-[#545454]">*</span>
              </div>
              <Input
                id="lastName"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-[14px] font-normal text-[#545454] mb-2"
              >
                Company Name
              </label>
              <Input
                id="companyName"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("companyName")}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-[14px] font-normal text-[#545454] mb-2"
              >
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("phoneNumber")}
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <div className="flex justify-between items-center">

                <label
                  htmlFor="addressLine1"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Address Line 1
                </label>
                <span className="text-[#545454]">*</span>
              </div>

              <Input
                id="addressLine1"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("addressLine1", {
                  required: "Address is required",
                })}
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.addressLine1.message}
                </p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <div className="flex justify-between items-center">

                <label
                  htmlFor="addressLine2"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Address Line 2
                </label>
              </div>

              <Input
                id="addressLine2"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("addressLine2")}
              />
            </div>

            {/* Suburb/City */}
            <div>
              <div className="flex justify-between items-center">

                <label
                  htmlFor="suburb"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Suburb/City
                </label>
                <span className="text-[#545454]">*</span>

              </div>

              <Input
                id="suburb"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("suburb", { required: "Suburb/City is required" })}
              />
              {errors.suburb && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.suburb.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="country"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  Country
                </label>
                <span className="text-[#545454]">*</span>

              </div>
              <Select value={watchedCountry}
                onValueChange={(value) => {
                  setValue("country", value);
                  setValue("state", "");
                }}>
                <SelectTrigger className="h-[42px] min-h-[42px] w-full max-w-full">
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
                <p className="mt-1 text-[14px] text-red-500">Country is required</p>
              )}
            </div>

            {/* State/Province */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="state"
                  className="block text-[14px] font-normal text-[#545454] mb-2"
                >
                  State/Province
                </label>
                {stateList?.length > 0 && <span className="text-[#545454]">*</span>}
              </div>
              <input
                type="hidden"
                {...register("state", {
                  validate: (value) => {
                    if (stateList.length > 0 && !value) return "State/Province is required";
                    return true;
                  },
                })}
              />
              {stateList?.length > 0 ? <Select value={watchedState} onValueChange={(value) => setValue("state", value, { shouldValidate: true })
              }>
                <SelectTrigger className="h-[42px] min-h-[42px] w-full max-w-full">
                  <SelectValue placeholder="Choose a State/Province" />
                </SelectTrigger>
                <SelectContent>
                  {stateList.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> : <Input
                id="state"
                className="h-[42px] min-h-[42px] w-full max-w-full"
                {...register("state")}
              />}
              {errors.state && stateList?.length > 0 && (
                <p className="mt-1 text-[14px] text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Zip/Postcode - Full Width */}
          <div className="w-full md:max-w-[calc(50%-1rem)]">
            <div className="flex justify-between items-center">

              <label
                htmlFor="zip"
                className="block text-[14px] font-normal text-[#545454] mb-2"
              >
                Zip/Postcode
              </label>
              <span className="text-[#545454]">*</span>

            </div>

            <Input
              id="zip"
              className="h-[42px] min-h-[42px] w-full max-w-full"
              {...register("zip", { required: "Zip/Postcode is required" })}
            />
            {errors.zip && (
              <p className="mt-1 text-[14px] text-red-500">{errors.zip.message}</p>
            )}
          </div>
          <div className="mt-6">
            <ReCAPTCHA
              sitekey={sitekey}
              onChange={(token: any) => {
                setCaptchaToken(token);
              }}
            />
          </div>
          {/* Submit Button */}
          <div className="py-6">
            {registerLoading ? (
              <div className="flex justify-start items-center py-3">
                <div className="w-6 h-6 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button type="submit" className="btn-primary w-full sm:w-auto  px-[30px]">
                CREATE ACCOUNT
              </button>
            )}
          </div>
        </form>
      </div >
    </div >
  );
};

export default SignupPage;
