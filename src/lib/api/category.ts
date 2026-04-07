// // lib/api/categories.ts
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async () => {
  const res = await fetch(`${baseURL}web/categories/get-categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      storeId: "10",
    },
    // ✅ ISR: cache once, refresh every 5 min
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  return data?.data || [];
};



// export const fetchCategoryById = async (id: number | string ) => {
//   const res = await fetch(`${baseURL}web/categories/categories/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       storeId: "10",
//     },
//     // ✅ ISR: cache once, refresh every 5 min
//     next: { revalidate: 300 },
//   });

//   if (!res.ok) throw new Error(`Failed to fetch category with id ${id}`);

//   const data = await res.json();
//   return data || null;
// };


export async function fetchCategoryById(id: number | string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      next: { revalidate: 3600 },
    });

    // 404 = category nahi mili, throw mat karo
    if (res.status === 404) return null;

    if (!res.ok) {
      console.error(`Category API error: ${res.status} for id ${id}`);
      return null; // throw karne ki bajay null return karo
    }

    const data = await res.json();
    return data || null;

  } catch (err) {
    console.error(`fetchCategoryById failed for id ${id}:`, err);
    return null; // network error pe bhi null
  }
}