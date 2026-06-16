"use client";
import GooglePayButton from "@google-pay/button-react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh"
);

interface Props {
  amount: number;
  onSuccess?: (paymentIntent: any) => void;
}

export default function GPayButton({ amount, onSuccess }: Props) {
  const router = useRouter();

  return (
    <GooglePayButton
      environment="TEST"
      buttonType="buy"
      buttonColor="black"
      className="w-full"
      style={{ width: "100%", height: "44px" }}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["VISA", "MASTERCARD", "AMEX", "DISCOVER"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "stripe",
                gatewayMerchantId: "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "BCR2DN4TR4PRGHE4",
          merchantName: "Kinza",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPrice: amount.toFixed(2),
          currencyCode: "USD",
          countryCode: "US",
        },
      }}
      onLoadPaymentData={async (paymentData: any) => {
        try {
          const stripe = await stripePromise;
          if (!stripe) return;

          // ✅ Google Pay raw token string
          const rawToken = paymentData.paymentMethodData.tokenizationData.token;
          
          // ✅ Backend ko token bhi bhejo
          const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              amount: Math.round(amount * 100),
              googlePayToken: rawToken  // backend pe process karega
            }),
          });
          
          const data = await res.json();
          
          if (data.error) {
            toast.error(data.error);
            return;
          }

          toast.success("Payment successful!");
          onSuccess?.(data);
          router.push(`/order-confirmation?payment_intent=${data.paymentIntentId}`);

        } catch (err) {
          console.log("Error:", err);
          toast.error("Something went wrong");
        }
      }}
      onError={(err: any) => {
        console.error(err);
        toast.error("Google Pay error");
      }}
    />
  );
}