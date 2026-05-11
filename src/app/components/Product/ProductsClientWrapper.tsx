"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Filters/Sidebar";
import ProductList from "./ProductList";
import Breadcrumb from "./Breadcrumb";
import { fetchFilteredProducts } from "@/lib/api/products";
import { ProductFilterPayload } from "@/types/types";
import { useParams, usePathname } from "next/navigation";

export default function ProductsClientWrapper({
  categories,
  brands,
  initialCategoryId,
  initialCategoryName,
  initialBrandId,
  initialBrandName,
  initialCategorydescription,
}: any) {
  const params = useParams(); // get slug param
  const pathname = usePathname(); // get current path
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Detect if we're on brand or category page
  const isBrandPage = pathname?.startsWith("/brand/");
  const isCategoryPage = pathname?.startsWith("/category/");

  const [filters, setFilters] = useState<ProductFilterPayload>({
    page: 1,
    pageSize: 20,
    categoryIds: initialCategoryId ? [initialCategoryId] : [],
    brandId: initialBrandId || null,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "",
  });

  const normalizeProductName = (p: any) => {
    const name =
      typeof p?.name === "string" ? p.name : (p?.name?.name as string | undefined);
    return (name ?? "").toString().toLowerCase().trim();
  };

  const normalizeFeatured = (p: any) => {
    return Boolean(p?.isFeatured ?? p?.featured ?? p?.is_featured ?? p?.is_featured_item);
  };

  const normalizeCreatedAt = (p: any) => {
    const raw = p?.createdAt ?? p?.created_at ?? p?.created ?? p?.dateCreated;
    const t = raw ? Date.parse(raw) : NaN;
    return Number.isFinite(t) ? t : null;
  };

  const applyClientSort = (items: any[], sortBy?: string) => {
    const list = [...(items ?? [])];
    switch (sortBy) {
      case "nameAsc":
        return list.sort((a, b) =>
          normalizeProductName(a).localeCompare(normalizeProductName(b))
        );
      case "nameDesc":
        return list.sort((a, b) =>
          normalizeProductName(b).localeCompare(normalizeProductName(a))
        );
      case "featured":
        return list.sort((a, b) => Number(normalizeFeatured(b)) - Number(normalizeFeatured(a)));
      case "newest":
        return list.sort((a, b) => {
          const ta = normalizeCreatedAt(a);
          const tb = normalizeCreatedAt(b);
          if (ta !== null && tb !== null) return tb - ta;
          if (ta !== null) return -1;
          if (tb !== null) return 1;
          return Number(b?.id ?? 0) - Number(a?.id ?? 0);
        });
      case "priceLowToHigh":
        return list.sort(
          (a, b) => Number(a?.price ?? 0) - Number(b?.price ?? 0)
        );
      case "priceHighToLow":
        return list.sort(
          (a, b) => Number(b?.price ?? 0) - Number(a?.price ?? 0)
        );
      default:
        return list;
    }
  };

  // ✅ Sync filters when URL slug changes (for category pages)
  useEffect(() => {
    if (isCategoryPage && params?.slug && categories?.length > 0) {
      const matched = categories.find((c: any) => c.slug === params.slug);
      if (matched) {
        setFilters((prev) => ({
          ...prev,
          categoryIds: [matched.id],
          page: 1,
        }));
        setFilterMeta((prev) => ({
          ...prev,
          categoryName: matched.name,
        }));
      }
    }
  }, [params?.slug, categories, isCategoryPage]);

  // ✅ Sync filters when URL slug changes (for brand pages)
  useEffect(() => {
    if (isBrandPage && params?.slug && brands?.length > 0) {
      const matched = brands.find((b: any) => b.brand?.slug === params.slug);
      if (matched) {
        setFilters((prev) => ({
          ...prev,
          brandId: matched.brand?.id,
          page: 1,
        }));
        setFilterMeta((prev) => ({
          ...prev,
          brandName: matched.brand?.name,
        }));
      }
    }
  }, [params?.slug, brands, isBrandPage]);

  // 👇 Separate state for UI display (not sent to API)
  const [filterMeta, setFilterMeta] = useState({
    brandName: initialBrandName || undefined,
    categoryName: initialCategoryName || undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetchFilteredProducts(filters);
        setProducts(applyClientSort(res.data || [], filters.sortBy));
        setPagination(res.pagination || null);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);
  // Generate breadcrumb items based on page type
  const breadcrumbItems = React.useMemo(() => {
    const items = [{ name: "Home", href: "/" }];

    if (isCategoryPage && filterMeta.categoryName) {
      items.push({
        name: filterMeta.categoryName,
        href: `/category/${params?.slug || ""}`,
      });
    } else if (isBrandPage && filterMeta.brandName) {
      items.push({
        name: filterMeta.brandName,
        href: `/brand/${params?.slug || ""}`,
      });
    }

    return items;
  }, [
    isCategoryPage,
    isBrandPage,
    filterMeta.categoryName,
    filterMeta.brandName,
    params?.slug,
  ]);

  return (
    <div className="w-full max-w-[1170px] mx-auto  lg:px-6 xl:px-0">
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:block hidden lg:col-span-3">
            <Sidebar
              categories={categories}
              brands={brands}
              filters={filters}
              setFilters={setFilters}
              products={products}
              filterMeta={filterMeta}
              setFilterMeta={setFilterMeta}
              isBrandPage={isBrandPage}
              isCategoryPage={isCategoryPage}
            />
          </aside>
          {/* Main Content */}
          <div className="lg:col-span-9">
            {(isCategoryPage || isBrandPage) && (
              <div className="mb-4 px-4 md:px-0">
                <Breadcrumb items={breadcrumbItems} />
              </div>
            )}
            <ProductList
              items={breadcrumbItems}
              filters={filters}
              setFilters={setFilters}
              products={products}
              pagination={pagination}
              isLoading={isLoading}
              error={error}
              filterMeta={filterMeta}
              initialCategorydescription={initialCategorydescription}
            />
          </div>
        </div>
      </div>
    </div>
    //       <div className="flex flex-col lg:flex-row gap-4 py-4 w-full xl:max-w-[100%] 2xl:max-w-[119.5%]">
    //         {/* Sidebar: Filters */}
    //         <aside
    //           className="w-full lg:w-[27%] xl:w-[24%] 2xl:w-[24.1%] bg-white rounded
    // "
    //         >
    //           <Sidebar
    //             categories={categories}
    //             brands={brands}
    //             filters={filters}
    //             setFilters={setFilters}
    //             products={products}
    //             filterMeta={filterMeta}
    //             setFilterMeta={setFilterMeta}
    //             isBrandPage={isBrandPage}
    //             isCategoryPage={isCategoryPage}
    //           />
    //         </aside>

    //         {/* Product Listing */}
    //         <main className="w-full lg:w-[72%] xl:w-[73.3%] 2xl:w-[73.8%]">
    //           {(isCategoryPage || isBrandPage) && (
    //             <div className="mb-4 px-4 md:px-0">
    //               <Breadcrumb items={breadcrumbItems} />
    //             </div>
    //           )}
    //           <ProductList
    //             filters={filters}
    //             setFilters={setFilters}
    //             products={products}
    //             pagination={pagination}
    //             isLoading={isLoading}
    //             error={error}
    //             filterMeta={filterMeta}
    //             initialCategorydescription={initialCategorydescription}
    //           />
    //         </main>
    //       </div>
  );
}
