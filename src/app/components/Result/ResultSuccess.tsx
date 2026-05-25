"use client"
import React from "react";
const ResultSuccess = () => {
    return (
        <main className="flex flex-col gap-8 w-full ">
            {/* Container: max-width 1170px, centered */}
            <div className="w-full max-w-[1170px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
                {/* Heading */}
                <div className="w-full">
                    <h1 className="text-[28px] mt-1 text-[#8b8b8b] font-light">Thanks for Subscribing! </h1>
                    <div className="border-[1px] border-[#8b8b8b] items-center p-3 flex gap-3  mt-5 text-[#545454]">
                        <svg className="text-[#8b8b8b] fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
                        <h1 className="text-[14px]   font-light">
                            Thank you for joining our mailing list. You'll be sent the next issue of our newsletter shortly
                        </h1>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResultSuccess;
