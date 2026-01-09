// app/my-account/MyAccountTabs.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MyAccountTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { name: "Orders", href: "/my-account/orders" },
    { name: "Returns", href: "/my-account/returns" },
    { name: "Addresses", href: "/my-account/addresses" },
    { name: "Recently Viewed", href: "/my-account/recently-viewed" },
    { name: "Account Settings", href: "/my-account/account-settings" },
  ];

  const getActiveTab = () => {
    const currentTab = tabs.find((tab) => pathname.startsWith(tab.href));
    return currentTab?.name || "Your Account";
  };

  return (
    <div>
      {/* Breadcrumb */}
    {/* Breadcrumb */}
<div className="flex items-center text-[11px] mb-4 text-gray-600" aria-label="breadcrumb">
  {/* Home */}
  <span className="" itemProp="name">
    Home
  </span>

  {/* Separator */}
  <span className="mx-3 text-gray-400" aria-hidden="true">
    /
  </span>

  {/* Your Account */}
  <span className="text-gray-600" itemProp="name">
    Your Account
  </span>

  {/* Separator */}
  <span className="mx-3 text-gray-400" aria-hidden="true">
    /
  </span>

  {/* Current Tab */}
  <span className="text-[#D42020] font-semibold" itemProp="name">
    {getActiveTab()}
  </span>
</div>

{/* Optional: Current Tab as Heading */}
<div className="text-4xl mb-4 text-gray-600">
  {getActiveTab()}
</div>


      {/* Tabs */}
   <div className="flex flex-wrap gap-2 mb-6 justify-center">
  {tabs.map((tab) => {
    const isActive = pathname.startsWith(tab.href);
    return (
    <Link
      key={tab.name}
      href={tab.href}
 className={`px-4 py-2 text-sm sm:text-[14px] font-medium transition-colors duration-200 uppercase ${
  isActive
    ? "underline underline-offset-4 text-black"
    : "text-gray-600 hover:text-[#D42020]"      
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
