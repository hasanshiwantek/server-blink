"use client";
import GooglePayButton from "@google-pay/button-react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh"
);

interface Props {
  amount: number;
  totalWeight: number;
  itemCount: number;
  onSuccess?: (paymentIntent: any) => void;
}

export default function GPayButton({ amount,totalWeight,
  itemCount, onSuccess }: Props) {
  const router = useRouter();
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedShippingRate, setSelectedShippingRate] = useState<any>(null);

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

        shippingAddressRequired: true,

        shippingAddressParameters: {
          phoneNumberRequired: true,
        },

        shippingOptionRequired: true,

        callbackIntents: [
          "SHIPPING_ADDRESS",
          "SHIPPING_OPTION",
        ],

        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: [
                "VISA",
                "MASTERCARD",
                "AMEX",
                "DISCOVER",
              ],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "stripe",
                gatewayMerchantId:
                  "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh",
              },
            },
          },
        ],

        merchantInfo: {
          merchantId: "BCR2DN4TR4PRGHE4",
          merchantName: "Kinza",
        },

        transactionInfo: {
          totalPriceStatus: "ESTIMATED",
          totalPrice: amount.toFixed(2),
          currencyCode: "USD",
          countryCode: "US",
        },
      }}

      onPaymentDataChanged={async (paymentData: any) => {
       
        try {
          const trigger = paymentData.callbackTrigger;

          if (trigger === "INITIALIZE" || trigger === "SHIPPING_ADDRESS") {
            const address = paymentData.shippingAddress;

            

            const response = await fetch(
              "https://backend.sparemicro.com/api/web/checkout/get-shipping-rates",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  destination: {
                    state: address.administrativeArea,
                    country_code: address.countryCode,
                    postal_code: address.postalCode,
                  },
                  package: {
                    total_weight: totalWeight,
                    weight_unit: "LB",
                    order_total: amount,
                    item_count: itemCount,
                    package_value: amount,
                  },
                }),
              }
            );

            const data = await response.json();
           

            if (!data.success || !data.rates?.length) {
              
              return {
                error: {
                  reason: "SHIPPING_ADDRESS_UNSERVICEABLE",
                  message: "No shipping methods available",
                  intent: "SHIPPING_ADDRESS",
                },
              };
            }

            setShippingRates(data.rates);

            const shippingOptions = data.rates.map((rate: any) => ({
              id: String(rate.method_id),
              label: rate.display_name,
              description: `$${Number(rate.total_charge).toFixed(2)}`,
            }));

          
            const defaultRate = data.rates[0];

            setSelectedShippingRate(defaultRate);

            return {
              newShippingOptionParameters: {
                defaultSelectedOptionId: String(
                  defaultRate.method_id
                ),
                shippingOptions,
              },

              newTransactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: (
                  amount + Number(defaultRate.total_charge)
                ).toFixed(2),
                currencyCode: "USD",
                countryCode: "US",
              },
            };
          }

          if (trigger === "SHIPPING_OPTION") {
            const optionId =
              paymentData.shippingOptionData?.id;

            const selected = shippingRates.find(
              (rate) =>
                String(rate.method_id) === String(optionId)
            );

            if (!selected) return {};

            setSelectedShippingRate(selected);

            return {
              newTransactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: (
                  amount + Number(selected.total_charge)
                ).toFixed(2),
                currencyCode: "USD",
                countryCode: "US",
              },
            };
          }

          return {};
        } catch (error) {
         

          return {
            error: {
              reason: "OTHER_ERROR",
              message: "Unable to calculate shipping",
              intent: "SHIPPING_ADDRESS",
            },
          };
        }
      }}

      onLoadPaymentData={async (paymentData: any) => {
        try {
          const stripe = await stripePromise;

          if (!stripe) return;

          const rawToken =
            paymentData.paymentMethodData.tokenizationData
              .token;

          const shippingCost =
            selectedShippingRate?.total_charge || 0;

          const finalAmount =
            amount + Number(shippingCost);

          const res = await fetch(
            "/api/create-payment-intent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: Math.round(finalAmount * 100),
                googlePayToken: rawToken,
                shippingMethod: selectedShippingRate,
                shippingAddress:
                  paymentData.shippingAddress,
              }),
            }
          );

          const data = await res.json();

          if (data.error) {
            toast.error(data.error);
            return;
          }

          toast.success("Payment successful!");

          onSuccess?.(data);

          router.push(
            `/order-confirmation?payment_intent=${data.paymentIntentId}`
          );
        } catch (err) {
         
          toast.error("Something went wrong");
        }
      }}

      onError={(err) => {
       
        toast.error("Google Pay error");
      }}
    />
  );
}