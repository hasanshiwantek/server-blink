import React from "react";
import Link from "next/link";
import { baseURL, storeId } from "@/lib/axiosInstance";

async function fetchBrands() {
    try {
        const res = await fetch(`${baseURL}web/brands/brands`, {
            headers: { storeId: storeId },
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

export default async function SitemapPage() {
    const brands = await fetchBrands();

    return (
        <main className="w-full max-w-[1170px] mx-auto mt-8 lg:px-6 xl:px-4">
            <h1 className="text-[22px] text-[#545454]  mb-6">Sitemap</h1>
            {/* Brands */}
            <section className="mb-8">
                <h2 className="text-[22px] text-[#545454] mb-2">Brands</h2>
                <ul style={{ listStyleType: "circle" }} className="  ml-4  space-y-1">
                    {brands?.map((brand: any) => (
                        <li key={brand.slug}>
                            <Link
                                href={`/brand/${brand.brand.slug}`}
                                className="text-[#d42020] text-[14px] underline"
                            >
                                {brand.brand.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
