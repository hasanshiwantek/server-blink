"use client";

import React from "react";
import { useAppSelector } from "@/hooks/useReduxHooks";
import CommonCarousel from "../commoncarousel/CommonCarousel";

const Brands = ({ brands }: any) => {
  const { error, loading } = useAppSelector(
    (state: any) => state?.home
  );
  const data = brands?.map((item: any) => item?.brand);

  return (
    <>
      {loading ? (
        // SKELETON UI (when loading is true)
        <div className="w-full flex gap-4 overflow-x-auto py-4">
          {/* Single flexible skeleton item (can scroll horizontally if needed) */}
          <div className="flex-shrink-0 w-full h-48 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <div className="w-full h-24 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ) : data && data?.length > 0 ? (
        <CommonCarousel items={data} />
      ) : (
        error && <div className="flex justify-center items-center h-20">
          <div className="text-red-600">Failed to load brands </div>
        </div>
      )}
    </>
  );
};

export default Brands;
