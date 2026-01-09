"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
interface OrderSummaryProps {
  cart: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CheckoutOrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  subtotal,
  shipping,
  tax,
  total,
}) => {
  return (
    <div className="bg-white border-[1px] border-[#8b8b8b] rounded-sm  shadow-sm py-6 h-fit sticky top-9">
      <div className="flex items-center justify-between mb-6 px-6 border-b-[1px] border-[#8b8b8b]">
        <h2 className="text-xl font-semibold text-gray-800 p-2">Order Summary</h2>
        <Link href="/cart" className="text-base text-[var(--primary-color)] hover:underline">
          Edit Cart
        </Link>
      </div>

      <div className="mb-4 text-sm text-gray-600 px-6">
        {cart.length} Item{cart.length !== 1 ? "s" : ""}
      </div>

      {/* Cart Items */}
      <div className="space-y-4  max-h-[400px] overflow-y-auto px-6 border-b-[1px]  border-[#8b8b8b]">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 pb-4 border-b last:border-b-0"
          >
            <div className="relative w-20 h-25 flex-shrink-0">
              <Image
                src={item.image?.[0]?.path || "/checkouticon/orderimg.png"}
                alt={item.name}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium line-clamp-2 mb-1 text-gray-800">
                {item.name}
              </p>
              <p className="text-base font-semibold text-gray-900">
                ${Number(item.price).toFixed(2)}
              </p>
            </div>
            <div className="text-base font-semibold text-gray-900">
              ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo/Gift Certificate */}
      <div className="mb-6 border-b-[1px] px-6 border-[#8b8b8b] py-4">
        <button className="text-base text-[var(--primary-color)] ">
          Promo/Gift Certificate
        </button>
      </div>

      {/* Totals */}
      <div className="space-y-3 text-sm pt-4 px-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 px-6 border-t-[1px] border-[#8b8b8b] text-gray-900">
        <span>Total (USD)</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;