"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
type ContactFormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
  orderNumber: string;
  companyName: string;
  rmaNumber: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Data:", data);
    // You can also log it in a more formatted way
    console.table(data);

    // Optionally reset the form after submission
    // reset();
  };

  return (
    <div className="w-[80%]  max-w-full lg:max-w-[1170px]  mx-0 lg:mx-auto  lg:px-[0%] px-[7%] ">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#D40511] hover:underline">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-600">Contact Form</span>
        </div>
      </nav>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="h1-lg mb-4">Contact Form</h1>
        <h2 className="h1-lg ">Server Blink, LLC</h2>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-[1rem] text-[#545454] font-normal mb-2">
          We're happy to answer questions or help you with returns.
        </p>
        <p className="text-[1rem] text-[#545454] font-normal">
          Please fill out the form below if you need assistance.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name & Phone Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="fullName"
              {...register("fullName")}
              className="mt-1 block w-full max-w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              Phone Number
            </label>
            <Input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="mt-1 block w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Email Address & Order Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              Email Address
              <span className="text-[#D40511] ml-1">*</span>
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
              className="mt-1 block w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
            {errors.email && (
              <p className="text-[#D40511] text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="orderNumber"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              Order Number
            </label>
            <Input
              type="text"
              id="orderNumber"
              {...register("orderNumber")}
              className="mt-1 block w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Company Name & RMA Number - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="companyName"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              Company Name
            </label>
            <Input
              type="text"
              id="companyName"
              {...register("companyName")}
              className="mt-1 block w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="rmaNumber"
              className="block text-[1rem] text-[#545454] font-normal mb-2"
            >
              RMA Number
            </label>
            <Input
              type="text"
              id="rmaNumber"
              {...register("rmaNumber")}
              className="mt-1 block w-full h- max-w-full h-[40px] px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Comments/Questions */}
        <div>
          <label
            htmlFor="message"
            className="block text-[1rem] text-[#545454] font-normalmb-2"
          >
            Comments/Questions
            <span className="text-[#D40511] ml-1">*</span>
          </label>
          <Textarea
            id="message"
            {...register("message", {
              required: "Message is required",
            })}
            rows={6}
            className="mt-1 block  max-w-full h-50 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-red-500 focus:border-red-500 resize-none"
          />
          {errors.message && (
            <p className="text-[#D40511] text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button type="submit" className="btn-primary">
            SUBMIT FORM
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
