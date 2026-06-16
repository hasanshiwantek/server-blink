"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51TTnoo8vkezGA3pyz8ekc5xIQNyhweCnxiumTB1si5Dejq5YWPGHDJIJPpBHMLw9hYRkbSkOGpdCzPrlW8g59HZ600cueNQymh"
);
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface GooglePayButtonProps {
    amount: number; // in dollars
    onSuccess?: (paymentIntent: any) => void;
    onError?: (error: string) => void;
}

export default function GooglePayButton({ amount, onSuccess, onError }: GooglePayButtonProps) {
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    const [canMakePayment, setCanMakePayment] = useState(false);

    useEffect(() => {
        const init = async () => {
            const stripe = await stripePromise;
            if (!stripe) return;

            const pr = stripe.paymentRequest({
                country: "US",
                currency: "usd",
                total: {
                    label: "Order Total",
                    amount: Math.round(amount * 100), // cents mein
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            const result = await pr.canMakePayment();

            console.log(result);
            
            if (result?.googlePay) {
                setPaymentRequest(pr);
                setCanMakePayment(true);
            }

            pr.on("paymentmethod", async (e) => {
                try {
                    // Backend se PaymentIntent create karo
                    const res = await fetch("/api/create-payment-intent", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount: Math.round(amount * 100) }),
                    });
                    const { clientSecret } = await res.json();

                    const { error, paymentIntent } = await stripe.confirmCardPayment(
                        clientSecret,
                        { payment_method: e.paymentMethod.id },
                        { handleActions: false }
                    );

                    if (error) {
                        e.complete("fail");
                        onError?.(error.message || "Payment failed");
                    } else {
                        e.complete("success");
                        if (paymentIntent.status === "requires_action") {
                            await stripe.confirmCardPayment(clientSecret);
                        }
                        onSuccess?.(paymentIntent);
                    }
                } catch (err) {
                    e.complete("fail");
                    onError?.("Something went wrong");
                }
            });
        };

        init();
    }, [amount]);

    if (!canMakePayment || !paymentRequest) return null;

    return (
        <button
            onClick={() => paymentRequest.show()}
            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded py-2.5 px-4 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3.5 10.5C3.5 7.46 5.96 5 9 5h6c3.04 0 5.5 2.46 5.5 5.5v3C20.5 17.04 18.04 19.5 15 19.5H9c-3.04 0-5.5-2.46-5.5-5.5v-3z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1.5" />
                <text x="6" y="15" fontSize="7" fontWeight="bold" fill="#4285F4">G</text>
                <text x="11" y="15" fontSize="7" fontWeight="bold" fill="white">Pay</text>
            </svg>
            <span style={{ color: '#4285F4', fontWeight: 700 }}>G</span>
            <span style={{ fontWeight: 500 }}>Pay</span>
        </button>
    );
}