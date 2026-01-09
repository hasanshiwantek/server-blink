"use client";

import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api/category";
import { CategoriesSidebarSkeleton, CategoryItem } from "../reuseable/CategoryUtils";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

interface CategoriesSidebarProps {
  activeCategoryId?: number; // ✅ pass the active category
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ activeCategoryId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCategories();

        if (!isMounted) return;

        if (!Array.isArray(data) || data.length === 0) {
          setCategories([]);
          return;
        }

        setCategories(data);

        // ✅ Expand parent categories of the active category automatically
        if (activeCategoryId) {
          const idsToExpand = new Set<number>();

          const findParentIds = (cats: Category[], targetId: number, parents: number[] = []) => {
            for (const cat of cats) {
              if (cat.id === targetId) {
                parents.forEach((id) => idsToExpand.add(id));
                return true;
              }
              if (cat.subcategories?.length) {
                if (findParentIds(cat.subcategories, targetId, [...parents, cat.id])) {
                  return true;
                }
              }
            }
            return false;
          };

          findParentIds(data, activeCategoryId);
          setExpandedCategories(idsToExpand);
        }

      } catch (err) {
        if (!isMounted) return;

        console.error(err);
        setError("Failed to load categories. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, [activeCategoryId]);

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // -------------------- STATES --------------------
  if (loading) return <CategoriesSidebarSkeleton />;

  if (error)
    return (
      <div className="rounded-xs overflow-hidden mb-5">
        <div className="bg-[#393939] px-3 py-2 border-b-3 border-[#8b8b8b]">
          <h2 className="h2-bold">SHOP BY CATEGORY</h2>
        </div>
        <div className="bg-white px-3 py-4 text-sm text-red-600">{error}</div>
      </div>
    );

  if (categories.length === 0)
    return (
      <div className="rounded-xs overflow-hidden mb-5">
        <div className="bg-[#393939] px-3 py-2 border-b-3 border-[#8b8b8b]">
          <h2 className="h2-bold">SHOP BY CATEGORY</h2>
        </div>
        <div className="bg-white px-3 py-4 text-sm text-gray-500">No categories available.</div>
      </div>
    );

  // 4️⃣ Success
  return (
    <div className="rounded-xs overflow-hidden mb-5">
      <div className="bg-[#393939] px-3 py-2 uppercase tracking-wide border-b-3 border-[#8b8b8b]">
        <h2 className="text-[15px] font-bold text-white ">SHOP BY CATEGORY</h2>
      </div>

      <div className="py-2 bg-white text-[#545454]">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            expanded={expandedCategories}
            toggle={toggleCategory}
            activeCategoryId={activeCategoryId} // ✅ pass active id
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
