"use client";
import React, { useEffect } from 'react'
import Image from "next/image";
import banner from '@/assets/return-banner.png'
const Returnpolicy = () => {
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
                 Return & Refund Policy
                </span></h2>

          {/* Page Title */}
          <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
            Return & Refund Policy
          </h1>
    
       {/* Policy Content */}
<ol className="space-y-6 list-decimal pl-5">

  <li className="text-[14px] leading-[20px]">
    <strong>Return Eligibility</strong>  Our products are eligible for 
    return within a 30 days of timeframe, The return timeframe may vary
     based on the product and category, and any restrictions on specific
      products or categories will be clearly stated. In order to initiate 
      a return, customers must contact us and provide us
       (email: info@serverblink.com - Ph: 502-206-2022) with 
       their order number and the reason for the return
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Return Process: </strong> The return process will be
     simple and straightforward for customers. We will provide 
     clear instructions on how to initiate a return, including 
     any required documentation or information. Customers will
      be responsible for shipping the returned product back to 
      us if customer returning the product because of "Change of
       Mind, No More needed" and in other scenario we will bear
        the return shipping cost and we recommend that they use a
         tracking number to ensure that the product is returned safely.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Refunds:</strong> Customers will have the 
    option to receive a refund in the original form of
     payment or as store credit. Refunds will be processed 
     as quickly as possible, typically within 7-10 business 
     days of receipt of the returned product. We will provide
      regular updates to customers on the status of their
       refund via email.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Restocking Fees:</strong>  In some cases, a upto 25%
     restocking fee may apply for returns. Restocking fees may be 
     applied for returns of products that are not in their original 
     condition, change of mind or are returned outside of the 
     specified timeframe.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Damaged or Defective Products:</strong> If a product is received 
    damaged or is defective, customers should contact us within 14 days of
     receipt to initiate a return. We will process a replacement or refund 
     as necessary, and we will cover all shipping costs associated with the
      return and replacement.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Shipping Costs for Returns: </strong>  We will clearly state who is 
    responsible for shipping costs for returns, including any conditions or 
    exceptions. In most cases, customers will be responsible for shipping costs 
    for returns, except in cases where the product is damaged or defective.


  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Final Sale Items:</strong>  Some items may be final 
    sale and not eligible for return or refund. These items will
     be clearly stated on our website, and we will not accept
      returns for these items.
  </li>

</ol>

{/* Remaining Paragraphs */}
<p className="text-[14px] leading-[20px] mt-6">
 Last Updated on 29 Aug, 2025.
</p>
        </div>
      </div>
    </div>
  </div>
</main>
  )
}

export default Returnpolicy