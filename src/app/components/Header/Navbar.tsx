"use client";
import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import navlogo from "@/assets/nav-logo.webp";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/useReduxHooks";
import GlobalSearchBar from "./GlobalSearchBar";
import MobileSearchBar from "./MobileSearchBar";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart.items);

  return (
    <header className="bg-[var(--bg-color)]  sticky top-0 z-50">
      <nav className="w-full">
        <div className="flex items-center justify-between gap-4 h-20 sm:h-20 lg:h-24 w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-1  2xl:px-2">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href={"/"}>
              <div className="relative w-36 h-7 sm:w-40 sm:h-8 md:w-44 md:h-9 lg:w-48 lg:h-10 xl:w-76 xl:h-18 2xl:w-[253.48px] 2xl:h-[48px]">
                <Image
                  src={navlogo}
                  alt="Logo"
                  fill
                  fetchPriority="high"
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 120px, (max-width: 1200px) 200px, 253px"
                />
              </div>
            </Link>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-[60%] xl:max-w-[40rem] 2xl:max-w-[695.52px] mx-4">
            <GlobalSearchBar />
          </div>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Contact Info with Headphone Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center">
                <svg
                  className="w-8 h-8 xl:w-10 xl:h-10 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                </svg>
              </div>
              <div className="flex flex-col text-gray-800">
                <p className="text-[15px] font-semibold">
                  Call:{" "}
                  <span className="text-[var(--primary-color)] font-semibold text-[18px]">
                    +1 502-206-3033
                  </span>
                </p>
                <p className="text-[15px] font-semibold">
                  Email:{" "}
                  <a
                    href="mailto:sales@serverblink.com"
                    className="text-[var(--primary-color)] hover:text-red-600 font-light"
                  >
                    sales@serverblink.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-800 hover:text-red-600 transition"
            >
              <button aria-label="cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart?.length}
                  </span>
                )}
              </button>
            </Link>
            {/* Hamburger */}
            <button
              aria-label="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-800"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Text Banner */}
        <div className="w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto">
          <div className="bg-white p-4 text-center mb-4">
            <p className="text-[14px] font-medium">
              We Accept POs from Fortune 1000 Companies, Government Agencies
              (Federal, State, Local), Defense (Military, Air Force, Navy),
              Universities, Schools and Colleges.
            </p>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 space-y-4 px-4 pb-6 bg-white">
            {/* Search */}
            <div className="relative w-full">
              <MobileSearchBar />
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3 py-3 border-t">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
              </svg>
              <div className="flex flex-col text-gray-800">
                <p className="text-sm font-medium">
                  Call:{" "}
                  <span className="text-red-600 font-semibold">
                    +1 502-206-3033
                  </span>
                </p>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href="mailto:sales@serverblink.com"
                    className="hover:text-red-600"
                  >
                    sales@serverblink.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;