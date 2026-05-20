"use client";
import { useState, useEffect, useRef } from "react";
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
import { clearSearch, globalSearch, setSearchQuery, setShowSearchDropdown } from "@/redux/slices/homeSlice";
import { usePathname } from "next/navigation";
import Image from "next/image";


interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Category[];
}
const isMobile = window.innerWidth < 768;

const TopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const cart = useAppSelector((state: RootState) => state?.cart?.items);
  const auth = useAppSelector((state: RootState) => state?.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [searchCache, setSearchCache] = useState<{ [key: string]: any[] }>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  // const { searchData, loading } = useAppSelector((state: any) => state.home);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItemCount =
    cart?.reduce((sum, item: any) => sum + (item?.quantity ?? 1), 0) ?? 0;
  const [results, setResults] = useState<any[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { searchQuery, showSearchDropdown, searchData, loading } = useAppSelector((state: any) => state.home);

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


  const handleSearch = (e?: any) => {
    e?.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed.length > 1) {
      dispatch(globalSearch({ query: trimmed }));
    }
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
  const handleSelect = (url: string) => {
    dispatch(clearSearch());
    setQuery("");
    setShowDropdown(false);
    setIsOpen(false);
    router.push(url);
  };
  useEffect(() => {
    if (searchData?.data) {
      const mapped = searchData.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.categories?.[0]?.slug || item.slug,
        brand: item.brand?.name || "N/A",
        sku: item.sku || "N/A",
        price: item.price || item.costPrice || "0.00",
        url: `/${item?.sku}`,
        productUrl: `${item?.productUrl}`,
      }));

      setResults(mapped);
      setShowDropdown(true);

      const cacheKey = query.trim().toLowerCase();
      if (cacheKey.length > 1) {
        setSearchCache((prev) => ({ ...prev, [cacheKey]: mapped }));
      }
    }
  }, [searchData]);
  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setQuery("");
        dispatch(setShowSearchDropdown(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (value: string) => {
    dispatch(setSearchQuery(value));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        dispatch(globalSearch({ query: value.trim() }));
        dispatch(setShowSearchDropdown(true));
      }, 100);
    }
  };

  useEffect(() => {
    if (pathname === "/advanced-search") {
      setIsOpen(false);
      dispatch(clearSearch());
    }
  }, [pathname]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        dispatch(setShowSearchDropdown(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <header
        className={`bg-[#393939] text-white transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative"
          }`}
      >
        <div className="w-full xl:max-w-[1170px] 2xl:max-w-[1170px] mx-auto px-4 xl:px-4 2xl:px-2">
          <div className="flex items-center md:justify-between justify-between gap-4 sm:py-2">
            {/* Left: Promo Text (hidden when scrolled) */}
            <div
              className={`md:flex hidden items-center whitespace-nowrap space-x-2 md:space-x-3 transition-all duration-300 flex-1 ${isScrolled ? "hidden" : "flex"
                }`}
            >
              <p className="ml-2 font-bold text-[14px]">
                $10 off on First Order: Code: FIRSTORDER
              </p>
            </div>

            {/* Center: Search Bar (visible when scrolled) */}
            {!isMobile && <div ref={containerRef}
              className={`relative flex-1 flex  justify-center transition-all duration-300 
    ${isScrolled ? "block" : "hidden"}`}
            >
              <form className="relative w-full max-w-[270px]  h-[25px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleOnChange(e.target.value)}
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     e.preventDefault();
                  //     const q = searchQuery.trim();
                  //     dispatch(clearSearch());
                  //     router.push(`/advanced-search?q=${q}`);
                  //   }
                  // }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const q = searchQuery.trim();
                      dispatch(clearSearch());
                      if (q) {
                        localStorage.setItem("advancedSearchFilters", JSON.stringify({ q }));
                         window.dispatchEvent(new Event("searchFiltersUpdated"));
                          if (pathname === "/advanced-search") {
   window.location.reload()
      } else {
        router.push(`/advanced-search`);
      }
                        // setTimeout(() => {
                        //   window.location.reload()
                        // },100)
                      }
                    }
                  }}
                  placeholder="SEARCH"
                  className="w-full text-white placeholder-white px-1 py-1 pr-9 focus:outline-none text-sm font-semibold border-b border-white bg-transparent"
                />
                <button

                  onClick={(e) => {
                    e.preventDefault();
                    const q = searchQuery.trim();
                    dispatch(clearSearch());
                    if (q) {
                      localStorage.setItem("advancedSearchFilters", JSON.stringify({ q }));
                       window.dispatchEvent(new Event("searchFiltersUpdated"));
                           if (pathname === "/advanced-search") {
   window.location.reload()
      } else {
        router.push(`/advanced-search`);
      }
                 
                      // router.push(`/advanced-search?q=${q}`);
                    }
                  }}
                  // onClick={handleSearch}
                  className="absolute right-1 top-1/2 py-1 -translate-y-1/2 text-white"
                  aria-label="search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              {showSearchDropdown && searchQuery.trim().length > 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[585px] mt-1 bg-[#f2f2f2] shadow-xl overflow-hidden z-[9999] max-h-[520px] overflow-y-auto border border-gray-300">

                  {loading && <div className="p-6 text-gray-500 text-center">Searching...</div>}

                  {!loading && searchData?.data?.length === 0 && (
                    <div className="p-6 text-gray-500 text-center">No Products found.</div>
                  )}

                  {!loading &&
                    searchData?.data?.map((item: any) => (
                      <div
                        key={item.id}
                        className="border-b-4 border-gray-200 last:border-b-2 hover:bg-gray-50 transition-colors cursor-pointer group"
                        onClick={() => {
                          const url = item?.productUrl || `/${item.sku}`;
                          handleSelect(url);
                        }}
                      >
                        <div className="flex">
                          {/* Product Image - Left Side */}
                          <div className="w-[160px] min-h-[140px] flex-shrink-0 bg-white border-r border-gray-200 p-3 flex items-center justify-center">
                            <Image
                              src={item?.image?.[0]?.path || "/default-product-image.svg"}
                              alt={item?.name || "product"}
                              width={145}
                              height={125}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const url = item?.productUrl || `/${item?.sku}`;
                                handleSelect(url);
                              }}
                              className="object-contain max-w-full max-h-full"
                            />
                          </div>
                          {/* Product Details - Right Side */}
                          <div className="flex-1 p-4 flex flex-col">
                            {/* Brand */}
                            <p onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const url = item?.brand?.slug || `/${item?.sku}`;
                              handleSelect(`/brand/${url}`);
                            }} className="text-[1rem] text-[#545454] uppercase hover:text-[#d42020]">
                              {item?.brand?.name || "Brand"}
                            </p>

                            {/* SKU */}
                            <p onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const url = item?.productUrl || `/${item?.sku}`;
                              handleSelect(url);
                            }} className="text-[1rem] text-[#545454] mt-0.5 hover:text-[#d42020]">
                              Sku: {item?.sku || "N/A"}
                            </p>

                            {/* Product Name */}
                            <p onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const url = item?.productUrl || `/${item?.sku}`;
                              handleSelect(url);
                            }} className="text-[14px] font-bold text-[#54545F] leading-tight mt-2 line-clamp-2 min-h-[42px] hover:text-[#d42020]">
                              {item?.name}
                            </p>

                            {/* Pricing */}
                            <div className="mt-auto pt-3">
                              {item?.costPrice && Number(item?.costPrice) > Number(item?.price) && (
                                <p className="text-[13px] text-gray-500">
                                  Price{" "}
                                  <span className="line-through">
                                    ${Number(item?.costPrice).toFixed(2)}
                                  </span>
                                </p>
                              )}

                              <p className="text-[16px] font-bold text-[#545454]  mt-1">
                                ${Number(item?.price || 0).toFixed(2)}
                              </p>
                            </div>

                            {/* View Details Button */}
                            <button
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const url = item?.productUrl || `/${item?.sku}`;
                                handleSelect(url);
                              }}
                              // className="mt-4 w-full bg-[#cccccc] hover:bg-[#bbbbbb] text-[#333] font-bold text-[14px] uppercase py-3 tracking-widest transition-all active:bg-gray-400 btn-pri"
                              className="font-bold text-[14px] font-roboto-condensed leading-4 uppercase font-robot border-b-[4px] border-b-[#393939] bg-[#cac9c9] text-[#393939] rounded-none hover:bg-[#b81818] hover:border-b-[#6b0107] hover:text-white px-[2.28571rem] py-[0.85714rem] my-0"
                            >
                              VIEW DETAILS
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>}

            {/* Right: Login/Signup + Cart */}
            <div className="flex items-center md:justify-end justify-between whitespace-nowrap flex-1 gap-5 md:gap-5">
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
              <div className="flex items-center gap-2 ml-auto">
                {auth?.isAuthenticated && <Link
                  href={
                    auth?.isAuthenticated ? "/my-account/orders" : "/auth/login"
                  }
                >
                  <User className="w-8 h-8 text-white" fill="currentColor" />
                </Link>}
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
              <div className="relative sm:flex hidden" ref={dropdownRef}>
                <div className="relative w-[40px]">
                  <div className="absolute z-[9999] -top-6 -bottom-7 right-0 left-0 bg-[#d42020] hover:bg-[#860d09] border-0 border-b-[3px] border-b-[#860109] transition cursor-pointer flex items-center justify-center"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <FaShoppingCart className="w-7 h-7 text-white" />
                    <span className="absolute top-2 -right-3 bg-[#ffffff] text-[#d42020] text-[10px] rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cartItemCount || "0"}
                    </span>
                  </div>

                  {isOpen && (
                    <div className={`absolute right-0 top-7 w-96 shadow-2xl border border-gray-200 z-[9999] ${cart.length === 0 ? "bg-[#ffffff]" : "bg-[#eaeaea]"}`}>
                      {cart.length === 0 ? (
                        <div className="p-12 text-center">
                          <p className=" text-[#545454] font-bold">Your cart is empty</p>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="max-h-96 overflow-y-auto  border space-y-1 pb-6">
                            {Object.values(
                              cart.reduce((acc: Record<string, any>, item: any) => {
                                const key = item?.id;
                                if (acc[key]) {
                                  acc[key].quantity += item?.quantity ?? 1;
                                } else {
                                  acc[key] = { ...item, quantity: item?.quantity ?? 1 };
                                }
                                return acc;
                              }, {})
                            ).map((item) => (
                              <Link key={item?.id} href={item?.productUrl} onClick={() => setIsOpen(false)} className=" px-2 flex gap-3 items-center cursor-pointer border-b border-gray-300 pb-1 last:border-b-0">
                                <div className="w-16 h-16 flex-shrink-0 border border-gray-100 rounded-none">
                                  <img
                                    src={item?.image?.[0]?.path || "/default-product-image.svg"}
                                    alt={item?.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  {item?.brand?.name && (
                                    <p className="text-[13px] text-[#393939] inline-block font-bold uppercase">
                                      {item?.brand?.name}
                                    </p>
                                  )}
                                  <p className="text-[13px] font-light text-[#d42020] leading-snug whitespace-pre-line break-words">
                                    {item?.name}
                                  </p>
                                  <p className="text-[#393939] font-bold text-[13px] mt-1">
                                    {item?.quantity > 1 && (
                                      <span>
                                        {item?.quantity} ×{" "}
                                      </span>
                                    )}
                                    ${item?.price}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>


                          <div className="flex gap-2 p-4 pt-6">
                            <button
                              className="flex-1 font-[var(--font-roboto-condensed)] font-bold bg-[#d42020] hover:bg-[#b81818] text-white text-[1rem] py-2.5 px-4 border-0 border-b-[3px] border-b-[#860109] transition uppercase tracking-wide"
                              onClick={() => handleSelect("/checkout")}
                            >
                              Check Out Now
                            </button>
                            <button
                              className="flex-1 font-[var(--font-roboto-condensed)] font-bold bg-[#d42020] hover:bg-[#b81818] text-white text-[1rem] py-2.5 px-4 border-0 border-b-[3px] border-b-[#860109] transition uppercase tracking-wide"
                              onClick={() => {
                                handleSelect("/cart");
                              }}
                            >
                              View Cart
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative top-[3px] z-[999] sm:hidden flex" >
                <Link href="/cart" className="transition block">
                  <div className="bg-red-600 p-2 rounded hover:bg-red-700 transition">
                    <FaShoppingCart className="w-7 h-7 text-white" />
                    <span className="absolute top-2 -right-2 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
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
      {
        mobileOpen && (
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
                {visibleCategories?.map((category) => (
                  <div key={category.id}>
                    <div
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-700 rounded transition cursor-pointer"
                      onClick={() => {
                        if (category?.subcategories?.length > 0) {
                          toggleCategory(category?.id);
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
                      category?.subcategories?.length > 0 && (
                        <div className="ml-4 space-y-1">
                          {category?.subcategories?.map((subcat) => (
                            <Link
                              key={subcat?.id}
                              href={`/category/${subcat?.slug}`}
                              className="block py-2 px-4 text-sm hover:bg-gray-700 rounded transition"
                              onClick={() => setMobileOpen(false)}
                            >
                              {subcat?.name}
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
        )
      }
    </>
  );
};

export default TopHeader;
