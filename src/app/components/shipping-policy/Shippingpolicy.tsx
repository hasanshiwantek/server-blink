"use client";
import React, { useEffect } from 'react'
import Image from "next/image";
import banner from '@/assets/shipping-banner.png'
const Shippingpolicy = () => {

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
                  Shipping Policy
                </span></h2>

              {/* Page Title */}
              <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
                Shipping Policy
              </h1>

              {/* Policy Content */}
              <ol className="space-y-6 list-decimal pl-5">

                <li className="text-[14px] leading-[20px]">
                  <strong>Delivery Timeframe:</strong> We are committed to delivering our products
                  to our customers within the estimated delivery timeframe.


                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Transit time in days, shipped: Monday to Friday.</li>
                    <li>Order handling time: 2 to 3 days, fulfilled: Monday to Friday.</li>
                    <li>Order cutoff time: 3 PM Eastern Standard time.</li>
                    <li>All other destinations: 2 to 5 days.</li>
                  </ul>

                </li>


                <p className='text-[14px] leading-[20px] mt-5 md:mt-16'>  The delivery timeframe may vary based on the product and shipping location, and we
                  will update the estimated delivery timeframe in case of any changes.</p>

                <li className="text-[14px] leading-[20px] md:mt-12">
                  <strong>Shipping Cost:</strong> The cost of shipping will be clearly displayed on
                  the checkout page and will include all applicable taxes and fees. We will provide
                  customers with the option to choose from different shipping methods, including
                  standard, expedited, and express shipping, and the cost for each method will be
                  clearly stated.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Shipping Method:</strong> We will use reputable carriers, such as FedEx,
                  UPS, and DHL, to deliver our products. We will provide customers with a tracking
                  number for their order, which they can use to track the status of their shipment.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Flat Shipping under 10 LBS:</strong> we offer a "$10 flat shipping
                  for under 10 LBS" fee structure. This means item being shipped, the cost
                  of shipping will be a flat fee within USA only. This fee structure makes
                  it easy for our customers to understand the total cost of their order
                  and eliminates any surprises or confusion around shipping costs. It
                  also simplifies the purchasing process for our customers, making
                  them more likely to complete their purchase.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Shipping Restrictions:</strong>  In some cases, we may have restrictions
                  on shipping certain products to specific locations. These restrictions will be
                  clearly stated on our website and include any geographic limitations or
                  restrictions on expedited shipping options
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Delivery Confirmation:</strong> We will require a signature upon
                  delivery of our products or provide customers with the option to waive
                  the signature requirement. This ensures products are delivered to the
                  correct person and helps prevent fraud.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Order Tracking:</strong>  We will provide customers with
                  a unique tracking number for their order, which they can use to
                  track the status of their shipment. We will also send regular
                  updates to customers on the status of their order via email.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Lost or Damaged Shipments:</strong>  In the event that a shipment is lost or
                  damaged during transit, we will process a claim with the carrier and provide customers
                  with a replacement product as soon as possible. We will do our best to resolve any
                  issues as quickly as possible and ensure that our customers are satisfied with
                  their purchase.
                </li>

                <li className="text-[14px] leading-[20px] md:mt-8">
                  <strong>Returns and Refunds:</strong> Our returns and refunds policy will be
                  in compliance with all applicable laws and regulations. We will provide
                  customers with clear instructions on how to return a product and the conditions
                  under which a refund will be issued. We will process returns and refunds as
                  quickly as possible and will always strive to provide a positive experience
                  for our customers
                </li>

              </ol>

              {/* Other Info / Contact */}
              <p className="text-[14px] leading-[20px] mt-6">
                <strong>Other:</strong> On Holidays / Weekends, we don't process orders. Saturday
                delivery option can be checked with the Sales Dept.
              </p>

              <p className="text-[14px] leading-[20px] mt-2 ml-12">
                Contact: 502-206-2022<br />
                Email: support@serverblink.com
              </p>


            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Shippingpolicy