"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { logout } from "@/redux/slices/authSlice";
import { fetchCartList } from "@/redux/slices/cartsSlice";
import { fetchLoadSavedQuote, removeCoupon } from "@/redux/slices/couponSlice";
import {
  addShippingCost,
  checkoutFormSave,
  fetchShippingRate,
} from "@/redux/slices/shippingSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const quoteToken = searchParams.get("quoteToken");
  const shouldLoadQuote = action === "loadSavedQuote" && !!quoteToken;
  const { cartLoading, loading } = useAppSelector(
    (state: RootState) => state.carts,
  );
  const auth = useAppSelector((state: RootState) => state?.auth);
  const cartLoad = cartLoading || loading;
  const cartItems = useAppSelector((state: RootState) => state?.carts?.items);
  const cartItemCount =
    cartItems?.reduce(
      (sum: number, item: any) => sum + (item?.quantity ?? 1),
      0,
    ) ?? 0;
  useEffect(() => {
    if (!shouldLoadQuote || !quoteToken) return;
    dispatch(fetchLoadSavedQuote(quoteToken))
      .unwrap()
      .then(async (res) => {
        const response = res?.data;

        if (auth?.user?.id != response?.customer?.id) return;
        const shippingformation = response?.billingInformation;
        const billingAddress = response?.billingAddress;
        const shippingFormData = {
          email: response?.customer?.email,
          firstName: shippingformation?.firstName,
          lastName: shippingformation?.lastName,
          company: shippingformation?.companyName,
          phone: shippingformation?.phone,
          address1: shippingformation?.addressLine1,
          address2: shippingformation?.addressLine2,
          city: shippingformation?.city,
          country: shippingformation?.country,
          state: shippingformation?.state,
          zip: shippingformation?.zip,
          shippingMethod: shippingformation?.shippingMethod,
          orderComment: response?.comments,
        };
        const billingFormData = {
          billingFirstName: billingAddress.firstName || "",
          billingLastName: billingAddress.lastName || "",
          billingCompany: billingAddress.companyName || "",
          billingPhone: billingAddress.phone || "",
          billingAddress1: billingAddress.addressLine1 || "",
          billingAddress2: billingAddress.addressLine2 || "",
          billingCity: billingAddress.city || "",
          billingCountry: billingAddress.country || "",
          billingState: billingAddress.state || "",
          billingZip: billingAddress.zip || "",
        };
        dispatch(
          checkoutFormSave({ data: { shippingFormData, billingFormData } }),
        );
        await dispatch(fetchCartList())
          .unwrap()
          .then(async (res) => {
            const carts = res?.data;
            if (carts?.length > 0) {
              const shippingMethod = response?.shippingMethod;
              const shippingPayload: any = {
                city: shippingformation?.city,
                country: shippingformation?.country,
                state: shippingformation?.state,
                zip: shippingformation?.zip,
                cartId: carts.map((item: any) => item.id),
                rate: {
                  service_type: shippingMethod?.service_type,
                  method_type: shippingMethod?.method_type,
                  total_charge: shippingMethod?.cost,
                },
              };
              await dispatch(addShippingCost(shippingPayload));
              dispatch(fetchShippingRate({}));
            }
          });
      })
      .catch((error) => {
        if (error) {
          dispatch(removeCoupon());
          dispatch(logout());
          window.location.href = `/auth/login?action=loadSavedQuote&quoteToken=${quoteToken}`;
        }
      });
  }, [shouldLoadQuote, quoteToken]);

  return (
    <main className="flex flex-col gap-8 w-full py-1">
      {/* Container: max-width 1170px, centered */}
      <div className="w-full max-w-[1170px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        {/* Heading */}
        <div className="w-full">
          <h2 className="">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 text-[11px]"
            >
              Home
            </Link>
            <span
              className="mt-2 mx-3 text-gray-400 text-[11px]"
              aria-hidden="true"
            >
              /
            </span>{" "}
            <span
              className="!text-[#D42020] text-[11px] sans-font"
              itemProp="name"
            >
              Your Cart
            </span>
          </h2>

          <h1 className="text-[28px] mt-5 text-[#545454] font-light roboto-font">
            Your Cart ({cartItemCount} items)
          </h1>
          {cartItemCount === 0 && (
            <h1 className="text-[22px] mt-8 text-[#545454] font-light">
              Your cart is empty
            </h1>
          )}
        </div>

        {cartItemCount > 0 && (
          <div className="relative">
            {cartLoad && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <div className="h-10 w-10 rounded-full border-[3px] border-gray-300 border-t-red-500 animate-spin" />
              </div>
            )}

            {/* Cart */}
            <div className="w-full">
              <CartList />
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-[45%] md:ml-auto mt-6">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
