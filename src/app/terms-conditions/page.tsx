"use client";

import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import banner from "@/assets/terms-banner.png";

const Page = () => {
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
                 Terms & Conditions
                </span></h2>

          {/* Page Title */}
          <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
            Terms & Conditions
          </h1>
            <p className="text-[14px] leading-[20px] mt-20"><strong>Last updated July 24, 2024</strong></p>

<ol className="space-y-6 list-decimal pl-5 mt-6">

  <li className="text-[14px] leading-[20px]">
    <strong>Product Description:</strong> We will provide detailed and accurate information on our electronic parts, including specifications, features, compatibility, and any certifications. We will also provide clear images and diagrams where applicable. We will make every effort to ensure that our product descriptions are up-to-date and accurate, but we cannot guarantee that the information is error-free or that it will always be current.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Pricing and Availability:</strong> We will provide clear and up-to-date information on the pricing and availability of our electronic parts. All prices will be in the currency stated and will include any applicable taxes and shipping and handling fees. We will make every effort to ensure that our pricing information is accurate, but we cannot guarantee that the information is error-free or that it will always be current. If a pricing error occurs, we reserve the right to cancel or refuse any order placed for that product.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Warranty and Returns:</strong> We will provide a warranty for our electronic parts, which will be clearly explained on our website. The length of the warranty will be specified, and the coverage provided will be detailed. We will also explain any exclusions or limitations on the warranty. Our return policy will be clearly explained, including the process for returning products, any restocking fees, and the conditions under which returns are accepted. Customers are responsible for ensuring that the products are returned in a manner that will prevent damage during shipping.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Payment and Security:</strong> Our website accepts payments through Stripe, a secure and reliable payment processing platform. Payments will be processed immediately upon receipt of the order and refunds will be processed through Stripe. We prioritize the security of customer payment information and all information is processed through Stripe's secure servers, not stored on our own. We accept Visa, Mastercard, American Express and other major credit and debit cards, and all payments must be made in USD. If a customer disputes a charge, we will work with Stripe to resolve the issue.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Shipping and Delivery:</strong> We will provide clear information on shipping and delivery times for our electronic parts, including any applicable shipping fees and any conditions or restrictions. We will use reliable shipping carriers, but we cannot guarantee delivery times. Customers are responsible for ensuring that the shipping address provided is accurate and complete. If a shipment is lost or damaged, we will make every effort to resolve the issue, but we cannot be held liable for any resulting damages.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Promo/Gift Certificate:</strong> It is valid for a specific duration 
    and can be redeemed for specific products or services only. It is non-transferable, 
    non-refundable, and cannot be exchanged for cash. The certificate can be used only
     once, and any unused balance will not be refunded. It cannot be combined with other
      promotional offers or discounts. Users must present the certificate at the time
       of redemption, and the company reserves the right to refuse if it has been 
       tampered with, duplicated, or damaged. By using the certificate, the user
        agrees to all terms governed by the laws of the state where the company 
        is registered.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>TAX:</strong> Kentucky 6% Sales Tax applies to all retail sales of tangible
     personal property and certain services within the state. The tax rate is calculated
      based on the total product amount, and the seller or retailer is responsible for
       collecting and remitting the tax. Buyers must provide valid documentation for 
       any exemptions. Failure to pay or file may result in penalties and interest. By 
       purchasing, buyers agree to these terms, governed by Kentucky state law.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Changes to Terms and Conditions:</strong>  We reserve the right to update our terms and
     conditions at any time. We will communicate any updates to our customers by posting the revised
      terms and conditions on our website. By continuing to use our website and purchase our
       products, customers agree to be bound by the most current version of our terms and
        conditions.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Billing Information:</strong> We will collect accurate billing information from 
    customers, including billing address, contact information, and payment method. Customers
     are responsible for ensuring that their billing information is accurate and up-to-date.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Payment Processing:</strong>  We will process payments for electronic 
    parts in accordance with the payment methods accepted and explained on our
     website. Payments will be processed securely, and customers' payment
      information will be protected in accordance with our privacy policy.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Order Confirmations:</strong> After an order is placed, we will provide an order
     confirmation, which will include a summary of the products ordered and the total cost,
      including any applicable taxes and shipping and handling fees.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Invoicing:</strong> We will provide an invoice for each order, which will 
    include a detailed breakdown of the products ordered, the total cost, and any 
    applicable taxes and shipping and handling fees. The invoice will be sent to the
     billing email address provided by the customer.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Billing Disputes:</strong> In the event of a billing dispute, customers are 
    encouraged to contact us as soon as possible to resolve the issue. If a billing 
    error occurs, we will make every effort to correct the error in a timely and 
    efficient manner.
  </li>

<li className="text-[14px] leading-[20px]">
  <strong>Purchase Order Terms:</strong>

  <ul className="list-[lower-alpha] pl-5 mt-2 space-y-1">
    <li>
      <strong>Order Placement:</strong>  Customers may place orders for electronic parts by 
      contacting us directly, through our website, or through any other agreed-upon method.
       All orders are subject to availability and confirmation of the order price.
    </li>

    <li>
      <strong>Order Acceptance:</strong>  We reserve the right to accept or reject any order
       in our sole discretion, even after receipt of an order confirmation. In the 
       event of a rejection, we will notify the customer as soon as possible and will
        not charge the customer for the rejected order.
    </li>

    <li>
      <strong>Order Changes:</strong> Customers may request changes to an order, but we
       cannot guarantee that such changes can be made once the order has been processed.
        Any changes to an order must be approved by us in writing.
    </li>

    <li>
      <strong>Payment Terms:</strong>: Customers will be responsible for paying the purchase price for
       electronic parts in accordance with the payment terms agreed upon at the time of the order.
        Customers must provide valid payment information and will be responsible for any charges 
        imposed by their bank or payment provider.
    </li>

    <li>
      <strong>Delivery:</strong> We will make every effort to deliver the electronic parts to the 
      customer in a timely manner, in accordance with the delivery terms agreed upon at the time 
      of the order. Delivery times are estimated and are not guaranteed.
    </li>
  </ul>
</li>


  <li className="text-[14px] leading-[20px]">
    <strong>Governing Law:</strong>  These terms and conditions and all transactions relating to the sale of
     electronic parts will be governed by and construed in accordance with the laws of the United States 
     of America and the State of Kentucky, without giving effect to any conflict of laws principles
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Compliance with Laws:</strong> We will comply with all applicable federal,
     state, and local laws, rules, and regulations in the conduct of our business and 
     the sale of our electronic parts
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Taxes:</strong> : We will collect and remit any applicable taxes in accordance with 
    federal, state, and local laws, rules, and regulations. Customers are responsible for any 
    taxes imposed on their purchases.
  </li>

  <li className="text-[14px] leading-[20px]">
    <strong>Export Controls:</strong>  We will comply with all applicable export control laws, 
    rules, and regulations, including those of the United States and any other countries, in 
    the sale and shipment of our electronic parts.
  </li>

  <p className="text-[14px] leading-[20px]">
   By adhering to these terms and conditions, we will provide our customers with a clear 
   and transparent purchasing experience and ensure that we are in compliance with all 
   relevant regulations set forth by Google and our business and transactions are 
   conducted in compliance with the relevant laws and regulations in the United States
    and the State of Kentucky. This will also help protect our customers and our 
    company from any legal or regulatory issues that may arise. Additionally, we will
     help protect the interests of both our customers and our company.
  </p>

</ol>

{/* Contact Section */}
<p className="text-[14px] leading-[20px] mt-6">
  <strong>CONTACT US:</strong>
</p>

<p className="text-[14px] leading-[20px] mt-6">
In order to resolve a complaint regarding the Site or to receive further 
information regarding use of the Site, please contact us at:
</p>

<p className="text-[14px] leading-[20px] mt-6">
<strong>Server Blink LLC <br />
Old Address: 7301 Fegenbush Ln Suite#201-5001, Louisville, KY 40228  <br />
New Address: 2210 Goldsmith Lane, Ste 126-5001, Louisville, KY 40218</strong>
</p>
<p className="text-[14px] leading-[20px] mt-6">
<strong>United States <br />
Phone: 502-206-2022  <br />
support@serverblink.com</strong>
</p>



        </div>
      </div>
    </div>
  </div>
</main>
  );
};

export default Page;
