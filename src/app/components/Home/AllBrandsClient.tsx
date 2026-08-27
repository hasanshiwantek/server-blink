"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export type BrandRow = { brand?: BrandItem } | BrandItem;

export interface BrandItem {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
}


function normalizeBrands(raw: BrandRow[]): BrandItem[] {
  return raw
    .map((row) => ("brand" in row && row.brand ? row.brand : (row as BrandItem)))
    .filter((b): b is BrandItem => Boolean(b?.id && b?.slug));
}

interface AllBrandsClientProps {
  brands: BrandRow[];
}

const AllBrandsClient = ({ brands }: AllBrandsClientProps) => {
  const list = useMemo(() => normalizeBrands(brands), [brands]);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const [page, setPage] = useState(1);



  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE; 
    return list.slice(start, start + PAGE_SIZE);
  }, [list, page]);

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  return (
    <div className="w-full bg-[var(--bg-color)] pb-10">
      <div className="mx-auto w-full max-w-[1170px] px-3 py-5 sm:px-4 md:px-0">
        <nav className="mb-3">
          <div className="hidden md:flex flex-wrap items-center gap-2 text-sm roboto-sans-font">
            <Link href="/" className="text-[#393939] text-[11px] hover:underline">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#D42020] text-[11px]">All Brands</span>
          </div>
        </nav>

        <h1 className="mb-5 text-2xl md:text-[28px] font-light tracking-tight text-[#545454] roboto-font  md:text-4xl">
          Brands
        </h1>

        {list.length === 0 ? (
          <p className="text-gray-600">No brands available.</p>
        ) : (
          <>
            <div
  className="grid w-full gap-x-2 gap-y-4 sm:gap-x-3 max-md:grid-cols-2 md:justify-start md:gap-x-3 md:[grid-template-columns:repeat(auto-fill,226px)]"
>
  {pageItems.map((brand) => (
    <div key={brand.id} className="min-w-0 w-full md:w-[226px]">
      <Link
        href={`/brand/${brand.slug}`}
        className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D42020] focus-visible:ring-offset-2 md:w-[226px]"
      >
      
        <div className="flex aspect-square w-full items-center justify-center border-2 border-black bg-white p-4 transition-opacity group-hover:opacity-90 md:w-[226px] md:p-5">
        <div className="w-40 h-40 flex items-center justify-center">
        <Image
          src={brand.logo || "/default-product-image.svg"}
          alt={brand.name}
          width={260}
          height={260}
          sizes="128px"
          priority={pageItems[0].id === brand.id}
          className="w-full h-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105 select-none"
          draggable={false}
        />
      </div>
        </div>

        <p className="mt-1.5 line-clamp-2 text-center text-[15px] font-semibold leading-tight text-[#545454] roboto-font sm:text-[14px]">
          {brand.name}
        </p>
      </Link>
    </div>
  ))}
</div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-row justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {pages.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={cn(
                        "flex h-10 min-w-10 items-center justify-center border px-3 text-sm font-medium transition-colors",
                        page === p
                          ? "border-[#D42020] text-[#D42020] bg-white"
                          : "border-gray-300 bg-white text-[#393939] text-[12px] roboto-font hover:border-gray-400"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  className={cn(
                    "inline-flex h-10 w-auto  items-center justify-center border !px-4 py-2.5 text-sm font-medium",
                    "border-gray-300 bg-white text-[#545454] text-[12px] roboto-font  hover:border-gray-400",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  Next &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBrandsClient;


