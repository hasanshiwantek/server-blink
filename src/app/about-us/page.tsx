import React from "react";
import AboutBanner from "../components/about/AboutBanner";
import GlobalSupplier from "../components/about/GlobalSupplier";
import AboutStats from "../components/about/AboutStats";
import AboutBrandSection from "../components/about/AboutBrandSection";
import SocialResponsibilitySection from "../components/about/SocialResponsibiltySection";
// import GetInTouch from "../components/Home/GetInTouch";
import dynamic from "next/dynamic";
import ProductServicesSection from "../components/about/ProductServicesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | New Town Spares",
  description:
    "Learn more about New Town Spares, our mission, values, and commitment to providing quality IT hardware and excellent customer service. Discover our story and how we serve our clients.",
  keywords: [
    "about New Town Spares",
    "company mission",
    "company values",
    "IT hardware provider",
    "New Town Spares story",
  ],
  alternates: {
    canonical: "https://newtownspares.advertsedge.com/about-us",
  },
  openGraph: {
    title: "About Us | New Town Spares",
    description:
      "Learn more about New Town Spares, our mission, values, and commitment to providing quality IT hardware and excellent customer service.",
    url: "https://newtownspares.advertsedge.com/about-us",
    siteName: "New Town Spares",
    images: [
      {
        url: "/aboutus.png",
        width: 1200,
        height: 630,
        alt: "About Us - New Town Spares",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | New Town Spares",
    description:
      "Learn more about New Town Spares, our mission, values, and commitment to providing quality IT hardware and excellent customer service.",
    images: ["/aboutus.png"],
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

const AOSWrapper = dynamic(() => import("../components/animation/AOSWrapper"));
const page = () => {
  return (
        <main className="flex flex-col gap-30" role="main">
            <div className="w-full max-w-[1170px] mx-auto lg:px-6 xl:px-0">
                <div className="py-2">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                        {/* Content */}
                        <div className="lg:col-span-12">
                            <h2 className=""><span
                                className="text-[11px] !text-[#D42020]"
                                itemProp="name"
                            >
                                Home
                            </span> {" "} <span className="mt-2 mx-3 text-gray-400 text-[11px]" aria-hidden="true">/</span> {" "} <span
                                className="!text-[#D42020] text-[11px]"
                                itemProp="name"
                            >
                                    About Us
                                </span></h2>

                            {/* Page Title */}
                            <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
                                About Us
                            </h1>

                            {/* Remaining Paragraphs */}
                            <p className="text-[16px] leading-[23px] mt-6">
                                We are a leading online retailer of server parts, committed to providing 
                                high-quality and reliable products to our customers. With a wide range 
                                of parts to choose from, we make it easy for businesses of all sizes 
                                to upgrade and maintain their servers. Our team of experts is dedicated
                                 to delivering exceptional customer service and technical support,
                                  ensuring that our customers get the best possible experience when 
                                  shopping with us.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
  );
};

export default page;
