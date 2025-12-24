"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import styles from "@/styles/Header/Header.module.css"
import Link from "next/link";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
const TopHeader = () => {
  const [open, setOpen] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart.items);

  return (
    <header className="bg-[#393939]  py-2 px-[6%] 2xl:px-[15%] font-josh text-sm text-white ">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Flags + Text */}
        <div className="md:flex items-center hidden space-x-2 md:space-x-3">
          <p className="ml-2 font-bold text-[14px]">$10 off on First Order: Code: FIRSTORDER</p>
        </div>

        {/* Right: Language + Support */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 relative gap-2 md:gap-0">
          {/* Support */}
          <div className="flex items-center space-x-2">
            <button className=" font-bold text-[14px]">Login</button>
            <span className="text-bold">or</span>
            <button className=" font-bold text-[14px]">Sign up</button>
            <div className={styles.cartIcon}>
            {/* Cart */}
            <Link
              href="/cart"
              className=" transition"
            >
              <FaShoppingCart  className="w-7 h-7" />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cart?.length}
                </span>
              )}
            </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
