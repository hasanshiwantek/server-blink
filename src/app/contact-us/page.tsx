import React from "react";
import { Metadata } from "next";
import ContactUs from "../components/ContactUs/ContactUs";

export const metadata: Metadata = {
  title: "Contact Us | Server Blink",
  description:
    "Get in touch with Server Blink for product inquiries, customer support, sales questions, and technical assistance. Contact us via phone, email, or visit our website.",
  keywords: [
    "contact Server Blink",
    "customer support",
    "sales inquiries",
    "IT hardware support",
    "Server Blink contact",
  ],
  alternates: {
    canonical: "https://server-blink.vercel.app/contact-us",
  },
  openGraph: {
    title: "Contact Us | Server Blink",
    description:
      "Get in touch with Server Blink for product inquiries, customer support, and sales questions.",
    url: "https://server-blink.vercel.app/contact-us",
    siteName: "Server Blink",
    images: [
      {
        url: "/contactus.png", // Replace with Server Blink specific image if needed
        width: 1200,
        height: 630,
        alt: "Contact Us - Server Blink",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Server Blink",
    description:
      "Get in touch with Server Blink for product inquiries, customer support, and sales questions.",
    images: ["/contactus.png"], // Replace with actual image path if needed
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
    <div className="">
      <ContactUs />
    </div>
  );
};

export default page;
