// app/my-account/MyAccountTabs.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MyAccountTabs = () => {
  const pathname = usePathname();
  const roboto = "'Roboto', Arial, Helvetica, sans-serif";

  const tabs = [
    { name: "Orders", href: "/my-account/orders" },
    { name: "Returns", href: "/my-account/returns" },
    { name: "Messages", href: "/my-account/messages" },
    { name: "Addresses", href: "/my-account/addresses" },
    { name: "Recently Viewed", href: "/my-account/recently-viewed" },
    { name: "Account Settings", href: "/my-account/account-settings" },
  ];

  const getActiveTab = () => {
    const currentTab = tabs.find((tab) => pathname.startsWith(tab.href));
    return currentTab?.name || "Your Account";
  };

  return (
    <div >
      {/* Breadcrumb */}
    {/* Breadcrumb */}
<div className="hidden md:flex items-center text-[11px] mb-4 text-gray-600" aria-label="breadcrumb">
  {/* Home */}
  <span className="" itemProp="name">
    Home
  </span>

  {/* Separator */}
  <span className="hidden md:flex mx-3 text-gray-400" aria-hidden="true">
    /
  </span>

  {/* Your Account */}
  <span className="hidden md:flex text-gray-600" itemProp="name">
    Your Account
  </span>

  {/* Separator */}
  <span className="hidden md:flex mx-3 text-gray-400" aria-hidden="true">
    /
  </span>

  {/* Current Tab */}
  <span className="hidden md:flex text-[#D42020] font-semibold" itemProp="name">
    {getActiveTab()}
  </span>
</div>

{/* Optional: Current Tab as Heading */}
<div className="text-[28px] mb-8 text-[#545454] !font-normal" style={{fontFamily:roboto}}>
  {getActiveTab()}
</div>


      {/* Tabs */}
  <div className="flex flex-col items-center mb-6 gap-0 md:flex-row md:justify-center md:gap-2">
  {tabs.map((tab) => {
    const isActive = pathname.startsWith(tab.href);

    return (
      <Link
        key={tab.name}
        href={tab.href}
        style={{fontFamily:roboto}}
        className={`px-2  text-[14px] font-normal transition-colors duration-200 uppercase md:px-4 md:py-2 ${
          isActive
            ? "text-black md:underline md:underline-offset-4"
            : "text-[#393939] hover:text-[#D42020]"
        }`}
      >
        {tab.name}
      </Link>
    );
  })}
</div>

    </div>
  );
};

export default MyAccountTabs;
