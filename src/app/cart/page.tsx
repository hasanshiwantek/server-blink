import React from 'react'
import Cart from '../components/Cart/Cart'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
  keywords: [
    "shopping cart",
    "manage cart",
    "checkout",
    "Server Blink cart",
  ],
  alternates: {
    canonical: "https://server-blink.vercel.app/cart",
  },
  openGraph: {
    title: "Shopping Cart",
    description:
      "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
    url: "https://server-blink.vercel.app/cart",
    siteName: "Server Blink",
    images: [
      {
        url: "/cart.png", // Replace with Server Blink specific image if needed
        width: 1200,
        height: 630,
        alt: "Shopping Cart - Server Blink",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart",
    description:
      "View and manage your items in the shopping cart at Server Blink. Add, remove, or update quantities before checkout.",
    images: ["/cart.png"], // Replace with actual image path if needed
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
    <main>
      <Cart />
    </main>
  )
}

export default page