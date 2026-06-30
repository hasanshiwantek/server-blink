import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Banner from "./components/Home/Banner";
import CategoryGrid from "./components/Home/CategoriyGrid";
import FeaturedProducts from "./components/Home/FeaturedProducts";
import Brands from "./components/Home/Brands";
import ShopNow from "./components/Home/ShopNow";
import Testimonials from "./components/Home/Testimonials";
import { fetchWebsiteSeo } from "@/lib/api/storeFront";

const CategoriesSidebar = dynamic(() => import("./components/Home/CategoriesSidebar"));
const BrandsSidebar = dynamic(() => import("./components/Home/BrandsSidebar"));

// ✅ Dynamic metadata from backend
export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchWebsiteSeo();

  const title = seo?.homePageTitle;
  const description = seo?.metaDescription;
  const keywords = seo?.metaKeywords || "";
  const ogImage = seo?.ogImage;

  return {
    title: { absolute: title },
    description,
    keywords,
    openGraph: {
      title,
      description,
      siteName: "Server Blink",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
}
const Page = async () => {
  return (
    <main className="flex flex-col gap-30" role="main">
      {/* Container: max-width 1170px, centered */}
      <div className="w-full max-w-[1170px] mx-auto  lg:px-6 xl:px-0">
        <div className="md:py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="lg:block hidden" style={{ width: '22%' }}>
              <CategoriesSidebar />
              <BrandsSidebar />
            </aside>
            {/* Main Content */}
            <div className="w-full lg:w-[78%] p-0">
              <Banner />
              <CategoryGrid />
              <FeaturedProducts
                endpoint="web/products/featured-products"
                isSlider={true}
                title={"Featured Products".toUpperCase()}
              />
              <FeaturedProducts
                endpoint="web/products/popular-products"
                isSlider={false}
                title={"Current Top Sellers".toUpperCase()}
              />
              <FeaturedProducts
                endpoint="web/products/last-week-orders"
                isSlider={true}
                title={"New Products".toUpperCase()}
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
