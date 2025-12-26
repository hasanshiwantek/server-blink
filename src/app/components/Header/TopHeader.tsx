"use client";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Search } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";

const TopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show search bar and make header fixed when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Searching:", searchQuery);
  };

  return (
    <header
      className={`bg-[#393939] text-white transition-all duration-300 ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative"
      }`}
    >
      <div className="w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2">
        <div className="flex items-center md:justify-between justify-center gap-4 py-2">
          {/* Left: Promo Text (hidden when scrolled) */}
          <div
            className={`md:flex hidden  items-center space-x-2 md:space-x-3 transition-all duration-300 ${
              isScrolled ? "hidden" : "flex"
            }`}
          >
            <p className="ml-2 font-bold text-[14px]">
              $10 off on First Order: Code: FIRSTORDER
            </p>
          </div>

          {/* Left: Shop By Category (visible when scrolled) */}
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "block" : "hidden"
            }`}
          >
    
          </div>

          {/* Center: Search Bar (visible when scrolled) */}
          <div
            className={`flex-1 max-w-[400px] transition-all duration-300 ${
              isScrolled ? "block" : "hidden"
            }`}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH"
                className="w-full  text-white placeholder-white  px-4  pr-10 focus:outline-none text-sm font-semibold border-b-1 border-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white "
                aria-label="search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right: Login/Signup + Cart */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <button className="font-bold text-[14px] hover:text-gray-300 transition">
                  Login
                </button>
              </Link>
              <span className="font-bold">or</span>
              <Link href="/auth/signup">
                <button className="font-bold text-[14px] hover:text-gray-300 transition">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Cart */}
            <div className="relative ml-2">
              <Link href="/cart" className="transition block">
                <div className="bg-red-600 p-2 rounded hover:bg-red-700 transition">
                  <FaShoppingCart className="w-5 h-5 text-white" />
                  {cart?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cart?.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;