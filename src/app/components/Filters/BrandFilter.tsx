"use client";
import Link from "next/link";

interface BrandFilterProps {
  brands: any[];
  handleBrandClick: (brandId: number, brandName: string, slug?: string) => void;
  activeBrandId?: number;
}

export default function BrandFilter({
  brands,
  handleBrandClick,
  activeBrandId,
}: BrandFilterProps) {
  return (
    <ul className="space-y-1 bg-white">
      {brands.slice(0, 11).map((b: any) => {
        const isActive = activeBrandId === b.brand.id;
        return (
          <Link href={`/brand/${b?.brand?.slug}`} key={b?.brand.id}>
            <button
              onClick={() =>
                handleBrandClick(b.brand.id, b.brand.name, b.brand.slug)
              }
              className={`
                w-full text-left px-3 py-1 text-[15px] font-normal transition-colors flex items-center 
                ${isActive ? "text-[#D42020] font-medium" : "text-[#545454] hover:text-[var(--primary-color)]"}
              `}
            >
              {b.brand.name}
            </button>
          </Link>
        );
      })}
    </ul>
  );
}
