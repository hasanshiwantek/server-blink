"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  clearCart,
} from "@/redux/slices/cartSlice";
import { applyCoupon, removeCoupon } from "@/redux/slices/couponSlice"; // ADD THIS
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import type { PaymentRequest as StripePaymentRequest } from "@stripe/stripe-js";

import { useRouter } from "next/navigation";
// Import step components
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import CheckoutMultipleOrderSummary from "./CheckoutMultipleOrderSummary";
import LoadTrustpilotScript from "./TrustpilotWidget";
export const CHECKOUT_STORAGE_KEY = "checkoutFormData";



const roboto = "'Roboto', Arial, Helvetica, sans-serif";

interface CheckoutFormValues {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  shippingMethod: string;
  orderComment: string;
  paymentMethod: string;
  paymentIntentId?: string | null;
  billingSame: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingPhone: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingCountry: string;
  billingState: string;
  billingZip: string;
  newsletter?: boolean;
}

// Inner component that uses Stripe hooks
const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state?.cart?.items);
  const auth = useAppSelector((state: RootState) => state?.auth);
  const orders = useAppSelector((state) => state.order.lastOrder) ?? [];
  const [localOrders] = useState(orders);
  const orderCustomer = localOrders[0]
  // ADD COUPON STATE FROM REDUX
  const { appliedCoupon, discountAmount } = useAppSelector(
    (state: RootState) => state.coupon
  );

  const [promoCode, setPromoCode] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardCompletion, setCardCompletion] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [cardError, setCardError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] =
    useState<StripePaymentRequest | null>(null);
  const [walletSupport, setWalletSupport] = useState<{
    applePay: boolean;
    googlePay: boolean;
  }>({ applePay: false, googlePay: false });
  const [pendingWalletForm, setPendingWalletForm] =
    useState<CheckoutFormValues | null>(null);
  const { isMultiAddress, completedDestinations, destinations, destShippingRates } = useAppSelector(
    (state) => state.multiAddress
  );
  const router = useRouter();
  const emptyCartWarningShownRef = useRef(false);
  const skipEmptyCartCheckRef = useRef(false);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      paymentMethod: "credit_card",
      billingSame: isMultiAddress ? false : true,
      email: auth?.user?.email || "",
      firstName: auth?.user?.firstName || "",
      lastName: auth?.user?.lastName || "",
      company: auth?.user?.companyName || "",
      phone: auth?.user?.phone || "",
      state: auth?.user?.state || "",
      country: "",
      billingCountry: "",
      newsletter: false,
    },
  });
  const watchedCountry = watch("country");
  const watchedState = watch("state");

  const watchedPaymentMethod = watch("paymentMethod") || "credit_card";
  const watchedBillingSame = watch("billingSame");
  const stripeCardMethods = ["credit_card"];
  const walletMethods = ["google_pay", "apple_pay"];
  const { shippingRates } = useAppSelector((state) => state.shippingZone);
  const stateList = useMemo(() => {
    if (!watchedCountry) return [];
    return State.getStatesOfCountry(watchedCountry).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [watchedCountry]);
  // ✅ State change hone pe cities
  const cityList = useMemo(() => {
    if (!watchedCountry || !watchedState) return [];
    return City.getCitiesOfState(watchedCountry, watchedState).map((c) => ({
      name: c.name,
    }));
  }, [watchedCountry, watchedState]);

  const watchedBillingCountry = watch("billingCountry");
  const watchedBillingState = watch("billingState");
  const watchedFirstName = watch("firstName");
  const watchedLastName = watch("lastName");
  const watchedCompany = watch("company");
  const watchedPhone = watch("phone");
  const watchedAddress1 = watch("address1");
  const watchedAddress2 = watch("address2");
  const watchedCity = watch("city");
  const watchedZip = watch("zip");
  const billingStateList = useMemo(() => {
    if (!watchedBillingCountry) return [];
    return State.getStatesOfCountry(watchedBillingCountry).map((s) => ({
      name: s.name,
      code: s.isoCode,
    }));
  }, [watchedBillingCountry]);

  const billingCityList = useMemo(() => {
    if (!watchedBillingCountry || !watchedBillingState) return [];
    return City.getCitiesOfState(watchedBillingCountry, watchedBillingState).map((c) => ({
      name: c.name,
    }));
  }, [watchedBillingCountry, watchedBillingState]);
  // 2. watchedShippingMethod add 
  const watchedShippingMethod = watch("shippingMethod");
  // Memoized calculations
  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + Number(item.price) * (item.quantity || 1),
      0
    );
  }, [cart]);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/detect-country"); // apna Next.js route
        const data = await res.json();
        if (data.country_code) {
          const checkoutFormData = JSON.parse(localStorage.getItem("checkoutFormData") || "");
          if (checkoutFormData?.country && checkoutFormData?.state && checkoutFormData?.city) {
            // Agar localStorage mein data hai, toh usko update karo detected country se
          } else {
            setValue("country", data.country_code);
            setValue("state", data.state);

            setValue("billingCountry", data.country_code);
            setValue("billingState", data.state);
          }
        }
      } catch {
        setValue("country", "US");
        setValue("billingCountry", "US");
      }
    };

    detectCountry();
  }, [setValue]);

  const shipping = useMemo(() => {
    if (isMultiAddress) {
      return destinations.reduce((sum, dest) => {
        if (!dest.selectedShippingMethod) return sum;

        // ✅ Per-dest rates check karo
        const destRates = destShippingRates[dest.id] || [];
        const globalRates = shippingRates || [];
        const allRates = destRates.length > 0 ? destRates : globalRates;

        const rate = allRates.find(
          (r: any) => r.service_type === dest.selectedShippingMethod
        );

        if (!rate) {
          if (dest.selectedShippingMethod === "flat") return sum + 10;
          if (dest.selectedShippingMethod === "own") return sum + 0;
          return sum;
        }

        return sum + Number(rate.total_charge || 0);
      }, 0);
    }

    // Single address — existing logic
    if (watchedShippingMethod) {
      if (!shippingRates?.length) return 0;
      const selected = shippingRates.find(
        (rate: any) => rate.service_type === watchedShippingMethod
      );
      return selected ? Number(selected.total_charge) : 0;
    }
    // ✅ Cart page se localStorage mein saved cost
    if (typeof window !== "undefined") {
      const savedCost = localStorage.getItem("shippingCost");
      if (savedCost) return Number(savedCost);
    }

    if (cart.length === 0) return 0;
    return cart.reduce((sum, item) => sum + Number(item.fixedShippingCost || 0), 0);
  }, [isMultiAddress, destinations, destShippingRates, watchedShippingMethod, shippingRates, cart]);

  const tax = 0;

  // Total before discount
  const totalBeforeDiscount = useMemo(() => subtotal + shipping + tax, [subtotal, shipping]);

  // Final total after discount
  const finalTotal = useMemo(() =>
    Math.max(totalBeforeDiscount - discountAmount, 0),
    [totalBeforeDiscount, discountAmount]
  );

  // ADD COUPON HANDLERS
  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    try {
      await dispatch(
        applyCoupon({ couponCode: promoCode, total: totalBeforeDiscount })
      ).unwrap();
      toast.success("Promo code applied successfully!");
      setPromoCode("");
    } catch (err: any) {
      toast.error(err || "Failed to apply coupon");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setPromoCode("");
    toast.info("Coupon removed");
  };

  // Memoized handlers
  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      setItemToDelete(null);
    }
    setIsDialogOpen(false);
  }, [itemToDelete, dispatch]);

  const handleIncreaseQty = useCallback(
    (itemId: string | number) => {
      dispatch(increaseQty(itemId));
    },
    [dispatch]
  );

  const handleDecreaseQty = useCallback(
    (itemId: string | number) => {
      dispatch(decreaseQty(itemId));
    },
    [dispatch]
  );

  const handleDeleteClick = useCallback((item: any) => {
    setItemToDelete(item);
    setIsDialogOpen(true);
  }, []);

  const handlePaymentSelection = useCallback(
    (method: CheckoutFormValues["paymentMethod"]) => {
      setValue("paymentMethod", method);
      setCardError(null);
      setCardCompletion({
        number: false,
        expiry: false,
        cvc: false,
      });
    },
    [setValue, setCardCompletion, setCardError]
  );

  const getDeviceType = () => {
    if (typeof window === "undefined") return "desktop";

    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) return "mobile";
    if (/tablet/i.test(userAgent)) return "tablet";

    return "desktop";
  };

  const user: any = localStorage.getItem("persist:auth");
  const parsedAuth = auth ? JSON.parse(user) : null;
  const token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : null;

  // const buildOrderPayload = useCallback(
  //   (data: CheckoutFormValues & { paymentIntentId?: string | null }) => ({
  //     userType: token ? null : "guest",
  //     deviceType: getDeviceType(),
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     companyName: data.company || "",
  //     email: data.email,
  //     phone: data.phone || "",
  //     addressLine1: data.address1,
  //     addressLine2: data.address2 || "",
  //     city: data.city,
  //     state: data.state || "",
  //     zip: data.zip,
  //     country: data.country,
  //     paymentMethod: data.paymentMethod,
  //     shippingMethod: data.shippingMethod,
  //     discountAmount: discountAmount ? finalTotal : 0,
  //     shippingCost: shipping,
  //     comments: data.orderComment || "",
  //     paymentIntentId: data.paymentIntentId ?? "",
  //     products: cart.map((item) => ({
  //       product_id: item.id,
  //       quantity: item.quantity || 1,
  //     })),
  //   }),
  //   [cart, shipping]
  // );

  const buildOrderPayload = useCallback(
    (data: CheckoutFormValues & { paymentIntentId?: string | null }) => {
      // ✅ Multi address mode
      if (isMultiAddress && destinations.length > 0) {
        return {
          userType: token ? null : "guest",
          deviceType: getDeviceType(),
          email: data.email,
          paymentMethod: data.paymentMethod,
          discountAmount: discountAmount ? finalTotal : 0,
          shippingCost: shipping,
          comments: data.orderComment || "",
          paymentIntentId: data.paymentIntentId ?? "",
          newsletter: data.newsletter || false,
          // ✅ Multi destination array
          isMultiAddress: true,
          destinations: destinations.map((dest) => {
            // Per dest allocated products
            const allocatedProducts: Record<string, number> = {};
            dest.allocatedItems?.forEach((slot) => {
              const itemId = slot.split("-")[0];
              allocatedProducts[itemId] = (allocatedProducts[itemId] || 0) + 1;
            });

            // Per dest shipping rate
            const destRates = destShippingRates[dest.id] || [];
            const allRates = destRates.length > 0 ? destRates : (shippingRates || []);
            const selectedRate = allRates.find(
              (r: any) => r.service_type === dest.selectedShippingMethod
            );

            return {
              firstName: dest.address?.firstName || "",
              lastName: dest.address?.lastName || "",
              companyName: dest.address?.company || "",
              phone: dest.address?.phone || "",
              addressLine1: dest.address?.address1 || "",
              addressLine2: dest.address?.address2 || "",
              city: dest.address?.city || "",
              state: dest.address?.state || "",
              zip: dest.address?.zip || "",
              country: dest.address?.country || "",
              shippingMethod: dest.selectedShippingMethod,

              shippingCost: selectedRate ? Number(selectedRate.total_charge) : 0,
              products: Object.entries(allocatedProducts).map(([productId, quantity]) => ({
                product_id: Number(productId),
                quantity,
              })),
            };
          }),
        };
      }

      // ✅ Single address — existing logic
      return {
        userType: token ? null : "guest",
        deviceType: getDeviceType(),
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.company || "",
        email: data.email,
        phone: data.phone || "",
        addressLine1: data.address1,
        addressLine2: data.address2 || "",
        city: data.city,
        state: data.state || "",
        zip: data.zip,
        country: data.country,
        paymentMethod: data.paymentMethod,
        shippingMethod: data.shippingMethod,
        discountAmount: discountAmount ? finalTotal : 0,
        shippingCost: shipping,
        comments: data.orderComment || "",
        newsletter: data.newsletter || false,
        paymentIntentId: data.paymentIntentId ?? "",
        isMultiAddress: false,
        products: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity || 1,
        })),
      };
    },
    [cart, shipping, isMultiAddress, destinations, destShippingRates,
      shippingRates, discountAmount, finalTotal, token]
  );
  const placeOrder = useCallback(
    async (data: CheckoutFormValues) => {
      const orderPayload = buildOrderPayload(data);
      const orderResponse = await axiosInstance.post(
        "web/orders/place-order",
        orderPayload
      );
      const orderData = orderResponse.data?.data || orderResponse.data;
      localStorage.removeItem("shippingCost"); // ✅ Clear saved shipping cost after order is placed
      return orderData || null;
    },
    [buildOrderPayload]
  );

  const handleStripeCharge = useCallback(
    async (paymentMethodId: string) => {
      const stripePayload = {
        payment_method_id: paymentMethodId,
        amount: Math.round(finalTotal * 100), // USE finalTotal for Stripe
        products: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity || 1,
        })),
      };

      const response = await axiosInstance.post(
        "web/stripe/pay",
        stripePayload
      );
      return response.data?.payment_intent_id || null;
    },
    [cart, finalTotal] // ADD finalTotal as dependency
  );



  // Step navigation handlers
  // const handleContinueToShipping = async () => {
  //   const isValid = await trigger(["email", "newsletter"]);
  //   if (isValid) {
  //     setCompletedSteps((prev) => [...new Set([...prev, 1])]);
  //     setCurrentStep(2);
  //   }
  // };
  const handleContinueToShipping = async () => {
    const isValid = await trigger(["email", "newsletter"]);
    if (isValid) {
      const email = getValues("email");
      const newsletter = getValues("newsletter");

      // API call - apni endpoint laga lo
      // try {
      //   await fetch("/api/checkout/customer", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email, newsletter: !!newsletter }),
      //   });
      // } catch (error) {
      //   console.error("Customer API error:", error);
      // }
      setCompletedSteps((prev) => [...new Set([...prev, 1])]);
      setCurrentStep(2);


    }
  };



  return (
    <div className="min-h-screen py-10md:px-[6%]  xl:px-0 2xl:px-0   w-full max-w-[1170px] mx-auto px-4 lg:px-0 ">

      <form>
        <div className="flex justify-center mb-8">
          <LoadTrustpilotScript />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start ">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 mt-[18px]" style={{ fontFamily: roboto }}>
            <div className="mt-[1px]">
              <h2 className="text-4xl font-normal text-[#545454] mb-8">
                Thank You {orderCustomer?.customer?.firstName} {orderCustomer?.customer?.lastName}!
              </h2>

              <h6 className="text-lg font-medium mb-6 text-[#545454]">
                Your order number is{" "}
                <span className="font-bold text-[#545454]">
                  {orderCustomer?.orderNumber}
                </span>
              </h6>

              <p className="text-[#545454] leading-7 mb-8">
                An email will be sent containing information about your purchase.
                If you have any questions about your purchase, email us at{" "}
                <span className="font-semibold text-[#D42020]">
                  info@serverblink.uk
                </span>{" "}
                or call us at{" "}
                <span className="font-semibold text-[#D42020]">
                  {/* +44 123 456 7890 */}
                </span>.
              </p>

              <hr className="my-8 border-0 h-[0.5px] bg-[#545454]" />

              <button
                type="button"
                onClick={() => router.push("/")}
                className="btn-primary !px-6 !py-3 h-[44px] !text-lg"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            {!isMultiAddress ? (
              <CheckoutOrderSummary
                cart={cart}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={totalBeforeDiscount}
                finalTotal={finalTotal}
                discountAmount={discountAmount}
                appliedCoupon={appliedCoupon}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            ) : (
              <CheckoutMultipleOrderSummary
                cart={cart}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={totalBeforeDiscount}
                finalTotal={finalTotal}
                discountAmount={discountAmount}
                appliedCoupon={appliedCoupon}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            )}
          </div>

        </div>
      </form>

    
    </div>
  );
};

// Main component with Stripe Elements provider
const OrderInformation = () => {
  return (
    <CheckoutForm />
  );
};

export default OrderInformation;
