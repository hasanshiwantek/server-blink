"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { subscribeNewsletter } from "@/redux/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getBlogs, getWebPages, visitorSession } from "@/redux/slices/storeFrontSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { customerProfile, logout } from "@/redux/slices/authSlice";
import { fetchCartList } from "@/redux/slices/cartsSlice";
import { useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

const robotoCondensedStyle = { fontFamily: '"Roboto Condensed"' };

const FooterBottom = () => {
  const searchParams = useSearchParams();
  const paramsToken = searchParams.get("token");
  const auth = useAppSelector((state: RootState) => state?.auth);
  const user: any = localStorage.getItem("persist:auth");
  const parsedAuth = auth ? JSON.parse(user) : null;
  const token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : null;
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const robotoCondensed = "'Roboto ', Arial, Helvetica, sans-serif";
  const { newsletterLoading } = useSelector((state: any) => state.contact);
  const { blogs, webPages, error, loading } = useAppSelector(
    (state: any) => state.storeFront
  );

  const pagesList = webPages?.data || [];
  const visiblePages = pagesList?.filter((page: any) =>
    !page.restrictToCustomersOnly || token
  );
  const router = useRouter();

  const blogPosts = blogs?.data || [];
  const handleSelect = (url: string) => {
    router.push(url);
  };
  const handleLogout = () => {
    const confirm = window.confirm("Confirm Logout?");
    if (!confirm) {
      return;
    } else {
      dispatch(logout());
      toast.success("Logged out successfully!");
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
    const existingSession = localStorage.getItem("sessionId");
    if (existingSession) {
      dispatch(visitorSession({ sessionId: existingSession }))
    } else {
      const randomString = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("sessionId", randomString)
    }
  }, [])

  useEffect(() => {
    dispatch(getBlogs({ page: 1, perPage: 20 }));
    dispatch(getWebPages({ page: 1, perPage: 100 }));
    dispatch(fetchCartList());
  }, [dispatch]);

  useEffect(() => {
    if (!paramsToken) return;

    const login = async () => {
      const auth = {
        token: JSON.stringify(paramsToken),
      };

      localStorage.setItem("persist:auth", JSON.stringify(auth));

      const result = await dispatch(customerProfile());

      if (customerProfile.fulfilled.match(result)) {
        dispatch(fetchCartList());
        window.location.href = "/my-account/orders";
      }
    };

    login();
  }, [paramsToken, dispatch, router]);
  return (
    <footer
      className="bg-[#333333] text-[#ffffff] w-full mx-auto"
      style={{ fontFamily: robotoCondensed }}
    >
      {/* 🔹 Newsletter Section */}
      <section className="bg-[#cac9c9] flex justify-center items-center h-auto min-h-[3rem]">
        <div
          className="
       w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2
        flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 lg:gap-0 py-2
      "
        >
          <div className="text-center  md:text-left  w-full md:w-[60%] 2xl:max-w-[50%]" style={{ fontFamily: robotoCondensed }}>
            <h3 className="text-[15px] md:text-[20px] text-[#545454] font-bold uppercase">
              Join Our Mailing List
              <span className="text-[16px] lowercase ml-2">
                for special offers!
              </span>
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) {
                dispatch(subscribeNewsletter({ email: email.trim() })).unwrap().then(() => {
                  handleSelect("/result")
                  setEmail("")
                });
              }
            }}
            className="w-[80%] mb-[6px] md:w-[30%] mb-[7px] 2xl:max-w-[30%] flex items-center gap-2 mt-4 md:mt-0 lg:ml-24"
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-[32px] px-4 py-3 border border-white text-[#545454] bg-white focus:outline-none rounded-xs text-sm md:text-base"
            />
            <button
              type="submit" disabled={newsletterLoading}
              className="btn-primary h-[32px] !px-4 !py-1 !rounded-sm w-[120px]"
            >
              {newsletterLoading ? "LOADING.." : "JOIN"}
            </button>
          </form>
        </div>
      </section>


      {/* Main Footer Content */}
      <section className="text-center md:text-left w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact Us */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-[#ffffff]" style={{ fontFamily: robotoCondensed }}>
              Contact Us
            </h4>
            <div className="space-y-1 text-[14px] lg:text-[12px] text-[#ffffff]">
              <p className="font-semibold">Address:</p>
              <p>2210 Goldsmith Lane</p>
              <p>Ste 126-5001</p>
              <p>Louisville, KY 40218</p>
              <p className="mt-3">
                <span className="font-semibold">Phone Number:</span>{" "}
                <a
                  // href="tel:+15022063033"
                  href="#"
                  className="text-gray-300">
                  {/* +1502-206-3033 */}
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@serverblink.uk"
                  className="text-gray-300"
                >
                  info@serverblink.uk
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
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-[#ffffff]" style={{ fontFamily: robotoCondensed }}>
              Accounts & Orders
            </h4>
            <ul className="space-y-1 text-[14px] lg:text-[12px] text-[#ffffff]">
              {!auth?.isAuthenticated ? <li>
                <Link href="/auth/login" className="hover:text-[#D42020]">
                  Login
                </Link>{" "}
                or{" "}
                <Link href="/auth/signup" className="hover:text-[#D42020]">
                  Sign Up
                </Link>
              </li> : <>
                <li>
                  <Link href="/my-account/orders" className="hover:text-[#D42020]">
                    Account
                  </Link>
                </li>
                <li>
                  <span onClick={handleLogout} className="hover:text-[#D42020] cursor-pointer">
                    Logout
                  </span>
                </li>
                <li>
                  <Link href="/my-account/orders" className="hover:text-[#D42020]">
                    Order Status
                  </Link>
                </li>
              </>
              }

            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-[#ffffff]" style={{ fontFamily: robotoCondensed }}>
              Quick Links
            </h4>
            <ul className="space-y-1 text-[14px] lg:text-[12px] text-[#ffffff] " style={{ fontFamily: robotoCondensed }}>
              {visiblePages?.map((page: any) => (
                <li key={page.id}>
                  {page?.pageType == "2" ? (
                    <Link href={`${page.link}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#D42020]">
                      {page.pageName}
                    </Link>) : <Link href={`${page.slugWithUrl}`} className="hover:text-[#D42020]">
                    {page.pageName}
                  </Link>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Blog Posts */}
          <div>
            <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-[#ffffff]" style={{ fontFamily: robotoCondensed }}>
              Recent Blog Posts
            </h4>
            <ul className="space-y-1 text-[14px] lg:text-[12px] text-[#ffffff]">
              {loading ? (
                // 🔹 Inline skeleton (4 items)
                Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"
                  ></li>
                ))
              ) : error ? (
                <li className="text-red-500 px-2 py-1" >{error}</li>
              ) : blogPosts.length === 0 ? (
                <li className="text-gray-500 px-2 py-1">No blogs available</li>
              ) : (
                blogPosts.map((post: any) => (
                  <li key={post.id}>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-[#D42020] text-[12px]"
                      style={{ fontFamily: robotoCondensed }}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>

            {/* Connect with Us */}
            <div className=" md:mt-8">
              <h4 className="text-[16px] lg:text-[16px] font-bold mb-4 text-[#ffffff]" style={{ fontFamily: robotoCondensed }}>
                Connect with Us:
              </h4>
              <div className="flex justify-center md:justify-start gap-3">
                <Link
                  href="http://www.facebook.com/serverblink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <svg
                    className="w-8 h-8 text-[#ffffff] "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href="http://www.linkedin.com/company/server-blink/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <svg
                    className="w-8 h-8 text-[#ffffff]"
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
        <div className="mt-12 pt-8  border-gray-600 ">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Image
              src="/american-express.svg"
              alt="American Express"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image
              src="/discover.svg"
              alt="Discover"
              width={60}
              height={40}
              className="object-contain "
            />
            <Image
              src="/master.svg"
              alt="Mastercard"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image
              src="/visa.svg"
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
        <div className="w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2 ">
          <p className="text-[#ffffff] text-left text-base">
            © {new Date().getFullYear()} Server Blink LLC |&nbsp;
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











