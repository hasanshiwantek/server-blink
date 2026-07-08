import GooglePayButton from "@google-pay/button-react";

export default function Pay() {
    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: "CARD",
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["VISA", "MASTERCARD"],
                        },
                        tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                                gateway: "stripe",
                                gatewayMerchantId: "merchant-id",
                            },
                        },
                    },
                ],
                // merchantInfo: {
                //   merchantName: "My Store",
                // },
                merchantInfo: {
                    merchantId: "12345678901234567890", // test value
                    merchantName: "My Store",
                },
                transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPrice: "10.00",
                    currencyCode: "USD",
                    countryCode: "US",
                },
            }}
            onLoadPaymentData={(data) => {
               
            }}
        />
    );
}