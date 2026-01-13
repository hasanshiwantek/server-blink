import React from "react";
import BlogContainer from "../components/Blogs/BlogContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://server-blink.vercel.app"),
  title: {
    default: "Blogs | Server Blink",
    template: "%s | Blogs | Server Blink",
  },
  description:
    "Read the latest articles and insights on servers, networking equipment, and IT solutions at Server Blink. Stay informed with tech trends and product guides.",
  keywords: [
    "Server Blink blog",
    "servers articles",
    "networking guides",
    "IT solutions insights",
    "tech trends",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://server-blink.vercel.app/blogs",
    siteName: "Server Blink",
    title: "Server Blink Blogs – Servers, Networking & IT Insights",
    description:
      "Explore expert blogs on servers, networking equipment, and IT solutions at Server Blink.",
    images: [
      {
        url: "/serverblink-logo.png", // Replace with your actual banner/logo
        width: 1200,
        height: 630,
        alt: "Server Blink Blog Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Server Blink Blogs – Servers, Networking & IT Insights",
    description:
      "Stay updated with expert insights on servers and IT solutions from Server Blink.",
    images: ["/serverblink-logo.png"], // Replace with actual image
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const page = () => {
  return (
    <div>
      <BlogContainer />
    </div>
  );
};

export default page;
