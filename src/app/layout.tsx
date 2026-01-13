import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { Inter, Jost, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "../styles/blog/api-content.css";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// // ✅ Recoleta (400–700) - Loading multiple weights
// const gilroy = localFont({
//   src: [
//     {
//       // 🚨 Ensure file name matches exactly (with space)
//       path: "./fonts/Gilroy-Regular.ttf",
//       weight: "400", // Regular
//       style: "normal",
//     },
//     {
//       // 🚨 Ensure file name matches exactly (with space)
//       path: "./fonts/Gilroy-Medium.ttf",
//       weight: "500", // Medium
//       style: "normal",
//     },
//     {
//       // 🚨 Ensure file name matches exactly (with space)
//       path: "./fonts/Gilroy-SemiBold.ttf",
//       weight: "600", // SemiBold
//       style: "normal",
//     },
//     {
//       // 🚨 Ensure file name matches exactly (with space)
//       path: "./fonts/Gilroy-Bold.ttf",
//       weight: "700", // Bold
//       style: "normal",
//     },
//   ],
//   variable: "--font-recoleta",
//   display: "swap",
//   preload: true,
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://server-blink.vercel.app"),
  title: {
    default: "Server Blink",
    template: "%s | Server Blink",
  },
  description:
    "Buy servers, networking equipment, and IT solutions online at Server Blink. Quality products at affordable prices with fast shipping.",
  keywords: [
    "Server Blink",
    "servers",
    "networking equipment",
    "IT solutions",
    "buy online",
    "IT hardware",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://server-blink.vercel.app",
    siteName: "Server Blink",
    title: "Server Blink – Quality Servers & IT Solutions",
    description:
      "Discover premium servers, networking gear, storage devices, and IT solutions at Server Blink.",
    images: [
      {
        url: "/serverblink-logo.png", // Replace with your logo
        width: 1200,
        height: 630,
        alt: "Server Blink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Server Blink – Quality Servers & IT Solutions",
    description:
      "Shop premium servers, networking equipment, and IT solutions at Server Blink.",
    images: ["/serverblink-logo.png"], // Replace with actual logo path
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
