"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  updateQty,
} from "@/redux/slices/cartSlice";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  deleteCart,
  fetchCartList,
  updateCart,
} from "@/redux/slices/cartsSlice";
const CartList = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.carts?.items);
  const { cartLoading, loading } = useAppSelector(
    (state: RootState) => state.carts,
  );
  const disable = cartLoading || loading;

  const [quantities, setQuantities] = useState<{
    [key: string]: number | string;
  }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  function removeLocalShipping() {
    localStorage.removeItem("shippingCost");
    localStorage.removeItem("shippingData");
  }
  const handleChange = (
    id: string,
    value: string,
    maxPurchaseQuantity?: number,
  ) => {
    if (value === "" || /^\d*$/.test(value)) {
      const parsed = Number(value);

      if (maxPurchaseQuantity && parsed > maxPurchaseQuantity) {
        setQuantities((prev) => ({ ...prev, [id]: maxPurchaseQuantity }));
        // dispatch(updateQty({ id, quantity: maxPurchaseQuantity }));
        dispatch(
          updateCart({
            id: id,
            data: {
              quantity: maxPurchaseQuantity,
            },
          }),
        )
          .unwrap()
          .then(() => {
            dispatch(fetchCartList());
            removeLocalShipping();
          });
        return;
      }
      setQuantities((prev) => ({ ...prev, [id]: value }));
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      // dispatch(removeFromCart(itemToDelete.id));
      dispatch(deleteCart({ id: itemToDelete?.cartItemId }))
        .unwrap()
        .then(() => {
          dispatch(fetchCartList());
          removeLocalShipping();
          setItemToDelete(null);
          setIsDialogOpen(false);
        });
    }
  };
  useEffect(() => {
    const updatedQuantities: { [key: string]: number } = {};
    cart?.forEach((item) => {
      updatedQuantities[item.cartItemId] = item.quantity;
    });
    setQuantities(updatedQuantities);
  }, [cart]);

  const handleManualQtyUpdate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    maxPurchaseQuantity?: number,
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

      // dispatch(updateQty({ id, quantity: newQty }));

      dispatch(
        updateCart({
          id: id,
          data: {
            quantity: newQty,
          },
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(fetchCartList());
          removeLocalShipping();
        });

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
        cart?.map((item, index) => {
          const minQty = item?.minPurchaseQuantity;
          const maxQty = item?.maxPurchaseQuantity;

          return (
            <div key={index}>
              <div className="flex flex-col xl:flex-row items-center justify-between py-5">
                <div className="flex flex-row items-start  xl:flex-row items-center xl:w-[65.1%] 2xl:w-[64.5%]">
                  <div className="w-[40%] xl:w-[18.1%] 2xl:w-[17.7%]">
                    <Image
                      width={98}
                      height={105}
                      src={
                        item.image?.[0]?.path || "/checkouticon/orderimg.png"
                      }
                      alt={item.name}
                      className="w-full h-[8.1rem] object-contain border m-auto"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="w-[60%] pl-3 text-[15px] text-[#545454] xl:w-[63.1%] 2xl:w-[71%] mx-4">
                    <p className="  xl:text-start">
                      {item?.brand?.name || "N/A"}
                    </p>
                    <Link href={`${item?.productUrl || "#"}`}>
                      <p className=" text-[#D42020] underline  lg:mx-auto md:mx-auto sm:mx-auto w-[100%] sm:w-[60%]  md:w-[70%] lg:w-[80%] xl:text-start xl:w-[100%] 2xl:w-[100%]">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-3 xl:gap-0 xl:w-[66%] 2xl:w-[68%] xl:flex-nowrap xl:justify-between">
                  <div className="flex items-center justify-between md:block">
                    <p className=" text-[14px] text-[#545454] md:hidden">
                      Price
                    </p>

                    <p className="text-[15px] text-[#545454]  ">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <div></div>
                  </div>

                  <div className="flex items-center justify-between ">
                    <p className=" text-[14px] text-[#545454]    md:hidden">
                      Quantity
                    </p>
                    <div className="flex items-center  border-gray-300 overflow-hidden">
                      {/* Down Arrow (Decrease) — Left */}
                      <button
                        type="button"
                        onClick={() => {
                          if (item.quantity > minQty) {
                            // dispatch(decreaseQty(item.id))
                            // dispatch(updateCart({
                            //   id: item?.cartItemId, data: quantities[item.id] === undefined
                            //     ? item.quantity
                            //     : quantities[item.id]
                            // }))

                            dispatch(
                              updateCart({
                                id: item?.cartItemId,
                                data: {
                                  quantity: Number(item?.quantity) - 1,
                                },
                              }),
                            )
                              .unwrap()
                              .then(() => {
                                dispatch(fetchCartList());
                                removeLocalShipping();
                              });
                          }
                        }}
                        //                 className="
                        //   flex items-center justify-center w-8 h-full
                        //   hover:bg-gray-100
                        //   text-black
                        // "
                        className="w-8 h-8  flex items-center justify-center hover:bg-[#f5f5f5] transition text-[#4a4a4a] bg-[#cac9c9]  border-b-3 border-[#8b8b8b]"
                        disabled={item.quantity <= minQty || disable}
                      >
                        <ChevronDown size={16} />
                      </button>

                      {/* Number Input — Center */}
                      <input
                        type="number"
                        disabled={disable}
                        value={
                          quantities[item.cartItemId] === undefined
                            ? item.quantity
                            : quantities[item.cartItemId]
                        }
                        onChange={(e) =>
                          handleChange(item?.cartItemId, e.target.value, maxQty)
                        }
                        onBlur={(e) => {
                          const parsed = Number(quantities[item.cartItemId]);

                          if (!parsed || parsed <= 0) {
                            dispatch(
                              updateCart({
                                id: item?.cartItemId,
                                data: {
                                  quantity: parsed,
                                },
                              }),
                            )
                              .unwrap()
                              .then(() => {
                                dispatch(fetchCartList());
                                // removeLocalShipping()
                              });
                            // dispatch(updateQty({ id: item.id, quantity: 1 }));
                            setQuantities((prev) => ({
                              ...prev,
                              [item.cartItemId]: 1,
                            }));
                          } else if (item.maxQty && parsed > maxQty) {
                            dispatch(
                              updateCart({
                                id: item?.cartItemId,
                                data: {
                                  quantity: parsed,
                                },
                              }),
                            )
                              .unwrap()
                              .then(() => {
                                dispatch(fetchCartList());
                                // removeLocalShipping()
                              });
                            // dispatch(updateQty({ id: item.id, quantity: maxQty }));
                            setQuantities((prev) => ({
                              ...prev,
                              [item.cartItemId]: maxQty,
                            }));
                          }
                        }}
                        min={minQty}
                        max={maxQty || undefined}
                        onKeyDown={(e) =>
                          handleManualQtyUpdate(e, item?.cartItemId, maxQty)
                        }
                        className="
      w-10 bg-white text-center py-0 outline-none
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
                          if (!maxQty || item.quantity < maxQty) {
                            // dispatch(increaseQty(item.id));
                            dispatch(
                              updateCart({
                                id: item?.cartItemId,
                                data: {
                                  quantity: Number(item?.quantity) + 1,
                                },
                              }),
                            )
                              .unwrap()
                              .then(() => {
                                dispatch(fetchCartList());
                                removeLocalShipping();
                              });
                          }
                        }}
                        //                 className="
                        //   flex items-center justify-center w-8 h-full
                        //   hover:bg-gray-100
                        //   text-black
                        // "
                        disabled={
                          (!!maxQty && item.quantity >= maxQty) || disable
                        }
                        className="w-8 h-8  flex items-center justify-center hover:bg-[#f5f5f5] transition text-[#4a4a4a] bg-[#cac9c9]  border-b-3 border-[#8b8b8b]"
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                    <div></div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[14px] text-[#545454]   md:hidden">
                      Total
                    </p>

                    <p className="text-[15px] text-[#545454]  ">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      aria-label="Remove item from cart"
                      onClick={() => {
                        setItemToDelete(item);
                        setIsDialogOpen(true);
                      }}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CAC9C9] text-[#D42020] transition hover:bg-[#B8B7B7] hover:text-[#b81a1a]"
                    >
                      <X className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                  </div>
                </div>
              </div>

              {/* line grey */}
              <div className="w-[97%] mx-auto h-[1px] bg-gray-300"></div>
            </div>
          );
        })
      ) : (
        <div className="text-7xl text-[#4A4A4A] text-center my-16">
          No Cart Added
        </div>
      )}
      {/* ShadCN Dialog for Delete Confirmation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[520px] border-none p-0"
        >
          <div className="bg-white px-6 py-12 sm:px-10 sm:py-14 text-center">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D42020]">
              <span className="text-6xl font-extrabold leading-none text-[#D42020]">
                !
              </span>
            </div>

            <p className="text-xl sm:text-2xl font-medium text-[#2d2d2d]">
              Are you sure you want to delete this item?
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={confirmDelete}
                className="min-w-[85px] bg-[#D42020] px-10 py-3 text-xl font-bold text-white hover:bg-[#b81a1a] transition border-b border-black"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="min-w-[123px] bg-[#D42020] px-10 py-3 text-xl font-bold text-white hover:bg-[#b81a1a] transition border-b border-black"
              >
                CANCEL
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartList;
