import React from "react";
import Link from "next/link";
import { baseURL, storeId } from "@/lib/axiosInstance";
const SHOW_BRANDS_LIMIT = 19;
const SHOW_CATEGORIES_LIMIT = 3;

// Fetch categories
async function fetchCategories() {
  try {
    const res = await fetch(`${baseURL}web/categories/get-categories`, {
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

// Recursive function to render categories as nested list
const CategoryList: React.FC<{ categories: any[]; categoriesLength?: number }> = ({ categories, categoriesLength }) => {
  if (!categories || categories.length === 0) return null;
  const visibleCategories = categories?.slice(0, SHOW_CATEGORIES_LIMIT) || [];

  return (
    <ul className="list-disc list-inside ml-4 space-y-3">
      {visibleCategories.map((cat) => (
        <li key={cat.slug}>
          <Link
            href={`/category/${cat.slug}`}
            className="text-[#d42020] text-[14px] hover:underline"
          >
            {cat.name}
          </Link>
          {cat.subcategories && cat.subcategories.length > 0 && (
            <CategoryList categories={cat.subcategories} />
          )}
        </li>
      ))}
      {categoriesLength !== undefined && categoriesLength > SHOW_CATEGORIES_LIMIT && (
        <li style={{ listStyleType: "circle" }}>
          <Link
            href="/sitemap/categories"
            className="text-[#d42020] text-[14px] hover:underline"
          >
            Show All
          </Link>
        </li>
      )}
    </ul>
  );
};

export default async function SitemapPage() {
  const categories = await fetchCategories();
  const brands = await fetchBrands();

  // Static pages
  const staticPages = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
    { name: "Contact", url: "/contact-us" },
    { name: "Login", url: "/auth/login" },
    { name: "Signup", url: "/auth/signup" },

    { name: "Privacy policy", url: "/privacy-Policy" },
    { name: "Shipping policy", url: "/shipping-policy" },
    { name: "Return policy", url: "/return-Policy" },
    { name: "Terms and Conditions", url: "/terms-conditions" },
    { name: "Blogs", url: "/blogs" },
  ];


  return (
    <main className="w-full max-w-[1170px] font-roboto mx-auto mt-8 lg:px-6 xl:px-4">
      <h1 className="text-[22px] text-[#545454] mb-6 ">Sitemap</h1>

      {/* Static Pages */}
      <section className="mb-8">
        <h2 className="text-[22px] text-[#545454] mb-2 ">Pages</h2>
        <ul style={{ listStyleType: "circle" }} className=" ml-4  space-y-2">
          {staticPages.map((page) => (
            <li key={page.url}>
              <Link href={page.url} className="text-[#d42020] text-[14px] hover:underline">
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* Categories */}
      {categories?.length > 0 && (
        <section>
          <h2 className="text-[22px] text-[#545454] mb-2 ">Categories</h2>
          <CategoryList categories={categories} categoriesLength={categories?.length} />
        </section>
      )}
      {/* Brands */}
      {brands?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[22px] text-[#545454] mb-2 ">Brands</h2>
          <BrandsList brands={brands} />
        </section>
      )}
    </main>
  );
}

function BrandsList({ brands }: { brands: any[] }) {

  const visibleBrands = brands?.slice(0, SHOW_BRANDS_LIMIT);

  return (
    <ul style={{ listStyleType: "circle" }} className="  ml-4  space-y-2">
      {visibleBrands?.map((brand: any) => (
        <li key={brand.slug}>
          <Link
            href={`/brand/${brand.brand.slug}`}
            className="text-[#d42020] text-[14px] hover:underline"
          >
            {brand.brand.name}
          </Link>
        </li>
      ))}

      {brands?.length > SHOW_BRANDS_LIMIT && (
        <li>
          <Link
            href="/sitemap/brands"
            className="text-[#d42020] text-[14px] hover:underline"
          >
            Show All
          </Link>
        </li>
      )}
    </ul>
  );
}