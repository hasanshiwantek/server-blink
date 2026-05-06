"use client";

import React from "react";
import Link from "next/link";

const ShopNow = () => {
  return (
    <section className="w-full">
      {/* Mobile (< sm): image only, then text below */}
      <div className="sm:hidden">
        <div
          className="w-full h-[220px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/about/about-us.jpg')" }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-6 py-10 w-full">
          <div className="w-full text-left text-[#444444]">
            <h2 className="text-[2.66rem] font-bold mb-4">ABOUT US</h2>
            <p className="text-2xl leading-relaxed mb-6 text-[#444444]">
              We are a leading online retailer of server parts, committed to
              providing high-quality and reliable products to our customers.
              With a wide range of parts to choose from, we make it easy for
              businesses of all sizes to upgrade and maintain their servers.
              Our team of experts is dedicated to delivering exceptional
              customer service and technical support, ensuring that our
              customers get the best possible experience when shopping with us.
            </p>
            <Link href="/">
              <button
                type="button"
                className="bg-[#444444] hover:bg-red-700 transition text-white px-4 py-3 rounded text-2xl"
              >
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* sm+: unchanged — text on image */}
      <div
        className="hidden sm:block w-full bg-cover bg-center bg-no-repeat h-[350px] md:h-[490px]"
        style={{
          backgroundImage: "url('/about/about-us.jpg')",
        }}
      >
        <div className="md:ml-24 ">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="w-full md:max-w-xl text-center md:text-left text-[#444444]">
              <h2 className="text-3xl md:text-[2.7rem] font-bold md:mb-4">
                ABOUT US
              </h2>

              <p className="text-lg md:text-2xl leading-relaxed md:mb-6 text-[#444444]">
                We are a leading online retailer of server parts, committed to
                providing high-quality and reliable products to our customers.
                With a wide range of parts to choose from, we make it easy for
                businesses of all sizes to upgrade and maintain their servers.
                Our team of experts is dedicated to delivering exceptional
                customer service and technical support, ensuring that our
                customers get the best possible experience when shopping with
                us.
              </p>

              <Link href="/">
                <button
                  type="button"
                  className="bg-[#444444] hover:bg-red-700 transition text-white px-4 py-3 rounded text-xl md:text-[1.7rem]"
                >
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNow;
