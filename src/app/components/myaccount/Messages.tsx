"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SendMessageValues {
    order_id: string;
    subject: string;
    message: string;
}

interface Order {
    id: number;
    order_number: string;
    placed_on: string;
    total: string;
}

interface SendMessageFormProps {
    orders?: Order[];
}

const Messages = ({ orders = [] }: SendMessageFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SendMessageValues>();

    const onSubmit = async (data: SendMessageValues) => {
        console.log(data);
        // API call here
    };

    const handleClear = () => {
        reset();
    };

    // Demo orders agar prop na aaye
    const demoOrders: Order[] =
        orders.length > 0
            ? orders
            : [
                {
                    id: 705613,
                    order_number: "705613",
                    placed_on: "Jun 17, 2026",
                    total: "$919.38",
                },
            ];

    return (
        <section className="w-full text-[#545454]" style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
            {/* Title */}
            <h2 className="text-[26px]   mb-5">
                Send A Message
            </h2>

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
                                className={`w-full h-[42px] bg-[#fff] border px-3 pr-10  text-[14px] appearance-none cursor-pointer focus:outline-none focus:ring-1 ${errors.order_id ? "" : "border-[#cccccc]"
                                    }`}
                                {...register("order_id", { required: true })}
                            >
                                <option value="">Select an order...</option>
                                {demoOrders.map((order) => (
                                    <option key={order.id} value={order.id}>
                                        Order #{order.order_number} - Placed on {order.placed_on}{" "}
                                        for {order.total}
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
                    {/* Subject */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-1">
                            <label className=" text-[1rem]">Subject</label>
                            <span className=" text-[1rem]">*</span>
                        </div>
                        <input
                            type="text"
                            className={`w-full h-[42px] bg-[#fff] border px-3 text-[14px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#cc0000] focus:border-[#cc0000] ${errors.subject ? "border-[#cc0000]" : "border-[#cccccc]"
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
                            className={`w-full bg-[#fff] border px-3 py-2 text-[14px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#cc0000] focus:border-[#cc0000] resize-y ${errors.message ? "border-[#cc0000]" : "border-[#cccccc]"
                                }`}
                            {...register("message", { required: true })}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-1">
                        <Button
                            type="submit"
                            className="btn-primary h-[42px]"
                        >
                            Send Message
                        </Button>
                        <Button
                            type="button"
                            onClick={handleClear}
                            className="btn-primary h-[42px]"
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