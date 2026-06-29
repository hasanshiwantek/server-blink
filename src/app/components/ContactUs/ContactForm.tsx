"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { X } from "lucide-react";
import { contactRequests } from "@/redux/slices/contactSlice";
import { useAppDispatch,useAppSelector } from "@/hooks/useReduxHooks";
type ContactFormData = {
  full_name: string;
  phone_number: string;
  email: string;
  order_number?: string;
  company_name?: string;
  rma_number?: string;
  comments: string;
};
 const roboto = "'Roboto'";
  const roboto1 = "'Roboto', Arial, Helvetica, sans-serif";
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state: any) => state.contact);

  const onSubmit = (data: ContactFormData) => {
    // You can also log it in a more formatted way
    dispatch(contactRequests(data)).unwrap().then(() => {
      reset();
    })
  };

  return (
    <div className="w-[full] md:max-w-full lg:max-w-[1170px]  mx-0 lg:mx-auto  lg:px-[0%] px-[7%] ">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#D40511] hover:underline">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#D40511]">Contact Form</span>
        </div>
      </nav>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#545454] mb-4 !font-normal" style={{ fontFamily: roboto }}>
          Contact Form
        </h1>
        <h2 className="text-[28px] text-[#545454]  !font-normal" style={{ fontFamily: roboto }}>
          Server Blink, LLC
        </h2>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="sm:text-[14px] text-[1rem] text-[#545454] font-normal " style={{ fontFamily: roboto1 }}>
          We're happy to answer questions or help you with returns.
        </p>
        <p className="sm:text-[14px] text-[1rem] text-[#545454] font-normal" style={{ fontFamily: roboto1 }}>
          Please fill out the form below if you need assistance.
        </p>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-[10px] text-[#545454] font-bold mb-2" style={{ fontFamily: roboto1 }}>
          SMS Disclaimer:
        </p>
        <p className="text-[10px] text-[#545454] font-normal leading-[1.8]" style={{ fontFamily: roboto1 }}>
          By providing my phone number to Server Blink LLC, I agree and acknowledge
          that Server Blink may send text messages to my wireless phone number
          for any purpose. Message frequency will vary, and Message and data
          rates may apply. If you need further assistance, please reply “HELP”.
          You can also opt out by replying “STOP.” For more information on how
          your data will be handled, please visit&nbsp;
          <Link
            href="/privacy-Policy"
            className="text-[#D42020] underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.serverblink.uk/privacy-policy.
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name & Phone Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="full_name"
              className="block text-[14px] text-[#545454] font-normal mb-2"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="full_name"
              {...register("full_name")}
              className="mt-1 block w-full max-w-full  h-[42px] rounded-none px-4 py-2  border-[0.5px] border-[#545454]/50  bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-[14px] text-[#545454] font-normal mb-2"
            >
              Phone Number
            </label>
            <Input
              type="tel"
              id="phone_number"
              {...register("phone_number")}
              className="mt-1 block w-full h- max-w-full h-[42px] rounded-none px-4 py-2 border-[0.5px] border-[#545454]/50 bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Email Address & Order Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-normal text-[#545454]"
            >
              <span>Email Address</span>
              <span className="shrink-0 text-[#545454]" aria-hidden="true">
                *
              </span>
            </label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full h- max-w-full h-[42px] rounded-none px-4 py-2 border-[0.5px] border-[#545454]/50 bg-white focus:ring-red-500 focus:border-red-500"
            />
            {errors.email && (
              <div
                className="mt-1 text-red-600"
                role="alert"
                aria-label={String(errors.email.message)}
              >
                <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="order_number"
              className="block text-[14px] text-[#545454] font-normal mb-2"
            >
              Order Number
            </label>
            <Input
              type="text"
              id="order_number"
              {...register("order_number")}
              className="mt-1 block w-full h- max-w-full h-[42px] rounded-none px-4 py-2 border-[0.5px] border-[#545454]/50 bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Company Name & RMA Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="company_name"
              className="block text-[14px] text-[#545454] font-normal mb-2"
            >
              Company Name
            </label>
            <Input
              type="text"
              id="company_name"
              {...register("company_name")}
              className="mt-1 block w-full h- max-w-full h-[42px] rounded-none px-4 py-2 border-[0.5px] border-[#545454]/50 bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="rma_number"
              className="block text-[14px] text-[#545454] font-normal mb-2"
            >
              RMA Number
            </label>
            <Input
              type="text"
              id="rma_number"
              {...register("rma_number")}
              className="mt-1 block w-full h- max-w-full h-[42px] rounded-none px-4 py-2 border-[0.5px] border-[#545454]/50 bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Comments/Questions */}
        <div>
          <label
            htmlFor="comments"
            className="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-normal text-[#545454]"
          >
            <span>Comments/Questions</span>
            <span className="shrink-0 text-[#545454]" aria-hidden="true">
              *
            </span>
          </label>
          <Textarea
            id="comments"
            {...register("comments", {
              required: "Message is required",
            })}
            rows={6}
            className="mt-1 block  max-w-full h-50 px-4 py-2 border-[0.5px] border-[#545454]/50 rounded-none bg-white focus:ring-red-500 focus:border-red-500 resize-none"
          />
          {errors.comments && (
            <div
              className="mt-1 text-red-600"
              role="alert"
              aria-label={String(errors.comments.message)}
            >
              <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button disabled={loading} type="submit" className="btn-primary h-[42px] w-full md:w-auto">
            {loading ? "LOADING..." : "SUBMIT FORM"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
