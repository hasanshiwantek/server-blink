"use client";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Search, User, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MobileSearchBar from "./MobileSearchBar";
import { fetchCategories } from "@/lib/api/category";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Category[];
}
const TopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useAppSelector((state: RootState) => state?.cart?.items);
  const auth = useAppSelector((state: RootState) => state?.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItemCount =
    cart?.reduce((sum, item: any) => sum + (item?.quantity ?? 1), 0) ?? 0;

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
    console.log("Searching:", searchQuery);
  };


  // Fetch categories
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  // ✅ Limit to only first 3 categories
  const visibleCategories = categories.slice(0, 3);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <header
        className={`bg-[#393939] text-white transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative"
          }`}
      >
        <div className="w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2">
          <div className="flex items-center md:justify-between justify-center gap-4 sm:py-2">
            {/* Left: Promo Text (hidden when scrolled) */}
            <div
              className={`md:flex hidden items-center whitespace-nowrap space-x-2 md:space-x-3 transition-all duration-300 ${isScrolled ? "hidden" : "flex"
                }`}
            >
              <p className="ml-2 font-bold text-[14px]">
                $10 off on First Order: Code: FIRSTORDER
              </p>
            </div>

            {/* Center: Search Bar (visible when scrolled) */}
            {/* <div
              className={`flex-1 max-w-[400px] transition-all duration-300 
    ${isScrolled ? "block" : "hidden"}`}
            >
              <form onSubmit={handleSearch} className="relative  ">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH"
                  className="w-full text-white placeholder-white px-4 pr-10 focus:outline-none text-sm font-semibold border-b border-white bg-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  aria-label="search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div> */}


            {/* Right: Login/Signup + Cart */}

            <div className="flex items-center md:justify-end justify-between w-full whitespace-nowrap md:w-0 gap-5 md:gap-5">
              {/* Hamburger */}
              <div className="md:hidden block">

                <button
                  aria-label="hamburger"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-white"
                >
                  {mobileOpen ? (
                    <X className="w-9 h-9" />
                  ) : (
                    <Menu className="w-9 h-9" />
                  )}
                </button>
              </div>

              {/* User & Auth */}
              <div className="flex items-center gap-2 ml-16 sm:ml-0">
                <Link
                  href={
                    auth?.isAuthenticated ? "/my-account/orders" : "/auth/login"
                  }
                >
                  <User className="w-8 h-8 text-white" fill="currentColor" />
                </Link>
                {auth?.isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="font-bold text-[12px] sm:text-[14px] hover:text-gray-300 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <button className="font-bold text-[12px] sm:text-[14px] hover:text-gray-300 transition">
                        Login
                      </button>
                    </Link>
                    <span className="font-bold">or</span>
                    <Link href="/auth/signup">
                      <button className="font-bold text-[12px] sm:text-[14px] hover:text-gray-300 transition">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* Cart */}
              <div className="relative">
                <Link href="/cart" className="transition block">
                  <div className="bg-red-600 p-2 rounded hover:bg-red-700 transition">
                    <FaShoppingCart className="w-7 h-7 text-white" />
                    <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount || "0"}
                    </span>
                  </div>
                </Link>
              </div>
            </div>


          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0  bg-opacity-50 z-999"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-full bg-[#2d2d2d] text-white z-999 overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
              <h2 className="text-lg font-bold">MAIN MENU</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2">
              {/* ✅ Dynamic Categories - First 3 Only */}
              {visibleCategories.map((category) => (
                <div key={category.id}>
                  <div
                    className="flex items-center justify-between py-3 px-4 hover:bg-gray-700 rounded transition cursor-pointer"
                    onClick={() => {
                      if (category.subcategories?.length > 0) {
                        toggleCategory(category.id);
                      } else {
                        router.push(`/category/${category.slug}`);
                        setMobileOpen(false);
                      }
                    }}
                  >
                    <span className="font-medium">{category.name}</span>
                    {category.subcategories?.length > 0 && (
                      <>
                        {expandedCategory === category.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Subcategories */}
                  {expandedCategory === category.id &&
                    category.subcategories?.length > 0 && (
                      <div className="ml-4 space-y-1">
                        {category.subcategories.map((subcat) => (
                          <Link
                            key={subcat.id}
                            href={`/category/${subcat.slug}`}
                            className="block py-2 px-4 text-sm hover:bg-gray-700 rounded transition"
                            onClick={() => setMobileOpen(false)}
                          >
                            {subcat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {/* Static Links */}
              <Link
                href="/contact-us"
                className="block py-3 px-4 hover:bg-gray-700 rounded transition font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/blogs"
                className="block py-3 px-4 hover:bg-gray-700 rounded transition font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
            </nav>


          </div>
        </>
      )}
    </>
  );
};

export default TopHeader;