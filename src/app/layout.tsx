import type { Metadata } from "next";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { Roboto, Roboto_Condensed } from "next/font/google";
import ScriptInjector from "@/components/ScriptInjector";
import DynamicFavicon from "@/components/DynamicFavicon";
import "./globals.css";
import "../styles/blog/api-content.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
  adjustFontFallback: false,

});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",        // ✅ FIX: swap add kiya
  preload: true,          // ✅ FIX: preload add kiya
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://staging.sparemicro.com"),
  robots: { index: false, follow: false },
  title: {
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
    url: "https://staging.sparemicro.com",
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
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
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
