"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  fetchCustomerMessages,
  fetchUserOrders,
  sendCustomerMessage,
} from "@/redux/slices/OrderMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useEffect } from "react";
import { RootState } from "@/redux/store";

interface SendMessageValues {
  order_id: number;
  subject: string;
  message: string;
}

interface Order {
  id: number;
  order_id: string;
  placed_on: string;
  total: string;
}

interface SendMessageFormProps {
  orders?: Order[];
}

const Messages = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(
    (state: RootState) => state.customerMessage.orders,
  );
  const { sendLoading } = useAppSelector(
    (state: RootState) => state.customerMessage,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageValues>();

  function reCallAPis() {
    dispatch(fetchCustomerMessages({ page: 1, pageSize: 100 }));
    dispatch(fetchUserOrders());
  }

  const onSubmit = async (data: SendMessageValues) => {
    const result = await dispatch(sendCustomerMessage(data));

    if (sendCustomerMessage.fulfilled.match(result)) {
      reset();
      reCallAPis();
    }
  };

  const handleClear = () => {
    reset();
  };

  useEffect(() => {
    reCallAPis();
  }, []);

  return (
    <section
      className="w-full text-[#545454] roboto-font "
    
    >
      {/* Title */}
      <h2 className="text-[26px]   mb-5">Send A Message</h2>

      {/* Form Container */}
      <div className="bg-[#]  w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          {/* Order Dropdown */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className=" text-[1rem]">Order:</label>
              <span className=" text-[1rem]">*</span>
            </div>
            <div className="relative">
              <select
                className={`w-full h-[42px] bg-[#fff] border px-3 pr-10  text-[14px] appearance-none cursor-pointer focus:outline-none focus:ring-1 ${
                  errors.order_id ? "" : "border-[#cccccc]"
                }`}
                {...register("order_id", { required: true })}
              >
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order?.label}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-[#545454]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className=" text-[1rem]">Subject</label>
              <span className=" text-[1rem]">*</span>
            </div>
            <input
              type="text"
              className={`w-full h-[42px] bg-[#fff] border px-3 text-[14px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#cc0000] focus:border-[#cc0000] ${
                errors.subject ? "border-[#cc0000]" : "border-[#cccccc]"
              }`}
              {...register("subject", { required: true })}
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className=" text-[1rem]">Message</label>
              <span className="text-[1rem]">*</span>
            </div>
            <textarea
              rows={7}
              className={`w-full bg-[#fff] border px-3 py-2 text-[14px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#cc0000] focus:border-[#cc0000] resize-y ${
                errors.message ? "border-[#cc0000]" : "border-[#cccccc]"
              }`}
              {...register("message", { required: true })}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full">
            <Button
              type="submit"
              className="btn-primary h-[42px] w-full sm:w-auto"
              disabled={sendLoading}
            >
              {sendLoading ? "Loading..." : "Send Message"}
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              className="btn-primary h-[42px] w-full  !mt-4 sm:!mt-0  sm:w-auto "
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Messages;
