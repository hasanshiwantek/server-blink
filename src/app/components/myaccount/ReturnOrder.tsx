"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const mockOrders =
  [{ id: 1, order_number: "100123", total_amount: 129.99, status: "Returned", created_at: "2026-01-16T10:00:00Z", updated_at: "2026-01-16T12:00:00Z", products: [{ id: 1, name: "Wireless Headphones", images: ["/default-product-image.svg"], },], returnRequested: "Jan 16, 2026", returnAction: "Store Credit", returnReason: "Not Satisfied With The Product", returnComments: "Testing Return", }, { id: 2, order_number: "100124", total_amount: 79.5, status: "Shipped", created_at: "2026-01-14T09:00:00Z", updated_at: "2026-01-15T15:00:00Z", products: [{ id: 2, name: "Smart Watch", images: ["/default-product-image.svg"], },], returnRequested: null, returnAction: null, returnReason: null, returnComments: null, },];

const ReturnOrder = () => {
   const [quantity, setQuantity] = useState(1);
  const [returnReason, setReturnReason] = useState('Not Satisfied With The Product');
  const [returnAction, setReturnAction] = useState('Store Credit');
  const [comments, setComments] = useState('Testing Return.');
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  console.log("Order ID from query params:", orderId);

return (
  <div className="flex flex-col gap-4 p-4">
    {!orderId ? (
      mockOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 w-full bg-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:w-[65%] w-full">
            <div className="w-full max-w-[128px] h-32 relative flex-shrink-0">
              <Image
                src={order.products[0].images[0]}
                alt={order.products[0].name}
                fill
                className="object-contain border rounded-md"
              />
            </div>

            <div className="flex flex-col items-center md:items-start w-full">
              <Link href={`/my-account/orders?order_id=${order.order_number}`}>
                <p className="mb-1 text-xl text-red-600 hover:text-red-700">
                  Order #{order.order_number}
                </p>
              </Link>

              <p className="text-sm">
                {order.products.length} product totaling $
                {order.total_amount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="md:w-[30%] w-full flex md:justify-end justify-center">
            <button className="bg-[#BFBFBF] text-white px-4 py-2 rounded">
              {order.status || "Pending"}
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="">
        {/* Return Form Content */}
{/* Table Header */}
<div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-300 mb-6">
  <div className="col-span-6 text-xl">Item</div>
  <div className="col-span-3 text-xl text-center">Price</div>
  <div className="col-span-3 text-xl text-end">Qty To Return</div>
</div>

{/* Item Row */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-2 border-b border-gray-300 mb-6">
  <div className="col-span-1 md:col-span-6 text-xl">
    13M737202CT | IBM | Es/Xs 335 System Board
  </div>
  <div className="col-span-1 md:col-span-3 text-xl text-left md:text-center">
    $176.23
  </div>
  <div className="col-span-1 md:col-span-3 text-xl text-left md:text-end">
    <select
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      className="w-24 border px-3 py-2 rounded bg-white"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
</div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-xl mb-2">
                Return Reason <span className="text-red-600">*</span>
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full border px-4 py-4 rounded bg-white"
              >
                <option>Received Wrong Product</option>
                <option>Wrong Product Order</option>
                <option>Not Satisfied With The Product</option>
                <option>There was a problem with the Product</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-xl mb-2">
                Return Action
              </label>
              <select
                value={returnAction}
                onChange={(e) => setReturnAction(e.target.value)}
                className="w-full border px-4 py-4 rounded bg-white"
              >
                <option>Repair</option>
                <option>Replacement</option>
                <option>Store Credit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-xl mb-2">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full h-[185px] border px-4 py-4 rounded bg-white resize-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <button className="btn-primary !px-8 !py-5 font-bold">
            SUBMIT RETURN REQUEST
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default ReturnOrder;
