import type { MetadataRoute } from "next";
import axiosInstance from "@/lib/axiosInstance";

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    console.log("🤖 Robots.ts is running..."); // Yeh sirf build time par terminal mein dikhega
    
    const res = await axiosInstance.get(
      "/api/web/store-setting/get-store-setting"
    );

    const json = res.data;
    console.log("Robots.txt data:", json); // Terminal mein dikhega, browser console mein nahi
    
    const robotsTxt = json?.data?.[0]?.website?.robotsTxt || "";

    const disallowRules = robotsTxt
      .split("\n")
      .filter((line: string) => line.startsWith("Disallow:"))
      .map((line: string) => line.replace("Disallow:", "").trim());

    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: disallowRules.length > 0 ? disallowRules : undefined,
        },
      ],
      sitemap: "https://server-blink.vercel.app/sitemap.xml",
    };
  } catch (error) {
    console.error("❌ Robots.ts error:", error); // Terminal mein dikhega
    
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [],
        },
      ],
      sitemap: "https://server-blink.vercel.app/sitemap.xml",
    };
  }
}