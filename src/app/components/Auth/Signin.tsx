"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi"; // add at top
interface SigninFormValues {
  email: string;
  password: string;
}

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormValues>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading } = useAppSelector((state: RootState) => state?.auth);
  const onSubmit = async (data: SigninFormValues) => {
    try {
      const result = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(result)) {
        reset();
        router.push("/my-account/orders");
      } else {
        const errorMessage =
          typeof result?.payload === "string"
            ? result.payload
            : "Login failed. Please try again.";
        toast.error(errorMessage);
        console.error("❌ Login rejected with message:", errorMessage);
      }
    } catch (err: any) {
      console.error("🚨 Unexpected error during onSubmit:", err);
    }
  };

  return (
    <div className=" ">
      {/* Header/Navigation - Dark gray bar at top */}
      <div className=" h-2 w-full  xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-8xl" />

      {/* Breadcrumb */}
      <div className="px-10 xl:px-0  w-full xl:max-w-[1170px] 2xl:max-w-[1170px] max-w-8xl mx-auto  py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[var(--primary-color)]">Login</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="  px-10 xl:px-0 xl:max-w-[1170px] 2xl:max-w-[1170px]  mx-auto  py-8">
        <h1 className="h1-lg mb-10">Login</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
          {/* Left Column - Login Form */}
          <div className="max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block md:text-[1rem] text-base font-normal text-[#545454]  mb-2"
                >
                  Email Address:
                </label>
                <Input
                  id="email"
                  type="email"
                  className="w-full h-12 max-w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block md:text-[1rem] text-base font-normal text-[#545454] mb-2"
                >
                  Password:
                </label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // toggle type
                  className="w-full h-12 max-w-full pr-10" // add padding for icon
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {/* Eye Icon */}
                <span
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>

                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button and Forgot Password */}
              <div className="flex  gap-4">
                {loginLoading ? (
                  <div className="flex justify-center items-center py-3">
                    <div className="w-6 h-6 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <button type="submit" className="btn-primary">
                    LOGIN
                  </button>
                )}
                <Link
                  href="/forgot-password"
                  className="text-red-600 hover:text-red-700 text-base underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Right Column - New Customer Card */}
          <div className="bg-[#cac9c9] p-8 rounded-xs -mt-9">
            <h2 className="h2-medium  mb-6">New Customer?</h2>
            <p className="text-[1rem] text-[#545454] mb-4">
              Create an account with us and you'll be able to:
            </p>
            <ul className="space-y-1 mb-8">
              <li className="flex items-start text-[1rem] text-[#545454]">
                <span className="mr-2">•</span>
                <span>Check out faster</span>
              </li>
              <li className="flex items-start text-[1rem] text-[#545454]">
                <span className="mr-2">•</span>
                <span> Save multiple shipping addresses</span>
              </li>
              <li className="flex items-start text-[1rem] text-[#545454]">
                <span className="mr-2">•</span>
                <span>Access your order history</span>
              </li>
              <li className="flex items-start text-[1rem] text-[#545454]">
                <span className="mr-2">•</span>
                <span>Track new orders</span>
              </li>
              <li className="flex items-start text-[1rem] text-[#545454]">
                <span className="mr-2">•</span>
                <span>Save items to your wish list</span>
              </li>
            </ul>
            <button className="btn-primary">
              <Link href="/auth/signup">CREATE ACCOUNT</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
