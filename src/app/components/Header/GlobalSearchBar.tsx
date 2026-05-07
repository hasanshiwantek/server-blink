"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { globalSearch } from "@/redux/slices/homeSlice";

const GlobalSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { searchData, loading } = useAppSelector((state: any) => state.home);

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
        setShowDropdown(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed.length > 1) {
      const cacheKey = trimmed.toLowerCase();
      if (searchCache[cacheKey]) {
        // setResults(searchCache[cacheKey]);
        dispatch(globalSearch({ query: trimmed }));
        setShowDropdown(true);
      } else {
        dispatch(globalSearch({ query: trimmed }));
        setShowDropdown(true);
      }
    }
  };

  const handleOnChange = (value?: string) => {
    const trimmed = (value ?? query).trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (trimmed.length > 1) {
      debounceRef.current = setTimeout(() => {
        const cacheKey = trimmed.toLowerCase();
        if (searchCache[cacheKey]) {
          // setResults(searchCache[cacheKey]);
          dispatch(globalSearch({ query: trimmed }));

          setShowDropdown(true);
        } else {
          dispatch(globalSearch({ query: trimmed }));
          setShowDropdown(true);
        }
      }, 500);
    }
  };
  const handleSelect = (url: string) => {
    setQuery("");
    setShowDropdown(false);
    router.push(url);
  };


  return (
    <div ref={containerRef} className="relative">
      {/* Input Box */}
      <div className="relative w-full xl:max-w-[394px] 2xl:max-w-[394px] 2xl:ml-30 xl:ml-10 ml-0">
        <input
          type="search"
          placeholder="SEARCH"
          value={query}
          onChange={(e) => {
            handleOnChange(e.target.value)
            setQuery(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="
            w-full px-4 md:px-5 lg:px-6
            py-2 md:py-2.5 lg:py-3
            bg-white text-gray-800
            focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
            text-sm sm:text-base lg:text-lg
            h-10 sm:h-12 md:h-12 lg:h-14 xl:h-[32px] 2xl:h-[32px]
            pr-12 sm:pr-16 md:pr-20 lg:pr-27 2xl:pr-56
            h6-medium-color border-1 border-[#cac9c9]
          "
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          <button
            aria-label="search"
            name="search"
            onClick={handleSearch}
            className="
              rounded-full
              w-8 h-8
              sm:w-9 sm:h-9
              md:w-10 md:h-6
              lg:w-16 lg:h-10
              xl:w-20 xl:h-13
              2xl:w-[88px] 2xl:h-[46px]
              flex items-center justify-center
            "
          >
            <Search
              className="
                w-4 h-4
                sm:w-5 sm:h-5
                md:w-6 md:h-6
                lg:w-7 lg:h-7
                xl:w-8 xl:h-8
                2xl:w-[23.7px] 2xl:h-[23.7px]
                text-black
              "
            />
          </button>
        </div>
      </div>

      {/* Dropdown Results */}
      {showDropdown && query.trim().length > 1 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white text-[#4A4A4A] shadow-lg rounded-md overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {loading && <div className="p-3 text-gray/80">Searching...</div>}

          {!loading && results.length === 0 && (
            <div className="p-3 text-gray/80">No Products found.</div>
          )}

          {!loading &&
            results.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.productUrl)}
                className="
                  flex items-start gap-3 p-3 border-b border-gray/50
                  hover:bg-[var(--primary-color)] hover:text-white
                  transition-colors cursor-pointer
                "
              >
                <div className="flex flex-col flex-grow overflow-hidden">
                  <p className="text-sm font-semibold truncate">
                    {item?.brand || "Brand"} | <span>SKU: {item?.sku || "N/A"}</span>
                  </p>
                  <p className="text-[15px] font-medium leading-tight line-clamp-2">
                    {item?.name}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {item?.price ? `$${item?.price}` : "$0.00"}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;