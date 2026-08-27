// // lib/api/brand.ts
import { baseURL, storeId } from "../axiosInstance";

export const fetchBrands = async () => {
  const res = await fetch(`${baseURL}web/brands/brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      storeId: storeId,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch brands");
  const data = await res.json();
  return data?.data || [];
};
