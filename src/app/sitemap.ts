// // app/sitemap.ts
// import type { MetadataRoute } from "next";

// // Base URL of your website
// const BASE_URL = "https://newtownspares.advertsedge.com"; // replace with your real domain

// async function fetchProducts() {
//   try {
//     const res = await fetch(
//       "https://ecom.brokercell.com/api/web/products/products",
//       {
//         headers: {
//           storeId: "4",
//         },
//       }
//     );
//     if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`);
//     const data = await res.json();
//     return data.data || [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// async function fetchCategories() {
//   try {
//     const res = await fetch(
//       "https://ecom.brokercell.com/api/web/categories/get-categories",
//       {
//         headers: {
//           storeId: "4",
//         },
//       }
//     );
//     if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
//     const data = await res.json();
//     return data.data || [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// // Flatten categories and subcategories into a single array of slugs
// function flattenCategories(categories: any[]): string[] {
//   let urls: string[] = [];

//   categories.forEach((cat) => {
//     urls.push(cat.slug);
//     if (cat.subcategories && cat.subcategories.length > 0) {
//       urls = urls.concat(flattenCategories(cat.subcategories));
//     }
//   });

//   return urls;
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const products = await fetchProducts();
//   const categories = await fetchCategories();

//   // Static pages
//   const staticPages: MetadataRoute.Sitemap = [
//     { url: `${BASE_URL}/`, lastModified: new Date() },
//     { url: `${BASE_URL}/about-us`, lastModified: new Date() },
//     { url: `${BASE_URL}/contact-us`, lastModified: new Date() },
//     { url: `${BASE_URL}/auth/login`, lastModified: new Date() },
//     { url: `${BASE_URL}/auth/signup`, lastModified: new Date() },

//   ];

//   // Category URLs
//   const categorySlugs = flattenCategories(categories);
//   const categoryUrls: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
//     url: `${BASE_URL}/category/${slug}`,
//     lastModified: new Date(),
//   }));

//   // Product URLs
//   const productUrls: MetadataRoute.Sitemap = products.map((p: any) => ({
//     url: `${BASE_URL}/products/${p.slug}`,
//     lastModified: new Date(p.updatedAt),
//   }));

//   // Combine everything
//   return [...staticPages, ...categoryUrls, ...productUrls];
// }

import { MetadataRoute } from "next";

const BACKEND_SITEMAP_URL = "https://backend.sparemicro.com/xmlsitemap";
const FRONTEND_BASE_URL = "https://server-blink.vercel.app";
// const FRONTEND_BASE_URL = "https://server-blink.vercel.app";

// Parses the XML sitemap index and extracts all <loc> URLs
async function fetchSitemapIndex(): Promise<string[]> {
  try {
    const res = await fetch(BACKEND_SITEMAP_URL, {
      next: { revalidate: 3600 }, // revalidate every 1 hour
    });

    if (!res.ok) return [];

    const xml = await res.text();

    // Extract all <loc> values from the sitemap index
    const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) ?? [];
    return locMatches.map((loc) =>
      loc.replace(/<\/?loc>/g, "").trim()
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const subSitemapUrls = await fetchSitemapIndex();

  // Build sitemap entries — one per sub-sitemap URL
  // Each sub-sitemap URL points to our frontend /sitemap/[type]/[page] dynamic handler
  const entries: MetadataRoute.Sitemap = [];

  for (const url of subSitemapUrls) {
    // url looks like: https://backend.sparemicro.com/xmlsitemap?type=products&page=1
    // We keep it as-is since Next.js sitemap.ts returns page URLs, not sub-sitemap URLs.
    // Instead, we fetch each sub-sitemap and inline all its <loc> entries.

    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) continue;

      const xml = await res.text();
      const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) ?? [];

      for (const loc of locMatches) {
        const backendLoc = loc.replace(/<\/?loc>/g, "").trim();

        // Replace backend base with frontend base URL
        // e.g. https://backend.sparemicro.com/products/some-slug
        //   => https://server-blink.vercel.app/products/some-slug
        const path = backendLoc.replace(
          /^https?:\/\/[^/]+/,
          ""
        );

        entries.push({
          url: `${FRONTEND_BASE_URL}${path}`,
          lastModified: new Date(),
          changeFrequency: path.startsWith("/products") ? "weekly" : "monthly",
          priority: path === "/" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
        });
      }
    } catch {
      // skip failed sub-sitemaps silently
      continue;
    }
  }

  // Always include homepage as fallback
  if (entries.length === 0) {
    entries.push({
      url: FRONTEND_BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });
  }

  return entries;
}