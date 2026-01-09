"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import Link from "next/link";
import ProductPrice from "../productprice/ProductPrice";
import { clearRecent } from "@/redux/slices/recentSlice";
import ProductCard from "../Home/ProductCard";

const RecentViewedProduct = () => {
  const dispatch = useAppDispatch();

  // Get recent viewed products from Redux
  const recentProducts = useAppSelector((state: any) => state.recent.items);
   
  // Clear all recent viewed products after 2 minutes
  useEffect(() => {
    if (!recentProducts || recentProducts.length === 0) return;

    const timer = setTimeout(() => {
      dispatch(clearRecent());
    }, 60 * 60 * 1000); // 2 minutes

    return () => clearTimeout(timer); // cleanup on unmount
  }, [recentProducts, dispatch]);

  // Handle empty state
  if (!recentProducts || recentProducts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No recently viewed products.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recently Viewed Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentProducts.map((product: any, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentViewedProduct;
