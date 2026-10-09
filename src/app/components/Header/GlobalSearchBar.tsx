"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  clearSearch,
  globalSearch,
  setSearchQuery,
  setShowSearchDropdown,
} from "@/redux/slices/homeSlice";
import { usePathname } from "next/navigation";
import SearchResultItem from "./SearchResultItem";
const GlobalSearchBar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pathname = usePathname();
  const { searchQuery, showSearchDropdown, searchData, loading } =
    useAppSelector((state: any) => state.home);
  const [isScrolled, setIsScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        dispatch(setShowSearchDropdown(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (value: string) => {
    dispatch(setSearchQuery(value));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    const query = value.trim();
    if (!query) {
      dispatch(setShowSearchDropdown(false));
      return;
    }

    debounceRef.current = setTimeout(() => {
      abortRef.current = new AbortController();
      dispatch(globalSearch({ query, signal: abortRef.current.signal }));
    }, 1000);
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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={isScrolled ? "hidden" : " relative "}>
      {/* Input Box */}
      <div className="relative w-full xl:max-w-[394px] 2xl:max-w-[394px] 2xl:ml-30 xl:ml-10 ml-0">
        <input
          id="global-search"
          type="search"
          placeholder="SEARCH"
          value={searchQuery}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const q = searchQuery.trim();
              dispatch(clearSearch());

              localStorage.setItem(
                "advancedSearchFilters",
                JSON.stringify({ q }),
              );
              window.dispatchEvent(new Event("searchFiltersUpdated"));
              if (pathname === "/advanced-search") {
                window.location.reload();
              } else {
                router.push(`/advanced-search`);
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

              localStorage.setItem(
                "advancedSearchFilters",
                JSON.stringify({ q }),
              );
              window.dispatchEvent(new Event("searchFiltersUpdated"));
              if (pathname === "/advanced-search") {
                window.location.reload();
              } else {
                router.push(`/advanced-search`);
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[585px] mt-1 bg-[#f2f2f2] shadow-xl overflow-hidden z-[9999] max-h-[520px] overflow-y-auto border border-gray-300">
          {loading && (
            <div className="p-6 text-gray-500 text-center">Searching...</div>
          )}

          {!loading && searchData?.data?.length === 0 && (
            <div className="p-6 text-gray-500 text-center">
              No Products found.
            </div>
          )}

          {!loading &&
            searchData?.data?.map((item: any) => (
              <SearchResultItem
                key={item.id}
                item={item}
                onSelect={handleSelect}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
