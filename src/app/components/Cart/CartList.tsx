"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  updateQty,
} from "@/redux/slices/cartSlice";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const CartList = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart.items);
  console.log("Cart Items:", cart);
  const [quantities, setQuantities] = useState<{
    [key: string]: number | string;
  }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const handleChange = (id: string, value: string) => {
    if (value === "" || /^\d*$/.test(value)) {
      setQuantities((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      setItemToDelete(null);
    }
    setIsDialogOpen(false);
  };
  useEffect(() => {
    const updatedQuantities: { [key: string]: number } = {};
    cart.forEach((item) => {
      updatedQuantities[item.id] = item.quantity;
    });
    setQuantities(updatedQuantities);
  }, [cart]);

  const handleManualQtyUpdate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    maxPurchaseQuantity?: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = quantities[id];
      const parsed = Number(inputValue);

         const newQty = maxPurchaseQuantity
      ? Math.min(parsed > 0 ? parsed : 1, maxPurchaseQuantity)
      : parsed > 0
      ? parsed
      : 1;

      dispatch(updateQty({ id, quantity: newQty }));

      setQuantities((prev) => ({
        ...prev,
        [id]: newQty,
      }));

      e.currentTarget.blur();
    }
  };

  return (
    <div className="rounded-lg 2xl:w-full">
      <div className="hidden  xl:flex justify-between font-semibold pb-4 bg-transparent border-b border-[#D6D6D6]">
        <span className="text-xl font-normal">Items</span>
        <span className="flex justify-between xl:w-[48.8%] 2xl:w-[51.2%]">
          <span className="text-xl font-normal">Price</span>
          <span className="text-xl font-normal">Quantity</span>
          <span className="text-xl font-normal">Total</span>
        </span>
      </div>
      {cart?.length > 0 ? (
        cart?.map((item, index) => (
          <>
            {/* Example product row */}
            <div
              key={item?.id}
              className="flex flex-col xl:flex-row items-center justify-between py-5"
            >
              <div className="flex flex-col xl:flex-row items-center xl:w-[65.1%] 2xl:w-[64.5%]">
                <div className="w-full xl:w-[18.1%] 2xl:w-[17.7%]">
                  <Image
                    width={98}
                    height={105}
                    src={item.image?.[0]?.path || "/checkouticon/orderimg.png"}
                    alt={item.name}
                    className="w-full h-[8.1rem] object-contain border m-auto"
                  />
                </div>
                <div className="w-full xl:w-[63.1%] 2xl:w-[71%] mx-4">
                  <p className="text-xl text-center xl:text-start">
                     {item?.brand?.name || "N/A"}
                  </p>
                  <p className="text-xl text-[#D42020] text-center lg:mx-auto md:mx-auto sm:mx-auto w-[100%] sm:w-[60%]  md:w-[70%] lg:w-[80%] xl:text-start xl:w-[100%] 2xl:w-[100%]">
                    {item.name}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center gap-4 xl:gap-0 xl:w-[66%]  2xl:w-[68%] justify-between">
                <p className="text-xl">${Number(item.price).toFixed(2)}</p>
       <div className="flex items-center border border-gray-300 overflow-hidden">
  
  {/* Down Arrow (Decrease) — Left */}
  <button
    type="button"
    onClick={() => dispatch(decreaseQty(item.id))}
    className="
      flex items-center justify-center w-8 h-full
      hover:bg-gray-100
      text-black
    "
  >
    <ChevronDown size={16} />
  </button>

  {/* Number Input — Center */}
  <input
    type="number"
    value={
      quantities[item.id] === undefined
        ? item.quantity
        : quantities[item.id]
    }
    onChange={(e) => handleChange(item.id, e.target.value)}
    onKeyDown={(e) =>
      handleManualQtyUpdate(e, item.id, item.maxPurchaseQuantity)
    }
    className="
      w-10 bg-white text-center py-2 outline-none
      border-x border-gray-300
      [appearance:textfield]
      [&::-webkit-outer-spin-button]:appearance-none
      [&::-webkit-inner-spin-button]:appearance-none
    "
  />

  {/* Up Arrow (Increase) — Right */}
  <button
    type="button"
    onClick={() => {
      if (
        !item.maxPurchaseQuantity ||
        item.quantity < item.maxPurchaseQuantity
      ) {
        dispatch(increaseQty(item.id));
      }
    }}
    className="
      flex items-center justify-center w-8 h-full
      hover:bg-gray-100
      text-black
    "
  >
    <ChevronUp size={16} />
  </button>
</div>

                {/* Trash / Delete Button */}
                <button
                  onClick={() => {
                    setItemToDelete(item);
                    setIsDialogOpen(true);
                  }}
                  className="absolute -right-7 xl:right-0 xl:bottom-14 2xl:right-1 2xl:bottom-18 ml-auto text-gray-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <p className="text-xl">
                  ${Number(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            {/* line grey */}
            <div className="w-[97%] mx-auto h-[1px] bg-gray-300"></div>
          </>
        ))
      ) : (
        <div className="text-7xl text-[#4A4A4A] text-center my-16">
          No Cart Added
        </div>
      )}
      {/* ShadCN Dialog for Delete Confirmation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              <strong>{itemToDelete?.name}</strong> from your cart? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="!p-4 !text-lg">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}  className="!p-4 !text-lg">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartList;
