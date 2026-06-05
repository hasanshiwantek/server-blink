// // lib/api/categories.ts
import { baseURL, storeId } from "../axiosInstance";
// const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const fetchCategories = async () => {
  const res = await fetch(`${baseURL}web/categories/get-categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      storeId: storeId,
    },
    // ✅ ISR: cache once, refresh every 5 min
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  return data?.data || [];
};



export async function fetchCategoryById(id: number | string) {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
    const res = await fetch(`${baseURL}categories/${id}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      console.error(`Category API error: ${res.status} for id ${id}`);
      return null;
    }

    const data = await res.json();
    return data || null;

  } catch (err) {
    console.error(`fetchCategoryById failed for id ${id}:`, err);
    return null;
  }
}