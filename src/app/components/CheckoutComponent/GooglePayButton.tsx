
"use client";
import GooglePayButton from "@google-pay/button-react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const stripePromise = loadStripe(
    "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh"
);
interface Props {
    amount: number; // dollars mein
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
                                // gatewayMerchantId: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
                            },
                        },
                    },
                ],
                merchantInfo: {
                    // "BCR2DN5TR7QLRETW" 
                    merchantId: 'BCR2DN5TR7QLRETW', // TEST merchant ID
                    // merchantId: 'BCR2DN4TR4PRGHE4', // TEST merchant ID
                    merchantName: "Kinza",
                },
                transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPrice: amount.toFixed(2),
                    currencyCode: "USD",
                    countryCode: "US",
                },
            }}
            // onLoadPaymentData={async (paymentData: any) => {
            //     try {
            //         const token = paymentData.paymentMethodData.tokenizationData.token;

            //         const stripe = await stripePromise;
            //         if (!stripe) return;

            //         // Backend se PaymentIntent lo
            //         const res = await fetch("/api/create-payment-intent", {
            //             method: "POST",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify({ amount: Math.round(amount * 100) }),
            //         });
            //         const { clientSecret } = await res.json();

            //         // Stripe se confirm karo
            //         const { error, paymentIntent } = await stripe.confirmCardPayment(
            //             clientSecret,
            //             {
            //                 payment_method: {
            //                     card: { token: JSON.parse(token).id },
            //                 },
            //             }
            //         );

            //         if (error) {
            //             toast.error(error.message || "Payment failed");
            //         } else {
            //             toast.success("Payment successful!");
            //             onSuccess?.(paymentIntent);
            //             router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
            //         }
            //     } catch (err) {
            //         toast.error("Something went wrong");
            //     }
            // }}
            onLoadPaymentData={async (paymentData: any) => {
                try {
                    const stripe = await stripePromise;
                    if (!stripe) return;

                    // Google Pay token string directly use karo — parse mat karo
                    const tokenString = paymentData.paymentMethodData.tokenizationData.token;

                    // Backend se PaymentIntent lo
                    const res = await fetch("/api/create-payment-intent", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount: Math.round(amount * 100) }),
                    });
                    const { clientSecret } = await res.json();

                    // Stripe token create karo Google Pay token se
                    const { token, error: tokenError } = await stripe.createToken("card", {});

                    // Direct confirmCardPayment with payment_method_data
                    const { error, paymentIntent } = await stripe.confirmCardPayment(
                        clientSecret,
                        {
                            payment_method: {
                                card: {
                                    token: JSON.parse(tokenString).id,
                                },
                                billing_details: {
                                    name: paymentData.paymentMethodData.info?.billingAddress?.name || "Customer",
                                },
                            },
                        }
                    );

                    if (error) {
                        console.error("Stripe error:", error);
                        toast.error(error.message || "Payment failed");
                    } else {
                        toast.success("Payment successful!");
                        onSuccess?.(paymentIntent);
                        router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
                    }
                } catch (err) {
                    console.error("Error:", err);
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