import type { Metadata } from "next";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { Inter, Jost, Roboto, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";
import ScriptInjector from "@/components/ScriptInjector";
import DynamicFavicon from "@/components/DynamicFavicon";
import "../styles/blog/api-content.css";
import "./globals.css";
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
  variable: "--font-roboto",
  adjustFontFallback: false,

});
// const robotoCondensed = Roboto_Condensed({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
//   variable: "--font-roboto-condensed",
// });

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",        // ✅ FIX: swap add kiya
  preload: true,          // ✅ FIX: preload add kiya
  variable: "--font-roboto-condensed",
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
  robots: { index: false, follow: false },
  title: {
    // default: "Server Blink",
    // template: "%s | Server Blink",
    default: "Server Blink LLC",
    template: "%s | Server Blink ",
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
    <html lang="en" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <body
        className="antialiased"
        style={{ fontFamily: "sans-serif" }}
        suppressHydrationWarning
      >
        <LayoutWrapper>
          <ScriptInjector />
          <DynamicFavicon />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
