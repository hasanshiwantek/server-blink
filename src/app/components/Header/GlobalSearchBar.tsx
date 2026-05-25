"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { clearSearch, globalSearch, setSearchQuery, setShowSearchDropdown } from "@/redux/slices/homeSlice";
import { usePathname } from "next/navigation";
import Image from "next/image";
const GlobalSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { searchQuery, showSearchDropdown, searchData, loading } = useAppSelector((state: any) => state.home);
  const [isScrolled, setIsScrolled] = useState(false);

  const [results, setResults] = useState<any[]>([]);
  const [searchCache, setSearchCache] = useState<{ [key: string]: any[] }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Map API results and store in cache
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
        dispatch(setShowSearchDropdown(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed.length > 1) {
      dispatch(globalSearch({ query: trimmed }));
    }
  };

  const handleOnChange = (value: string) => {
    dispatch(setSearchQuery(value));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        dispatch(globalSearch({ query: value.trim() }));
      }, 100);
    } else {
      dispatch(setShowSearchDropdown(false));
    }
  };
  const handleSelect = (url: string) => {
    dispatch(clearSearch());
    dispatch(setShowSearchDropdown(false));
    router.push(url);
  };
  useEffect(() => {
    if (pathname === "/advanced-search") {
      dispatch(clearSearch());
    }
  }, [pathname]);

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

  return (
    <div ref={containerRef} className={isScrolled ? "hidden" : ' relative '}>
      {/* Input Box */}
      <div className="relative w-full xl:max-w-[394px] 2xl:max-w-[394px] 2xl:ml-30 xl:ml-10 ml-0">
        <input
          type="search"
          placeholder="SEARCH"
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
              }
            }
          }}
          className="
            w-full
                  h-10 sm:h-12 lg:h-14 xl:h-[32px]
                 pl-4 pr-12
            bg-white text-gray-800
            focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
            text-sm sm:text-base
            h6-medium-color border-1 border-[#cac9c9]
            "

        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center  border-gray-300 px-3">
          <button
            aria-label="search"
            name="search"
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
            className="flex items-center justify-center"
          >
            <Search className="w-5 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Dropdown Results */}

      {showSearchDropdown && searchQuery.trim().length > 1 && (
        // <div className="absolute top-full left-0 !w-[585px] mt-1 bg-[#f2f2f2] shadow-xl overflow-hidden z-[9999] max-h-[520px] overflow-y-auto border border-gray-300 ">
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
    </div>
  );
};

export default GlobalSearchBar;
