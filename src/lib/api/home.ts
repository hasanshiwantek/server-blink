// // lib/api/categories.ts
import { apiFetch } from "@/lib/apiFetch";

export const fetchCarousels = async () => {
  const res = await apiFetch("web/carousels/get-crousel", {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  return data || [];
};
