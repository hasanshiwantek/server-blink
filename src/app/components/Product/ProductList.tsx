// components/Product/ProductList.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCategoryCard from "./ProductCategoryCard";
// import ProductGridCard from "./ProductGridCard";
import SortingBar from "./SortingBar";
import ProductSkeleton from "../loader/ProductSkeleton";
import Pagination from "@/components/ui/pagination";
import dynamic from "next/dynamic";
import ProductCard from "../../components/Home/ProductCard";
import { decode } from "html-entities";
import Link from "next/link";


// Dynamically import motion.div and AnimatePresence (client only)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

interface BreadcrumbItem {
  name: string;
  href: string;
}
interface ProductListProps {
  items?: BreadcrumbItem[];
  filters: any;
  setFilters: any;
  products: any[];
  pagination: any;
  isLoading?: boolean;
  error?: string | null;
  filterMeta: any;
  initialCategorydescription?: any;
  categories?: any;
  initialCategoryId?: any;
  isBrandPage: boolean
}

export default function ProductList({
  items,
  filters,
  setFilters,
  products,
  pagination,
  isLoading = false,
  error = null,
  filterMeta,
  initialCategorydescription,
  categories,
  initialCategoryId,
  isBrandPage
}: ProductListProps) {
  const [view, setView] = useState<"list" | "grid">("grid");
  const [page, setPage] = useState(1);
  const decodedHtml = decode(
    initialCategorydescription?.replace(/<pre[^>]*>/gi, "")?.replace(/<\/pre>/gi, "")
  );

  const findCategoryById = (cats: any[], id: number): any => {
    for (const cat of cats) {
      if (cat.id === id) return cat;
      if (cat.subcategories?.length) {
        const found = findCategoryById(cat.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  const cleanSubcategories = categories?.subcategories

  const { contentHtml, faqHtml } = useMemo(() => {
    if (!decodedHtml) {
      return {
        contentHtml: "",
        faqHtml: "",
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedHtml, "text/html");

    const faq = doc.querySelector(".blog-faqs");

    const faqHtml = faq ? faq.outerHTML : "";

    if (faq) {
      faq.remove();
    }

    return {
      contentHtml: doc.body.innerHTML,
      faqHtml,
    };
  }, [decodedHtml]);
  const total = pagination?.total || 0;
  // ✅ Scroll to top when filters.page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);

  useEffect(() => {
    const main = document.querySelector(".custom-description-style");
    if (!main) return;

    const blogFaqs = main.querySelector(".blog-faqs");
    const target = document.querySelector(".faqs-section");

    if (blogFaqs && target) {
      target.innerHTML = "";
      target.appendChild(blogFaqs.cloneNode(true));
    }
  }, [decodedHtml]);

  return (
    <section
      className="w-full
        transition-all duration-300
      "
    >
      {/* Headings */}
      <div className="flex items-center justify-between bg-[#393939] border-b border-gray-400">
        {items?.slice(-1).map((item, index) => (
          <h2 key={index} className="font-bold text-xl text-white py-2 px-4 flex-1">
            {item.name}
          </h2>
        ))}
      </div>
      {initialCategorydescription && !isBrandPage && (
        <>
          <style>{`
      .custom-description {
        color: #545454;
        font-family: Roboto, Arial, Helvetica, sans-serif;
      }

      /* Headings */
      .custom-description h2 {
        font-size: 26px;
        margin: 17.5px 0 11px 0;
        font-weight: 300;
        line-height: 1.3;
      }

      /* Paragraphs */
      .custom-description p {
        font-size: 14px;
        margin: 8px 0 0 0;
        line-height: 1.6;
      }

      /* Strong */
      .custom-description strong {
        font-weight: 700;
        color: #545454;
      }

      /* Links */
      .custom-description a {
        color: #d42020;
        text-decoration: underline;
        line-height: inherit;
        transition: color 0.15s ease;
        -webkit-transition: color 0.15s ease;
      }

      .custom-description a:hover {
        color: #b31b1b; /* Slightly darker red on hover - you can adjust */
      }

      /* Lists */
      .custom-description ul,
      .custom-description ol {
        margin: 8px 0 8px 20px;
        padding: 0;
      }

      .custom-description li {
        font-size: 14px;
        margin-bottom: 6px;
        line-height: 1.6;
        position: relative;
      }

      .custom-description ul {
        list-style-type: disc;
      }

      .custom-description ol {
        list-style-type: decimal;
      }

      /* Scrollbar */
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #FF0101;
        border: 1px solid #FF0101;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #387C3B;
        border-color: #387C3B;
      }
    `}</style>

          <div
            className="my-6 border border-gray-600 bg-white py-5 px-4
                 max-h-[240px] overflow-y-auto custom-scrollbar"
          >
            <div
              className="custom-description custom-description-style prose prose-sm max-w-none break-words"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </>
      )}
      {!isBrandPage && <div>
        <div className="my-6 ">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <Link
              href={`/category/${categories?.slug}`}
              className="py-3 px-4 text-center text-[14px] text-[#545454] font-bold  hover:text-[#d42020] transition-colors"
            >
              {categories?.name}
            </Link>
            {cleanSubcategories?.length > 0 ? cleanSubcategories?.map((sub: any, i: number) => (
              <Link
                key={sub?.id}
                href={`/category/${sub?.slug}`}
                className="py-3 px-4 text-center text-[14px] text-[#545454] font-bold  hover:text-[#d42020] transition-colors"
              >
                {sub?.name}
              </Link>
            )) : <></>}
          </div>
        </div>
      </div>}

      {/* Sort Bar */}
      <SortingBar
        total={total || 0}
        view={view}
        setView={setView}
        filters={filters}
        setFilters={setFilters}
        filterMeta={filterMeta}
      />

      {/* Error State */}
      {error && (
        <div className="mt-6 text-center text-red-500 font-medium">
          ⚠️ Failed to load products. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products?.length === 0 && (
        <div className="mt-6 text-center text-gray-500 font-medium">
          No products found. Try adjusting your filters.
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <MotionDiv
          key="loading"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-4 ${view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
            }`}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductSkeleton key={idx} view={view} />
          ))}
        </MotionDiv>
      )}

      {/* Product Cards */}
      {!isLoading && !error && products?.length > 0 && (
        <MotionDiv
          key={view}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`mt-4 ${view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-4"
            }`}
        >
          <AnimatePresence mode="wait">
            {products.map((product, idx) =>
              view === "list" ? (
                <MotionDiv
                  key={`list-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <ProductCategoryCard product={product} />
                </MotionDiv>
              ) : (
                <MotionDiv
                  key={`grid-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <ProductCard key={product.id} product={product} />
                </MotionDiv>
              )
            )}
          </AnimatePresence>
        </MotionDiv>
      )}

      {/* Pagination */}
      {!isLoading && !error && (
        <div className="mt-6 flex justify-center sm:justify-start">
          <Pagination
            currentPage={filters.page}
            totalPages={pagination?.lastPage || 1}
            onPageChange={(page) =>
              setFilters((prev: any) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>
      )}
      {/* <div className="faqs-section"></div> */}
      {faqHtml && (
        <div
          className="faqs-section mt-8"
          dangerouslySetInnerHTML={{
            __html: faqHtml.replace(/type="checkbox"/g, 'type="radio" name="faq-accordion"')
          }}
        />
      )}
    </section>
  );
}
