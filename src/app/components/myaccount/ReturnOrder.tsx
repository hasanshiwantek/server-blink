"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Static test data
const mockOrders = [
  {
    id: 1,
    order_number: "100123",
    total_amount: 129.99,
    status: "Returned",
    created_at: "2026-01-16T10:00:00Z",
    updated_at: "2026-01-16T12:00:00Z",
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        images: ["/default-product-image.svg"],
      },
    ],
    returnRequested: "Jan 16, 2026",
    returnAction: "Store Credit",
    returnReason: "Not Satisfied With The Product",
    returnComments: "Testing Return",
  },
  {
    id: 2,
    order_number: "100124",
    total_amount: 79.5,
    status: "Shipped",
    created_at: "2026-01-14T09:00:00Z",
    updated_at: "2026-01-15T15:00:00Z",
    products: [
      {
        id: 2,
        name: "Smart Watch",
        images: ["/default-product-image.svg"],
      },
    ],
    returnRequested: null,
    returnAction: null,
    returnReason: null,
    returnComments: null,
  },
];

const ReturnOrder = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {mockOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 w-full bg-white"
        >
          {/* Left Side: Product Info */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:w-[65%] w-full">
            {/* Product Image */}
            <div className="w-full max-w-[128px] h-32 relative flex-shrink-0">
              <Image
                src={order.products[0].images[0]}
                alt={order.products[0].name}
                fill
                className="object-contain border rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col items-center md:items-start justify-center w-full">
              <Link href={`/my-account/orders/${order.order_number}`}>
                <p className="mb-1 text-xl text-red-600 hover:text-red-700 transition-colors duration-200">
                  Order #{order.order_number}
                </p>
              </Link>
              <p className="text-sm md:text-[14px]">
                {order.products.length} product
                totaling ${order.total_amount.toFixed(2)}
              </p>

              {/* Order Placed / Last Update */}
          {/* Return Info */}
<div className="flex text-center md:text-left flex-wrap gap-6 md:gap-2 mt-2">
  {/* 1st Field */}
  <div className="flex flex-col gap-1 w-full md:w-[25%]">
    <span className="text-[12px]">Return Requested:</span>
    <span className="text-xl">{order.returnRequested}</span>
  </div>

  {/* 2nd Field */}
  <div className="flex flex-col gap-1 w-full md:w-[25%]">
    <span className="text-[12px]">Return Action:</span>
    <span className="text-xl">{order.returnAction}</span>
  </div>

  {/* 3rd Field */}
  <div className="flex flex-col gap-1 w-full md:w-[45%]">
    <span className="text-[12px]">Return Reason:</span>
    <span className="text-xl">{order.returnReason}</span>
  </div>

  {/* 4th Field – New row */}
  <div className="flex flex-col gap-1 w-full">
    <span className="text-[12px]">Your Comments:</span>
    <span className="text-xl">{order.returnComments}</span>
  </div>
</div>

            </div>
          </div>

          {/* Right Side: Status Button */}
          <div className="md:w-[30%] w-full flex md:justify-end justify-center mt-2 md:mt-0">
            <button className="bg-[#BFBFBF] text-white font-bold border border-[#BFBFBF] px-4 py-2 rounded hover:bg-white hover:text-[#F15939] transition w-auto text-center text-sm md:text-base">
              {order.status || "Pending"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnOrder;
