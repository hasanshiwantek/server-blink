"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import banner from "@/assets/privacy-banner.png";

const Privacy = () => {
  // Enable smooth scroll globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

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
                 Privacy Policy
                </span></h2>

          {/* Page Title */}
          <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
            Privacy Policy
          </h1>
    
       {/* Policy Content */}
<ol className="space-y-6 list-decimal pl-5">

  <li className="text-[14px] leading-[20px]">
    <strong>Collection of Personal Information:</strong> We will clearly explain
    what personal information we collect from our customers, including information
    such as name, address, email, and payment information. We will also explain how
    we collect this information, including through our website, customer service,
    and other interactions with customers.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Use of Personal Information:</strong> We will explain how we use the
    personal information we collect, including for purposes such as fulfilling
    orders, providing customer service, and improving our products and services.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Sharing of Personal Information:</strong> We will explain when and with
    whom we share personal information, including with service providers and other
    third parties as necessary to provide our products and services. We will also
    explain how we protect personal information when it is shared with third parties.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Data Security:</strong> We will describe the measures we take to protect
    the security of personal information, including technical, administrative, and
    physical measures. We will also explain how we handle data breaches and what
    customers can do to help protect their personal information.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Customer Access to Personal Information:</strong> We will explain how
    customers can access, update, and delete their personal information, and what
    steps we take to verify their identity before granting access.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Children's Privacy:</strong> If our services are directed to children
    under the age of 13, we will explain our practices for collecting, using, and
    disclosing personal information from children in compliance with COPPA.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Privacy Policy Updates:</strong> We will explain how we may update our
    privacy policy and how we will communicate these updates to our customers.
  </li>

</ol>

{/* Remaining Paragraphs */}
<p className="text-[14px] leading-[20px] mt-6">
  By adhering to these privacy policies, we will ensure that we are transparent and
  in compliance with all relevant regulations set forth by Google. Additionally, we
  will provide our customers with peace of mind knowing that their personal information
  is being collected, used, and shared in a responsible and secure manner.
</p>

<p className="text-[14px] leading-[20px] mt-4">
  If you have any questions or concerns about this Privacy Policy or our handling of
  your personal information, please contact us at
  <strong> EMAIL:</strong> support@serverblink.com or
  <strong> PHONE:</strong> +1 (502) 206-2022.
</p>

        </div>
      </div>
    </div>
  </div>
</main>



  );
};

export default Privacy;
