"use client";
import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import navlogo from "@/assets/nav-logo.webp";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import GlobalSearchBar from "./GlobalSearchBar";
import MobileSearchBar from "./MobileSearchBar";
import { fetchLogos } from "@/redux/slices/homeSlice";
const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.carts?.items);
  const { logoUrl, faviconUrl, logoDimensions, logoType } = useAppSelector((state: any) => state?.home);
  const robotoCondensed = "'Roboto ', Arial, Helvetica, sans-serif";
  useEffect(() => {
    dispatch(fetchLogos());
  }, []);

  return (
    <header className="bg-[var(--bg-color)]  sticky top-0 z-50 px-4 sm:px-0">
      <nav className="w-full">
        <div className="flex items-center md:justify-between justify-center gap-4 h-20 sm:h-20 lg:h-24 w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-1  2xl:px-2">
          {/* Left: Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Link href={"/"}>
              <div className="relative w-80 h-14 sm:w-70 sm:h-30 md:w-44 md:h-9 lg:w-48 lg:h-20 xl:w-76 xl:h-18 2xl:w-[253.48px] 2xl:h-[48px]">
                {logoType == "upload" && <Image
                  src={logoUrl || navlogo}
                  alt="Logo"
                  fill
                  fetchPriority="high"
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 200px, (max-width: 1200px) 200px, 253px"
                />}
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
              <div className="relative w-10 h-10 xl:w-12 xl:h-12 flex-shrink-0">
                <Image
                  src="/headphone.webp"
                  alt="Contact support"
                  fill
                  className="object-contain"
                  sizes="48px" fetchPriority="high"
                />
              </div>
              <div className="flex flex-col text-gray-800" style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
                <p className="text-[15px] font-semibold">
                  Call:{" "}
                  <Link
                    href="tel:+15022063033"
                    className="text-[var(--primary-color)] text-[18px] hover:underline"
                  >
                    {/* +1 502-206-3033 */}
                  </Link>
                </p>

                <p className="text-[15px] font-bold">
                  Email:{" "}
                  <Link
                    href="mailto:info@serverblink.uk"
                    aria-label="Email us at info@serverblink.uk"
                    className="text-[#D42020] text-[15px] hover:underline"
                  >
                    info@serverblink.uk
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Cart */}
            {/* <Link
              href="/cart"
              className="relative text-gray-800 hover:text-red-600 transition"
            >
              <button aria-label="cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d42020] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart?.length}
                  </span>
                )}
              </button>
            </Link> */}
            {/* Hamburger */}
            {/* <button
              aria-label="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-800"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button> */}
          </div>
        </div>

        {/* Text Banner */}
        <div className="w-full xl:max-w-[1170px] border-none 2xl:max-w-[1170px] mx-auto" style={{ fontFamily: robotoCondensed }}>
          <div className="bg-white text-center p-0 mb-0 md:p-4 md:mb-4">
            <p className="p-4 md:text-[14px] text-[14px] font-semibold text-[#545454]">
              We Accept POs from Fortune 1000 Companies, Government Agencies
              (Federal, State, Local), Defense (Military, Air Force, Navy),
              Universities, Schools and Colleges.
            </p>
          </div>
        </div>

        {/* Mobile Dropdown */}
      </nav>
    </header>
  );
};

export default Navbar;
