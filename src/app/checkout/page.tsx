import React from 'react'
import { Metadata } from 'next';
import CheckoutComponent from '../components/CheckoutComponent/CheckoutComponent'
export const metadata: Metadata = {
  title: {
    absolute: "Checkout - Server Blink LLC"  // template ignore karega
  },
  description:
    "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
  keywords: [
    "shopping cart",
    "manage cart",
    "checkout",
    "Server Blink cart",
  ],
  alternates: {
    canonical: "https://staging.sparemicro.com/cart",
  },
  openGraph: {
    title: "Checkout",
    description:
      "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
    url: "https://staging.sparemicro.com/checkout",
    siteName: "Server Blink",
    images: [
      {
        url: "/checkout.png", // Replace with Server Blink specific image if needed
        width: 1200,
        height: 630,
        alt: "Checkout",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout",
    description:
      "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
    images: ["/checkout.png"], // Replace with actual image path if needed
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const page = () => {
  return (
    <div>
      <CheckoutComponent />
    </div>

  )
}

export default page