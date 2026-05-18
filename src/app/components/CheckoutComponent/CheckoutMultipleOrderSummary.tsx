"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useReduxHooks";

interface OrderSummaryProps {
    cart: any[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    finalTotal: number;
    discountAmount: number;
    appliedCoupon: any;
    promoCode: string;
    setPromoCode: (code: string) => void;
    onApplyCoupon: () => void;
    onRemoveCoupon: () => void;
}

const CheckoutMultipleOrderSummary: React.FC<OrderSummaryProps> = ({
    cart, subtotal, shipping, tax, total, finalTotal,
    discountAmount, appliedCoupon, promoCode, setPromoCode,
    onApplyCoupon, onRemoveCoupon,
}) => {
    const [showPromo, setShowPromo] = useState(false);
    const [discountOpen, setDiscountOpen] = useState(false);
    const [showAllItems, setShowAllItems] = useState(false);

    // ✅ Redux se destinations lo
    const { destinations, isMultiAddress } = useAppSelector((state) => state.multiAddress);

    // ✅ Multi address mode mein destinations se items build karo
    //   const buildMultiAddressItems = () => {
    //     const items: { id: string; name: string; price: number; quantity: number; image: any[]; destLabel: string }[] = [];

    //     destinations.forEach((dest, destIndex) => {
    //       if (dest.allocatedItems.length === 0) return;

    //       // Group slots by itemId
    //       const grouped: Record<string, number> = {};
    //       dest.allocatedItems.forEach((slot) => {
    //         const itemId = slot.split("-")[0];
    //         grouped[itemId] = (grouped[itemId] || 0) + 1;
    //       });

    //       Object.entries(grouped).forEach(([itemId, count]) => {
    //         const cartItem = cart.find((c) => String(c.id) === itemId);
    //         if (!cartItem) return;
    //         items.push({
    //           id: `${dest.id}-${itemId}`,
    //           name: cartItem.name,
    //           price: Number(cartItem.price),
    //           quantity: count,
    //           image: cartItem.image || [],
    //           destLabel: `Destination #${destIndex + 1}`,
    //         });
    //       });
    //     });

    //     return items;
    //   };
    const buildMultiAddressItems = () => {
        const items: {
            id: string;
            name: string;
            price: number;
            quantity: number;
            image: any[];
            destLabel: string;
            isAllocated: boolean;
        }[] = [];

        // ✅ Pehle sab cart items check karo
        cart.forEach((cartItem) => {
            // ✅ Count total allocated across all destinations
            const allocatedPerDest: Record<string, number> = {};

            destinations.forEach((dest, destIndex) => {
                const count = dest.allocatedItems.filter(
                    (slot) => slot.split("-")[0] === String(cartItem.id)
                ).length;

                if (count > 0) {
                    allocatedPerDest[`Destination #${destIndex + 1}`] = count;
                }
            });

            const totalAllocated = Object.values(allocatedPerDest).reduce((s, c) => s + c, 0);
            const unallocated = (cartItem.quantity || 1) - totalAllocated;

            // ✅ Allocated items — har destination ke liye alag row
            Object.entries(allocatedPerDest).forEach(([destLabel, qty]) => {
                items.push({
                    id: `${destLabel}-${cartItem.id}`,
                    name: cartItem.name,
                    price: Number(cartItem.price),
                    quantity: qty,
                    image: cartItem.image || [],
                    destLabel,
                    isAllocated: true,
                });
            });

            // ✅ Unallocated items — agar kuch bache hain to show karo
            if (unallocated > 0) {
                items.push({
                    id: `unallocated-${cartItem.id}`,
                    name: cartItem.name,
                    price: Number(cartItem.price),
                    quantity: unallocated,
                    image: cartItem.image || [],
                    destLabel: "",
                    isAllocated: false,
                });
            }
        });

        return items;
    };
    // ✅ Display items — multi address ya normal
    // const displayItems = isMultiAddress && destinations.some((d) => d.allocatedItems.length > 0)
    //     ? buildMultiAddressItems()
    //     : cart.map((item) => ({
    //         id: String(item.id),
    //         name: item.name,
    //         price: Number(item.price),
    //         quantity: item.quantity || 1,
    //         image: item.image || [],
    //         destLabel: "",
    //     }));

    const displayItems = isMultiAddress
        ? buildMultiAddressItems()
        : cart.map((item) => ({
            id: String(item.id),
            name: item.name,
            price: Number(item.price),
            quantity: item.quantity || 1,
            image: item.image || [],
            destLabel: "",
            isAllocated: true,
        }));
    const INITIAL_SHOW = 3;
    // const cartItemCount = cart.reduce((sum, item: any) => sum + (item?.quantity ?? 1), 0);
    const cartItemCount = isMultiAddress && destinations.some((d) => d.allocatedItems.length > 0)
        ? destinations.reduce((sum, d) => sum + d.allocatedItems.length, 0)
        : cart.reduce((sum, item: any) => sum + (item?.quantity ?? 1), 0);
    const visibleItems = showAllItems ? displayItems : displayItems.slice(0, INITIAL_SHOW);
    const hiddenCount = displayItems.length - INITIAL_SHOW;

    return (
        <div className="bg-white border-[1px] border-[#8b8b8b] rounded-sm shadow-sm py-6 h-fit sticky top-9">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-6 border-b-[1px] border-[#8b8b8b]">
                <h2 className="text-xl font-semibold text-gray-800 p-2">
                    Order Summary
                </h2>
                <Link href="/cart" className="text-base text-[var(--primary-color)] hover:underline">
                    Edit Cart
                </Link>
            </div>

            {/* Item count */}
            <div className="mb-4 text-sm text-gray-600 px-6">
                {cartItemCount} Item{cartItemCount !== 1 ? "s" : ""}
            </div>

            {/* Cart Items */}
            <div className="border-b-[1px] border-[#8b8b8b]">
                <div className="space-y-0 px-6">
                    {visibleItems.map((item) => {
                        const primaryImage = item.image?.[0]?.url || item.image?.[0]?.path || "/checkouticon/orderimg.png";
                        const lineTotal = item.price * item.quantity;

                        return (
                            <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                                <div className="relative w-20 h-25 flex-shrink-0">

                                    <Image
                                        src={item.image?.[0]?.path || "/checkouticon/orderimg.png"}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {/* ✅ Destination label OR unallocated badge */}
                                    {/* {item.destLabel ? (
                                        <p className="text-xs text-[var(--primary-color)] font-medium mb-0.5">
                                            {item.destLabel}
                                        </p>
                                    ) : isMultiAddress ? (
                                        <p className="text-xs text-amber-500 font-medium mb-0.5">
                                            Not allocated
                                        </p>
                                    ) : null} */}
                                    <p className="text-sm text-gray-800 line-clamp-2 leading-snug mb-1">
                                        {item.quantity} x {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                    ${lineTotal.toFixed(2)}
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="flex w-full justify-end mb-1 mr-2 pr-1 ">

                    {/* SEE MORE / SEE LESS */}
                    {displayItems.length > INITIAL_SHOW && (
                        <button
                            type="button"
                            onClick={() => setShowAllItems((prev) => !prev)}
                            className=" flex items-center justify-end gap-2 py-3 p-2 text-sm font-bold text-white bg-[var(--primary-color)] hover:opacity-90 uppercase"
                        >
                            {showAllItems ? (
                                <>
                                    SEE LESS
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    SEE MORE
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Promo */}
            <div className="mb-6 border-b-[1px] px-6 border-[#8b8b8b] py-4">
                <button type="button" className="text-[13px] text-[var(--primary-color)]" onClick={() => setShowPromo((prev) => !prev)}>
                    Promo/Gift Certificate
                </button>
                {showPromo && (
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="w-full border border-gray-300 rounded px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button type="button" className="bg-[var(--primary-color)] text-white px-4 py-1 rounded-none border-b-2 border-black text-2xl" onClick={onApplyCoupon}>
                                Apply
                            </button>
                        </div>
                        {appliedCoupon && (
                            <div className="flex gap-3 items-center px-4 py-2 rounded">
                                <span>${Number(appliedCoupon.discountAmount).toFixed(2)} off the order total ({appliedCoupon.couponCode.toUpperCase()})</span>
                                <button onClick={onRemoveCoupon} className="font-bold hover:text-red-700">X</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Totals */}
            <div className="space-y-3  pt-4 px-6">
                <div className="flex justify-between text-[13px] text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                    <div className="mt-2">
                        <div className="flex text-[13px]  justify-between items-center text-gray-700 cursor-pointer select-none" onClick={() => setDiscountOpen((prev) => !prev)}>
                            <span className="flex items-center gap-1 font-medium">
                                Discounts
                                <svg className={`w-4 h-4 transition-transform ${discountOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                        </div>
                        {discountOpen && (
                            <div className="flex justify-between text-gray-600 text-[13px] mt-1">
                                <span>${Number(appliedCoupon.discountAmount).toFixed(2)} off ({appliedCoupon.couponCode.toUpperCase()})</span>
                                <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between text-[13px] text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-700">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex flex-col mt-4 pt-4 px-6 border-t-[1px] border-[#8b8b8b] text-gray-700">
                <div className="flex justify-between items-center text-[15px] font-bold">
                    <span>Total <br /> (USD)</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                    <div className="text-[#333] font-medium text-[13px] mt-1 self-end">You saved <span className="!text-[#2aab3f] ">${discountAmount.toFixed(2)}</span> in total!</div>
                )}
            </div>
        </div>
    );
};

export default CheckoutMultipleOrderSummary;
