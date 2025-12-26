"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getBrands } from "@/redux/slices/homeSlice";

const BrandsSidebar = () => {
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
        <h2 className="h2-bold">SHOP BY BRAND</h2>
      </div>

      {/* Body */}
      <div className="py-2 bg-white text-[#545454]">
        {loading ? (
          <div className="px-2 py-4 text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="px-2 py-4 text-center text-red-400">
            Failed to load brands
          </div>
        ) : (
          data?.map((brand: any) => (
            <button
              key={brand.id}
              className="w-full px-3 py-1 text-left text-[15px] font-normal text-[#545454] hover:text-[var(--primary-color)] transition-colors flex items-center gap-3"
            >
              <span>{brand.name}</span>
            </button>
          ))
        )}

        {/* View all */}
        <button className="w-full px-3 py-2.5 text-left text-[15px] font-normal text-[#545454]hover:text-[var(--primary-color)] transition-colors">
          View all Brands
        </button>
      </div>
    </div>
  );
};

export default BrandsSidebar;
