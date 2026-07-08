"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import LoginForm from "./LoginForm";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

interface CustomerStepProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onContinue: () => void;
  walletSupport: {
    applePay: boolean;
    googlePay: boolean;
  };
  onWalletClick: (method: string) => void;
  isActive: boolean;
  isCompleted: boolean;
  onEdit?: () => void;
  emailValue?: string;
  newsletter?: boolean;
}


const CustomerStep: React.FC<CustomerStepProps> = ({
  register,
  errors,
  onContinue,
  walletSupport,
  onWalletClick,
  isActive,
  isCompleted,
  onEdit,
  emailValue,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state: RootState) => state?.auth);
  const handleSignOut = () => {
    dispatch(logout());
    window.location.reload()
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      onContinue()
    }
  }, [auth?.isAuthenticated])
  return (
    <>
      {isCompleted && !isActive ? (
        // Show completed state with email and edit button
        <div className="flex items-center mb-4 justify-between w-full">
          <span className="text-base text-gray-600">{emailValue}</span>

          {auth?.isAuthenticated ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-primary h-[30px] !text-[10px] w-[96px]"
            >
              SIGN OUT
            </button>
          ) : (
            <button
              type="button"
              onClick={onEdit}
               className="btn-primary h-[32px] !text-[10px] w-[82px]"
            >
              EDIT
            </button>
          )}
        </div>
      ) : isActive ? (
        // Show active form
        <div className="space-y-4 ">
          <div className="flex flex-col roboto-font">
            {!showLogin ? (
              <>
                <label
                  htmlFor="email"
                  className="text-[13px] mb-2 text-[#545454]"
                >
                  Email Address
                </label>

                <div className="flex flex-wrap items-start gap-2">
                  <div className="w-full sm:flex-1 sm:max-w-[350px] order-1">
                    <Input
                      id="email"
                      type="email"
                      className={`flex-1 h-[44px] w-full rounded-none ${errors.email ? "border-red-500" : ""
                        }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>

                  {/* Newsletter */}
                  <div className="w-full mt-2 order-2 sm:order-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        {...register("newsletter")}
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-[13px] text-[#545454]"
                      >
                        Subscribe to our newsletter.
                        
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onContinue}
                    className="w-full btn-primary h-[44px] sm:h-[40px]  sm:w-auto order-3  sm:order-2"
                  >
                    CONTINUE
                  </button>
                </div>

                {!auth?.isAuthenticated && <div className="text-[13px] text-[#545454] mt-10 sm:mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="text-[#D42020] roboto-condensed-font"
                    
                  >
                    Sign in now
                  </button>
                </div>}
              </>
            ) : (
              <div className="w-full">
                <LoginForm onCancel={() => setShowLogin(false)} />
              </div>
            )}
          </div>

          {/* Apple Pay Button */}

          {/* Apple Pay Button */}
          <button
            type="button"
            onClick={() => onWalletClick("apple_pay")}
            className={`w-full h-[48px] bg-white border text-white rounded flex items-center justify-center transition ${!walletSupport.applePay ? "hidden" : ""}`}
          >
            <Image
              src="/checkouticon/Apple-icon.svg"
              alt="Apple Pay"
              className=""
              width={30}
              height={30}
              fetchPriority="high"
            />
          </button>

          {/* Google Pay Button */}
          <button
            type="button"
            onClick={() => onWalletClick("google_pay")}
            className={`w-full h-[48px] bg-black text-white rounded flex items-center justify-center hover:bg-gray-900 transition ${!walletSupport.googlePay ? "hidden" : ""}`}
          >
            <Image
              src="/checkouticon/googlepay.png"
              alt="Google Pay"
              width={80}
              height={30}
              fetchPriority="high"
            />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CustomerStep;
