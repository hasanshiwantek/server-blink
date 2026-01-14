import type { Metadata } from "next";
import CategoriesSidebar from "./components/Home/CategoriesSidebar";
import BrandsSidebar from "./components/Home/BrandsSidebar";
import Banner from "./components/Home/Banner";
import CategoryGrid from "./components/Home/CategoriyGrid";
import FeaturedProducts from "./components/Home/FeaturedProducts";
import Brands from "./components/Home/Brands";
import ShopNow from "./components/Home/ShopNow";
import Testimonials from "./components/Home/Testimonials";

export const metadata: Metadata = {
  metadataBase: new URL("https://server-blink.vercel.app"),
  title: "Home | Server Blink",
  description:
    "Welcome to Server Blink – your one-stop shop for servers, networking equipment, and IT solutions. Get the best prices and fast delivery.",
  alternates: {
    canonical: "https://server-blink.vercel.app",
  },
  openGraph: {
    title: "Server Blink – Home",
    description:
      "Shop servers, networking gear, and IT solutions at Server Blink. Affordable, reliable, and delivered fast.",
    url: "https://server-blink.vercel.app",
    siteName: "Server Blink",
    images: [
      {
        url: "/serverblink-logo.png", // Replace with your actual logo
        width: 1200,
        height: 630,
        alt: "Server Blink Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Server Blink – Home",
    description:
      "Buy servers, networking equipment, and IT solutions at Server Blink.",
    images: ["/serverblink-logo.png"], // Replace with actual logo path
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

const Page = async () => {
  return (
    <main className="flex flex-col gap-30" role="main">
      {/* Container: max-width 1170px, centered */}
      <div className="w-full max-w-[1170px] mx-auto  lg:px-6 xl:px-0">
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <aside className="lg:block hidden lg:col-span-3">
              <CategoriesSidebar />
              <BrandsSidebar />
            </aside>
            {/* Main Content */}
            <div className="lg:col-span-9">
              <Banner />
              <CategoryGrid />
              <FeaturedProducts
                endpoint="web/products/featured-products"
                isSlider={true}
                title="Featured Products"
              />
              <FeaturedProducts
                endpoint="web/products/last-week-orders"
                isSlider={false}
                title="Current Top Sellers"
              />
              <FeaturedProducts
                endpoint="web/products/featured-products"
                isSlider={true}
                title="New Products"
              />
              <Testimonials />
              <Brands />
              <ShopNow />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
