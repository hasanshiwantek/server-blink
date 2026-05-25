"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getBrands } from "@/redux/slices/homeSlice";
import { CategoriesSidebarSkeleton } from "../reuseable/CategoryUtils";
import Link from "next/link";

interface BrandsSidebarProps {
  activeBrandId?: number;
}

const BrandsSidebar: React.FC<BrandsSidebarProps> = ({ activeBrandId }) => {
  const dispatch = useAppDispatch();
  const { getBrand, error, loading } = useAppSelector(
    (state: any) => state?.home
  );
  const data = getBrand?.data?.map((item: any) => item?.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="rounded-xs overflow-hidden">
      {/* Header */}
      <div className="bg-[#393939] px-3 py-2 uppercase tracking-wide border-b-3 border-[#8b8b8b]">
        <h2 className="text-[13px] lg:text-[15px] font-bold text-white">SHOP BY BRAND</h2>
      </div>

      {/* Body */}
      <div className="py-2 bg-white text-[#545454]">
        {loading ? (
          <CategoriesSidebarSkeleton />
        ) : data && data.length > 0 ? (
          data?.slice(0, 11).map((brand: any) => (
            <Link href={`/brand/${brand?.slug}`} key={brand.id} style={{ fontFamily: '"Roboto Condensed"' }}>
              <button
                className={`w-full px-3 py-1 text-left text-[13px] lg:text-[14px]  font-normal flex items-center gap-3 transition-colors
                  ${brand.id === activeBrandId
                    ? "text-[var(--primary-color)]"
                    : "text-[#545454] hover:text-[var(--primary-color)]"
                  }`}
              >
                <span>{brand.name}</span>
              </button>
            </Link>
          ))
        ) : error ? (
          <div className="px-2 py-4 text-center text-red-400">
            Failed to load brands
          </div>
        ) : (
          <div className="px-2 py-2 text-start text-gray-500 text-sm">
            No brands available
          </div>
        )}

        <Link href="/brands">
          <button
            type="button"
            className="w-full px-3 py-1 text-left text-[15px] font-normal flex items-center gap-3 transition-colors text-[#545454] hover:text-[var(--primary-color)]"
          >
            <span>View all brands</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BrandsSidebar;