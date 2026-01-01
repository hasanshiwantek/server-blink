"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { bulkInquiry } from "@/redux/slices/homeSlice";
interface BulkInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    name: string;
    image?: string;
    sku?: string;
  };
}

const BulkInquiryModal: React.FC<BulkInquiryModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    quantity: "",
    comments: "",
  });
  const dispatch = useAppDispatch();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      sku: product?.sku ?? "",
      ...formData,
    };
    const result = await dispatch(bulkInquiry(payload))
    try {
      if (bulkInquiry.fulfilled.match(result)) {
        console.log("Request for quote send✅", result?.payload);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.log("Error Sending Quote: ", result?.payload);
      }
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[65rem] w-full max-h-[100vh] overflow-y-auto p-0 rounded-lg shadow-sm">
        {/* Header with Close */}
        {/* <DialogHeader className="flex justify-end p-4"> */}
        {/* <DialogClose className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </DialogClose> */}
        {/* </DialogHeader> */}

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Product Image */}
          <div className="md:w-3/5 bg-white p-8 flex flex-col items-center justify-center">
            {product?.image ? (
              <Image
                src={product.image}
                alt={product.name || "Product"}
                width={300}
                height={300}
                className="object-contain"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            {product?.name && (
              <p className="mt-4 text-base lg:text-xl text-[#545454] text-left font-medium">
                {product.name}
              </p>
            )}
          </div>

      {/* Right Side - Form */}
<div className="md:w-3/5 p-8 bg-white relative flex flex-col items-center">
  {/* Red Banner with Title + Close */}
  <div style={{borderRadius:"49% 51% 51% 49% / 0% 0% 50% 50%"}} className="absolute top-0 right-0 bg-[#d40511] text-white px-6 py-5 w-full flex justify-center items-center">
    <h2 className="text-3xl">Request A Bulk Quote</h2>
  </div>

  {/* Push the form down so it doesn't overlap banner */}
  <form onSubmit={handleSubmit} className="mt-16 w-full space-y-4">
    <Input
      type="text"
      name="fullName"
      placeholder="Full Name"
      value={formData.fullName}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F15939]"
    />

    <Input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F15939]"
    />

    <Input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F15939]"
    />

    <Input
      type="number"
      name="quantity"
      placeholder="Quantity"
      value={formData.quantity}
      onChange={handleChange}
      required
      min={1}
      className="w-full px-4 py-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F15939]"
    />

    <Textarea
      name="comments"
      placeholder="Comments"
      value={formData.comments}
      onChange={handleChange}
      rows={4}
      className="w-full px-4 py-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#F15939] resize-none"
    />

    <Button
      type="submit"
      className="w-full bg-[#d40511] border-b border-black text-white px-6 py-5 text-2xl rounded-md font-medium hover:bg-[#d94d30] transition-colors duration-200"
    >
      Submit Form
    </Button>
  </form>
</div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkInquiryModal;
