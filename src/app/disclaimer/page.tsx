import React from 'react'

const wahaj = () => {
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
                                    Disclaimer
                                </span></h2>

                            {/* Page Title */}
                            <h1 className="text-4xl mb-4 text-[#4A4A4A] mt-5">
                                Disclaimer
                            </h1>



                            <ul className="list-disc text-[14px] leading-[20px] pl-5 my-5">
                                <li>Disclaimer</li>
                            </ul>


                            {/* Policy Content */}
                            <ol className="space-y-6 list-decimal pl-5">

                                <li className="text-[14px] leading-[20px]">
                                    <strong>Product Representation:</strong> The descriptions, images, and other
                                    representations of our electronic parts available on our website or in our
                                    marketing materials are intended to provide a general overview of the products.
                                    These representations may not accurately reflect all of the details and
                                    specifications of the products.
                                </li>

                                <li className="text-[14px] leading-[20px]">
                                    <strong>Product Availability: </strong> We make every effort to keep our
                                    website and marketing materials up-to-date and accurate, but the
                                    availability of our electronic parts is subject to change. Customers
                                    should contact us to confirm the availability of a product before
                                    placing an order
                                </li>

                                <li className="text-[14px] leading-[20px]">
                                    <strong>Product Accuracy: </strong> We make every effort to ensure that the
                                    information about our electronic parts is accurate and up-to-date, but we do
                                    not guarantee the accuracy of the information. Customers should contact us for
                                    more information about a product before placing an order.
                                </li>

                                <li className="text-[14px] leading-[20px]">
                                    <strong>Limitation of Liability:</strong>We will not be liable for any
                                    errors or omissions in our website or marketing materials, or for
                                    any damages or losses that may result from the use of the products.
                                </li>

                                <li className="text-[14px] leading-[20px]">
                                    <strong>Warranties:</strong> Refurbished electronic parts are sold with
                                    30 days of "Server Blink" warranty and New / Brand New parts may have
                                    Manufacturer warranties. Customers should contact us for more information
                                    about the warranty for a specific product.
                                </li>

                                <li className="text-[14px] leading-[20px]">
                                    <strong>No Affiliation with Brands:</strong> We are not affiliated with any brand,
                                    and any references to brands on our website or in our marketing materials are for
                                    reference purposes only. We do not claim to be an authorized dealer or distributor
                                    of any brand.
                                </li>
                            </ol>

                            {/* Remaining Paragraphs */}
                            <p className="text-[14px] leading-[20px] mt-6">
                                By including this disclaimer, we will ensure that our customers
                                have a clear understanding of the information available about
                                our electronic parts and that they are aware of any limitations
                                or warranties associated with the products. This will also help
                                us maintain compliance with Google's relevant regulations
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default wahaj