"use client";

import React from "react";
import Link from "next/link";

const ShopNow = () => {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat h-[350px] md:h-[490px]"
      style={{
        backgroundImage: "url('/about/about-us.jpg')", // <-- apni image path yahan
      }}
    >
      {/* Overlay (optional, readability ke liye) */}
      <div className="md:ml-24 ">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="w-full md:max-w-xl text-center md:text-left text-[#444444]">
            {/* Heading */}
            <h2 className="text-3xl md:text-[2.7rem] font-bold md:mb-4">
              ABOUT US
            </h2>

            {/* Description */}
                <p className="text-lg md:text-2xl leading-relaxed md:mb-6 text-[#444444">
              We are a leading online retailer of server parts, committed to
              providing high-quality and reliable products to our customers.
              With a wide range of parts to choose from, we make it easy for
              businesses of all sizes to upgrade and maintain their servers.
              Our team of experts is dedicated to delivering exceptional
              customer service and technical support, ensuring that our
              customers get the best possible experience when shopping with us.
            </p>

            {/* Button - LEFT SIDE */}
            <Link href="/shop">
              <button className="bg-[#444444] hover:bg-red-700 transition text-white px-4 py-3 rounded text-xl md:text-[1.7rem]">
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNow;
