"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/api/category";
import Image from "next/image";
import FooterSkeleton from "../loader/FooterSkeleton";
interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

const FooterBottom = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // ✅ fill the variable
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []); // ✅ run once on mount

  return (
    <footer className="bg-[#333333] text-white w-full mx-auto">
      {/* 🔹 Newsletter Section */}
      <section className="bg-[#cac9c9] flex justify-center items-center h-auto min-h-[3rem]">
        <div
          className="
        w-full max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[88%]
        2xl:max-w-[97%] 
        mx-auto 
        px-4 sm:px-6 lg:px-8 xl:px-10 py-2 md:py-0
        flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 lg:gap-0
      "
        >
          <div className="text-center md:text-left w-full md:w-[60%] 2xl:max-w-[50%]">
            <h3 className="text-[20px] text-[#545454] font-bold uppercase">
             Join Our Mailing List
            <span className="text-[16px] lowercase ml-2">
           for special offers!
            </span>
            </h3>
          </div>

          <form className="w-[80%] md:w-[50%] 2xl:max-w-[30%] flex items-center gap-2 mt-4 md:mt-0 ">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-white text-[#545454] bg-white focus:outline-none rounded-xs text-sm md:text-base "
            />
            <button
              type="submit"
              className="btn-primary !p-3  !rounded-sm w-[40%] md:w-[30%] max-w-[9rem]"
            >
              JOIN
            </button>
          </form>
        </div>
      </section>


      {/* Main Footer Content */}
      <section className="w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[88%] xl:max-w-[85%] mx-auto px-4 xl:px-4 2xl:px-28 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Us */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-white">
              Contact Us
            </h4>
            <div className="space-y-2 text-[14px] lg:text-[12px] text-white">
              <p className="font-semibold">Address:</p>
              <p>2210 Goldsmith Lane</p>
              <p>Ste 126-5001</p>
              <p>Louisville, KY 40218</p>
              <p className="mt-3">
                <span className="font-semibold">Phone Number:</span>{" "}
                <a href="tel:+15022063033" className="hover:text-gray-300">
                  +1502-206-3033
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:sales@serverblink.com"
                  className="hover:text-gray-300"
                >
                  sales@serverblink.com
                </a>
              </p>
              <p className="mt-3">
                <span className="font-semibold">Hours of Operations:</span>
              </p>
              <p>Monday to Friday 8:00 AM to 6:00 PM EST</p>
            </div>
          </div>

          {/* Accounts & Orders */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-white">
              Accounts & Orders
            </h4>
            <ul className="space-y-2 text-[14px] lg:text-[12px] text-white">
              <li>
                <Link href="/auth/login" className="hover:text-gray-300">
                  Login
                </Link>{" "}
                or{" "}
                <Link href="/auth/signup" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[14px] lg:text-[12px] text-white">
              <li>
                <Link href="/warranty" className="hover:text-gray-300">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gray-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returnPolicy" className="hover:text-gray-300">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gray-300">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gray-300">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent Blog Posts */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-white">
              Recent Blog Posts
            </h4>
            <ul className="space-y-2 text-[14px] lg:text-[12px] text-white">
              <li>
                <Link href="/blog/post-1" className="hover:text-gray-300">
                  ServerBlink's Registered Address Has Changed
                </Link>
              </li>
              <li>
                <Link href="/blog/post-2" className="hover:text-gray-300">
                  Exploring Cisco 15454-OPT-EDFA-24: Key Features & Uses
                </Link>
              </li>
              <li>
                <Link href="/blog/post-3" className="hover:text-gray-300">
                  Exploring Cisco 15454-DS1E1-56 & DS3EC1-48 Network Cards
                </Link>
              </li>
              <li>
                <Link href="/blog/post-4" className="hover:text-gray-300">
                  Exploring Cisco 15454-CE-100T-8 & 15454-CE-MR-10 Series
                </Link>
              </li>
            </ul>

            {/* Connect with Us */}
            <div className="mt-8">
              <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-white">
                Connect with Us:
              </h4>
              <div className="flex gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8  border-gray-600">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src="/amex.png"
              alt="American Express"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image
              src="/discover.png"
              alt="Discover"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image
              src="/visa.png"
              alt="Visa"
              width={60}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bg-[#8b8b8b]  py-4">
        <div className=" w-full max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[85%]
        2xl:max-w-[85%]  mx-auto px-4 xl:px-4 2xl:px-28">
          <p className="text-white text-left text-base">
            © {new Date().getFullYear()} Server Blink LLC |
            <Link href="/sitemap" className="hover:text-gray-300">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterBottom;











