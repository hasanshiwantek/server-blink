import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nts-ecommerce.vercel.app"),
  title: "Home | Server Blink",
  description:
    "Welcome to New Town Spares – your one-stop shop for connectors, cables, motherboards, and electronics. Get the best prices and fast delivery.",
  alternates: {
    canonical: "https://nts-ecommerce.vercel.app",
  },
  openGraph: {
    title: "New Town Spares – Home",
    description:
      "Shop electronics, connectors, and computer accessories at New Town Spares. Affordable, reliable, and delivered fast.",
    url: "https://nts-ecommerce.vercel.app",
    siteName: "New Town Spares",
    images: [
      {
        url: "/navlogo.png", // ✅ apna OG image yaha dalna
        width: 1200,
        height: 630,
        alt: "New Town Spares Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Town Spares – Home",
    description:
      "Buy electronics, connectors, cables, and computer parts at New Town Spares.",
    images: ["/navlogo.png"], // ✅ same ya custom image
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
    },},
};

const Page = async () => {

  return (
    <>
      <main className="flex flex-col gap-30" role="main">
<div className="h-96">

</div>
      </main>
    </>
  );
};

export default Page;