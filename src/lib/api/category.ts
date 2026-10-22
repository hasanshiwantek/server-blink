// // lib/api/categories.ts
import { apiFetch, type ApiFetchOptions } from "@/lib/apiFetch";

// const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const fetchCategories = async (options?: ApiFetchOptions) => {
  const res = await apiFetch(`web/categories/get-categories`, options);

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  return data?.data || [];
};
