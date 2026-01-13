"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import countries from "world-countries";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { registerUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

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
}

const SignupPage = () => {
  const countryList = countries
    .map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>();
  
  const dispatch = useAppDispatch();
  const { registerLoading } = useAppSelector((state: RootState) => state?.auth);
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const result = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(result)) {
        reset();
        router.push("/auth/login");
      } else {
        const errorMessage =
          result.payload || "Registration failed. Please try again.";
        console.error("Registration failed:", errorMessage);
      }
    } catch (err: any) {
      console.error("🚨 Unexpected error:", err);
    }
  };

  const password = watch("password");

  return (
    <div className="">
      {/* Header/Navigation - Dark gray bar at top */}
      <div className=" w-full" />

      {/* Breadcrumb */}
      <div className="  px-10 xl:px-0  w-full  xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-7xl mx-auto py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-red-600">Create Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" px-10 xl:px-0  w-full  xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-7xl mx-auto  py-8 pb-16">
        <h1 className="h1-lg mb-12">New Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* Left Column */}
            
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                className="w-full h-12 max-w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full h-12 
                max-w-full"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                className="w-full h-12 max-w-full"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-[1rem] font-normal text-[#545454] mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                className="w-full h-12 max-w-full"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Last Name
              </label>
              <Input
                id="lastName"
                className="w-full h-12 max-w-full"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Company Name
              </label>
              <Input
                id="companyName"
                className="w-full h-12 max-w-full"
                {...register("companyName")}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                className="w-full h-12 max-w-full"
                {...register("phoneNumber")}
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label htmlFor="addressLine1" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Address Line 1
              </label>
              <Input
                id="addressLine1"
                className="w-full h-12 max-w-full"
                {...register("addressLine1", { required: "Address is required" })}
              />
              {errors.addressLine1 && (
                <p className="text-sm text-red-500 mt-1">{errors.addressLine1.message}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label htmlFor="addressLine2" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Address Line 2
              </label>
              <Input
                id="addressLine2"
                className="w-full h-12 max-w-full"
                {...register("addressLine2")}
              />
            </div>

            {/* Suburb/City */}
            <div>
              <label htmlFor="suburb" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Suburb/City
              </label>
              <Input
                id="suburb"
                className="w-full h-12 max-w-full"
                {...register("suburb", { required: "Suburb/City is required" })}
              />
              {errors.suburb && (
                <p className="text-sm text-red-500 mt-1">{errors.suburb.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-[1rem] font-normal text-[#545454] mb-2">
                Country
              </label>
              <Select onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger className="w-full h-12 max-w-full">
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
                <p className="text-sm text-red-500 mt-1">Country is required</p>
              )}
            </div>

            {/* State/Province */}
            <div>
              <label htmlFor="state" className="block text-[1rem] font-normal text-[#545454] mb-2">
                State/Province
              </label>
              <Input
                id="state"
                className="w-full h-12 max-w-full"
                {...register("state", { required: "State/Province is required" })}
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Zip/Postcode - Full Width */}
          <div className="max-w-[calc(50%-1rem)]">
            <label htmlFor="zip" className="block text-[1rem] font-normal text-[#545454] mb-2">
              Zip/Postcode
            </label>
            <Input
              id="zip"
              className="w-full h-12 max-w-full"
              {...register("zip", { required: "Zip/Postcode is required" })}
            />
            {errors.zip && (
              <p className="text-sm text-red-500 mt-1">{errors.zip.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="py-6">
            {registerLoading ? (
              <div className="flex justify-start items-center py-3">
                <div className="w-6 h-6 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="btn-primary"
              >
                CREATE ACCOUNT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;