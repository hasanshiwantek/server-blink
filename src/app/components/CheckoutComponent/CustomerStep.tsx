"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Link from "next/link";
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
  return (
    <>
      {isCompleted && !isActive ? (
        // Show completed state with email and edit button
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">{emailValue}</span>
       <button
  type="button"
  onClick={onEdit}
  className="btn-primary !px-4 !py-2 !text-[13px] !leading-none"
>
  EDIT
</button>
        </div>
      ) : isActive ? (
        // Show active form
        <div className="flex flex-col">
  <label htmlFor="email" className="text-[14px] mb-2 text-[#545454]">
    Email Address
  </label>

  <div className="flex flex-col md:flex-row gap-3 md:gap-5">
    
    <Input
      id="email"
      type="email"
      className={`h-[43px] w-full md:w-[82%] py-[13px] ${
        errors.email ? "border-red-500" : ""
      }`}
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      })}
    />

    <button
      type="button"
      onClick={onContinue}
      className="btn-primary px-2 py-2 text-sm md:text-[13px] w-[16%] text-center"
    >
      CONTINUE
    </button>
  </div>
</div>
      ) : null}
    </>
  );
};

export default CustomerStep;