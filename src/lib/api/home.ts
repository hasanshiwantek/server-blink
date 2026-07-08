// // lib/api/categories.ts
import { baseURL, storeId } from "../axiosInstance";
// const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const fetchCarousels = async () => {
    const res = await fetch(`${baseURL}web/carousels/get-crousel`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            storeId: storeId,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    return data || [];
};

