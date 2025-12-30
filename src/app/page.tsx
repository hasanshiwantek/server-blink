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
        url: "/navlogo.png",
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
    images: ["/navlogo.png"],
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
  interface Product {
  id: number;
  brand: string;
  sku: string;
  name: string;
  price: number;
  oldPrice?: number;
  imgSrc: string;
}

const products: Product[] = [
  {
    id: 1,
    brand: "HP",
    sku: "JH016A#ABA-New",
    name: "JH016A#ABA-New | Hp | Officeconnect 1420-16G 16-Port",
    price: 395.0,
    oldPrice: 485.95,
     imgSrc: "/default-product-image.svg",
  },
  {
    id: 2,
    brand: "Seagate",
    sku: "ST10000NM003B",
    name: "ST10000NM003B | Seagate | Exos 7E10 10TB Internal Hard",
    price: 475.0,
    oldPrice: 584.25,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 3,
    brand: "Dell",
    sku: "AC300EPS-00",
    name: "AC300EPS-00 | Dell | Workstation 3450 3450XE SFF 300W Power",
    price: 80.75,
    oldPrice: 99.32,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 4,
    brand: "Seagate",
    sku: "ST2000NM000B-NEW",
    name: "ST2000NM000B-NEW | Seagate | Exos 7E10 2Tb 7200Rpm Sata",
    price: 235.0,
    oldPrice: 285.0,
    imgSrc: "/default-product-image.svg",
  },
  // Duplicate / additional products to make 12
  {
    id: 5,
    brand: "HP",
    sku: "JH017A#ABC",
    name: "HP 24-Port Switch",
    price: 410.0,
    oldPrice: 499.0,
     imgSrc: "/default-product-image.svg",
  },
  {
    id: 6,
    brand: "Seagate",
    sku: "ST12000NM004B",
    name: "Seagate 12TB Exos Internal Hard",
    price: 550.0,
    oldPrice: 620.0,
     imgSrc: "/default-product-image.svg",
  },
  {
    id: 7,
    brand: "Dell",
    sku: "AC350EPS-01",
    name: "Dell 350W Power Supply",
    price: 90.0,
    oldPrice: 105.0,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 8,
    brand: "Seagate",
    sku: "ST4000NM005B",
    name: "Seagate Exos 4TB 7200RPM Sata",
    price: 120.0,
    oldPrice: 145.0,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 9,
    brand: "HP",
    sku: "JH018A#DEF",
    name: "HP OfficeConnect 16-Port Switch",
    price: 399.0,
    oldPrice: 489.0,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 10,
    brand: "Seagate",
    sku: "ST8000NM006B",
    name: "Seagate 8TB Exos Internal Hard",
    price: 300.0,
    oldPrice: 350.0,
     imgSrc: "/default-product-image.svg",
  },
  {
    id: 11,
    brand: "Dell",
    sku: "AC400EPS-02",
    name: "Dell 400W Power Supply",
    price: 95.0,
    oldPrice: 110.0,
    imgSrc: "/default-product-image.svg",
  },
  {
    id: 12,
    brand: "Seagate",
    sku: "ST6000NM007B",
    name: "Seagate Exos 6TB 7200RPM Sata",
    price: 210.0,
    oldPrice: 250.0,
     imgSrc: "/default-product-image.svg",
  },
];

  
  return (
    <main className="flex flex-col gap-30" role="main">
      {/* Container: max-width 1170px, centered */}
      <div className="w-full max-w-[1170px] mx-auto mt-5 lg:px-6 xl:px-0">
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
              <FeaturedProducts products={products} isSlider={true} title="Featured Products" />
              <FeaturedProducts products={products?.slice(0, 8)} isSlider={false} title="Current Top Sellers" />
              <FeaturedProducts products={products} isSlider={true} title="New Products" />
              <Testimonials/>
              <Brands/>
              <ShopNow/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
